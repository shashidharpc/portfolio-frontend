"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";

interface DashboardHeaderProps {
  onToggleMobileSidebar?: () => void;
  userEmail?: string | null;
}

export function DashboardHeader({
  onToggleMobileSidebar,
  userEmail,
}: DashboardHeaderProps) {
  const pathname = usePathname();

  // Determine breadcrumb label
  const breadcrumb = React.useMemo(() => {
    if (pathname === "/dashboard") return "Widget Canvas";
    if (pathname.includes("/dashboard/projects")) return "Projects Manager";
    if (pathname.includes("/dashboard/content")) return "Content & Skills";
    if (pathname.includes("/dashboard/messages")) return "Messages Inbox";
    if (pathname.includes("/dashboard/logs")) return "Audit & Event Logs";
    if (pathname.includes("/dashboard/settings")) return "Appearance Settings";
    return "Dashboard";
  }, [pathname]);

  return (
    <header className="h-16 border-b border-[var(--border)] bg-[var(--card)] px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile menu trigger + Breadcrumb */}
      <div className="flex items-center gap-4">
        {onToggleMobileSidebar && (
          <Button
            variant="ghost"
            size="iconSm"
            className="md:hidden"
            onClick={onToggleMobileSidebar}
            aria-label="Toggle Navigation"
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
        <div className="flex items-center gap-2 text-xs font-medium text-[var(--foreground-muted)]">
          <span>Admin</span>
          <span>/</span>
          <span className="font-semibold text-[var(--foreground)]">{breadcrumb}</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        <div className="h-4 w-px bg-[var(--border)]" />

        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-semibold text-[var(--foreground)]">
              {userEmail || "admin@portfolio.dev"}
            </span>
            <span className="text-[10px] font-mono text-emerald-500">Active Session</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="gap-1.5 text-xs h-[36px]"
          >
            <LogOut className="h-3.5 w-3.5 text-red-500" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
