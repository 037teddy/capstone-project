export type ThemePreference = "light" | "dark" | "system";

export type UserPreferences = {
  displayName: string;
  theme: ThemePreference;
  model: string;
  temperature: number;
  streamResponses: boolean;
};

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  displayName: "",
  theme: "system",
  model: "claude-sonnet-4-20250514",
  temperature: 0.7,
  streamResponses: true,
};

export const MODEL_OPTIONS = [
  {
    value: "claude-sonnet-4-20250514",
    label: "Claude Sonnet 4",
  },
  {
    value: "claude-3-5-haiku-20241022",
    label: "Claude 3.5 Haiku",
  },
] as const;
