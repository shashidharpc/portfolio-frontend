"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";

interface HeroProps {
  fullName: string;
  title: string;
  headline: string;
  availableForHire: boolean;
  socialLinks: {
    github?: string;
    linkedin?: string;
    email?: string;
    phone?: string;
  };
}

export function PortfolioHero({
  fullName = "Shashidhar P C",
  title = "Full Stack Software Engineer",
  headline,
  availableForHire = true,
  socialLinks,
}: HeroProps) {
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0];
  const restName = nameParts.slice(1).join(" ");

  return (
    <section id="hero" className="hero-section">
      {/* Subtle organic texture */}
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-warm-glow" aria-hidden="true" />

      <div className="hero-container">
        {/* ─── LEFT COLUMN: TEXT CONTENT ─── */}
        <div className="hero-left">
          {/* Subtitle / Kicker */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-kicker"
          >
            <span>FULL-STACK DEVELOPER</span>
            <span className="hero-kicker-dot" />
            <span>AI &amp; DATABASE SYSTEMS</span>
          </motion.div>

          {/* Main Display Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-heading"
          >
            <span className="hero-heading-greeting">Hi, I&apos;m</span>
            <span className="hero-heading-name">
              {fullName}
            </span>
          </motion.h1>

          {/* Bio / Headline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="hero-headline"
          >
            I build web products from the interface to the API, and work on secure, scalable database and AI-powered solutions.
          </motion.p>

          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="hero-location"
          >
            <MapPin className="hero-location-pin" />
            <span>Bengaluru, India</span>
          </motion.div>

          {/* Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="hero-cta-row"
          >
            <a href="#contact" className="hero-cta-primary group">
              <span>Let&apos;s talk</span>
              <ArrowRight className="w-4 h-4 hero-cta-arrow" />
            </a>

            <a href="#projects" className="hero-cta-secondary group">
              <span>View my work</span>
              <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>
          </motion.div>
        </div>

        {/* ─── RIGHT COLUMN: PORTRAIT & FLOATING ELEMENTS ─── */}
        <div className="hero-right">
          <div className="relative flex flex-col items-center justify-center w-full max-w-[540px] sm:max-w-[600px] lg:max-w-[640px]">
            {/* Hand-drawn whimsical curved arrow pointing directly to the skills card */}
            <div className="absolute -top-3 right-24 sm:right-32 lg:right-36 z-30 pointer-events-none hidden sm:block">
              <svg
                className="w-14 h-12 text-[#18181B] dark:text-neutral-300"
                viewBox="0 0 54 46"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 36 C 14 10, 36 6, 48 16" />
                <path d="M42 8 L 48 16 L 38 18" />
              </svg>
            </div>

            {/* Floating Top-Right Skills Badge with exact 8px padding */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-2 right-1 sm:-right-2 lg:-right-4 z-30 bg-white/30 dark:bg-white/[0.08] backdrop-blur-xl rounded-xl p-[8px] shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.35)] border border-white/40 dark:border-white/15 ring-1 ring-white/10"
            >
              <ul className="space-y-1.5 text-xs sm:text-[13px] font-medium font-mono text-neutral-800 dark:text-neutral-200">
                <li className="flex items-center gap-[8px]">
                  <span className="w-2 h-2 rounded-full bg-[#FF5722] shadow-[0_0_8px_rgba(255,87,34,0.6)]" />
                  <span>Developer</span>
                </li>
                <li className="flex items-center gap-[8px]">
                  <span className="w-2 h-2 rounded-full bg-[#FF5722] shadow-[0_0_8px_rgba(255,87,34,0.6)]" />
                  <span>Problem Solver</span>
                </li>
                <li className="flex items-center gap-[8px]">
                  <span className="w-2 h-2 rounded-full bg-[#FF5722] shadow-[0_0_8px_rgba(255,87,34,0.6)]" />
                  <span>Lifelong Learner</span>
                </li>
              </ul>
            </motion.div>

            {/* Studio Cutout Portrait: Enlarged, Enhanced, with Ambient Backlight */}
            <div className="relative z-10 w-[270px] sm:w-[380px] md:w-[460px] lg:w-[520px] xl:w-[560px] flex items-end justify-center select-none group cursor-pointer">
              {/* Studio Backlight Glow */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full bg-gradient-to-tr from-[#FF5722]/15 via-[#FF8C00]/10 to-transparent blur-3xl pointer-events-none -z-10"
                aria-hidden="true"
              />

              <motion.img
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                src="/portrait-cutout.png"
                alt={`${fullName} Portrait`}
                className="w-full h-auto object-contain max-h-[390px] sm:max-h-[500px] md:max-h-[580px] lg:max-h-[660px] xl:max-h-[700px] drop-shadow-[0_20px_35px_rgba(0,0,0,0.16)] dark:drop-shadow-[0_25px_45px_rgba(255,87,34,0.2)] filter grayscale contrast-[1.12] brightness-[1.02] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-500 ease-out"
              />

              {/* Bottom Subtle Gradient Fade */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--background)] to-transparent z-15 pointer-events-none" />
            </div>

            {/* Handwritten Signature: "shashi" */}
            <motion.div
              initial={{ opacity: 0, y: 12, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: -4 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative z-20 -mt-2 sm:-mt-3 lg:-mt-4 flex flex-col items-center select-none"
            >
              <div className="relative group cursor-pointer flex flex-col items-center">
                <span className="font-signature text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#18181B] dark:text-neutral-100 font-normal tracking-wide transition-all duration-300 group-hover:text-[#FF5722] dark:group-hover:text-[#FF6E40] group-hover:scale-105">
                  shashi
                </span>
                {/* Handwritten ink underline flourish */}
                <svg
                  className="w-32 sm:w-44 lg:w-50 h-4 text-[#FF5722] -mt-2 sm:-mt-3 opacity-85 group-hover:opacity-100 transition-opacity"
                  viewBox="0 0 160 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3 10C35 4 80 2 155 7C118 12 85 14 45 14"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
