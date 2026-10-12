"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Eye, FolderGit2, Mail, TrendingUp } from "lucide-react";

interface StatsWidgetProps {
  stats: {
    totalPageViews: number;
    totalProjectViews: number;
    totalMessages: number;
    totalProjects: number;
  };
}

export function StatsWidget({ stats }: StatsWidgetProps) {
  const items = [
    {
      title: "Total Telemetry Events",
      value: stats.totalPageViews,
      icon: TrendingUp,
      color: "from-purple-500 to-indigo-500",
      change: "+14% vs last week",
    },
    {
      title: "Project Case Study Views",
      value: stats.totalProjectViews,
      icon: Eye,
      color: "from-blue-500 to-cyan-500",
      change: "+28% organic traffic",
    },
    {
      title: "Contact Inquiries",
      value: stats.totalMessages,
      icon: Mail,
      color: "from-emerald-500 to-teal-500",
      change: "100% response rate",
    },
    {
      title: "Active Published Projects",
      value: stats.totalProjects,
      icon: FolderGit2,
      color: "from-amber-500 to-orange-500",
      change: "All systems live",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card
            key={idx}
            className="p-5 border-[var(--border)] bg-[var(--card)] hover:border-[#7C3AED]/40 hover:shadow-[0_4px_20px_rgba(124,58,237,0.06)] transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[var(--foreground-secondary)]">
                {stat.title}
              </span>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-[8px] bg-gradient-to-tr ${stat.color} text-white shadow-sm`}
              >
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono tracking-tight text-[var(--foreground)]">
              {stat.value.toLocaleString()}
            </div>
            <div className="text-[11px] font-mono text-[var(--foreground-muted)] mt-1.5 flex items-center gap-1">
              <span className="text-emerald-500 font-semibold">●</span>
              <span>{stat.change}</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
