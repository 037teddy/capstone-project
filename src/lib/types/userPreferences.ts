export type Theme = "light" | "dark" | "system";

export type DefaultModel = "Claude Sonnet 4" | "Claude 3.5 Haiku";

export interface UserPreferences {
  displayName: string;
  theme: Theme;
  defaultModel: DefaultModel;
  creativity: number;
  streamResponses: boolean;
}

export const STORAGE_KEY = "capstone-user-preferences";

export const DEFAULT_PREFERENCES: UserPreferences = {
  displayName: "",
  theme: "system",
  defaultModel: "Claude Sonnet 4",
  creativity: 0.7,
  streamResponses: true,
};

export const THEME_OPTIONS: Theme[] = ["light", "dark", "system"];

export const MODEL_OPTIONS: DefaultModel[] = [
  "Claude Sonnet 4",
  "Claude 3.5 Haiku",
];
