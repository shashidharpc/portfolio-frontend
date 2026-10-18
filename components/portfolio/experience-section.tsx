"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, CheckCircle2, MapPin, Building2, Code2 } from "lucide-react";
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

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export function PortfolioExperience({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 border-t border-[var(--border)] relative">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#8B5CF6] mb-2">
            04 // Professional Trajectory
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
            Internship & Industry Experience
          </h2>
          <p className="text-sm sm:text-base text-[var(--foreground-secondary)] max-w-2xl mt-3 leading-relaxed">
            Hands-on engineering experience designing relational databases, building multi-tier transactional web systems, and implementing robust form validation.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-[#8B5CF6]/30 ml-4 sm:ml-6 space-y-12">
          {experiences.map((exp, expIdx) => {
            let highlightsArray: string[] = [];
            let techsArray: string[] = [];

            try {
              highlightsArray = JSON.parse(exp.highlights);
            } catch {
              highlightsArray = [];
            }

            try {
              techsArray = JSON.parse(exp.technologies);
            } catch {
              techsArray = [];
            }

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: expIdx * 0.15 }}
                className="relative pl-8 sm:pl-10 group"
              >
                {/* Glowing Pulsing Timeline Node */}
                <div className="absolute -left-[11px] top-1.5 h-5 w-5 rounded-full border-2 border-[#8B5CF6] bg-[var(--background)] group-hover:bg-[#8B5CF6] group-hover:shadow-[0_0_15px_rgba(139,92,246,0.8)] transition-all duration-300 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-[#8B5CF6] group-hover:bg-white" />
                </div>

                {/* Experience Card */}
                <div className="rounded-[20px] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-sm group-hover:border-[#8B5CF6]/40 group-hover:shadow-[0_8px_30px_rgba(139,92,246,0.08)] transition-all duration-300">
                  {/* Top Bar: Role & Company */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] group-hover:text-[#8B5CF6] transition-colors flex items-center gap-2.5">
                        <Briefcase className="h-5 w-5 text-[#8B5CF6] shrink-0" />
                        <span>{exp.role}</span>
                      </h3>
                      <div className="flex items-center gap-2 text-sm font-semibold text-[var(--foreground-secondary)] mt-1">
                        <Building2 className="h-4 w-4 text-[#3B82F6]" />
                        <span>{exp.company}</span>
                        {exp.location && (
                          <span className="text-xs font-normal text-[var(--foreground-muted)] flex items-center gap-1">
                            • <MapPin className="h-3 w-3" /> {exp.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--surface-hover)] border border-[var(--border)] px-3 py-1 text-[var(--foreground-secondary)]">
                        <Calendar className="h-3.5 w-3.5 text-[#8B5CF6]" />
                        <span>
                          {formatDate(exp.startDate)} –{" "}
                          {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                        </span>
                      </div>
                      {exp.isCurrent && (
                        <Badge variant="success" className="text-[10px]">
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Summary Narrative */}
                  <p className="text-sm sm:text-base text-[var(--foreground-secondary)] leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  {/* Highlights Bullet Points */}
                  {highlightsArray.length > 0 && (
                    <div className="space-y-2.5 mb-6">
                      <div className="text-xs font-mono uppercase tracking-wider text-[var(--foreground-muted)] mb-2 flex items-center gap-1.5">
                        <Code2 className="h-3.5 w-3.5 text-[#8B5CF6]" />
                        Key Engineering Deliverables:
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-[var(--foreground-secondary)]">
                        {highlightsArray.map((hl, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Stack Chips */}
                  {techsArray.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-subtle)]">
                      {techsArray.map((t, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="text-xs font-mono bg-[var(--surface-hover)] hover:bg-[#8B5CF6]/15 hover:text-[#8B5CF6] transition-colors"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
