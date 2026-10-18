import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECTS_DATA, PROFILE_DATA } from "@/lib/portfolio-data";
import { PortfolioNavbar } from "@/components/portfolio/navbar";
import { PortfolioFooter } from "@/components/portfolio/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpRight, Calendar, Eye } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Case Study — Shashidhar P C" };
  }

  return {
    title: `${project.title} — Architectural Case Study`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const socialLinks = PROFILE_DATA.socialLinks;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <PortfolioNavbar />

      <main id="main-content" className="flex-1 pt-28 pb-24">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-8">
          {/* Back link */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[var(--foreground-secondary)] hover:text-[#7C3AED] transition-colors mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to All Projects
          </Link>

          {/* Header */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              {project.technologies.map((tech, i) => (
                <Badge key={i} variant="secondary" className="font-mono text-xs">
                  {tech}
                </Badge>
              ))}
              {project.featured && (
                <Badge variant="gradient" className="text-xs">
                  Featured
                </Badge>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--foreground)]">
              {project.title}
            </h1>

            <p className="text-lg text-[var(--foreground-secondary)] leading-relaxed">
              {project.tagline}
            </p>

            {/* Meta info & Action CTAs */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
              <div className="flex items-center gap-4 text-xs font-mono text-[var(--foreground-muted)]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  October 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5" />
                  {project.viewsCount} views
                </span>
              </div>

              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <Button asChild variant="outline" size="sm" className="gap-2">
                    <a href={project.githubUrl} target="_blank" rel="noreferrer">
                      <GithubIcon className="h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button asChild size="sm" className="gap-2">
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      Live Deployment
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Hero Cover Image */}
          <div className="relative aspect-video w-full rounded-[16px] overflow-hidden border border-[var(--border)] shadow-[0_8px_32px_rgba(20,18,43,0.06)] mb-12">
            <img
              src={project.coverImage}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Project Details */}
          <div className="rounded-[16px] border border-[var(--border)] bg-[var(--card)] p-8 sm:p-10 shadow-sm">
            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-[var(--foreground)]">
              <h2 className="text-xl font-bold border-b border-[var(--border-subtle)] pb-2 text-[var(--foreground)]">
                Project Overview &amp; Architecture
              </h2>
              <p className="text-base text-[var(--foreground-secondary)] leading-relaxed">
                {project.description}
              </p>

              {project.content ? (
                <div className="whitespace-pre-line text-sm sm:text-base text-[var(--foreground-secondary)] leading-relaxed pt-4 border-t border-[var(--border-subtle)]">
                  {project.content}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>

      <PortfolioFooter socialLinks={socialLinks} />
    </div>
  );
}
