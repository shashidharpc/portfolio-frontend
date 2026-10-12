"use client";

import * as React from "react";
import {
  createProject,
  updateProject,
  deleteProject,
  toggleProjectFeatured,
} from "@/features/projects/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  ArrowUpRight,
  Eye,
  Loader2,
  Pencil,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  contentMdx?: string | null;
  coverImage: string;
  tags: string;
  liveUrl?: string | null;
  githubUrl?: string | null;
  featured: boolean;
  published: boolean;
  viewsCount: number;
}

export function ProjectsManager({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = React.useState<Project[]>(initialProjects);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingProject, setEditingProject] = React.useState<Project | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Form states
  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [tagline, setTagline] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [contentMdx, setContentMdx] = React.useState("");
  const [coverImage, setCoverImage] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [liveUrl, setLiveUrl] = React.useState("");
  const [githubUrl, setGithubUrl] = React.useState("");
  const [featured, setFeatured] = React.useState(false);

  function openCreateModal() {
    setEditingProject(null);
    setTitle("");
    setSlug("");
    setTagline("");
    setDescription("");
    setContentMdx("");
    setCoverImage("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80");
    setTags("TypeScript, Next.js 15, Tailwind CSS");
    setLiveUrl("");
    setGithubUrl("");
    setFeatured(false);
    setError(null);
    setIsDialogOpen(true);
  }

  function openEditModal(project: Project) {
    setEditingProject(project);
    setTitle(project.title);
    setSlug(project.slug);
    setTagline(project.tagline);
    setDescription(project.description);
    setContentMdx(project.contentMdx || "");
    setCoverImage(project.coverImage);

    let parsedTags = "";
    try {
      parsedTags = JSON.parse(project.tags).join(", ");
    } catch {
      parsedTags = project.tags;
    }
    setTags(parsedTags);
    setLiveUrl(project.liveUrl || "");
    setGithubUrl(project.githubUrl || "");
    setFeatured(project.featured);
    setError(null);
    setIsDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("tagline", tagline);
    formData.append("description", description);
    formData.append("contentMdx", contentMdx);
    formData.append("coverImage", coverImage);
    formData.append("tags", tags);
    formData.append("liveUrl", liveUrl);
    formData.append("githubUrl", githubUrl);
    formData.append("featured", String(featured));

    try {
      if (editingProject) {
        const res = await updateProject(editingProject.id, formData);
        if (res.success && res.project) {
          setProjects((prev) =>
            prev.map((p) => (p.id === editingProject.id ? (res.project as Project) : p))
          );
          setIsDialogOpen(false);
        } else {
          setError(res.error || "Failed to update project");
        }
      } else {
        const res = await createProject(formData);
        if (res.success && res.project) {
          setProjects((prev) => [res.project as Project, ...prev]);
          setIsDialogOpen(false);
        } else {
          setError(res.error || "Failed to create project");
        }
      }
    } catch {
      setError("An unexpected network error occurred");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this project? This will be recorded in the audit log.")) {
      return;
    }
    // Optimistic
    setProjects((prev) => prev.filter((p) => p.id !== id));
    await deleteProject(id);
  }

  async function handleToggleFeatured(id: string) {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
    await toggleProjectFeatured(id);
  }

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Projects Management
          </h1>
          <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] mt-1">
            Create, modify, toggle featured status, or inspect metrics on all portfolio case studies.
          </p>
        </div>

        <Button onClick={openCreateModal} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Project
        </Button>
      </div>

      {/* Projects Table / Card Grid */}
      <div className="rounded-[16px] border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-sm">
        <div className="divide-y divide-[var(--border)]">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[var(--surface-hover)] transition-colors"
            >
              <div className="flex items-start sm:items-center gap-4 min-w-0">
                <button
                  onClick={() => handleToggleFeatured(project.id)}
                  className={`mt-0.5 sm:mt-0 p-1.5 rounded-full transition-colors ${
                    project.featured
                      ? "text-amber-500 hover:text-amber-600"
                      : "text-[var(--foreground-muted)] hover:text-amber-500"
                  }`}
                  title="Toggle Featured"
                >
                  <Star className={`h-5 w-5 ${project.featured ? "fill-amber-500" : ""}`} />
                </button>

                <div className="h-14 w-20 rounded-[10px] overflow-hidden bg-[var(--surface)] flex-shrink-0 border border-[var(--border)]">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[var(--foreground)] truncate">
                      {project.title}
                    </span>
                    {project.featured && (
                      <Badge variant="gradient" className="text-[10px] py-0">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-[var(--foreground-secondary)] line-clamp-1 mt-0.5">
                    {project.tagline}
                  </span>
                  <span className="text-[11px] font-mono text-[var(--foreground-muted)] mt-1">
                    Slug: /{project.slug} • {project.viewsCount} views
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <Button asChild variant="outline" size="sm" className="h-[36px] px-3 text-xs gap-1">
                  <Link href={`/projects/${project.slug}`} target="_blank">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    Preview
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditModal(project)}
                  className="h-[36px] px-3 text-xs gap-1"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(project.id)}
                  className="h-[36px] px-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-500/10"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? `Edit Project: ${editingProject.title}` : "Create New Project"}
            </DialogTitle>
          </DialogHeader>

          {error && (
            <div className="rounded-[10px] bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--foreground)]">
                  Project Title *
                </label>
                <Input
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!editingProject) {
                      setSlug(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)+/g, "")
                      );
                    }
                  }}
                  placeholder="e.g. Nexus Cloud Orchestrator"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--foreground)]">
                  URL Slug *
                </label>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. nexus-cloud-orchestrator"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--foreground)]">
                One-Line Tagline *
              </label>
              <Input
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Zero-config container deployment platform."
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--foreground)]">
                Brief Overview *
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="High-level architectural summary..."
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--foreground)]">
                Cover Image URL *
              </label>
              <Input
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--foreground)]">
                Tags (comma separated)
              </label>
              <Input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="TypeScript, Next.js, Docker, PostgreSQL"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--foreground)]">
                  Live URL (Optional)
                </label>
                <Input
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--foreground)]">
                  GitHub URL (Optional)
                </label>
                <Input
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--foreground)]">
                Case Study Markdown Details (Optional)
              </label>
              <Textarea
                value={contentMdx}
                onChange={(e) => setContentMdx(e.target.value)}
                rows={5}
                placeholder="## Architecture Highlights&#10;Key engineering decisions..."
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="featuredCheck"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="rounded border-[var(--border)] text-[#7C3AED] focus:ring-[#7C3AED]"
              />
              <label htmlFor="featuredCheck" className="text-xs text-[var(--foreground)]">
                Highlight as Featured Project on homepage
              </label>
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving} className="gap-2">
                {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                {editingProject ? "Save Changes" : "Create Project"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
