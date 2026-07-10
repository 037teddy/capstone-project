"use client";

import { SettingsForm } from "@/components/SettingsForm";
import { useUserPreferences } from "@/hooks/useUserPreferences";

export function SettingsPageContent() {
  const { preferences, isLoaded } = useUserPreferences();

  if (!isLoaded) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400" role="status">
        Loading preferences...
      </p>
    );
  }

  return <SettingsForm key={JSON.stringify(preferences)} initialPreferences={preferences} />;
}
