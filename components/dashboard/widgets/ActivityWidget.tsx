"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Activity } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

interface ActivityItem {
  id: string;
  action: string;
  entity: string;
  entityId?: string | null;
  createdAt: Date | string;
}

interface ActivityWidgetProps {
  logs: ActivityItem[];
}

export function ActivityWidget({ logs }: ActivityWidgetProps) {
  function getBadgeVariant(action: string) {
    switch (action) {
      case "CREATE":
        return "success";
      case "DELETE":
        return "outline";
      case "LAYOUT_CHANGE":
        return "gradient";
      default:
        return "secondary";
    }
  }

  return (
    <Card className="h-full flex flex-col border-[var(--border)] bg-[var(--card)]">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2">
          <Activity className="h-4 w-4 text-[#7C3AED]" />
          Recent Audit Stream
        </CardTitle>
        <Button asChild variant="ghost" size="sm" className="text-xs gap-1">
          <Link href="/dashboard/logs">
            Full Audit Logs
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-2.5 pt-1 flex-1">
        {logs.length === 0 ? (
          <div className="text-xs text-[var(--foreground-muted)] py-6 text-center">
            No audit records logged yet.
          </div>
        ) : (
          logs.slice(0, 4).map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between rounded-[10px] border border-[var(--border-subtle)] bg-[var(--surface)] p-2.5 text-xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Badge
                  variant={getBadgeVariant(log.action)}
                  className="font-mono text-[10px] uppercase"
                >
                  {log.action}
                </Badge>
                <span className="font-semibold text-[var(--foreground)] truncate">
                  {log.entity}
                </span>
                {log.entityId && (
                  <span className="font-mono text-[10px] text-[var(--foreground-muted)] truncate max-w-[120px]">
                    ({log.entityId})
                  </span>
                )}
              </div>
              <span className="font-mono text-[10px] text-[var(--foreground-muted)] whitespace-nowrap pl-2">
                {formatDateTime(log.createdAt)}
              </span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
