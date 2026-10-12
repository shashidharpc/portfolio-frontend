"use client";

import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Lock, Menu, X } from "lucide-react";

export function PortfolioNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)] shadow-[0_1px_3px_rgba(20,18,43,0.03)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-[1200px] items-center justify-between px-6 sm:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-bold tracking-tight text-lg text-[var(--foreground)]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-tr from-[#7C3AED] to-[#3B82F6] text-white font-mono text-sm shadow-[0_2px_8px_rgba(124,58,237,0.3)] group-hover:scale-105 transition-transform">
            SP
          </span>
          <span className="font-semibold text-[var(--foreground)] group-hover:text-[#7C3AED] transition-colors">
            Shashidhar<span className="text-[#7C3AED]">.dev</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#projects"
            className="text-sm font-medium text-[var(--foreground-secondary)] hover:text-[#7C3AED] transition-colors"
          >
            Projects
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-[var(--foreground-secondary)] hover:text-[#7C3AED] transition-colors"
          >
            About
          </Link>
          <Link
            href="#skills"
            className="text-sm font-medium text-[var(--foreground-secondary)] hover:text-[#7C3AED] transition-colors"
          >
            Skills
          </Link>
          <Link
            href="#experience"
            className="text-sm font-medium text-[var(--foreground-secondary)] hover:text-[#7C3AED] transition-colors"
          >
            Experience
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium text-[var(--foreground-secondary)] hover:text-[#7C3AED] transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button asChild variant="outline" size="sm" className="gap-2 text-xs">
            <Link href="/dashboard">
              <Lock className="h-3.5 w-3.5 text-[#7C3AED]" />
              Dashboard
            </Link>
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="iconSm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border)] bg-[var(--card)] px-6 py-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-4">
            <Link
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[var(--foreground)] hover:text-[#7C3AED]"
            >
              Projects
            </Link>
            <Link
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[var(--foreground)] hover:text-[#7C3AED]"
            >
              About
            </Link>
            <Link
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[var(--foreground)] hover:text-[#7C3AED]"
            >
              Skills
            </Link>
            <Link
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[var(--foreground)] hover:text-[#7C3AED]"
            >
              Experience
            </Link>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[var(--foreground)] hover:text-[#7C3AED]"
            >
              Contact
            </Link>
            <div className="pt-2">
              <Button asChild variant="outline" className="w-full gap-2">
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Lock className="h-4 w-4 text-[#7C3AED]" />
                  Dashboard Admin
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
