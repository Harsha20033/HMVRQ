"use client";

import { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Trash2, Eye, FileText, Download } from "lucide-react";
import { deleteUserPaper } from "@/actions/deletePaper";
import { exportToWord } from "@/lib/exportUtils";

interface Question {
  id: string;
  paper_id: string;
  unit_number: number;
  marks: number;
  blooms_level: string;
  question_text: string;
}

interface Paper {
  id: string;
  teacher_id: string;
  title: string;
  subtitle?: string;
  total_marks: number;
  created_at: string;
  content_html?: string;
  questions: Question[];
}

interface HistoryClientProps {
  initialPapers: Paper[];
}

export function HistoryClient({ initialPapers }: HistoryClientProps) {
  const [papers, setPapers] = useState<Paper[]>(initialPapers);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [printPaper, setPrintPaper] = useState<Paper | null>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const handlePrintAction = useReactToPrint({
    contentRef: printRef,
    onAfterPrint: () => setPrintPaper(null),
  });

  useEffect(() => {
    if (printPaper) {
      handlePrintAction();
    }
  }, [printPaper, handlePrintAction]);

  const handleDelete = async (paperId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this paper?");
    if (!confirmed) return;

    try {
      await deleteUserPaper(paperId);
      setPapers(papers.filter((p) => p.id !== paperId));
    } catch (error) {
      console.error("Failed to delete paper:", error);
      alert(error instanceof Error ? error.message : "Failed to delete paper");
    }
  };

  const handleView = (paper: Paper) => {
    setSelectedPaper(paper);
  };

  const handleDownloadPDF = (paper: Paper) => {
    setPrintPaper(paper);
  };

  const handleDownloadDOCX = (paper: Paper) => {
    if (paper.content_html) {
      exportToWord(paper.content_html, paper.title);
      return;
    }

    const groupedByMarks: Record<number, Question[]> = {};
    paper.questions.forEach((question) => {
      const key = question.marks;
      if (!groupedByMarks[key]) {
        groupedByMarks[key] = [];
      }
      groupedByMarks[key].push(question);
    });

    let html = `<h1 style="text-align:center">${paper.title}</h1>`;
    if (paper.subtitle) {
      html += `<h2 style="text-align:center">${paper.subtitle}</h2>`;
    }
    html += `<p>Total Marks: ${paper.total_marks}</p>`;

    const marksGroups = Object.keys(groupedByMarks)
      .map((key) => Number(key))
      .sort((a, b) => a - b);

    marksGroups.forEach((marks) => {
      html += `<h3>Section (${marks} Marks)</h3><ul>`;
      groupedByMarks[marks].forEach((question) => {
        html += `<li>${question.question_text}</li>`;
      });
      html += `</ul>`;
    });

    exportToWord(html, paper.title);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {papers.map((paper) => (
          <div
            key={paper.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-3">{paper.title}</h2>
            <p className="text-gray-600 mb-2">Total Marks: {paper.total_marks}</p>
            <p className="text-sm text-gray-500 mb-4">
              Created: {formatDate(paper.created_at)}
            </p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleView(paper)}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                <Eye size={16} />
                View
              </button>
              <button
                onClick={() => handleDownloadPDF(paper)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
              >
                <FileText size={16} />
                Download PDF
              </button>
              <button
                onClick={() => handleDownloadDOCX(paper)}
                className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
              >
                <Download size={16} />
                Download DOCX
              </button>
              <button
                onClick={() => handleDelete(paper.id)}
                className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
        {papers.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No papers found. Generate your first paper to see it here.
          </div>
        )}
      </div>
      {selectedPaper && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 print:p-0 print:bg-white print:static print:z-[9999]">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 print:shadow-none print:max-w-none print:max-h-none print:overflow-visible print:p-0">
            <div className="flex justify-end mb-4 print:hidden">
              <button
                onClick={() => setSelectedPaper(null)}
                className="text-gray-500 hover:text-gray-800 font-medium"
              >
                Close
              </button>
            </div>
            {selectedPaper.content_html ? (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedPaper.content_html }}
              />
            ) : (
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h1 className="text-3xl font-bold mb-2 text-center">
                    {selectedPaper.title}
                  </h1>
                  {selectedPaper.subtitle && (
                    <p className="text-lg text-center text-gray-600 mb-1">
                      {selectedPaper.subtitle}
                    </p>
                  )}
                  <p className="text-center text-gray-700">
                    Total Marks: {selectedPaper.total_marks}
                  </p>
                </div>
                {(() => {
                  const groupedByMarks: Record<number, Question[]> = {};
                  selectedPaper.questions.forEach((question) => {
                    const key = question.marks;
                    if (!groupedByMarks[key]) {
                      groupedByMarks[key] = [];
                    }
                    groupedByMarks[key].push(question);
                  });
                  const marksGroups = Object.keys(groupedByMarks)
                    .map((key) => Number(key))
                    .sort((a, b) => a - b);
                  return marksGroups.map((marks) => (
                    <div key={marks} className="space-y-3">
                      <h2 className="text-2xl font-semibold">
                        Section ({marks} Marks)
                      </h2>
                      <ul className="list-decimal list-inside space-y-2">
                        {groupedByMarks[marks].map((question) => (
                          <li key={question.id} className="text-gray-800 leading-relaxed">
                            {question.question_text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ));
                })()}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="hidden">
        <div
          ref={printRef}
          className="p-12 bg-white text-black"
          style={{ fontFamily: "'Times New Roman', 'Georgia', serif" }}
        >
          {printPaper && (
            <>
              <div className="mb-8 border-b-2 border-gray-800 pb-4">
                <h1 className="text-4xl font-bold mb-2" style={{ color: "#111827" }}>
                  {printPaper.title}
                </h1>
                {printPaper.subtitle && (
                  <p className="text-2xl text-gray-700 mb-2">{printPaper.subtitle}</p>
                )}
                <div className="flex gap-4 text-lg text-gray-700">
                  <p>Date: {formatDate(printPaper.created_at)}</p>
                  <p>Total Marks: {printPaper.total_marks}</p>
                </div>
              </div>
              {printPaper.content_html ? (
                <div dangerouslySetInnerHTML={{ __html: printPaper.content_html }} />
              ) : (
                <div className="space-y-8">
                  {(() => {
                    const groupedByMarks: Record<number, Question[]> = {};
                    printPaper.questions.forEach((question) => {
                      const key = question.marks;
                      if (!groupedByMarks[key]) {
                        groupedByMarks[key] = [];
                      }
                      groupedByMarks[key].push(question);
                    });
                    const marksGroups = Object.keys(groupedByMarks)
                      .map((key) => Number(key))
                      .sort((a, b) => a - b);
                    let questionNumber = 1;
                    return marksGroups.map((marks) => (
                      <div key={marks} className="mb-8">
                        <h2
                          className="text-2xl font-semibold mb-4 border-b pb-2"
                          style={{ color: "#111827", borderBottomColor: "#d1d5db" }}
                        >
                          Section ({marks} Marks)
                        </h2>
                        <div className="space-y-6">
                          {groupedByMarks[marks].map((question) => {
                            const currentNumber = questionNumber++;
                            return (
                              <div
                                key={question.id}
                                className="mb-6 pb-4 border-b border-gray-200"
                              >
                                <div className="flex items-start gap-3">
                                  <span
                                    className="text-lg font-semibold min-w-[2rem]"
                                    style={{ color: "#1f2937" }}
                                  >
                                    {currentNumber}.
                                  </span>
                                  <div className="flex-1">
                                    <p
                                      className="text-base leading-relaxed mb-2"
                                      style={{ color: "#1f2937" }}
                                    >
                                      {question.question_text}
                                    </p>
                                    <div className="flex gap-4 text-sm mt-2" style={{ color: "#4b5563" }}>
                                      <span>
                                        <strong>Unit:</strong> {question.unit_number}
                                      </span>
                                      <span>
                                        <strong>Marks:</strong> {question.marks}
                                      </span>
                                      <span>
                                        <strong>Bloom's Level:</strong> {question.blooms_level}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
