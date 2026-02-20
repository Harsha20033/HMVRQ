"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Mic, ArrowRight, History, Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen text-foreground p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="relative border border-border p-8 md:p-20 text-center flex flex-col items-center justify-center">
          <Plus className="absolute size-6 text-muted-foreground bg-background stroke-[1.5] -top-3 -left-3" />
          <Plus className="absolute size-6 text-muted-foreground bg-background stroke-[1.5] -top-3 -right-3" />
          <Plus className="absolute size-6 text-muted-foreground bg-background stroke-[1.5] -bottom-3 -left-3" />
          <Plus className="absolute size-6 text-muted-foreground bg-background stroke-[1.5] -bottom-3 -right-3" />

          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 text-xs font-medium text-secondary-foreground mb-8">
            <span className="relative flex size-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex size-1.5 rounded-full bg-primary"></span>
            </span>
            Systems Operational
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
            The complete platform for{" "}
            <br className="hidden md:block" />
            examination intelligence.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Select a workflow below to begin orchestrating, generating, and exporting your academic materials.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            className="box-border"
          >
            <Link href="/generate" className="block h-full">
              <div className="group relative h-full  p-[2px] transition-all duration-300 box-border">
                <div className="absolute inset-0  bg-linear-to-r from-[#0894FF] via-[#C959DD] to-[#FF9004] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60" />
                <div className="absolute inset-0  bg-linear-to-r from-[#0894FF] via-[#C959DD] to-[#FF9004] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 flex h-full min-h-[380px] flex-col  bg-card border border-border p-8 lg:p-10 transition-colors duration-300 group-hover:border-transparent">
                  <div className="flex items-center gap-4 mb-6">
                  <Plus className="absolute size-6 text-muted-foreground bg-transparent stroke-[1.5] -top-3 -left-3" />
          <Plus className="absolute size-6 text-muted-foreground bg-transparent stroke-[1.5] -top-3 -right-3" />
          <Plus className="absolute size-6 text-muted-foreground bg-transparent stroke-[1.5] -bottom-3 -left-3" />
          <Plus className="absolute size-6 text-muted-foreground bg-transparent stroke-[1.5] -bottom-3 -right-3" />
                    <div className="bg-primary/5 text-primary rounded-lg p-3">
                      <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">Generate with AI</h2>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Upload your syllabus PDF and let AI generate comprehensive exam questions
                    based on your specifications. Perfect for quick, structured paper creation.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>5-unit PDF syllabus ingestion</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Automatic question generation</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Bloom&apos;s taxonomy alignment</span>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center gap-2 text-foreground font-medium">
                    <span>Get started</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            
            
          >
            <Link href="/manual" className="block h-full">
              <div className="group relative h-full  p-[2px] transition-all duration-300 box-border">
                <div className="absolute inset-0  bg-linear-to-r from-[#0894FF] via-[#C959DD] to-[#FF9004] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60" />
                <div className="absolute inset-0  bg-linear-to-r from-[#0894FF] via-[#C959DD] to-[#FF9004] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 flex h-full min-h-[380px] flex-col  bg-card border border-border p-8 lg:p-10 transition-colors duration-300 group-hover:border-transparent">
                  <div className="flex items-center gap-4 mb-6">
                  <Plus className="absolute size-6 text-muted-foreground bg-transparent stroke-[1.5] -top-3 -left-3" />
          <Plus className="absolute size-6 text-muted-foreground bg-transparent stroke-[1.5] -top-3 -right-3" />
          <Plus className="absolute size-6 text-muted-foreground bg-transparent stroke-[1.5] -bottom-3 -left-3" />
          <Plus className="absolute size-6 text-muted-foreground bg-transparent stroke-[1.5] -bottom-3 -right-3" />
                    <div className="bg-primary/5 text-primary rounded-lg p-3">
                      <Mic className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">Manually Create</h2>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Build your exam paper from scratch using our rich text editor with
                    voice-typing capabilities. Full control over every question and format.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Voice-typing rich text editor</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Real-time formatting controls</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Complete customization</span>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center gap-2 text-foreground font-medium">
                    <span>Get started</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            
          >
            <Link href="/history" className="block h-full">
              <div className="group relative h-full  p-[2px] transition-all duration-300 box-border">
                <div className="absolute inset-0  bg-linear-to-r from-[#0894FF] via-[#C959DD] to-[#FF9004] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60" />
                <div className="absolute inset-0  bg-linear-to-r from-[#0894FF] via-[#C959DD] to-[#FF9004] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 flex h-full min-h-[380px] flex-col  bg-card border border-border p-8 lg:p-10 transition-colors duration-300 group-hover:border-transparent">
                  <div className="flex items-center gap-4 mb-6">
                  <Plus className="absolute size-6 text-muted-foreground bg-transparent stroke-[1.5] -top-3 -left-3" />
          <Plus className="absolute size-6 text-muted-foreground bg-transparent stroke-[1.5] -top-3 -right-3" />
          <Plus className="absolute size-6 text-muted-foreground bg-transparent stroke-[1.5] -bottom-3 -left-3" />
          <Plus className="absolute size-6 text-muted-foreground bg-transparent stroke-[1.5] -bottom-3 -right-3" />
                    <div className="bg-primary/5 text-primary rounded-lg p-3">
                      <History className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">History &amp; Exports</h2>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    View, manage, and download your previously generated AI and manual exam papers in PDF and DOCX formats.
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-foreground font-medium">
                    <span>View history</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
