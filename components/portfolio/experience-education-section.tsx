"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location?: string | null;
  startDate: Date | string;
  endDate?: Date | string | null;
  isCurrent: boolean;
  description: string;
  highlights: string; // JSON string array
  technologies: string; // JSON string array
}

interface ExperienceEducationProps {
  experiences?: ExperienceItem[];
}

export function PortfolioExperienceEducation({ experiences = [] }: ExperienceEducationProps) {
  // Default verified experience from resume if database has no items
  const defaultExperiences = [
    {
      id: "exp-1",
      role: "Web Developer Intern",
      company: "Innovant IT Solutions",
      location: "Bengaluru, India",
      type: "Internship",
      period: "Jun 2024 – Jul 2024",
      highlights: [
        "Architected and delivered a multi-tier Car Rental Management web platform utilizing PHP, JavaScript, and MySQL to streamline user registration and booking.",
        "Engineered search and filtering modules allowing users to filter vehicles by category and reserve units over validated date ranges, preventing double booking.",
        "Structured relational MySQL database tables, establishing primary/foreign key constraints and indexing schemas to optimize booking query retrieval speeds.",
        "Implemented robust client and server side form validation mechanisms to sanitize user inputs and safeguard data integrity across transactional checkout paths.",
        "Used Git/GitHub with collaborative branch-based development and code reviews.",
      ],
    },
  ];

  // Process experiences from props or fallback to default
  const experienceList = experiences.length > 0
    ? experiences.map((exp) => {
        let highlights: string[] = [];
        try {
          highlights = JSON.parse(exp.highlights);
        } catch {
          highlights = exp.description ? [exp.description] : [];
        }

        const start = formatDate(exp.startDate);
        const end = exp.isCurrent ? "Present" : formatDate(exp.endDate);

        return {
          id: exp.id,
          role: exp.role,
          company: exp.company,
          location: exp.location || "Bengaluru, India",
          type: "Internship",
          period: `${start} – ${end}`,
          highlights: highlights.length > 0 ? highlights : [exp.description],
        };
      })
    : defaultExperiences;

  // Verified Education History from Resume
  const educationList = [
    {
      id: "edu-mca",
      degree: "MCA",
      institution: "Presidency College (Autonomous)",
      university: "Bengaluru City University",
      period: "2024 – 2026",
      score: "CGPA: 8.75 / 10",
      highlights: [
        "Specialized in Software Engineering, Full Stack Web Architecture, and Scalable Databases.",
        "Mastered Advanced Data Structures, Algorithms, Object-Oriented Design, and Cloud Systems.",
        "Graduated with 8.75 / 10 CGPA (First Class with Distinction).",
        "Engineered Smart Attendance Management System with dynamic expiring QR codes and HTML5 Geofencing verification.",
      ],
    },
    {
      id: "edu-bca",
      degree: "BCA",
      institution: "Sahyadri Science College",
      university: "Kuvempu University",
      period: "2021 – 2024",
      score: "Percentage: 89.86% (Distinction)",
      highlights: [
        "Comprehensive grounding in Computer Science, C, Java, Python, Web Basics, and Database Management.",
        "Graduated with First Class with Distinction (89.86% aggregate).",
        "Rigorous coursework in SDLC, Operating Systems, Computer Networks, and DBMS.",
        "Developed full-stack database-driven web application capstones.",
      ],
    },
  ];

  return (
    <section id="experience" className="py-16 sm:py-28 border-t border-[var(--border)] relative bg-[var(--background)] transition-colors duration-300">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-12">
        {/* ─── SECTION HEADER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col mb-10 sm:mb-18"
        >
          <span className="text-xs font-mono font-medium uppercase tracking-[0.22em] text-[var(--foreground-muted)] mb-3">
            BACKGROUND
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-jakarta font-extrabold tracking-tight text-[var(--foreground)]">
            Experience &amp; education.
          </h2>
        </motion.div>

        {/* ─── TWO-COLUMN GRID ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* ════ LEFT COLUMN: EXPERIENCE ════ */}
          <div className="flex flex-col">
            <h3 className="text-xl sm:text-2xl font-jakarta font-bold text-[var(--foreground)] mb-8">
              Experience
            </h3>

            <div className="relative pl-7 sm:pl-9 border-l border-neutral-300/70 dark:border-neutral-800/80 space-y-12">
              {experienceList.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative group"
                >
                  {/* Timeline Node Dot */}
                  <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-2.5 h-2.5 rounded-full bg-neutral-400 dark:bg-neutral-600 ring-4 ring-[var(--background)] group-hover:bg-[#FF5722] group-hover:ring-[#FF5722]/30 transition-all duration-300" />

                  {/* Role Title */}
                  <h4 className="text-lg sm:text-xl font-jakarta font-bold text-[var(--foreground)] leading-snug">
                    {exp.role}
                  </h4>

                  {/* Company & Meta Subline */}
                  <div className="text-xs sm:text-sm text-[var(--foreground-muted)] mt-1.5 mb-4 flex flex-wrap items-center gap-1.5">
                    <span className="text-[#FF5722] dark:text-[#FF6E40] font-semibold">{exp.company}</span>
                    <span className="text-neutral-400 dark:text-neutral-600 select-none">•</span>
                    <span>{exp.location}</span>
                    <span className="text-neutral-400 dark:text-neutral-600 select-none">•</span>
                    <span>{exp.type}</span>
                    {exp.period && (
                      <>
                        <span className="text-neutral-400 dark:text-neutral-600 select-none">•</span>
                        <span>{exp.period}</span>
                      </>
                    )}
                  </div>

                  {/* Bullets List */}
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--foreground-secondary)] leading-relaxed">
                    {exp.highlights.map((hl, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5">
                        <span className="text-neutral-400 dark:text-neutral-500 select-none mt-0.5 text-xs">•</span>
                        <span className="flex-1">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ════ RIGHT COLUMN: EDUCATION ════ */}
          <div id="education" className="flex flex-col scroll-mt-24">
            <h3 className="text-xl sm:text-2xl font-jakarta font-bold text-[var(--foreground)] mb-8">
              Education
            </h3>

            <div className="relative pl-7 sm:pl-9 border-l border-neutral-300/70 dark:border-neutral-800/80 space-y-12">
              {educationList.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative group"
                >
                  {/* Timeline Node Dot */}
                  <span
                    className={`absolute -left-[33px] sm:-left-[41px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-[var(--background)] transition-all duration-300 ${
                      idx === 1
                        ? "bg-[#18181B] dark:bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)] ring-[#18181B]/20 dark:ring-white/20"
                        : "bg-neutral-400 dark:bg-neutral-600 group-hover:bg-[#FF5722] group-hover:ring-[#FF5722]/30"
                    }`}
                  />

                  {/* Degree Title */}
                  <h4 className="text-lg sm:text-xl font-jakarta font-bold text-[var(--foreground)] leading-snug">
                    {edu.degree}
                  </h4>

                  {/* Institution & Period Subline */}
                  <div className="text-xs sm:text-sm text-[var(--foreground-muted)] mt-1.5 mb-4 flex flex-wrap items-center gap-1.5">
                    <span className="text-[var(--foreground)] font-medium">{edu.institution}</span>
                    <span className="text-neutral-400 dark:text-neutral-600 select-none">•</span>
                    <span>{edu.period}</span>
                    {edu.score && (
                      <>
                        <span className="text-neutral-400 dark:text-neutral-600 select-none">•</span>
                        <span className="text-[#FF5722] dark:text-[#FF6E40] font-medium">{edu.score}</span>
                      </>
                    )}
                  </div>

                  {/* Bullets List */}
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--foreground-secondary)] leading-relaxed">
                    {edu.highlights.map((hl, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5">
                        <span className="text-neutral-400 dark:text-neutral-500 select-none mt-0.5 text-xs">•</span>
                        <span className="flex-1">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
