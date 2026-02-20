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
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold">Create Manual Exam Paper</h1>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-border"
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
              className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-border"
              placeholder="Enter total marks"
              min="1"
            />
          </div>
        </div>

        <ManualEditor onChange={handleEditorChange} />

        {error && (
          <div className="mt-6 p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-md">
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="mt-6 p-4 bg-primary/10 text-primary border border-primary/20 rounded-md">
            <p>Paper saved successfully!</p>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => exportToWord(contentHtml, title || "manual-paper")}
            className="px-6 py-3 bg-secondary text-secondary-foreground border border-border rounded-lg hover:bg-secondary/80 transition-all font-medium"
          >
            Download DOCX
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Manual Paper"}
          </button>
        </div>
      </div>
    </div>
  );
}
