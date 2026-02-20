"use client";

import { useState } from "react";
import { ManualEditor } from "@/components/dashboard/ManualEditor";
import { saveManualPaperToDatabase } from "@/actions/saveManualPaper";
import { exportToWord } from "@/lib/exportUtils";

export default function ManualPage() {
  const [title, setTitle] = useState<string>("");
  const [totalMarks, setTotalMarks] = useState<number>(0);
  const [contentHtml, setContentHtml] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleEditorChange = (html: string) => {
    setContentHtml(html);
  };

  const handleSave = async () => {
    if (!title.trim() || totalMarks <= 0 || !contentHtml.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await saveManualPaperToDatabase(title, totalMarks, contentHtml);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save paper");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Create Manual Exam Paper</h1>

      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter exam paper title"
          />
        </div>

        <div>
          <label htmlFor="totalMarks" className="block text-sm font-medium mb-2">
            Total Marks
          </label>
          <input
            id="totalMarks"
            type="number"
            value={totalMarks || ""}
            onChange={(e) => setTotalMarks(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter total marks"
            min="1"
          />
        </div>
      </div>

      <ManualEditor onChange={handleEditorChange} />

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-800">Paper saved successfully!</p>
        </div>
      )}

      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={() => exportToWord(contentHtml, title || "manual-paper")}
          className="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
        >
          Download DOCX
        </button>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : "Save Manual Paper"}
        </button>
      </div>
    </div>
  );
}
