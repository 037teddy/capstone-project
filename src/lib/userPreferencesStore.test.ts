import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { DEFAULT_PREFERENCES, STORAGE_KEY } from "@/lib/types/userPreferences";

describe("userPreferencesStore", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetModules();
  });

  it("returns default preferences on first load (no stored value)", async () => {
    const { loadPreferences } = await import("@/lib/userPreferencesStore");
    expect(loadPreferences()).toEqual(DEFAULT_PREFERENCES);
  });

  it("round-trips a save and load through localStorage", async () => {
    const { loadPreferences, savePreferences } = await import(
      "@/lib/userPreferencesStore"
    );
    const prefs = {
      displayName: "Ada",
      theme: "dark" as const,
      defaultModel: "Claude 3.5 Haiku" as const,
      creativity: 0.3,
      streamResponses: false,
    };

    savePreferences(prefs);

    expect(loadPreferences()).toEqual(prefs);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) as string)).toEqual(
      prefs,
    );
  });

  it("hydrates stored preferences on mount via the hook", async () => {
    const stored = {
      displayName: "Grace",
      theme: "light" as const,
      defaultModel: "Claude Sonnet 4" as const,
      creativity: 1,
      streamResponses: true,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

    const { useUserPreferences } = await import("@/lib/userPreferencesStore");
    const { result } = renderHook(() => useUserPreferences());

    // The first render uses the stable server/default snapshot; after the
    // mount effect hydrates from localStorage the stored values appear.
    await waitFor(() => expect(result.current.displayName).toBe("Grace"));
    expect(result.current).toEqual(stored);
  });

  it("falls back to defaults when stored JSON is corrupt", async () => {
    localStorage.setItem(STORAGE_KEY, "{not valid json");
    const { loadPreferences } = await import("@/lib/userPreferencesStore");
    expect(loadPreferences()).toEqual(DEFAULT_PREFERENCES);
  });
});
