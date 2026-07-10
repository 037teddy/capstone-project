"use client";

import { useContext } from "react";
import { PreferencesContext } from "@/components/PreferencesProvider";

export function useUserPreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("useUserPreferences must be used within PreferencesProvider");
  }
  return context;
}
