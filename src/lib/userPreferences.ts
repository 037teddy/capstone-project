import {
  DEFAULT_USER_PREFERENCES,
  type UserPreferences,
} from "@/lib/types/userPreferences";

const STORAGE_KEY = "capstone-user-preferences";

export function loadUserPreferences(): UserPreferences {
  if (typeof window === "undefined") {
    return DEFAULT_USER_PREFERENCES;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return DEFAULT_USER_PREFERENCES;
    }

    const parsed = JSON.parse(stored) as Partial<UserPreferences>;
    return {
      ...DEFAULT_USER_PREFERENCES,
      ...parsed,
    };
  } catch {
    return DEFAULT_USER_PREFERENCES;
  }
}

export function saveUserPreferences(preferences: UserPreferences): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
}
