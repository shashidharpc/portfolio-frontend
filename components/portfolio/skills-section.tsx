"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface SkillItem {
  id: string;
  name: string;
  proficiency?: number;
  featured?: boolean;
}

interface SkillCategoryGroup {
  id: string;
  name: string;
  skills: SkillItem[];
}

interface SkillsProps {
  categories?: SkillCategoryGroup[];
}

export function PortfolioSkills({ categories = [] }: SkillsProps) {
  // Extract all skills from database categories or fallback to verified resume skills
  const extractedSkills = React.useMemo(() => {
    if (categories && categories.length > 0) {
      const all: string[] = [];
      categories.forEach((cat) => {
        cat.skills.forEach((s) => all.push(s.name));
      });
      if (all.length >= 8) return all;
    }
    return [];
  }, [categories]);

  // Row 1: Key languages, frameworks, and modern web stack (exact match to reference screenshot)
  const skillsList1 = [
    "Python",
    "TypeScript",
    "REST APIs",
    "Tailwind CSS",
    "MongoDB",
    "PostgreSQL",
    "Three.js",
    "Socket.IO",
    "Git",
    "AWS",
    "React.js",
    "Next.js",
    "JavaScript",
    "Node.js",
    "FastAPI",
    "Docker",
    ...(extractedSkills.slice(0, 8)),
  ];

  // Deduplicate row 1
  const uniqueSkills1 = Array.from(new Set(skillsList1));

  // Row 2: Core competencies, architectures, databases & tools
  const skillsList2 = [
    "Data Structures & Algorithms",
    "Object-Oriented Design",
    "Role-Based Access Control",
    "HTML5 & CSS3",
    "Bootstrap",
    "System Architecture",
    "Linux & Bash",
    "SQL Schemas",
    "Java",
    "C Programming",
    "SDLC & Agile",
    "Postman API Testing",
    ...(extractedSkills.slice(8)),
  ];

  // Deduplicate row 2
  const uniqueSkills2 = Array.from(new Set(skillsList2));

  return (
    <section id="skills" className="py-20 sm:py-28 border-t border-[var(--border)] relative bg-[var(--background)] transition-colors duration-300 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 mb-12 sm:mb-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          <span className="text-xs font-mono font-medium uppercase tracking-[0.22em] text-[var(--foreground-muted)] mb-3">
            TECHNICAL ARSENAL
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-jakarta font-extrabold tracking-tight text-[var(--foreground)]">
            Skills &amp; technologies.
          </h2>
        </motion.div>
      </div>

      {/* ─── FULL-WIDTH HORIZONTAL SCROLLING MARQUEE STRIP ─── */}
      <div
        className="w-full py-6 sm:py-8 border-y border-neutral-200/80 dark:border-neutral-800/90 bg-neutral-100/50 dark:bg-neutral-900/40 overflow-hidden relative select-none"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        }}
      >
        {/* Track 1: Continuous Smooth Left Scroll */}
        <div className="animate-marquee flex items-center">
          {[...uniqueSkills1, ...uniqueSkills1].map((skill, index) => (
            <React.Fragment key={`row1-${index}`}>
              <span className="text-sm sm:text-[15px] font-jakarta font-normal tracking-wide text-neutral-600 dark:text-neutral-400 whitespace-nowrap hover:text-neutral-900 dark:hover:text-white transition-colors duration-200 cursor-default">
                {skill}
              </span>
              <span className="text-[#FF5722] font-semibold mx-5 sm:mx-7 select-none text-sm sm:text-base">
                /
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Track 2: Continuous Smooth Right Scroll for Depth */}
        <div className="animate-marquee-reverse flex items-center mt-5 sm:mt-6">
          {[...uniqueSkills2, ...uniqueSkills2].map((skill, index) => (
            <React.Fragment key={`row2-${index}`}>
              <span className="text-sm sm:text-[15px] font-jakarta font-normal tracking-wide text-neutral-600 dark:text-neutral-400 whitespace-nowrap hover:text-neutral-900 dark:hover:text-white transition-colors duration-200 cursor-default">
                {skill}
              </span>
              <span className="text-[#FF5722] font-semibold mx-5 sm:mx-7 select-none text-sm sm:text-base">
                /
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
