"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

interface HeroProps {
  fullName: string;
  title: string;
  headline: string;
  availableForHire: boolean;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export function PortfolioHero({
  fullName,
  title,
  headline,
  availableForHire,
  socialLinks,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      {/* Ambient background glow orbs */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#7C3AED]/20 to-[#3B82F6]/15 blur-[120px] dark:from-[#7C3AED]/25 dark:to-[#3B82F6]/20 opacity-70 transition-opacity"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-40 h-[450px] w-[450px] rounded-full bg-gradient-to-br from-[#6366F1]/15 to-[#A78BFA]/10 blur-[130px] dark:from-[#6366F1]/20 dark:to-[#A78BFA]/15 opacity-60 transition-opacity"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-8">
        <div className="flex flex-col items-start max-w-3xl">
          {/* Availability Badge */}
          {availableForHire && (
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 shadow-[0_2px_8px_rgba(20,18,43,0.03)] mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-[var(--foreground)]">
                Available for architecture & fullstack projects
              </span>
            </div>
          )}

          {/* Title and Intro */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.1] mb-6">
            Hi, I&apos;m <span className="text-gradient">{fullName}</span>.
            <br />
            <span className="text-[var(--foreground-secondary)] text-3xl sm:text-4xl md:text-5xl font-semibold">
              {title}
            </span>
          </h1>

          {/* Headline Value Statement */}
          <p className="text-lg sm:text-xl text-[var(--foreground-secondary)] leading-relaxed max-w-2xl mb-10">
            {headline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Button asChild size="lg" className="gap-2">
              <Link href="#projects">
                View Selected Work
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#contact">Get in Touch</Link>
            </Button>
          </div>

          {/* Social Badges */}
          <div className="flex items-center gap-3 pt-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--foreground-muted)] mr-2">
              Connect:
            </span>
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--border)] bg-[var(--card)] text-[var(--foreground-secondary)] hover:text-[#7C3AED] hover:border-[#7C3AED]/40 hover:shadow-sm transition-all"
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
                className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--border)] bg-[var(--card)] text-[var(--foreground-secondary)] hover:text-[#7C3AED] hover:border-[#7C3AED]/40 hover:shadow-sm transition-all"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            )}
            {socialLinks.email && (
              <a
                href={`mailto:${socialLinks.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--border)] bg-[var(--card)] text-[var(--foreground-secondary)] hover:text-[#7C3AED] hover:border-[#7C3AED]/40 hover:shadow-sm transition-all"
                aria-label="Send Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
