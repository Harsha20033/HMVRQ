"use client";

import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { motion } from "framer-motion";
import { savePaperToDatabase } from "@/actions/savePaper";

interface ExamPaperViewProps {
  jsonData: {
    sections: Array<{
      section_name: string;
      marks_per_question: number;
      questions: Array<{
        unit: number;
        marks: number;
        blooms_taxonomy_level: string;
        question_text: string;
      }>;
    }>;
  };
  title: string;
  subtitle: string;
  date: string;
  totalMarks: number;
}

export function ExamPaperView({
  jsonData,
  title,
  subtitle,
  date,
  totalMarks,
}: ExamPaperViewProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveToDatabase = async () => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      await savePaperToDatabase(jsonData, title, totalMarks);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };


  return (
    <div className="relative min-h-screen bg-gray-50 pb-32">
      <div
        ref={contentRef}
        className="mx-auto max-w-4xl bg-white shadow-lg p-12 print:shadow-none print:p-8 print:w-full print:m-0 print:max-w-none"
        style={{
          fontFamily: "'Times New Roman', 'Georgia', serif",
          backgroundColor: "#ffffff",
          color: "#111827",
        }}
      >
        <div className="mb-8 border-b-2 border-gray-800 pb-4">
          <h1 className="text-4xl font-bold mb-2" style={{ color: "#111827" }}>{title}</h1>
          <p className="text-2xl text-gray-700 mb-2">{subtitle}</p>
          <div className="flex gap-4 text-lg text-gray-700">
            <p>Date: {date}</p>
            <p>Total Marks: {totalMarks}</p>
          </div>
        </div>

        <div className="space-y-8">
          {jsonData.sections.map((section, sectionIndex) => {
            const previousQuestionsCount = jsonData.sections
              .slice(0, sectionIndex)
              .reduce((sum, sec) => sum + sec.questions.length, 0);

            return (
              <div key={sectionIndex} className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2" style={{ color: "#111827", borderBottomColor: "#d1d5db" }}>
                  {section.section_name}
                </h2>
                <div className="space-y-6">
                  {section.questions.map((question, questionIndex) => {
                    const globalQuestionNumber =
                      previousQuestionsCount + questionIndex + 1;

                    return (
                      <div
                        key={questionIndex}
                        className="mb-6 pb-4 border-b border-gray-200"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-lg font-semibold min-w-[2rem]" style={{ color: "#1f2937" }}>
                            {globalQuestionNumber}.
                          </span>
                          <div className="flex-1">
                            <p className="text-base leading-relaxed mb-2" style={{ color: "#1f2937" }}>
                              {question.question_text}
                            </p>
                            <div className="flex gap-4 text-sm mt-2" style={{ color: "#4b5563" }}>
                              <span>
                                <strong>Unit:</strong> {question.unit}
                              </span>
                              <span>
                                <strong>Marks:</strong> {question.marks}
                              </span>
                              <span>
                                <strong>Bloom's Level:</strong>{" "}
                                {question.blooms_taxonomy_level}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 print:hidden"
      >
        <div className="flex gap-4 px-6 py-4 rounded-2xl backdrop-blur-md bg-white/80 border border-orange-200/50 shadow-xl">
          {saveError && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-red-100 border border-red-300 rounded-lg text-red-800 text-sm whitespace-nowrap">
              {saveError}
            </div>
          )}
          {saveSuccess && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-100 border border-green-300 rounded-lg text-green-800 text-sm whitespace-nowrap">
              Paper saved successfully!
            </div>
          )}
          <button
            onClick={() => handlePrint()}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Download PDF
          </button>
          <button
            onClick={handleSaveToDatabase}
            disabled={isSaving}
            className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save to Database"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
