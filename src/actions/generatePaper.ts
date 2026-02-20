"use server";

import { GoogleGenAI } from "@google/genai";
import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { tmpdir } from "os";

// Constants
const GEMINI_MODEL = "gemini-2.5-flash";
const PDF_MIME_TYPE = "application/pdf";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Types
interface QuestionDistribution {
  q2m: number;
  q4m: number;
  q8m: number;
  q16m: number;
}

interface Question {
  unit: string;
  marks: string;
  blooms_taxonomy_level: string;
  question_text: string;
}

interface Section {
  section_name: string;
  marks_per_question: number;
  questions: Question[];
}

interface GeneratedPaperResponse {
  sections: Section[];
}

interface Result {
  success: boolean;
  data?: GeneratedPaperResponse;
  error?: string;
}

/**
 * Validates and extracts form data with proper type checking
 */
function extractFormData(formData: FormData): {
  file: File;
  title: string;
  subtitle: string | null;
  date: string;
  units: number;
  distribution: QuestionDistribution;
} | { error: string } {
  const file = formData.get("file");
  const title = formData.get("title");
  const subtitle = formData.get("subtitle");
  const date = formData.get("date");
  const units = formData.get("units");
  const q2m = formData.get("q2m");
  const q4m = formData.get("q4m");
  const q8m = formData.get("q8m");
  const q16m = formData.get("q16m");

  // Validate required fields
  if (!file || !(file instanceof File)) {
    return { error: "PDF file is required" };
  }

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return { error: "Title is required" };
  }

  if (!date || typeof date !== "string" || date.trim().length === 0) {
    return { error: "Date is required" };
  }

  if (!units || typeof units !== "string") {
    return { error: "Units count is required" };
  }

  // Validate file type
  if (file.type !== PDF_MIME_TYPE && !file.name.toLowerCase().endsWith(".pdf")) {
    return { error: "File must be a PDF" };
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return { error: `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024}MB` };
  }

  // Parse and validate units
  const unitsNum = parseInt(units, 10);
  if (isNaN(unitsNum) || unitsNum <= 0) {
    return { error: "Units must be a positive integer" };
  }

  // Parse question distribution
  const parseQuestionCount = (value: FormDataEntryValue | null, fieldName: string): number => {
    if (!value || typeof value !== "string") return 0;
    const parsed = parseInt(value, 10);
    if (isNaN(parsed) || parsed < 0) {
      throw new Error(`${fieldName} must be a non-negative integer`);
    }
    return parsed;
  };

  try {
    const distribution: QuestionDistribution = {
      q2m: parseQuestionCount(q2m, "q2m"),
      q4m: parseQuestionCount(q4m, "q4m"),
      q8m: parseQuestionCount(q8m, "q8m"),
      q16m: parseQuestionCount(q16m, "q16m"),
    };

    // Validate that at least one question type is specified
    const totalQuestions = distribution.q2m + distribution.q4m + distribution.q8m + distribution.q16m;
    if (totalQuestions === 0) {
      return { error: "At least one question type must be specified" };
    }

    return {
      file,
      title: title.trim(),
      subtitle: subtitle && typeof subtitle === "string" ? subtitle.trim() : null,
      date: date.trim(),
      units: unitsNum,
      distribution,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Invalid question distribution values",
    };
  }
}

/**
 * Builds mark distribution text for the prompt
 */
function buildMarkDistribution(distribution: QuestionDistribution): string {
  const parts: string[] = [];

  if (distribution.q2m > 0) {
    parts.push(`${distribution.q2m} question${distribution.q2m !== 1 ? "s" : ""} of 2 marks`);
  }
  if (distribution.q4m > 0) {
    parts.push(`${distribution.q4m} question${distribution.q4m !== 1 ? "s" : ""} of 4 marks`);
  }
  if (distribution.q8m > 0) {
    parts.push(`${distribution.q8m} question${distribution.q8m !== 1 ? "s" : ""} of 8 marks`);
  }
  if (distribution.q16m > 0) {
    parts.push(`${distribution.q16m} question${distribution.q16m !== 1 ? "s" : ""} of 16 marks`);
  }

  return parts.length > 0 ? parts.join(", ") : "No questions specified";
}

/**
 * Gets the JSON schema for the AI response
 */
function getResponseJsonSchema() {
  return { type: "object", properties: { sections: { type: "array", items: { type: "object", properties: { section_name: { type: "string" }, marks_per_question: { type: "number" }, questions: { type: "array", items: { type: "object", properties: { unit: { type: "string" }, marks: { type: "string" }, blooms_taxonomy_level: { type: "string" }, question_text: { type: "string" } }, required: ["unit", "marks", "blooms_taxonomy_level", "question_text"] } } }, required: ["section_name", "marks_per_question", "questions"] } } }, required: ["sections"] };
}

/**
 * Builds the prompt for the AI model
 */
function buildPrompt(
  title: string,
  subtitle: string | null,
  date: string,
  units: number,
  markDistribution: string
): string {
 const subtitleText = subtitle ? `\n- Subtitle: ${subtitle}` : "";
  return `You are an expert academic curriculum designer. Generate a formal university exam paper based STRICTLY on the uploaded syllabus or document. Do not use external knowledge. Exam Metadata:Title: ${title}${subtitleText}Date: ${date}Total Units to Cover: ${units}Required Distribution: ${markDistribution}Strict Constraints:Grounding: Every question must be directly answerable using ONLY the provided text.Unit Mapping: Identify the ${units} units by analyzing the document's chapters, modules, or major headings. Distribute the generated questions evenly across these identified units.Cognitive Alignment: Map Bloom's Taxonomy to the mark weight. Low-mark questions must target 'Remember' or 'Understand'. High-mark questions must target 'Analyze', 'Evaluate', or 'Create'.Mathematical Accuracy: You MUST generate the exact quantity of questions requested for each mark category.Output Format: Group questions into Sections based on their mark value.`;
}

/**
 * Parses and validates the AI response
 */
function parseAIResponse(responseText: string): GeneratedPaperResponse {
  if (!responseText || typeof responseText !== "string") {
    throw new Error("Empty or invalid response from AI model");
  }

  const cleanedText = responseText.replace(/```json\n?|```/g, "").trim();

  if (!cleanedText) {
    throw new Error("Empty response after cleaning");
  }

  try {
    const parsed = JSON.parse(cleanedText) as GeneratedPaperResponse;

    if (!parsed || typeof parsed !== "object") {
      throw new Error("Invalid response format: expected an object");
    }

    if (!Array.isArray(parsed.sections)) {
      throw new Error("Invalid response format: sections must be an array");
    }

    for (const section of parsed.sections) {
      if (!section.section_name || typeof section.marks_per_question !== "number" || !Array.isArray(section.questions)) {
        throw new Error("Invalid section format: missing required fields");
      }

      for (const question of section.questions) {
        if (!question.unit || !question.marks || !question.blooms_taxonomy_level || !question.question_text) {
          throw new Error("Invalid question format: missing required fields");
        }
      }
    }

    return parsed;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Failed to parse JSON response: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Main function to generate exam paper using AI
 */
export async function generatePaper(formData: FormData): Promise<Result> {
  let localPath: string | null = null;

  try {
    // Extract and validate form data
    const extracted = extractFormData(formData);
    if ("error" in extracted) {
      return { success: false, error: extracted.error };
    }

    const { file, title, subtitle, date, units, distribution } = extracted;

    // Get API key from environment
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return { success: false, error: "GEMINI_API_KEY environment variable is not configured" };
    }

    // Create temporary directory if it doesn't exist (cross-platform)
    const tmpDir = tmpdir();
    if (!existsSync(tmpDir)) {
      await mkdir(tmpDir, { recursive: true });
    }

    // Save file to temporary location
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    localPath = join(tmpDir, fileName);

    await writeFile(localPath, buffer);

    // Initialize AI client
    const ai = new GoogleGenAI({ apiKey });

    // Upload file to Gemini
    const uploadedFile = await ai.files.upload({
      file: localPath,
      config: { mimeType: PDF_MIME_TYPE },
    });

    // Build prompt and generate content
    const markDistributionText = buildMarkDistribution(distribution);
    const prompt = buildPrompt(title, subtitle, date, units, markDistributionText);
    const jsonSchema = getResponseJsonSchema();

    const result = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        {
          role: "user",
          parts: [
            {
              fileData: {
                fileUri: uploadedFile.uri,
                mimeType: PDF_MIME_TYPE,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: jsonSchema,
      },
    });

    // Parse and validate response
    const responseText = result.text || "";
    const parsedJson = parseAIResponse(responseText);

    return { success: true, data: parsedJson };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred while generating the paper";
    console.error("Error generating paper:", errorMessage, error);

    return {
      success: false,
      error: errorMessage,
    };
  } finally {
    // Clean up temporary file
    if (localPath) {
      try {
        await unlink(localPath);
      } catch (cleanupError) {
        console.error("Failed to clean up temporary file:", cleanupError);
        // Don't throw - cleanup errors shouldn't fail the request
      }
    }
  }
}
