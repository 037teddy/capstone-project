# Capstone Project

A frontend AI engineering capstone built as part of an internship program. The app demonstrates modern web development practices with a focus on integrating large language models into a polished user experience.

## Features

- **Streaming AI chat** — real-time LLM responses via the Vercel AI SDK
- **Server-side API calls** — API keys never exposed to the browser
- **Responsive UI** — mobile-first layout with Tailwind CSS
- **Accessible interactions** — keyboard navigation, focus states, and semantic HTML
- **Robust UX states** — loading, error, and empty states for every AI interaction
- **Test coverage** — unit tests (Vitest) and end-to-end tests (Playwright) for critical flows

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| AI | [Vercel AI SDK](https://sdk.vercel.ai/) + [Anthropic API](https://docs.anthropic.com/) |
| Backend | Next.js API routes & Server Actions |
| Testing | [Vitest](https://vitest.dev/) (unit) + [Playwright](https://playwright.dev/) (E2E) |
| Package manager | pnpm |

## Prerequisites

- **Node.js** 20 or later
- **pnpm** 9 or later
- An **Anthropic API key** (or other provider key, depending on configuration)

## Getting Started

```bash
# Clone the repository
git clone <repository-url>
cd capstone-project

# Install dependencies
pnpm install

# Copy environment variables and fill in your API keys
cp .env.example .env.local

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the project root:

```env
ANTHROPIC_API_KEY=your_api_key_here
```

> Never commit `.env` or `.env.local` files. API keys must stay server-side.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Next.js development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Run the production server |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run unit tests with Vitest |
| `pnpm test:e2e` | Run end-to-end tests with Playwright |

## Project Structure

```
capstone-project/
├── app/                  # Next.js App Router pages, layouts, and API routes
├── components/           # Reusable UI components
├── lib/                  # Shared utilities, AI client helpers, types
├── public/               # Static assets
├── tests/                # Unit and E2E tests
├── .env.example          # Environment variable template
├── CLAUDE.md             # AI assistant context and conventions
└── package.json
```

## Testing

```bash
# Unit tests
pnpm test

# E2E tests (requires dev server or preview build)
pnpm test:e2e
```

## Deployment

This project is designed to deploy on [Vercel](https://vercel.com/). Set environment variables in the Vercel dashboard before deploying.

```bash
pnpm build
```

## License

This project is licensed under the [MIT License](LICENSE).
