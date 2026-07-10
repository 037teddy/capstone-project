import { applyTheme } from "@/lib/theme";
import {
  DEFAULT_USER_PREFERENCES,
  type UserPreferences,
} from "@/lib/types/userPreferences";
import {
  loadUserPreferences,
  saveUserPreferences,
} from "@/lib/userPreferences";

type Listener = () => void;

type PreferencesState = {
  preferences: UserPreferences;
  isLoaded: boolean;
};

let state: PreferencesState = {
  preferences: DEFAULT_USER_PREFERENCES,
  isLoaded: false,
};

const listeners = new Set<Listener>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function hydrateFromStorage(): PreferencesState {
  if (typeof window === "undefined" || state.isLoaded) {
    return state;
  }

  const preferences = loadUserPreferences();
  applyTheme(preferences.theme);
  state = { preferences, isLoaded: true };
  return state;
}

export function getPreferencesStateSnapshot(): PreferencesState {
  return hydrateFromStorage();
}

export function getServerPreferencesStateSnapshot(): PreferencesState {
  return {
    preferences: DEFAULT_USER_PREFERENCES,
    isLoaded: false,
  };
}

export function subscribeToPreferences(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function updateStoredPreferences(next: UserPreferences): void {
  state = { preferences: next, isLoaded: true };
  saveUserPreferences(next);
  applyTheme(next.theme);
  notifyListeners();
}

export function resetStoredPreferences(): void {
  updateStoredPreferences(DEFAULT_USER_PREFERENCES);
}
