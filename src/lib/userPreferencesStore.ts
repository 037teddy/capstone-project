import { useEffect, useSyncExternalStore } from "react";
import {
  DEFAULT_PREFERENCES,
  STORAGE_KEY,
  type UserPreferences,
} from "./types/userPreferences";

const listeners = new Set<() => void>();

// `current` is the live client-side snapshot. It starts as the defaults and is
// replaced with the persisted value once the store is hydrated on the client.
let current: UserPreferences = DEFAULT_PREFERENCES;
let hydrated = false;

// A single, stable reference returned for every server render and for the very
// first client render. Returning a fresh object here would trigger React's
// "getServerSnapshot should be cached" infinite-loop warning, so we reuse the
// same constant reference.
const serverSnapshot: UserPreferences = DEFAULT_PREFERENCES;

function emit(): void {
  for (const listener of listeners) {
    listener();
  }
}

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function loadPreferences(): UserPreferences {
  if (!isBrowser()) {
    return DEFAULT_PREFERENCES;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_PREFERENCES;
    }
    const parsed = JSON.parse(raw) as Partial<UserPreferences>;
    // Merge over defaults so missing/extra keys never produce a partial object.
    return { ...DEFAULT_PREFERENCES, ...parsed };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function hydratePreferences(): void {
  if (hydrated) {
    return;
  }
  current = loadPreferences();
  hydrated = true;
  emit();
}

export function savePreferences(preferences: UserPreferences): void {
  current = preferences;
  if (isBrowser()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }
  emit();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): UserPreferences {
  return current;
}

function getServerSnapshot(): UserPreferences {
  return serverSnapshot;
}

export function useUserPreferences(): UserPreferences {
  const preferences = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Hydrate from localStorage after mount. This runs once and keeps the first
  // client render identical to the server render (both use the stable default
  // snapshot), avoiding hydration mismatches.
  useEffect(() => {
    hydratePreferences();
  }, []);

  return preferences;
}
