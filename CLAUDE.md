# CLAUDE.md

Context for AI assistants working on this repository.

## Project Overview

This is a **frontend AI engineering internship capstone project**. The goal is to build a production-quality web application that integrates LLM capabilities into a thoughtful, accessible user interface.

Prioritize clarity, maintainability, and safe AI integration patterns over clever abstractions.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **AI**: Vercel AI SDK with Anthropic API
- **Backend**: Next.js API routes and Server Actions (no separate server)
- **Testing**: Vitest (unit), Playwright (E2E)
- **Package manager**: pnpm

## Directory Conventions

```
app/            → Routes, layouts, server actions, API route handlers
components/     → Reusable UI components (presentational + composite)
lib/            → Pure utilities, AI helpers, shared types, constants
public/         → Static assets (images, fonts, icons)
tests/          → Unit and integration tests
tests/e2e/      → Playwright end-to-end tests
```

- Use the App Router (`app/`) — do not add a `pages/` directory.
- Colocate route-specific components inside `app/<route>/` when they are not reused elsewhere.
- Place shared logic in `lib/`, not inside components.

## Code Conventions

### TypeScript

- Use TypeScript for all new files (`.ts`, `.tsx`).
- Prefer explicit types on function signatures and public APIs; let inference handle locals.
- Avoid `any`. Use `unknown` and narrow with type guards when needed.
- Define shared types in `lib/types/` or next to the domain they belong to.

### React & Next.js

- Default to **Server Components**. Add `"use client"` only when the component needs browser APIs, event handlers, or client-side state.
- Keep client components small — push data fetching and business logic to the server.
- Use Server Actions for mutations when appropriate; use API routes for streaming AI responses.
- Name components with PascalCase (`ChatMessage.tsx`). Name hooks with a `use` prefix (`useChat.ts`).
- Prefer named exports for components and utilities.

### Styling

- Use Tailwind utility classes for styling.
- Extract repeated class patterns into components, not long arbitrary strings.
- Follow mobile-first responsive design (`sm:`, `md:`, `lg:` breakpoints).
- Ensure interactive elements have visible focus states and sufficient color contrast.

### AI Integration

- **Never expose API keys client-side.** All LLM calls go through server-side API routes or Server Actions.
- Use the Vercel AI SDK (`ai` package) for streaming, tool calling, and structured output.
- Handle loading, error, and empty states in the UI for every AI-powered feature.
- Validate and sanitize user input before sending it to an LLM.
- Keep system prompts in `lib/prompts/` (or similar), not hardcoded in components.

### File Naming

- Components: `PascalCase.tsx`
- Utilities, hooks, types: `camelCase.ts`
- API routes: follow Next.js conventions (`app/api/chat/route.ts`)
- Test files: `*.test.ts` or `*.test.tsx` alongside source, or in `tests/`

## Testing

- Write unit tests for pure functions and non-trivial logic in `lib/`.
- Use Playwright for critical user flows (chat interaction, form submission, error states).
- Run `pnpm test` before considering a feature complete.
- Do not add tests that only assert implementation details or framework behavior.

## Environment & Secrets

- Copy `.env.example` to `.env.local` for local development.
- Required variable: `ANTHROPIC_API_KEY`.
- `.env`, `.env.local`, and other secret files are gitignored — never commit them.

## What to Avoid

- Do not add new dependencies without a clear reason.
- Do not introduce a separate backend server (Express, Fastify, etc.) — use Next.js server features.
- Do not call LLM APIs directly from client components.
- Do not over-abstract: a focused change is better than a premature utility or wrapper.
- Do not add comments that restate what the code already says. Comment only non-obvious business logic.

## Common Commands

```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm lint         # ESLint
pnpm test         # Vitest unit tests
pnpm test:e2e     # Playwright E2E tests
```
