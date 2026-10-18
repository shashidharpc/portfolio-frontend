"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle, ExternalLink, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PortfolioCertifications() {
  const certifications = [
    {
      title: "Developing Websites and Front Ends with Bootstrap",
      issuer: "IBM",
      type: "Professional Credential",
      description:
        "Comprehensive training in responsive web design, mobile-first architectures, grid layouts, and cross-browser UI development.",
      skills: ["Bootstrap 5", "Responsive Web Design", "HTML5 & CSS3", "Frontend Components"],
      badgeColor: "from-blue-600 to-indigo-700",
    },
    {
      title: "Building Web Applications in PHP",
      issuer: "University of Michigan",
      type: "University Specialization",
      description:
        "Deep exploration into PHP web architecture, relational database communication with MySQL, session management, and server-side form validation.",
      skills: ["PHP", "MySQL", "Web Applications", "Server-Side Logic", "Session Security"],
      badgeColor: "from-amber-600 to-rose-700",
    },
    {
      title: "Developing Frontend and Web Applications with Bootstrap",
      issuer: "Coursera",
      type: "Verified Course Certificate",
      description:
        "Building interactive frontend systems, responsive card layouts, modern typography, navigation bars, and utility-driven styling.",
      skills: ["Frontend Development", "Bootstrap Components", "UI Layouts", "JavaScript Integration"],
      badgeColor: "from-cyan-600 to-blue-700",
    },
    {
      title: "Figma UI/UX Design Essentials Part 1: Tools and Foundations",
      issuer: "Skillshare",
      type: "Design Credential",
      description:
        "Foundational user experience design, wireframing, high-fidelity prototyping, design tokens, and developer handoff workflows in Figma.",
      skills: ["Figma", "UI/UX Design", "Wireframing", "Component Systems", "Design Foundations"],
      badgeColor: "from-purple-600 to-pink-700",
    },
  ];

  return (
    <section id="certifications" className="py-24 border-t border-[var(--border)] bg-[var(--surface)]/20 relative">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#8B5CF6] mb-2">
            06 // Verified Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
            Licenses & Certifications
          </h2>
          <p className="text-sm sm:text-base text-[var(--foreground-secondary)] max-w-2xl mt-3 leading-relaxed">
            Industry and university verified certifications validating technical mastery across frontend engineering, backend PHP/MySQL architectures, and UI/UX design.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="flex flex-col rounded-[18px] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm hover:border-[#8B5CF6]/50 hover:shadow-[0_8px_25px_rgba(139,92,246,0.12)] hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Badge Icon Header */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-[12px] bg-gradient-to-tr ${cert.badgeColor} text-white shadow-md group-hover:scale-105 transition-transform`}
                >
                  <Award className="h-5 w-5" />
                </div>
                <Badge variant="outline" className="text-[10px] font-mono border-[var(--border-strong)]">
                  {cert.issuer}
                </Badge>
              </div>

              {/* Title & Issuer */}
              <h3 className="text-base font-bold text-[var(--foreground)] group-hover:text-[#8B5CF6] transition-colors leading-snug mb-2 flex-1">
                {cert.title}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mb-3">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Verified by {cert.issuer}</span>
              </div>

              <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed mb-4 line-clamp-3">
                {cert.description}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 mt-auto pt-3 border-t border-[var(--border-subtle)]">
                {cert.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="rounded-[5px] bg-[var(--surface-hover)] px-2 py-0.5 text-[10px] font-mono text-[var(--foreground-secondary)]"
                  >
                    {skill}
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
