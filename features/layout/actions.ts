"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { logAuditSafe } from "@/lib/audit";
import { revalidatePath } from "next/cache";

const DEFAULT_WIDGETS = [
  { id: "stats", colSpan: 12, isVisible: true, order: 0 },
  { id: "quick_actions", colSpan: 4, isVisible: true, order: 1 },
  { id: "projects", colSpan: 8, isVisible: true, order: 2 },
  { id: "messages", colSpan: 6, isVisible: true, order: 3 },
  { id: "skills", colSpan: 6, isVisible: true, order: 4 },
  { id: "activity", colSpan: 8, isVisible: true, order: 5 },
  { id: "appearance", colSpan: 4, isVisible: true, order: 6 },
];

export async function saveDashboardLayout(widgetsConfigJson: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized session" };
  }

  const userId = session.user.id;

  try {
    const existing = await prisma.dashboardLayout.findUnique({
      where: { userId },
    });

    const updated = await prisma.dashboardLayout.upsert({
      where: { userId },
      update: { widgetsConfig: widgetsConfigJson },
      create: {
        userId,
        widgetsConfig: widgetsConfigJson,
      },
    });

    logAuditSafe({
      userId,
      action: "LAYOUT_CHANGE",
      entity: "DashboardLayout",
      entityId: updated.id,
      before: existing ? JSON.parse(existing.widgetsConfig) : null,
      after: JSON.parse(widgetsConfigJson),
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to persist widget arrangement",
    };
  }
}

export async function resetDashboardLayout() {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized session" };
  }

  const userId = session.user.id;

  try {
    const defaultJson = JSON.stringify(DEFAULT_WIDGETS);

    const existing = await prisma.dashboardLayout.findUnique({
      where: { userId },
    });

    await prisma.dashboardLayout.upsert({
      where: { userId },
      update: { widgetsConfig: defaultJson },
      create: {
        userId,
        widgetsConfig: defaultJson,
      },
    });

    logAuditSafe({
      userId,
      action: "LAYOUT_CHANGE",
      entity: "DashboardLayout",
      entityId: existing?.id ?? null,
      before: existing ? JSON.parse(existing.widgetsConfig) : null,
      after: DEFAULT_WIDGETS,
    });

    revalidatePath("/dashboard");
    return { success: true, widgets: DEFAULT_WIDGETS };
  } catch (err) {
    return {
      success: false,
      error: "Failed to reset layout to defaults",
    };
  }
}

export async function updateAppearanceSettings(data: {
  accentGradient?: string;
  fontSize?: string;
  motionEnabled?: boolean;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const userId = session.user.id;

  try {
    const existing = await prisma.dashboardLayout.findUnique({
      where: { userId },
    });

    const updated = await prisma.dashboardLayout.upsert({
      where: { userId },
      update: {
        ...(data.accentGradient && { accentGradient: data.accentGradient }),
        ...(data.fontSize && { fontSize: data.fontSize }),
        ...(data.motionEnabled !== undefined && { motionEnabled: data.motionEnabled }),
      },
      create: {
        userId,
        widgetsConfig: JSON.stringify(DEFAULT_WIDGETS),
        accentGradient: data.accentGradient || "violet-blue",
        fontSize: data.fontSize || "default",
        motionEnabled: data.motionEnabled ?? true,
      },
    });

    logAuditSafe({
      userId,
      action: "UPDATE",
      entity: "DashboardSettings",
      entityId: updated.id,
      before: existing
        ? {
            accentGradient: existing.accentGradient,
            fontSize: existing.fontSize,
            motionEnabled: existing.motionEnabled,
          }
        : null,
      after: data,
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to update appearance settings" };
  }
}
