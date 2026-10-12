import * as React from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, Globe, MapPin, Terminal } from "lucide-react";

interface AboutProps {
  bio: string;
  location?: string | null;
  availableForHire: boolean;
}

export function PortfolioAbout({ bio, location, availableForHire }: AboutProps) {
  return (
    <section id="about" className="py-24 border-t border-[var(--border)]">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          {/* Left Column: Heading and Context */}
          <div className="md:w-1/3 flex flex-col">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#7C3AED] mb-2">
              01 // Background
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mb-4">
              Engineering with precision, empathy, and scale.
            </h2>
            <div className="flex flex-col gap-3 mt-4 text-sm text-[var(--foreground-secondary)]">
              {location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#7C3AED]" />
                  <span>Based in {location}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-[#3B82F6]" />
                <span>Working across Global Timezones</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>
                  {availableForHire ? "Currently accepting select engagements" : "Engaged in full-time role"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio and Core Engineering Pillars */}
          <div className="md:w-2/3 flex flex-col">
            <p className="text-base sm:text-lg text-[var(--foreground)] leading-relaxed mb-8 max-w-[70ch]">
              {bio}
            </p>

            {/* Engineering Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-5 border-[var(--border)] bg-[var(--surface)] hover:border-[#7C3AED]/30 transition-all">
                <div className="flex items-center gap-2.5 mb-2">
                  <Terminal className="h-4 w-4 text-[#7C3AED]" />
                  <h3 className="font-semibold text-sm text-[var(--foreground)]">
                    Type-Safe Fullstack Systems
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] leading-relaxed">
                  End-to-end TypeScript validation from database schemas (Prisma/PostgreSQL) to API boundaries and React Server Components.
                </p>
              </Card>

              <Card className="p-5 border-[var(--border)] bg-[var(--surface)] hover:border-[#7C3AED]/30 transition-all">
                <div className="flex items-center gap-2.5 mb-2">
                  <Clock className="h-4 w-4 text-[#3B82F6]" />
                  <h3 className="font-semibold text-sm text-[var(--foreground)]">
                    Observability & High Performance
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] leading-relaxed">
                  Fast page loads, strict 95+ Core Web Vitals, structured logging with Pino, and sub-second database query execution.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
