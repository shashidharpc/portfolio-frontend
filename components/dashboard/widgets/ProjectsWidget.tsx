"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toggleProjectFeatured } from "@/features/projects/actions";
import { ArrowUpRight, Eye, FolderKanban, Star } from "lucide-react";

interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  featured: boolean;
  viewsCount: number;
  published: boolean;
}

interface ProjectsWidgetProps {
  projects: ProjectItem[];
}

export function ProjectsWidget({ projects }: ProjectsWidgetProps) {
  const [items, setItems] = React.useState(projects);

  async function handleToggleFeatured(id: string) {
    // Optimistic update
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
    await toggleProjectFeatured(id);
  }

  return (
    <Card className="h-full flex flex-col border-[var(--border)] bg-[var(--card)]">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2">
          <FolderKanban className="h-4 w-4 text-[#7C3AED]" />
          Projects Management
        </CardTitle>
        <Button asChild variant="ghost" size="sm" className="text-xs gap-1">
          <Link href="/dashboard/projects">
            Manage All
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-2 pt-1 flex-1">
        {items.length === 0 ? (
          <div className="text-xs text-[var(--foreground-muted)] py-6 text-center">
            No projects added yet. Click Quick Actions to create one.
          </div>
        ) : (
          items.slice(0, 4).map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-[10px] border border-[var(--border-subtle)] bg-[var(--surface)] p-2.5 hover:border-[#7C3AED]/30 transition-all"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  onClick={() => handleToggleFeatured(p.id)}
                  className={`p-1 rounded transition-colors ${
                    p.featured
                      ? "text-amber-500 hover:text-amber-600"
                      : "text-[var(--foreground-muted)] hover:text-amber-500"
                  }`}
                  aria-label="Toggle featured"
                >
                  <Star className={`h-4 w-4 ${p.featured ? "fill-amber-500" : ""}`} />
                </button>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-[var(--foreground)] truncate">
                    {p.title}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--foreground-muted)]">
                    /{p.slug}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[11px] font-mono text-[var(--foreground-muted)]">
                  <Eye className="h-3 w-3" />
                  {p.viewsCount}
                </span>
                <Button asChild variant="outline" size="sm" className="h-[28px] px-2 text-[11px]">
                  <Link href={`/projects/${p.slug}`} target="_blank">
                    Preview
                  </Link>
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
