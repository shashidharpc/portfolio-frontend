"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toggleAvailability } from "@/features/content/actions";
import { resetDashboardLayout } from "@/features/layout/actions";
import {
  FolderPlus,
  RotateCcw,
  Sparkles,
  UserCheck,
  UserX,
} from "lucide-react";
import Link from "next/link";

interface QuickActionsWidgetProps {
  initialAvailable: boolean;
  onResetLayout?: () => void;
}

export function QuickActionsWidget({
  initialAvailable,
  onResetLayout,
}: QuickActionsWidgetProps) {
  const [available, setAvailable] = React.useState(initialAvailable);
  const [isUpdating, setIsUpdating] = React.useState(false);

  async function handleToggle() {
    setIsUpdating(true);
    try {
      const res = await toggleAvailability();
      if (res.success && res.availableForHire !== undefined) {
        setAvailable(res.availableForHire);
      }
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleResetLayout() {
    if (confirm("Reset widget layout order and sizes to default?")) {
      await resetDashboardLayout();
      if (onResetLayout) onResetLayout();
    }
  }

  return (
    <Card className="h-full flex flex-col border-[var(--border)] bg-[var(--card)]">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#7C3AED]" />
            Quick Actions
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-1">
        <Button asChild className="w-full justify-start gap-2 text-xs">
          <Link href="/dashboard/projects?action=new">
            <FolderPlus className="h-4 w-4" />
            Create New Project
          </Link>
        </Button>

        <Button
          variant={available ? "outline" : "secondary"}
          onClick={handleToggle}
          disabled={isUpdating}
          className="w-full justify-start gap-2 text-xs"
        >
          {available ? (
            <>
              <UserCheck className="h-4 w-4 text-emerald-500" />
              <span>Availability: <strong className="text-emerald-500">Open for Hire</strong></span>
            </>
          ) : (
            <>
              <UserX className="h-4 w-4 text-amber-500" />
              <span>Availability: <strong className="text-amber-500">Engaged</strong></span>
            </>
          )}
        </Button>

        <Button
          variant="ghost"
          onClick={handleResetLayout}
          className="w-full justify-start gap-2 text-xs text-[var(--foreground-secondary)] hover:text-[#7C3AED]"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Widget Layout to Default
        </Button>
      </CardContent>
    </Card>
  );
}
