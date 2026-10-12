"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  FolderKanban,
  LayoutGrid,
  Mail,
  Palette,
  ShieldAlert,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    name: "Widget Canvas",
    href: "/dashboard",
    icon: LayoutGrid,
    exact: true,
  },
  {
    name: "Projects Manager",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    name: "Content & Skills",
    href: "/dashboard/content",
    icon: BookOpen,
  },
  {
    name: "Messages Inbox",
    href: "/dashboard/messages",
    icon: Mail,
  },
  {
    name: "Audit & Event Logs",
    href: "/dashboard/logs",
    icon: ShieldAlert,
  },
  {
    name: "Appearance Settings",
    href: "/dashboard/settings",
    icon: Palette,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] flex-shrink-0 border-r border-[var(--border)] bg-[var(--card)] flex flex-col min-h-screen">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-[var(--border)] gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-gradient-to-tr from-[#7C3AED] to-[#3B82F6] text-white font-mono text-xs font-bold shadow-sm">
          SP
        </span>
        <div className="flex flex-col">
          <span className="font-bold text-sm text-[var(--foreground)] tracking-tight">
            Portfolio Admin
          </span>
          <span className="text-[10px] font-mono text-[var(--foreground-muted)]">
            v1.0 • Next.js 15
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1.5">
        <div className="px-3 pb-2 text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--foreground-muted)]">
          Core Workspaces
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-[10px] px-3 py-2 text-xs font-medium transition-all",
                isActive
                  ? "bg-gradient-to-r from-[#7C3AED]/15 to-[#3B82F6]/10 text-[#7C3AED] dark:text-[#A78BFA] font-semibold border-l-2 border-[#7C3AED]"
                  : "text-[var(--foreground-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4",
                  isActive ? "text-[#7C3AED]" : "text-[var(--foreground-muted)]"
                )}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer shortcut */}
      <div className="p-4 border-t border-[var(--border)]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between rounded-[10px] bg-[var(--surface)] p-2.5 text-xs text-[var(--foreground-secondary)] hover:text-[#7C3AED] hover:bg-[var(--surface-hover)] transition-all"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-[#7C3AED]" />
            View Live Site
          </span>
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
    </aside>
  );
}
