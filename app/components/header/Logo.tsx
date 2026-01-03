import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
    >
      MyApp
    </Link>
  );
}
