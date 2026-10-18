"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, MapPin, BookOpen, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PortfolioEducation() {
  const educationItems = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Presidency College (Autonomous)",
      university: "Bengaluru City University",
      timeline: "Dec 2024 – Jul 2026",
      score: "CGPA: 8.75 / 10",
      status: "Completed",
      location: "Bengaluru, Karnataka",
      highlights: [
        "Advanced Data Structures, Algorithms, and Object-Oriented Software Design.",
        "Web Application Architectures, Cloud Computing, and RESTful API engineering.",
        "Database Management Systems (Relational MySQL & Document MongoDB).",
        "Active technical project development focusing on automated verification systems.",
      ],
      tags: ["Advanced DSA", "System Design", "Cloud Systems", "Database Optimization", "Full Stack Development"],
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Sahyadri Science College",
      university: "Kuvempu University",
      timeline: "Nov 2021 – Jul 2024",
      score: "Percentage: 89.86% (Distinction)",
      status: "Completed",
      location: "Shivamogga, Karnataka",
      highlights: [
        "Graduated with First Class with Distinction (89.86%).",
        "Strong academic grounding in Programming (C, Java, Python), Database Systems, and Web Foundations.",
        "Hands-on coursework in Software Engineering, SDLC, Operating Systems, and Computer Networks.",
        "Capstone projects developing database-driven web portals.",
      ],
      tags: ["Computer Science Fundamentals", "C & Java", "Database Systems (SQL)", "Web Development", "SDLC"],
    },
  ];

  return (
    <section id="education" className="py-24 border-t border-[var(--border)] bg-[var(--surface)]/40 relative">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#8B5CF6] mb-2">
            02 // Academic Foundation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
            Education & Academic Honors
          </h2>
          <p className="text-sm sm:text-base text-[var(--foreground-secondary)] max-w-2xl mt-3 leading-relaxed">
            Rigorous computer applications education delivering deep theoretical mastery in data structures, algorithms, and full-stack software development.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationItems.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative flex flex-col rounded-[20px] border border-[var(--border)] bg-[var(--card)] p-7 shadow-sm hover:border-[#8B5CF6]/50 hover:shadow-[0_8px_30px_rgba(139,92,246,0.1)] transition-all duration-300 group"
            >
              {/* Top Accent & Icon */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-gradient-to-tr from-[#8B5CF6]/20 to-[#3B82F6]/20 border border-[#8B5CF6]/30 text-[#8B5CF6] group-hover:scale-105 group-hover:bg-[#8B5CF6] group-hover:text-white transition-all duration-300">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[#8B5CF6] transition-colors leading-tight">
                      {edu.degree}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-[var(--foreground-secondary)] mt-0.5">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-[var(--foreground-muted)]">
                      {edu.university}
                    </p>
                  </div>
                </div>

                <Badge
                  variant={edu.status === "Completed" ? "success" : "default"}
                  className="font-mono text-xs whitespace-nowrap"
                >
                  {edu.status}
                </Badge>
              </div>

              {/* Meta: Timeline, Location & Score */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-[12px] bg-[var(--surface-hover)] border border-[var(--border-subtle)] text-xs mb-6">
                <div className="flex items-center gap-2 text-[var(--foreground-secondary)]">
                  <Calendar className="h-3.5 w-3.5 text-[#8B5CF6]" />
                  <span className="font-mono">{edu.timeline}</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--foreground-secondary)]">
                  <MapPin className="h-3.5 w-3.5 text-[#3B82F6]" />
                  <span>{edu.location}</span>
                </div>
                <div className="col-span-2 flex items-center gap-2 pt-1 border-t border-[var(--border-subtle)] text-emerald-400 font-semibold font-mono text-xs sm:text-sm">
                  <Award className="h-4 w-4 text-emerald-400" />
                  <span>{edu.score}</span>
                </div>
              </div>

              {/* Coursework & Highlights */}
              <div className="space-y-2 mb-6 flex-1">
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--foreground-muted)] flex items-center gap-1.5 mb-2">
                  <BookOpen className="h-3.5 w-3.5" />
                  Key Coursework & Highlights:
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--foreground-secondary)]">
                  {edu.highlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border-subtle)]">
                {edu.tags.map((t, i) => (
                  <span
                    key={i}
                    className="rounded-[6px] bg-[var(--surface)] border border-[var(--border)] px-2 py-0.5 text-[11px] font-mono text-[var(--foreground-secondary)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
