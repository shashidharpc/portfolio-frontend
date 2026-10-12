"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Eye } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";

interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  coverImage: string;
  tags: string; // JSON string
  liveUrl?: string | null;
  githubUrl?: string | null;
  featured: boolean;
  viewsCount: number;
}

interface ProjectsGridProps {
  projects: ProjectItem[];
}

export function PortfolioProjectsGrid({ projects }: ProjectsGridProps) {
  const [activeTag, setActiveTag] = React.useState<string>("All");

  // Extract all unique tags
  const allTags = React.useMemo(() => {
    const set = new Set<string>();
    set.add("All");
    projects.forEach((p) => {
      try {
        const parsed: string[] = JSON.parse(p.tags);
        parsed.forEach((t) => set.add(t));
      } catch {
        // ignore
      }
    });
    return Array.from(set);
  }, [projects]);

  const filteredProjects = React.useMemo(() => {
    if (activeTag === "All") return projects;
    return projects.filter((p) => {
      try {
        const parsed: string[] = JSON.parse(p.tags);
        return parsed.includes(activeTag);
      } catch {
        return false;
      }
    });
  }, [projects, activeTag]);

  return (
    <section id="projects" className="py-24 border-t border-[var(--border)]">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#7C3AED] mb-2 block">
              04 // Selected Works
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-[var(--foreground-secondary)] max-w-xl mt-2">
              Architectural blueprints, open-source utilities, and full-stack software built for scale.
            </p>
          </div>

          {/* Tag Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  activeTag === tag
                    ? "bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white shadow-sm"
                    : "bg-[var(--surface-hover)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--border)]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            let tagsList: string[] = [];
            try {
              tagsList = JSON.parse(project.tags);
            } catch {
              tagsList = [];
            }

            return (
              <article
                key={project.id}
                className="group relative flex flex-col rounded-[16px] border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-[0_1px_2px_rgba(20,18,43,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(124,58,237,0.09)] hover:border-[#7C3AED]/40 transition-all duration-300"
              >
                {/* Image Showcase */}
                <div className="relative aspect-video w-full overflow-hidden bg-[var(--surface)]">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                  {project.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="gradient" className="text-xs">
                        Featured
                      </Badge>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono text-white">
                    <Eye className="h-3 w-3" />
                    <span>{project.viewsCount}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {tagsList.slice(0, 4).map((t, idx) => (
                      <span
                        key={idx}
                        className="rounded-[6px] bg-[var(--surface-hover)] px-2 py-0.5 text-[11px] font-mono text-[var(--foreground-secondary)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Title and Tagline */}
                  <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[#7C3AED] transition-colors mb-2">
                    <Link href={`/projects/${project.slug}`} className="focus:outline-none">
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] line-clamp-2 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Actions footer */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#7C3AED] hover:underline"
                    >
                      Case Study & Details
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[#7C3AED]/40 transition-colors"
                          aria-label={`${project.title} GitHub repository`}
                        >
                          <GithubIcon className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[#7C3AED] hover:border-[#7C3AED]/40 transition-colors"
                          aria-label={`${project.title} live demo`}
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
