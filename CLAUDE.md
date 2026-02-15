# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run lint      # ESLint
npm start         # Start production server
```

No test framework is configured.

## Architecture

This is a **client-side online practice assessment platform** built with Next.js 14 (App Router), React 18, TypeScript, and Tailwind CSS.

### Routing

- `/` — Landing page with test overview and instructions
- `/test` — Test execution (renders `TestEngine`)
- `/results` — Score display and question review

All pages use `'use client'` — there are no server components.

### State Management

- **TestEngine** (`src/components/TestEngine.tsx`) uses `useReducer` to manage all test state (current section, answers, navigation). This is the central orchestrator.
- **sessionStorage** passes test results from `/test` to `/results`. No global state library.
- Action types are defined in `src/types/index.ts` as the `TestAction` union type.

### Data Flow

Questions are statically defined in `src/data/questions.ts` — no backend or API. The test has 4 sections (Quantitative Aptitude, Logical Reasoning, Verbal Ability, Data Interpretation), each with 5 questions and a 10-minute time limit.

### Key Components

- **TestEngine** — State machine for test progression, answer tracking, results calculation
- **QuestionCard** — Renders MCQ and multi-select questions
- **QuestionPalette** — Sidebar for navigating between questions within a section
- **Timer** — Per-section countdown; auto-submits on expiry
- **ResultsReview** — Section-wise breakdown and per-question correct answer review

### Type System

Core types in `src/types/index.ts`: `Question`, `Section`, `UserAnswer`, `TestState`, `TestAction`, `TestResult`. Question types are `'mcq' | 'multi-select'`. Sections progress linearly and cannot be revisited (`SectionStatus: 'locked' | 'active' | 'completed'`).

## Conventions

- Path alias: `@/*` maps to `./src/*`
- Styling: Tailwind CSS utility classes throughout; custom CSS variables for `background`/`foreground` colors in `globals.css`
- Fonts: Geist Sans and Geist Mono loaded locally via `next/font`
