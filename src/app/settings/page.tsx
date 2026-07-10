import { SettingsPageContent } from "@/app/settings/SettingsPageContent";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-10">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Settings
          </h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Configure your profile, appearance, and default AI behavior. Changes
            are saved locally in your browser.
          </p>
        </div>
        <SettingsPageContent />
      </main>
    </div>
  );
}
