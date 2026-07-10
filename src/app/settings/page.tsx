import { SettingsForm } from "@/components/SettingsForm";
import { useUserPreferences } from "@/lib/userPreferencesStore";

export default function SettingsPage() {
  const preferences = useUserPreferences();

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-6 py-12">
      <h1 className="mb-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Settings
      </h1>
      <p className="mb-8 text-zinc-600 dark:text-zinc-400">
        Manage your display and model preferences. Changes are saved to this
        device.
      </p>
      <SettingsForm initialPreferences={preferences} />
    </main>
  );
}
