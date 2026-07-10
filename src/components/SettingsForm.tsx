"use client";

import { useState } from "react";
import {
  MODEL_OPTIONS,
  THEME_OPTIONS,
  type DefaultModel,
  type Theme,
  type UserPreferences,
} from "@/lib/types/userPreferences";
import { savePreferences } from "@/lib/userPreferencesStore";
import {
  DISPLAY_NAME_MAX_LENGTH,
  validateDisplayName,
} from "@/lib/validateDisplayName";

interface SettingsFormProps {
  initialPreferences: UserPreferences;
}

export function SettingsForm({ initialPreferences }: SettingsFormProps) {
  const [displayName, setDisplayName] = useState(initialPreferences.displayName);
  const [theme, setTheme] = useState<Theme>(initialPreferences.theme);
  const [defaultModel, setDefaultModel] = useState<DefaultModel>(
    initialPreferences.defaultModel,
  );
  const [creativity, setCreativity] = useState(initialPreferences.creativity);
  const [streamResponses, setStreamResponses] = useState(
    initialPreferences.streamResponses,
  );
  const [nameError, setNameError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(false);

    const error = validateDisplayName(displayName);
    if (error) {
      setNameError(error);
      return;
    }
    setNameError(null);

    const preferences: UserPreferences = {
      displayName: displayName.trim(),
      theme,
      defaultModel,
      creativity,
      streamResponses,
    };
    savePreferences(preferences);
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      <div className="flex flex-col gap-2">
        <label htmlFor="displayName" className="font-medium text-zinc-900 dark:text-zinc-100">
          Display name
        </label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          value={displayName}
          maxLength={DISPLAY_NAME_MAX_LENGTH}
          aria-invalid={nameError ? true : undefined}
          aria-describedby={nameError ? "displayName-error" : undefined}
          onChange={(event) => setDisplayName(event.target.value)}
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
        {nameError ? (
          <p id="displayName-error" role="alert" className="text-sm text-red-600 dark:text-red-400">
            {nameError}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="theme" className="font-medium text-zinc-900 dark:text-zinc-100">
          Theme
        </label>
        <select
          id="theme"
          name="theme"
          value={theme}
          onChange={(event) => setTheme(event.target.value as Theme)}
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        >
          {THEME_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="defaultModel" className="font-medium text-zinc-900 dark:text-zinc-100">
          Default model
        </label>
        <select
          id="defaultModel"
          name="defaultModel"
          value={defaultModel}
          onChange={(event) => setDefaultModel(event.target.value as DefaultModel)}
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        >
          {MODEL_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="creativity" className="font-medium text-zinc-900 dark:text-zinc-100">
          Creativity (temperature): {creativity.toFixed(1)}
        </label>
        <input
          id="creativity"
          name="creativity"
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={creativity}
          onChange={(event) => setCreativity(Number(event.target.value))}
          className="w-full accent-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="streamResponses"
          name="streamResponses"
          type="checkbox"
          checked={streamResponses}
          onChange={(event) => setStreamResponses(event.target.checked)}
          className="h-4 w-4 rounded border-zinc-300 accent-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500"
        />
        <label htmlFor="streamResponses" className="font-medium text-zinc-900 dark:text-zinc-100">
          Stream responses
        </label>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white outline-none transition-colors hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Save
        </button>
        {saved ? (
          <span role="status" className="text-sm text-green-600 dark:text-green-400">
            Preferences saved.
          </span>
        ) : null}
      </div>
    </form>
  );
}
