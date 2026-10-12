"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { updateSkillProficiency } from "@/features/content/actions";
import { ArrowUpRight, Cpu, Plus, Minus } from "lucide-react";

interface SkillItem {
  id: string;
  name: string;
  proficiency: number;
}

interface SkillsWidgetProps {
  skills: SkillItem[];
}

export function SkillsWidget({ skills }: SkillsWidgetProps) {
  const [items, setItems] = React.useState(skills);

  async function adjustProficiency(id: string, delta: number) {
    const target = items.find((s) => s.id === id);
    if (!target) return;
    const newVal = Math.min(100, Math.max(10, target.proficiency + delta));

    // Optimistic
    setItems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, proficiency: newVal } : s))
    );

    await updateSkillProficiency(id, newVal);
  }

  return (
    <Card className="h-full flex flex-col border-[var(--border)] bg-[var(--card)]">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2">
          <Cpu className="h-4 w-4 text-[#7C3AED]" />
          Skills & Proficiencies
        </CardTitle>
        <Button asChild variant="ghost" size="sm" className="text-xs gap-1">
          <Link href="/dashboard/content">
            Edit All
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 pt-1 flex-1">
        {items.slice(0, 5).map((skill) => (
          <div key={skill.id} className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--foreground)]">{skill.name}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-[var(--foreground-muted)] w-8 text-right">
                  {skill.proficiency}%
                </span>
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={() => adjustProficiency(skill.id, -5)}
                    className="p-1 rounded hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                    title="Decrease 5%"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => adjustProficiency(skill.id, 5)}
                    className="p-1 rounded hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                    title="Increase 5%"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[var(--surface-hover)] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] transition-all"
                style={{ width: `${skill.proficiency}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
