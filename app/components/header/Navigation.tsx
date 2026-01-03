import Link from "next/link";
import type { NavigationProps } from "./types";

export default function Navigation({ links }: NavigationProps) {
  return (
    <nav aria-label="Main navigation" className="hidden md:flex md:gap-8">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-zinc-900 dark:text-zinc-50 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
