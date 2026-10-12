import * as React from "react";
import { Badge } from "@/components/ui/badge";

interface SkillItem {
  id: string;
  name: string;
  proficiency: number;
  featured: boolean;
}

interface SkillCategoryGroup {
  id: string;
  name: string;
  skills: SkillItem[];
}

interface SkillsProps {
  categories: SkillCategoryGroup[];
}

export function PortfolioSkills({ categories }: SkillsProps) {
  return (
    <section id="skills" className="py-24 border-t border-[var(--border)] bg-[var(--surface)]/50">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div className="flex flex-col mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#7C3AED] mb-2">
            02 // Capabilities
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Skills & Technical Stack
          </h2>
          <p className="text-sm sm:text-base text-[var(--foreground-secondary)] max-w-xl mt-2">
            Core technologies and tools utilized to ship production-grade architectures and user interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-[16px] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm hover:shadow-[0_4px_20px_rgba(124,58,237,0.04)] transition-all"
            >
              <h3 className="text-base font-semibold text-[var(--foreground)] pb-4 mb-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
                <span>{category.name}</span>
                <span className="text-xs font-mono text-[var(--foreground-muted)]">
                  {category.skills.length} tools
                </span>
              </h3>

              <div className="flex flex-col gap-4">
                {category.skills.map((skill) => (
                  <div key={skill.id} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-medium text-[var(--foreground)] flex items-center gap-2">
                        {skill.name}
                        {skill.featured && (
                          <Badge variant="default" className="text-[10px] px-1.5 py-0">
                            Core
                          </Badge>
                        )}
                      </span>
                      <span className="font-mono text-xs text-[var(--foreground-muted)]">
                        {skill.proficiency}%
                      </span>
                    </div>
                    {/* Proficiency bar */}
                    <div className="h-1.5 w-full rounded-full bg-[var(--surface-hover)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] transition-all duration-500"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
