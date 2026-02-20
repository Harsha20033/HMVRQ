"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Mic, ArrowRight, History } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Create Exam Papers
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Choose your preferred method to generate professional exam papers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link href="/generate">
              <div className="group relative h-full bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-primary/5 text-primary rounded-lg p-3">
                      <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Generate with AI
                    </h2>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Upload your syllabus PDF and let AI generate comprehensive exam questions
                    based on your specifications. Perfect for quick, structured paper creation.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      <span>5-unit PDF syllabus ingestion</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      <span>Automatic question generation</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      <span>Bloom's taxonomy alignment</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    <span>Get started</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link href="/manual">
              <div className="group relative h-full bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-primary/5 text-primary rounded-lg p-3">
                      <Mic className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Manually Create
                    </h2>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Build your exam paper from scratch using our rich text editor with
                    voice-typing capabilities. Full control over every question and format.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      <span>Voice-typing rich text editor</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      <span>Real-time formatting controls</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      <span>Complete customization</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    <span>Get started</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link href="/history">
              <div className="group relative h-full bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-primary/5 text-primary rounded-lg p-3">
                      <History className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      History & Exports
                    </h2>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    View, manage, and download your previously generated AI and manual exam papers in PDF and DOCX formats.
                  </p>

                  <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    <span>View history</span>
                    <ArrowRight className="w-5 h-5" />
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
