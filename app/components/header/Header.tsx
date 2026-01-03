"use client";

import { useState } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import type { NavigationLink } from "./types";

const NAVIGATION_LINKS: NavigationLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <Navigation links={NAVIGATION_LINKS} />
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={toggleMobileMenu}
            links={NAVIGATION_LINKS}
          />
        </div>
      </div>
    </header>
  );
}
