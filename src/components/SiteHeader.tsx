import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4"
      >
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-zinc-900 transition hover:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:text-zinc-50 dark:hover:text-zinc-300 dark:focus:ring-zinc-600 dark:focus:ring-offset-black"
        >
          Capstone
        </Link>
        <Link
          href="/settings"
          className="text-sm font-medium text-zinc-600 transition hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:text-zinc-400 dark:hover:text-zinc-100 dark:focus:ring-zinc-600 dark:focus:ring-offset-black"
        >
          Settings
        </Link>
      </nav>
    </header>
  );
}
