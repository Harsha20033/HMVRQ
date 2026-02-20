"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import ThemeToggle from "@/components/ThemeToggle";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground transition-colors duration-300 relative overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-50">
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">GenQ</div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="px-4 py-2 text-gray-900 dark:text-white hover:text-muted-foreground transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors font-medium">
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 text-gray-900 dark:text-white hover:text-muted-foreground transition-colors"
                  >
                    Dashboard
                  </Link>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              Create Exam Papers
              <span className="block text-muted-foreground mt-2">with AI Power</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Transform your syllabus into comprehensive exam papers. Generate
              questions automatically or craft them manually with our voice-enabled
              editor.
            </motion.p>

            <motion.div variants={itemVariants} className="pt-4">
              <SignedIn>
                <Link href="/dashboard">
                  <button className="px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg transform hover:scale-105">
                    Enter Dashboard
                  </button>
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg transform hover:scale-105">
                    Get Started for Free
                  </button>
                </SignInButton>
              </SignedOut>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
