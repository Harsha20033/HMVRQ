# GenQ

GenQ is an enterprise-grade platform designed to revolutionize academic assessment creation. By leveraging high-context LLMs and native browser APIs, GenQ transforms massive, multi-unit syllabus PDFs into structured, Bloom's Taxonomy-aligned examination papers in seconds.

Designed with a strict, high-performance brutalist monochrome aesthetic, the platform offers both autonomous AI generation and a hands-free voice-dictation manual editor.

## 🚀 Core Capabilities

### 1. Cognitive AI Generation

**Massive Context Ingestion:** Upload entire 5-unit syllabus PDFs. The system utilizes advanced document parsing to read, understand, and structure the data without context loss.

**Intelligent Distribution:** Define precise parameters for 2-mark, 4-mark, 8-mark, and 16-mark questions. The AI dynamically balances the difficulty and unit coverage.

**Bloom's Taxonomy Alignment:** Every generated question is strictly categorized across cognitive domains (Remember, Understand, Apply, Analyze, Evaluate, Create) for rigorous academic compliance.

### 2. Hands-Free Manual Drafting

**Native Voice-to-Text:** Utilize browser-native speech recognition to dictate complex questions effortlessly.

**Rich Text Editing:** A deeply integrated TinyMCE editor allows for granular formatting, list structuring, and emphasis control.

### 3. Universal Export & Cloud Persistence

**Print-Ready PDFs:** Generate pixel-perfect, academically formatted PDFs directly from the browser using react-to-print.

**Highly Compatible DOCX:** Export complex HTML layouts into standard Word documents for final institutional tweaking.

**Relational Storage:** Every generated paper is securely persisted to a Supabase PostgreSQL database, ensuring historical records are never lost.

## 🏗️ Technical Architecture

GenQ is built on a modern, highly scalable edge architecture:

- **Framework:** Next.js 15 (App Router) for server-side rendering, optimized client components, and API route handling.
- **Language:** Strict TypeScript for end-to-end type safety and rapid refactoring.
- **Styling:** Tailwind CSS v4 running a custom, strictly controlled monochrome design system (background, foreground, card, border).
- **Animation:** Framer Motion for hardware-accelerated micro-interactions, layout transitions, and complex 3D scroll-linked animations.
- **Authentication:** Clerk for secure, drop-in user management and session persistence.
- **Database:** Supabase (PostgreSQL) for relational data modeling and fast, edge-cached queries.
- **AI Integration:** Google Gemini API for intelligent document parsing and structured JSON generation.

## 💻 Local Development Setup

Follow these instructions to run the GenQ orchestrator locally.

### Prerequisites

- Node.js 18.17 or later.
- A Clerk Account (for Auth).
- A Supabase Account (for PostgreSQL).
- A Google AI Studio Account (for the Gemini API Key).

### 1. Clone the Repository

```bash
git clone [repository-url]
cd GenQ
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory and populate it with the following required variables:

```env
--- SUPABASE DATABASE ---
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

--- AI INTEGRATION ---
GEMINI_API_KEY=your-gemini-api-key

--- MISCELLANEOUS ---
NEXT_PUBLIC_TINYMCE_API_KEY=your-tinymce-key
NEXT_PUBLIC_CONTACT_ME_URL=your-contact-url
```

### 4. Run the Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser. The application will immediately enforce Clerk authentication and route you to the marketing funnel.

## 🎨 Design System Constraints

GenQ enforces a strict Brutalist Monochrome aesthetic. If you are contributing, adhere to the following UI rules:

- **No Rogue Colors:** The UI relies entirely on standard variables (`bg-background`, `text-foreground`, `bg-card`, `border-border`). Do not introduce arbitrary HEX or RGB values into the components.

- **Structural Accents:** The Plus icon from lucide-react is used as a structural masking element on the corners of major command containers.

- **Typography:** Vercel's Geist is used for all UI elements. Playfair Display is strictly reserved for the output of the generated academic papers.

- **Motion:** Animations must be purposeful. Use fadeUp staggers for entering data and physical scale/translate states for hover interactions.

---

## 👨‍💻 Developer

**Shaik Raiyan** > Software Engineer

🌐 **Portfolio:** [http://shaikraiyan.me/](http://shaikraiyan.me/)

🔗 **LinkedIn:** [https://www.linkedin.com/in/shaik-raiyan](https://www.linkedin.com/in/shaik-raiyan)

🐙 **GitHub:** [https://github.com/SHAIK-RAIYAN](https://github.com/SHAIK-RAIYAN)
