"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { applyTheme, watchSystemTheme } from "@/lib/theme";
import {
  getPreferencesStateSnapshot,
  getServerPreferencesStateSnapshot,
  resetStoredPreferences,
  subscribeToPreferences,
  updateStoredPreferences,
} from "@/lib/preferencesStore";
import type { UserPreferences } from "@/lib/types/userPreferences";

type PreferencesContextValue = {
  preferences: UserPreferences;
  isLoaded: boolean;
  updatePreferences: (next: UserPreferences) => void;
  resetPreferences: () => void;
};

export const PreferencesContext = createContext<PreferencesContextValue | null>(
  null,
);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const { preferences, isLoaded } = useSyncExternalStore(
    subscribeToPreferences,
    getPreferencesStateSnapshot,
    getServerPreferencesStateSnapshot,
  );

  useEffect(() => {
    if (preferences.theme !== "system") {
      return;
    }

    const syncSystemTheme = () => applyTheme("system");
    return watchSystemTheme(syncSystemTheme);
  }, [preferences.theme]);

  const updatePreferences = useCallback((next: UserPreferences) => {
    updateStoredPreferences(next);
  }, []);

  const resetPreferences = useCallback(() => {
    resetStoredPreferences();
  }, []);

  const value = useMemo(
    () => ({
      preferences,
      isLoaded,
      updatePreferences,
      resetPreferences,
    }),
    [preferences, isLoaded, updatePreferences, resetPreferences],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}
