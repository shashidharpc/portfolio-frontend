"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { updateAppearanceSettings } from "@/features/layout/actions";
import { Palette, Check } from "lucide-react";

interface AppearanceWidgetProps {
  initialGradient?: string;
  initialFontSize?: string;
  initialMotion?: boolean;
}

const GRADIENTS = [
  { id: "violet-blue", label: "Violet & Blue", bg: "from-[#7C3AED] to-[#3B82F6]" },
  { id: "rose-orange", label: "Rose & Amber", bg: "from-rose-500 to-amber-500" },
  { id: "emerald-cyan", label: "Emerald & Cyan", bg: "from-emerald-500 to-cyan-500" },
];

export function AppearanceWidget({
  initialGradient = "violet-blue",
  initialFontSize = "default",
  initialMotion = true,
}: AppearanceWidgetProps) {
  const [gradient, setGradient] = React.useState(initialGradient);
  const [motion, setMotion] = React.useState(initialMotion);
  const [saving, setSaving] = React.useState(false);

  async function handleGradientChange(id: string) {
    setGradient(id);
    setSaving(true);
    await updateAppearanceSettings({ accentGradient: id });
    setSaving(false);
  }

  async function handleToggleMotion() {
    const nextMotion = !motion;
    setMotion(nextMotion);
    setSaving(true);
    await updateAppearanceSettings({ motionEnabled: nextMotion });
    setSaving(false);
  }

  return (
    <Card className="h-full flex flex-col border-[var(--border)] bg-[var(--card)]">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-[#7C3AED]" />
            Appearance Tokens
          </span>
          {saving && (
            <span className="text-[10px] font-mono text-[var(--foreground-muted)] animate-pulse">
              Syncing...
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-1 flex-1">
        <div>
          <span className="text-xs font-semibold text-[var(--foreground)] mb-2 block">
            Brand Accent Gradient
          </span>
          <div className="grid grid-cols-3 gap-2">
            {GRADIENTS.map((g) => (
              <button
                key={g.id}
                onClick={() => handleGradientChange(g.id)}
                className={`relative flex h-8 items-center justify-center rounded-[8px] bg-gradient-to-r ${g.bg} text-white shadow-sm transition-transform hover:scale-105`}
                title={g.label}
              >
                {gradient === g.id && (
                  <Check className="h-4 w-4 drop-shadow-md stroke-[3]" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[var(--foreground)]">
              Micro-Animations
            </span>
            <span className="text-[11px] text-[var(--foreground-muted)]">
              Framer Motion transitions
            </span>
          </div>

          <Button
            variant={motion ? "default" : "outline"}
            size="sm"
            onClick={handleToggleMotion}
            className="text-xs h-7 px-2.5"
          >
            {motion ? "Enabled" : "Reduced"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
