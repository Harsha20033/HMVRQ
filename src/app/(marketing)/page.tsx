"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import ThemeToggle from "@/components/ThemeToggle";
import { ArrowRight, Sparkles, Mic, FileText, Database, BrainCircuit } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const fadeUpTransition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

const containerTransition = {
  staggerChildren: 0.15,
  delayChildren: 0.1,
};

const featureItems: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  className?: string;
}[] = [
  {
    icon: Sparkles,
    title: "Cognitive AI Generation",
    description: "Ingest massive, multi-unit syllabus PDFs instantly. GenQ maps your exact requirements to output structured, mathematically precise exam papers in seconds.",
    className: "md:col-span-2 md:row-span-2 dark:bg-pink-800/50 hover:dark:bg-pink-800/70 bg-[radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))]  sm:mx-0 sm:rounded-2xl overflow-hidden",
  },
  {
    icon: Mic,
    title: "Voice Dictation",
    description: "Draft manual papers hands-free using native browser speech recognition.",
    className: "md:col-span-1 dark:bg-sky-900/50 hover:dark:bg-sky-900/70 bg-[radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))]  sm:mx-0 sm:rounded-2xl overflow-hidden",
  },
  {
    icon: FileText,
    title: "Universal Exports",
    description: "Download vector-sharp PDFs or highly compatible Word documents.",
    className: "md:col-span-1 dark:bg-indigo-800/50 hover:dark:bg-indigo-800/80 bg-[radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))]  sm:mx-0 sm:rounded-2xl overflow-hidden",
  },
  {
    icon: Database,
    title: "Cloud Persistence",
    description: "Relational database storage ensures you never lose a generated paper.",
    className: "md:col-span-1 dark:bg-green-900/50 hover:dark:bg-green-900/80 bg-[radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))]  sm:mx-0 sm:rounded-2xl overflow-hidden",
  },
  {
    icon: BrainCircuit,
    title: "Bloom's Taxonomy",
    description: "Force the AI to rigidly categorize every question across cognitive domains for academic compliance.",
    className: "md:col-span-2 dark:bg-yellow-600/50 hover:dark:bg-yellow-600/80 bg-[radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))]  sm:mx-0 sm:rounded-2xl overflow-hidden",
  },
];

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <header>
        <nav className="fixed top-6 inset-x-0 mx-auto max-w-5xl z-50 rounded-full border border-border/40 bg-background/40 backdrop-blur-md px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="text-xl font-bold">GenQ</div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-primary text-primary-foreground rounded-full px-5 py-2 text-sm font-medium hover:bg-primary/90 transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <button className="bg-primary text-primary-foreground rounded-full px-5 py-2 text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                  Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
      </header>

      <main className="pt-40 pb-20">
        <section className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={containerTransition}
          >
            <motion.div
              variants={fadeUp}
              transition={fadeUpTransition}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-8 border border-border"
            >
              <span className="absolute size-2 rounded-full bg-primary" />
              <span className="size-2 animate-ping rounded-full bg-primary" />
              <span>The Next Generation of Exam Generation</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={fadeUpTransition}
              className="text-6xl md:text-8xl font-bold tracking-tight mb-8 text-balance"
            >
              Generate Papers in Seconds, Not Hours.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={fadeUpTransition}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance"
            >
              Upload your syllabus once and let GenQ do the heavy lifting.
              Generate, refine, and export complete exam papers without leaving
              your browser.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={fadeUpTransition}
              className="flex items-center justify-center gap-4"
            >
              <SignedIn>
                <Link href="/dashboard">
                  <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-foreground px-8 py-4 text-lg font-medium text-background shadow-[0px_1px_1px_0px_rgba(255,255,255,0.1)_inset,0px_-1px_1px_0px_rgba(0,0,0,0.2)_inset] transition-all hover:scale-[1.02] hover:bg-foreground/90 dark:shadow-[0px_1px_1px_0px_rgba(255,255,255,0.15)_inset,0px_-1px_1px_0px_rgba(0,0,0,0.5)_inset] after:absolute after:inset-0 after:pointer-events-none after:content-[''] after:bg-[url('https://assets.aceternity.com/noise.webp')] after:opacity-[0.22] after:mix-blend-overlay border border-8">
                    <span className="relative z-10 flex items-center gap-2">
                      Enter Dashboard
                      <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </Link>
              </SignedIn>
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-foreground px-8 py-4 text-lg font-medium text-background shadow-[0px_1px_1px_0px_rgba(255,255,255,0.1)_inset,0px_-1px_1px_0px_rgba(0,0,0,0.2)_inset] transition-all hover:scale-[1.02] hover:bg-foreground/90 dark:shadow-[0px_1px_1px_0px_rgba(255,255,255,0.15)_inset,0px_-1px_1px_0px_rgba(0,0,0,0.5)_inset] after:absolute after:inset-0 after:pointer-events-none after:content-[''] after:bg-[url('https://assets.aceternity.com/noise.webp')] after:opacity-[0.22] after:mix-blend-overlay">
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started Free
                      <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </SignUpButton>
              </SignedOut>
              {/* <button className="inline-flex items-center justify-center rounded-full border border-border bg-background px-8 py-4 text-lg font-medium text-foreground transition-all hover:bg-secondary hover:text-secondary-foreground">
                View Demo
              </button> */}
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ ...fadeUpTransition, delay: 0.2 }}
              className="mt-20 rounded-2xl border border-border bg-card shadow-2xl overflow-hidden aspect-video max-w-5xl mx-auto relative"
            >
              <div className="h-12 border-b border-border flex items-center px-4 gap-2">
                <div className="size-3 rounded-full bg-red-500" />
                <div className="size-3 rounded-full bg-yellow-500" />
                <div className="size-3 rounded-full bg-green-500" />
              </div>
              <div className="w-full h-full flex items-center justify-center bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
                <p className="text-sm md:text-base text-muted-foreground">
                  Dashboard Interface Preview
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="py-24 mt-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featureItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ ...fadeUpTransition, delay: index * 0.1 }}
                  className={`bg-card p-8 border-8 dark:border-0 rounded-2xl  shadow-lg hover:shadow-primary/10 duration-300 h-full text-left flex flex-col justify-center ${item.className || ""}`}

                  
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold ">{item.title}</h3>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 max-w-6xl mx-auto px-6 space-y-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={fadeUpTransition}
              className="text-left space-y-4"
            >
              
              <h2 className="text-3xl md:text-4xl font-semibold">
                Cognitive AI Syllabus Parsing
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                GenQ uses a 1-million token context window to ingest entire
                syllabus PDFs in one pass, preserving structure, hierarchy, and
                nuance. No manual splitting, no truncation, and no context loss.
              </p>
              <ul className="mt-4 space-y-2 text-sm md:text-base text-muted-foreground list-disc list-inside">
                <li>Bloom&apos;s Taxonomy alignment for every question.</li>
                <li>Precise unit targeting from a single consolidated upload.</li>
                <li>Automatic sectioning by marks, units, and difficulty.</li>
              </ul>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...fadeUpTransition, delay: 0.2 }}
            >
              <div className="aspect-square md:aspect-[4/3] rounded-2xl border border-border bg-muted overflow-hidden relative flex items-center justify-center">
                <span className="text-sm md:text-base text-muted-foreground">
                  Light/Dark Screenshot 1
                </span>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...fadeUpTransition, delay: 0.2 }}
              className="order-2 md:order-1"
            >
              <div className="aspect-square md:aspect-[4/3] rounded-2xl border border-border bg-muted overflow-hidden relative flex items-center justify-center">
                <span className="text-sm md:text-base text-muted-foreground">
                  Light/Dark Screenshot 2
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={fadeUpTransition}
              className="order-1 md:order-2 text-left space-y-4"
            >
              <h2 className="text-3xl md:text-4xl font-semibold">
                Hands-Free Manual Generation
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                Combine native browser voice-to-text with a TinyMCE-powered rich
                text editor to draft complete exam papers without touching the
                keyboard. Edit, structure, and finalize everything in one place.
              </p>
              <ul className="mt-4 space-y-2 text-sm md:text-base text-muted-foreground list-disc list-inside">
                <li>Voice-driven drafting for rapid question creation.</li>
                <li>Full formatting control with headings, lists, and emphasis.</li>
                <li>Seamless transition from freeform text to structured papers.</li>
              </ul>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 bg-background pt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
          <div className="space-y-3">
            <div className="text-lg font-semibold">GenQ</div>
            <p className="text-sm text-muted-foreground max-w-md">
              Enterprise-grade exam generation for modern educators.
            </p>
            <a
              href={process.env.NEXT_PUBLIC_CONTACT_ME_URL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 px-6 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              Contact Developer
            </a>
          </div>

          <div className="mt-12 w-full flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground border-t border-border/40 pt-8 pb-8 gap-4">
            <span>
              © {new Date().getFullYear()} GenQ. All rights reserved.
            </span>
            <span>Built for instructors, departments, and entire institutions.</span>
          </div>

          <div className="relative w-full  flex justify-center -mb-4 pointer-events-none select-none">
            <h1 className="text-[20vw] font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-linear-to-b from-muted-foreground/20 to-background ">
              GEN<span className="bg-clip-text bg-linear-to-t from-muted-foreground to-background">Q</span>
              
            </h1>
          </div>
        </div>
      </footer>
    </div>
  );
}