"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  CheckCircle2,
  Clock,
  Globe,
  MapPin,
  Terminal,
  ShieldCheck,
  Database,
  QrCode,
  Award,
  Layers,
  Phone,
  Mail,
} from "lucide-react";

interface AboutProps {
  bio: string;
  location?: string | null;
  availableForHire: boolean;
}

export function PortfolioAbout({ bio, location, availableForHire }: AboutProps) {
  const stats = [
    { label: "MCA CGPA", value: "8.75", highlight: "Presidency College" },
    { label: "BCA Percentage", value: "89.86%", highlight: "First Class Distinction" },
    { label: "Production Platforms", value: "3+", highlight: "Flask, PHP, MongoDB" },
    { label: "Certifications", value: "4", highlight: "IBM, UMich, Coursera" },
  ];

  const pillars = [
    {
      icon: Terminal,
      title: "Secure Python & Flask APIs",
      description:
        "Modular blueprint architectures, RESTful API design, request sanitization, and robust transactional session management.",
      color: "text-[#8B5CF6]",
    },
    {
      icon: ShieldCheck,
      title: "Granular RBAC Authorization",
      description:
        "Multi-tier Role-Based Access Control isolating administrative, instructor, and student dashboards with session integrity.",
      color: "text-[#3B82F6]",
    },
    {
      icon: Database,
      title: "Scalable MySQL & MongoDB",
      description:
        "Normalized relational schemas with primary/foreign key indexing in MySQL alongside flexible document models in MongoDB.",
      color: "text-emerald-400",
    },
    {
      icon: QrCode,
      title: "Dynamic QR & Geofence Verification",
      description:
        "Temporal algorithm design with real-time QR code expiration and client-side HTML5 Geolocation polygon verification.",
      color: "text-amber-400",
    },
  ];

  return (
    <section id="about" className="py-24 border-t border-[var(--border)] relative">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#8B5CF6] mb-2">
            01 // Engineering Profile
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
            About & Core Technical Philosophy
          </h2>
          <p className="text-sm sm:text-base text-[var(--foreground-secondary)] max-w-2xl mt-3 leading-relaxed">
            Bridging strong computer science fundamentals in Data Structures, Algorithms, and Object-Oriented Design with production full-stack execution.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context, Location & Quick Contacts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="rounded-[20px] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#8B5CF6]" />
                Full Stack Software Engineer
              </h3>

              <div className="flex flex-col gap-3.5 text-sm text-[var(--foreground-secondary)] mb-6">
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-[#8B5CF6] shrink-0" />
                  <span>{location || "Bengaluru, Karnataka, India"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe className="h-4 w-4 text-[#3B82F6] shrink-0" />
                  <span>Ready for Onsite & Hybrid Roles</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-purple-400 shrink-0" />
                  <a
                    href="mailto:shashidharpc1012@gmail.com"
                    className="hover:text-[#8B5CF6] transition-colors"
                  >
                    shashidharpc1012@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                  <a
                    href="tel:+917349128889"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    +91 7349128889
                  </a>
                </div>
                <div className="flex items-center gap-2.5 pt-2 border-t border-[var(--border-subtle)]">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-emerald-400 font-medium">
                    {availableForHire
                      ? "Available for Software Engineering Roles"
                      : "Engaged in Project"}
                  </span>
                </div>
              </div>

              {/* Fast Stats Mini Grid */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[var(--border-subtle)]">
                {stats.map((st, i) => (
                  <div
                    key={i}
                    className="rounded-[12px] bg-[var(--surface-hover)] p-3 border border-[var(--border-subtle)]"
                  >
                    <div className="text-xl sm:text-2xl font-black font-jakarta text-[var(--foreground)]">
                      {st.value}
                    </div>
                    <div className="text-[11px] font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                      {st.label}
                    </div>
                    <div className="text-[10px] text-[#8B5CF6] font-mono mt-0.5">
                      {st.highlight}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio Narrative & Architectural Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="text-base sm:text-lg text-[var(--foreground)] leading-relaxed mb-8 space-y-4">
              <p>
                {bio}
              </p>
              <p className="text-sm sm:text-base text-[var(--foreground-secondary)] leading-relaxed">
                Skilled in designing end-to-end architectures where database normalization, query speed, and data security are top priorities. Dedicated to clean code, modular Python blueprints, robust PHP transactional pipelines, and intuitive user interfaces built with modern HTML5, CSS3, and JavaScript.
              </p>
            </div>

            {/* Architectural Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pil, idx) => {
                const IconComponent = pil.icon;
                return (
                  <Card
                    key={idx}
                    className="p-5 border-[var(--border)] bg-[var(--card)] hover:border-[#8B5CF6]/40 hover:shadow-[0_8px_25px_rgba(139,92,246,0.08)] transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[var(--surface-hover)] group-hover:scale-110 transition-transform">
                        <IconComponent className={`h-4.5 w-4.5 ${pil.color}`} />
                      </div>
                      <h3 className="font-semibold text-sm text-[var(--foreground)] group-hover:text-[#8B5CF6] transition-colors">
                        {pil.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] leading-relaxed">
                      {pil.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
