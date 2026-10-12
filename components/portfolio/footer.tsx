"use client";

import * as React from "react";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

interface FooterProps {
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export function PortfolioFooter({ socialLinks }: FooterProps) {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-12 text-[var(--foreground-secondary)]">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2 font-semibold text-[var(--foreground)] text-sm">
            <span>Shashidhar P C</span>
            <span className="text-[var(--border-strong)]">•</span>
            <span className="text-xs text-[var(--foreground-muted)] font-mono">
              Next.js 15 App Architecture
            </span>
          </div>
          <p className="text-xs text-[var(--foreground-muted)]">
            © {new Date().getFullYear()} All rights reserved. Zero-telemetry cookies used.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          {socialLinks.github && (
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:text-[#7C3AED] hover:bg-[var(--surface-hover)] transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          )}
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:text-[#7C3AED] hover:bg-[var(--surface-hover)] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          )}
          {socialLinks.twitter && (
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:text-[#7C3AED] hover:bg-[var(--surface-hover)] transition-colors"
              aria-label="Twitter"
            >
              <TwitterIcon className="h-4 w-4" />
            </a>
          )}
          {socialLinks.email && (
            <a
              href={`mailto:${socialLinks.email}`}
              className="p-2 rounded-lg hover:text-[#7C3AED] hover:bg-[var(--surface-hover)] transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          )}

          <div className="h-4 w-px bg-[var(--border)] mx-1" />

          <Button
            variant="ghost"
            size="iconSm"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="hover:text-[#7C3AED]"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
