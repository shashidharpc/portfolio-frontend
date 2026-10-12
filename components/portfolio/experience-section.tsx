import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
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
    <section id="experience" className="py-24 border-t border-[var(--border)]">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div className="flex flex-col mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#7C3AED] mb-2">
            03 // Career
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Experience & Leadership
          </h2>
          <p className="text-sm sm:text-base text-[var(--foreground-secondary)] max-w-xl mt-2">
            Track record of driving architectural design and leading product engineering initiatives.
          </p>
        </div>

        <div className="relative border-l-2 border-[var(--border)] ml-3 sm:ml-4 space-y-12">
          {experiences.map((exp) => {
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
              <div key={exp.id} className="relative pl-6 sm:pl-8 group">
                {/* Timeline node */}
                <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-[#7C3AED] bg-[var(--background)] group-hover:bg-[#7C3AED] transition-colors" />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                  <h3 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
                    {exp.role}
                    <span className="text-sm font-normal text-[var(--foreground-muted)]">
                      @ {exp.company}
                    </span>
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--foreground-muted)]">
                    <Calendar className="h-3.5 w-3.5 text-[#7C3AED]" />
                    <span>
                      {formatDate(exp.startDate)} –{" "}
                      {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                    </span>
                    {exp.isCurrent && (
                      <Badge variant="success" className="text-[10px] py-0">
                        Current
                      </Badge>
                    )}
                  </div>
                </div>

                {exp.location && (
                  <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-secondary)] mb-3">
                    <MapPin className="h-3.5 w-3.5 text-[var(--foreground-muted)]" />
                    <span>{exp.location}</span>
                  </div>
                )}

                <p className="text-sm sm:text-base text-[var(--foreground-secondary)] leading-relaxed mb-4 max-w-3xl">
                  {exp.description}
                </p>

                {highlightsArray.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs sm:text-sm text-[var(--foreground-secondary)] mb-4 max-w-3xl">
                    {highlightsArray.map((hl, i) => (
                      <li key={i}>{hl}</li>
                    ))}
                  </ul>
                )}

                {techsArray.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {techsArray.map((t, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs font-mono bg-[var(--surface-hover)]"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
