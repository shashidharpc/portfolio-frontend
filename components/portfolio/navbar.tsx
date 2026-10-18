"use client";

import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X } from "lucide-react";

export function PortfolioNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact", isHighlight: true },
  ];

  return (
    <header className="fixed top-4 sm:top-5 left-0 right-0 z-50 px-4 pointer-events-none transition-all duration-300">
      <div
        className={`mx-auto max-w-4xl flex items-center justify-between px-5 sm:px-7 py-2.5 rounded-full floating-glass-nav ${
          scrolled ? "is-scrolled" : ""
        } pointer-events-auto`}
      >
        {/* Brand: Shashidhar P C • */}
        <Link
          href="/"
          className="group flex items-center gap-1.5 font-bold text-sm sm:text-base tracking-tight text-[#18181B] dark:text-white transition-opacity hover:opacity-85"
        >
          <span>Shashidhar P C</span>
          <span className="w-2 h-2 rounded-full bg-[#FF5722] inline-block mb-0.5 shadow-[0_0_8px_rgba(255,87,34,0.6)] animate-pulse" />
        </Link>

        {/* Center Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                link.isHighlight
                  ? "text-[#FF5722] font-semibold hover:bg-[#FF5722]/10"
                  : "text-neutral-600 dark:text-neutral-300 hover:text-[#18181B] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action: Theme Toggle & Mobile Menu */}
        <div className="flex items-center gap-1.5">
          <ThemeToggle />

          {/* Mobile hamburger icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-neutral-700 dark:text-neutral-300 hover:text-[#FF5722] focus:outline-none rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mx-auto max-w-4xl mt-2 rounded-3xl floating-glass-nav p-5 md:hidden pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1.5 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2 rounded-2xl text-sm transition-colors ${
                  link.isHighlight
                    ? "text-[#FF5722] font-semibold bg-[#FF5722]/10"
                    : "text-neutral-700 dark:text-neutral-200 hover:text-[#FF5722] hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
