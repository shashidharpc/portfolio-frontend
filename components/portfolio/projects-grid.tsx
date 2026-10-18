"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Eye, Sparkles, Layers, QrCode, CheckSquare, Car } from "lucide-react";
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

function ProjectCard({ project }: { project: ProjectItem }) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  // 3D Tilt calculation
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [7, -7]), {
    damping: 20,
    stiffness: 200,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-7, 7]), {
    damping: 20,
    stiffness: 200,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  let tagsList: string[] = [];
  try {
    tagsList = JSON.parse(project.tags);
  } catch {
    tagsList = [];
  }

  // Get project specific decorative icon
  const getProjectIcon = (slug: string) => {
    if (slug.includes("attendance")) return QrCode;
    if (slug.includes("task")) return CheckSquare;
    return Car;
  };

  const ProjectIcon = getProjectIcon(project.slug);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      data-cursor="project"
      className="group relative flex flex-col rounded-[22px] border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:border-[#8B5CF6]/50 hover:shadow-[0_16px_40px_rgba(139,92,246,0.18)] transition-all duration-300"
    >
      {/* Visual Header / Cover with decorative overlay */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0e0b1f]">
        <img
          src={project.coverImage}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-[var(--card)]/40 to-transparent" />

        {/* Project Type Icon Floating in corner */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          {project.featured && (
            <Badge
              variant="default"
              className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white text-xs px-2.5 py-0.5 shadow-md flex items-center gap-1 border-0"
            >
              <Sparkles className="h-3 w-3" />
              Featured
            </Badge>
          )}
        </div>

        {/* Views Count Badge */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-mono text-zinc-200 border border-white/10">
          <Eye className="h-3 w-3 text-[#8B5CF6]" />
          <span>{project.viewsCount} views</span>
        </div>

        {/* Floating title watermark icon */}
        <div className="absolute bottom-3 left-6 z-10 flex items-center gap-2 text-white/90">
          <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-black/50 backdrop-blur-md border border-white/15 text-[#8B5CF6]">
            <ProjectIcon className="h-4 w-4" />
          </div>
          <span className="text-xs font-mono font-medium tracking-wider text-zinc-300">
            Architectural System
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {tagsList.slice(0, 5).map((t, idx) => (
            <span
              key={idx}
              className="rounded-[6px] bg-[var(--surface-hover)] border border-[var(--border-subtle)] px-2.5 py-0.5 text-[11px] font-mono text-[var(--foreground-secondary)]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[#8B5CF6] transition-colors mb-2 leading-tight">
          <Link href={`/projects/${project.slug}`} className="focus:outline-none">
            {project.title}
          </Link>
        </h3>

        {/* Tagline */}
        <p className="text-xs sm:text-sm font-medium text-emerald-400/90 mb-3 font-mono">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] line-clamp-3 leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Actions Footer */}
        <div className="mt-auto flex items-center justify-between pt-5 border-t border-[var(--border-subtle)]">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B5CF6] hover:text-[#7C3AED] transition-colors group/link"
          >
            <span>Read Architectural Case Study</span>
            <ArrowUpRight className="h-4 w-4 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </Link>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[#8B5CF6]/50 hover:bg-[var(--surface-hover)] transition-all"
                aria-label={`${project.title} GitHub repository`}
                title="View GitHub Repository"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
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
    <section id="projects" className="py-24 border-t border-[var(--border)] relative">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#8B5CF6] mb-2 block">
              05 // Production Software
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
              Featured Projects &amp; Blueprints
            </h2>
            <p className="text-sm sm:text-base text-[var(--foreground-secondary)] max-w-xl mt-3 leading-relaxed">
              Full-stack web applications featuring dynamic QR generation, HTML5 geofencing, relational database schemas, and role-based access control.
            </p>
          </div>

          {/* Tag Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  activeTag === tag
                    ? "bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                    : "bg-[var(--card)] border border-[var(--border)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:border-[#8B5CF6]/40"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Tilt Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
