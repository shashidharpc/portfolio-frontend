import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { AppearanceWidget } from "@/components/dashboard/widgets/AppearanceWidget";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Palette, Shield, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardSettingsPage() {
  const session = await auth();
  const userId = session?.user?.id;

  let layout = null;
  if (userId) {
    try {
      layout = await prisma.dashboardLayout.findUnique({ where: { userId } });
    } catch (err) {
      console.warn("Could not load user layout:", err);
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
          Appearance & System Settings
        </h1>
        <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] mt-1">
          Customize accent gradients, typography scale, motion behavior, and system tokens.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AppearanceWidget
          initialGradient={layout?.accentGradient || "violet-blue"}
          initialFontSize={layout?.fontSize || "default"}
          initialMotion={layout?.motionEnabled ?? true}
        />

        <Card className="border-[var(--border)] bg-[var(--card)]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#7C3AED]" />
              Security & Environment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-[var(--foreground-secondary)]">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
              <span>Authentication Engine:</span>
              <strong className="font-mono text-[var(--foreground)]">Auth.js v5 (NextAuth)</strong>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
              <span>Database Persistence:</span>
              <strong className="font-mono text-[var(--foreground)]">Prisma ORM (SQLite / PG Ready)</strong>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
              <span>Rate Limiting:</span>
              <strong className="font-mono text-emerald-500">Active (5 req / 10m sliding window)</strong>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
              <span>Audit Diff Recording:</span>
              <strong className="font-mono text-emerald-500">Active (Fire & Forget Safe)</strong>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
