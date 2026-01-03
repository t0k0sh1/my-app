"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { MobileMenuProps } from "./types";

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={onClose}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className="md:hidden flex flex-col gap-1.5 p-2"
      >
        <span
          className={`block h-0.5 w-6 bg-zinc-900 dark:bg-zinc-50 transition-all duration-200 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-zinc-900 dark:bg-zinc-50 transition-all duration-200 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-zinc-900 dark:bg-zinc-50 transition-all duration-200 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        role="dialog"
        aria-modal="true"
        className={`fixed inset-0 z-50 bg-white dark:bg-zinc-900 transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-2xl font-medium text-zinc-900 dark:text-zinc-50 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
