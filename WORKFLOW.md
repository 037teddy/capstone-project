# Workflow Comparison: Vague Prompt vs. Precise Prompt

## Setup

Same feature — a user preferences settings form at `/settings` — built twice on separate branches:

- **`round-1-vague-prompt`**: single prompt, "Add a settings form for user preferences." Output accepted as-is.
- **`round-2-precise-prompt`**: prompt specified exact fields, validation rules, accessibility requirements, an SSR-safety constraint, example behavior, and a test-writing verification step.

## Correctness

Round 1 produced a working form with five fields (display name, theme, model, temperature, streaming toggle) persisted to `localStorage`, and it looked complete on the surface. But it shipped with a real bug: `PreferencesProvider.tsx` called `useSyncExternalStore` with a `getServerSnapshot` that returned a new object on every render, triggering a console error — "The result of getServerSnapshot should be cached to avoid an infinite loop." I only found this by opening the browser console; it wasn't visible in the UI.

Round 2 avoided this entirely. The prompt explicitly named the pitfall ("avoid `getServerSnapshot` returning a new object reference"), and `userPreferencesStore.ts` returns a single stable `serverSnapshot` constant instead. This is the clearest evidence that spelling out a known failure mode in the prompt prevents it, where a vague prompt leaves the model to rediscover — or miss — it.

## Validation

Round 1 had **no validation at all**: an empty display name saved without complaint. Round 2 added `validateDisplayName.ts`, called on submit, which blocks saving and shows an inline error (`nameError`) when the field is empty or whitespace-only, with the value trimmed before persisting.

## Accessibility

Round 1's labels were linked (`htmlFor`/`id`), and tab order was logical — better than I expected from a one-line prompt. Round 2 went further: it added `aria-invalid` and `aria-describedby` on the display name input, and `role="alert"` on the error message, so screen readers announce validation errors. That difference came directly from the "fully operable via keyboard... visible focus state" line in the precise prompt — Round 1 got the basics right by luck, not by instruction.

## Edge Cases

Round 2's tests explicitly cover cases Round 1 never addressed: whitespace-only names, boundary length (50 chars), temperature at 0 and 1 extremes, and corrupted JSON in `localStorage` falling back to defaults. Round 1 was never tested against any of these; I only found its bugs by manually poking at the UI.

## Review Effort

Reviewing Round 1 took longer relative to its size: no tests meant every behavior had to be manually verified by hand, and the SSR bug required opening dev tools to catch. Round 2 shipped with 14 passing Vitest tests, and `tsc --noEmit` clean — review consisted of reading the tests and confirming they matched the spec, not re-deriving expected behavior from scratch.

## Rules Learned (see CLAUDE.md)

1. Name known API pitfalls explicitly in prompts (e.g. `useSyncExternalStore` snapshot stability) — models don't reliably avoid subtle bugs unless warned.
2. Always request a test-writing and test-running step; untested AI output can look complete while still failing basic cases like empty-string validation.
3. Specify accessibility attributes explicitly (`aria-invalid`, `aria-describedby`, focus states) — correct label wiring alone doesn't guarantee full accessibility.
