"use client";

import { useState, type FormEvent } from "react";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import {
  DEFAULT_USER_PREFERENCES,
  MODEL_OPTIONS,
  type ThemePreference,
  type UserPreferences,
} from "@/lib/types/userPreferences";

const inputClassName =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-800";

const labelClassName = "text-sm font-medium text-zinc-900 dark:text-zinc-100";

const helpTextClassName = "text-sm text-zinc-500 dark:text-zinc-400";

type SettingsFormProps = {
  initialPreferences: UserPreferences;
};

export function SettingsForm({ initialPreferences }: SettingsFormProps) {
  const { updatePreferences, resetPreferences } = useUserPreferences();
  const [draft, setDraft] = useState(initialPreferences);
  const [status, setStatus] = useState<"idle" | "saved">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updatePreferences(draft);
    setStatus("saved");
    window.setTimeout(() => setStatus("idle"), 2000);
  }

  function handleReset() {
    resetPreferences();
    setDraft(DEFAULT_USER_PREFERENCES);
    setStatus("idle");
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Profile
          </h2>
          <p className={helpTextClassName}>
            Personalize how the app addresses you in chat.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="displayName" className={labelClassName}>
            Display name
          </label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            autoComplete="nickname"
            placeholder="Alex"
            className={inputClassName}
            value={draft.displayName}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                displayName: event.target.value,
              }))
            }
          />
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Appearance
          </h2>
          <p className={helpTextClassName}>
            Choose how the interface looks on your device.
          </p>
        </div>

        <fieldset className="space-y-3">
          <legend className={labelClassName}>Theme</legend>
          {(
            [
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
              { value: "system", label: "System" },
            ] as const
          ).map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-200 px-4 py-3 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <input
                type="radio"
                name="theme"
                value={option.value}
                checked={draft.theme === option.value}
                onChange={() =>
                  setDraft((current) => ({
                    ...current,
                    theme: option.value as ThemePreference,
                  }))
                }
                className="h-4 w-4 border-zinc-300 text-zinc-900 focus:ring-zinc-400"
              />
              <span className="text-sm text-zinc-800 dark:text-zinc-200">
                {option.label}
              </span>
            </label>
          ))}
        </fieldset>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            AI behavior
          </h2>
          <p className={helpTextClassName}>
            Defaults used when starting a new conversation.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="model" className={labelClassName}>
            Default model
          </label>
          <select
            id="model"
            name="model"
            className={inputClassName}
            value={draft.model}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                model: event.target.value,
              }))
            }
          >
            {MODEL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="temperature" className={labelClassName}>
              Creativity
            </label>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {draft.temperature.toFixed(1)}
            </span>
          </div>
          <input
            id="temperature"
            name="temperature"
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={draft.temperature}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                temperature: Number(event.target.value),
              }))
            }
            className="w-full accent-zinc-900 dark:accent-zinc-100"
            aria-describedby="temperature-help"
          />
          <p id="temperature-help" className={helpTextClassName}>
            Lower values are more focused; higher values are more varied.
          </p>
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-200 px-4 py-3 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
          <input
            type="checkbox"
            name="streamResponses"
            checked={draft.streamResponses}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                streamResponses: event.target.checked,
              }))
            }
            className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-400"
          />
          <span className="space-y-1">
            <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Stream responses
            </span>
            <span className={helpTextClassName}>
              Show AI output incrementally instead of waiting for the full reply.
            </span>
          </span>
        </label>
      </section>

      <div className="flex flex-col gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center dark:border-zinc-800">
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus:ring-zinc-600 dark:focus:ring-offset-zinc-950"
        >
          Save preferences
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 px-6 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:ring-offset-2 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:focus:ring-zinc-700 dark:focus:ring-offset-zinc-950"
        >
          Reset to defaults
        </button>
        {status === "saved" ? (
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400" role="status">
            Preferences saved.
          </p>
        ) : null}
      </div>
    </form>
  );
}
