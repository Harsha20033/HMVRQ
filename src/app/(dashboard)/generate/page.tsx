"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generatePaper } from "@/actions/generatePaper";
import { ExamPaperView } from "@/components/dashboard/ExamPaperView";
import { GoogleGenAI } from "@google/genai";

const formSchema = z.object({
  file: z.any().refine((file) => file instanceof File, {
    message: "File is required",
  }),
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  units: z.number().int().positive("Units must be a positive integer"),
  q2m: z.number().int().min(0),
  q4m: z.number().int().min(0),
  q8m: z.number().int().min(0),
  q16m: z.number().int().min(0),
});

type FormData = z.infer<typeof formSchema>;

export default function GeneratePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState<string>("");
  const [formSubtitle, setFormSubtitle] = useState<string>("");
  const [formDate, setFormDate] = useState<string>("");
  const [totalMarks, setTotalMarks] = useState<number>(0);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const [models, setModels] = useState<any>(null);


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      q2m: 0,
      q4m: 0,
      q8m: 0,
      q16m: 0,
      date: new Date().toISOString().split('T')[0],
    },
  });

  const watchedUnits = watch("units");
  const selectedFile = watch("file");

  useEffect(() => {
    if (selectedFile && selectedFile instanceof File) {
      const url = URL.createObjectURL(selectedFile);
      setPdfUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPdfUrl(null);
    }
  }, [selectedFile]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const calculatedTotalMarks =
      data.q2m * 2 + data.q4m * 4 + data.q8m * 8 + data.q16m * 16;

    setFormTitle(data.title);
    setFormSubtitle(data.subtitle || "");
    setFormDate(data.date);
    setTotalMarks(calculatedTotalMarks);

    try {
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("title", data.title);
      if (data.subtitle) {
        formData.append("subtitle", data.subtitle);
      }
      formData.append("date", data.date);
      formData.append("units", data.units.toString());
      formData.append("q2m", data.q2m.toString());
      formData.append("q4m", data.q4m.toString());
      formData.append("q8m", data.q8m.toString());
      formData.append("q16m", data.q16m.toString());

      const response = await generatePaper(formData);

      console.log(response);

      if (response.error) {
        setError(response.error);
      } else if (response.success) {
        setResult(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  
  // useEffect(() => {
  //   const fetchModels = async () => {
  //     try {
  //       const apiKey = ``; // use env variable

  //       if (!apiKey) {
  //         console.error("GEMINI_API_KEY not configured");
  //         return;
  //       }

  //       const ai = new GoogleGenAI({ apiKey });

  //       const response = await ai.models.list();

  //       setModels(response.models || response); // depending on SDK version
  //       console.log(response);
  //     } catch (error) {
  //       console.error("Error fetching models:", error);
  //     }
  //   };

  //   fetchModels();
  // }, []);


  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">Generate Exam Paper with AI</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Document Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="file" className="block text-sm font-medium mb-2">
                PDF File
              </label>
              <input
                id="file"
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setValue("file", file, { shouldValidate: true });
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.file && (
                <p className="mt-1 text-sm text-red-600">{errors.file.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Title *
              </label>
              <input
                id="title"
                type="text"
                {...register("title")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="subtitle" className="block text-sm font-medium mb-2">
                Subtitle (Optional)
              </label>
              <input
                id="subtitle"
                type="text"
                {...register("subtitle")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.subtitle && (
                <p className="mt-1 text-sm text-red-600">{errors.subtitle.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-2">
                Date *
              </label>
              <input
                id="date"
                type="date"
                {...register("date")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date.message as string}</p>
              )}
            </div>
          </div>
        </div>

       

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Exam Parameters</h2>
          <div>
            <label htmlFor="units" className="block text-sm font-medium mb-2">
              Total Units *
            </label>
            <input
              id="units"
              type="number"
              {...register("units", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.units && (
              <p className="mt-1 text-sm text-red-600">{errors.units.message as string}</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Question Distribution</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="q2m" className="block text-sm font-medium mb-2">
                2 Mark Questions
              </label>
              <input
                id="q2m"
                type="number"
                {...register("q2m", { valueAsNumber: true })}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.q2m && (
                <p className="mt-1 text-sm text-red-600">{errors.q2m.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="q4m" className="block text-sm font-medium mb-2">
                4 Mark Questions
              </label>
              <input
                id="q4m"
                type="number"
                {...register("q4m", { valueAsNumber: true })}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.q4m && (
                <p className="mt-1 text-sm text-red-600">{errors.q4m.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="q8m" className="block text-sm font-medium mb-2">
                8 Mark Questions
              </label>
              <input
                id="q8m"
                type="number"
                {...register("q8m", { valueAsNumber: true })}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.q8m && (
                <p className="mt-1 text-sm text-red-600">{errors.q8m.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="q16m" className="block text-sm font-medium mb-2">
                16 Mark Questions
              </label>
              <input
                id="q16m"
                type="number"
                {...register("q16m", { valueAsNumber: true })}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.q16m && (
                <p className="mt-1 text-sm text-red-600">{errors.q16m.message as string}</p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isLoading ? (
            <span>
              Processing {watchedUnits ? `${watchedUnits}-Unit ` : ""}Syllabus...
            </span>
          ) : (
            "Generate Paper"
          )}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      )}

          {result && formTitle && totalMarks > 0 && (
            <ExamPaperView
              jsonData={result}
              title={formTitle}
              subtitle={formSubtitle}
              date={formDate}
              totalMarks={totalMarks}
            />
          )} 
        </div>

        <div className="sticky top-8">
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              className="w-full h-[800px] border border-gray-300 rounded-xl shadow-sm"
              title="PDF Preview"
            />
          ) : (
            <div className="w-full h-[800px] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
              <p className="text-gray-500 text-center px-4">
                Upload a PDF file to preview it here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
