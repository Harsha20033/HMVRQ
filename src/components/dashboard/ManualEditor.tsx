"use client";

import { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Mic } from "lucide-react";
import { useVoiceToText } from "@/hooks/useVoiceToText";

interface ManualEditorProps {
  onChange?: (html: string) => void;
}

export function ManualEditor({ onChange }: ManualEditorProps) {
  const { isListening, startListening, stopListening, text } = useVoiceToText();
  const editorRef = useRef<any>(null);
  const previousTextRef = useRef("");

  useEffect(() => {
    if (editorRef.current && text && text !== previousTextRef.current) {
      editorRef.current.insertContent(text.trim() + " ");
      previousTextRef.current = text;
    }
  }, [text]);

  const toggleVoice = () => {
    if (isListening) {
      stopListening();
      previousTextRef.current = "";
    } else {
      previousTextRef.current = "";
      startListening();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
      <div>
        <button
          onClick={toggleVoice}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            isListening
              ? "bg-red-500 text-white animate-pulse"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Mic className="w-4 h-4" />
          Voice Type
        </button>
      </div>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || "no-api-key"}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        onEditorChange={(content) => {
          if (onChange) onChange(content);
        }}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
        }}
      />
    </div>
  );
}
