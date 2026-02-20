
```
genq
├─ components.json
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ src
│  ├─ actions
│  │  ├─ deletePaper.ts
│  │  ├─ generatePaper.ts
│  │  ├─ getHistory.ts
│  │  ├─ saveManualPaper.ts
│  │  ├─ savePaper.ts
│  │  └─ syncUser.ts
│  ├─ app
│  │  ├─ (dashboard)
│  │  │  ├─ dashboard
│  │  │  │  └─ page.tsx
│  │  │  ├─ generate
│  │  │  │  └─ page.tsx
│  │  │  ├─ history
│  │  │  │  └─ page.tsx
│  │  │  ├─ layout.tsx
│  │  │  └─ manual
│  │  │     └─ page.tsx
│  │  ├─ (marketing)
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.tsx
│  │  │  ├─ sign-in
│  │  │  │  └─ [[...sign-in]]
│  │  │  │     └─ page.tsx
│  │  │  └─ sign-up
│  │  │     └─ [[...sign-up]]
│  │  │        └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  └─ layout.tsx
│  ├─ components
│  │  ├─ dashboard
│  │  │  ├─ ExamPaperView.tsx
│  │  │  ├─ HistoryClient.tsx
│  │  │  ├─ ManualEditor.tsx
│  │  │  └─ SyncUser.tsx
│  │  ├─ hero-section-1.tsx
│  │  ├─ marketing
│  │  ├─ providers
│  │  │  ├─ LenisProvider.tsx
│  │  │  └─ ThemeProvider.tsx
│  │  ├─ ThemeToggle.tsx
│  │  └─ ui
│  │     ├─ animated-group.tsx
│  │     ├─ button.tsx
│  │     ├─ noise-background.tsx
│  │     └─ text-effect.tsx
│  ├─ hooks
│  │  └─ useVoiceToText.ts
│  ├─ lib
│  │  ├─ exportUtils.ts
│  │  ├─ supabase.ts
│  │  └─ utils.ts
│  ├─ middleware.ts
│  └─ types
└─ tsconfig.json

```