"use client";

import { useState } from "react";
import { ManualEditor } from "@/components/dashboard/ManualEditor";
import { saveManualPaperToDatabase } from "@/actions/saveManualPaper";
import { exportToWord } from "@/lib/exportUtils";
import { Plus } from "lucide-react";

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
    <div className="min-h-screen text-foreground p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Manual Generation</h1>

        <div className="relative border border-border bg-card p-8 md:p-12 space-y-12">
          <Plus className="absolute size-6 text-muted-foreground bg-card stroke-[1.5] -top-3 -left-3" />
          <Plus className="absolute size-6 text-muted-foreground bg-card stroke-[1.5] -top-3 -right-3" />
          <Plus className="absolute size-6 text-muted-foreground bg-card stroke-[1.5] -bottom-3 -left-3" />
          <Plus className="absolute size-6 text-muted-foreground bg-card stroke-[1.5] -bottom-3 -right-3" />

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-border py-2 px-0 text-foreground focus:ring-0 focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
                placeholder="Enter exam paper title"
              />
            </div>

            <div>
              <label htmlFor="totalMarks" className="block text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                Total Marks
              </label>
              <input
                id="totalMarks"
                type="number"
                value={totalMarks || ""}
                onChange={(e) => setTotalMarks(parseInt(e.target.value) || 0)}
                className="w-full bg-transparent border-0 border-b border-border py-2 px-0 text-foreground focus:ring-0 focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
                placeholder="Enter total marks"
                min="1"
              />
            </div>
          </div>

          <ManualEditor onChange={handleEditorChange} />

          {error && (
            <div className="mt-8 p-4 bg-destructive/10 text-destructive border-l-4 border-destructive">
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="mt-8 p-4 bg-primary/10 text-primary border-l-4 border-primary">
              <p>Paper saved successfully!</p>
            </div>
          )}

          <div className="mt-12 flex flex-col sm:flex-row justify-end gap-4">
            <button
              onClick={() => exportToWord(contentHtml, title || "manual-paper")}
              className="px-8 py-4 border border-border bg-background text-foreground text-lg font-medium transition-all hover:bg-secondary"
            >
              Download DOCX
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-8 py-4 bg-foreground text-background text-lg font-medium transition-all hover:scale-[1.02] hover:bg-foreground/90 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Manual Paper"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
