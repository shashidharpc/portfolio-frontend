"use client";

import * as React from "react";
import { ArrowUp, Mail, Phone, MapPin, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

interface FooterProps {
  socialLinks: {
    github?: string;
    linkedin?: string;
    email?: string;
    phone?: string;
  };
}

export function PortfolioFooter({ socialLinks }: FooterProps) {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-md py-14 text-[var(--foreground-secondary)] relative">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-[var(--border-subtle)]">
          {/* Brand & Summary */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <div className="flex items-center gap-2.5 font-bold text-[var(--foreground)] text-base">
              <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-gradient-to-tr from-[#8B5CF6] to-[#3B82F6] text-white font-mono text-xs font-black">
                SP
              </span>
              <span>Shashidhar P C</span>
              <span className="text-[var(--border-strong)]">•</span>
              <span className="text-xs text-[#8B5CF6] font-mono">
                Full Stack Software Engineer
              </span>
            </div>
            <p className="text-xs text-[var(--foreground-muted)] max-w-md">
              Specialized in Python, Flask, JavaScript, PHP, MySQL, and MongoDB. Master of Computer Applications (MCA) graduate @ Bengaluru.
            </p>
          </div>

          {/* Social & Contact Shortcuts */}
          <div className="flex items-center gap-3">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--border)] bg-[var(--card)] hover:text-[#8B5CF6] hover:border-[#8B5CF6]/40 hover:scale-105 transition-all"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--border)] bg-[var(--card)] hover:text-[#3B82F6] hover:border-[#3B82F6]/40 hover:scale-105 transition-all"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            )}
            {socialLinks.email && (
              <a
                href={`mailto:${socialLinks.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--border)] bg-[var(--card)] hover:text-purple-400 hover:border-purple-400/40 hover:scale-105 transition-all"
                aria-label="Send Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            )}

            <div className="h-5 w-px bg-[var(--border)] mx-1" />

            <Button
              variant="outline"
              size="iconSm"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="rounded-[10px] border-[var(--border)] hover:border-[#8B5CF6]/50 hover:text-[#8B5CF6]"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--foreground-muted)]">
          <p>© {new Date().getFullYear()} Shashidhar P C. All rights reserved.</p>
          <p className="flex items-center gap-1.5 font-mono">
            <span>Built with precision & high performance</span>
            <span className="text-[#8B5CF6]">•</span>
            <span>Bengaluru, India</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
