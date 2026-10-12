"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { logAuditSafe } from "@/lib/audit";
import { revalidatePath } from "next/cache";

export async function toggleAvailability() {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const profile = await prisma.profile.findFirst({ where: { id: "default" } });
    if (!profile) return { success: false, error: "Profile not found" };

    const updated = await prisma.profile.update({
      where: { id: "default" },
      data: { availableForHire: !profile.availableForHire },
    });

    logAuditSafe({
      userId: session.user.id,
      action: "UPDATE",
      entity: "Profile",
      entityId: "default",
      before: { availableForHire: profile.availableForHire },
      after: { availableForHire: updated.availableForHire },
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
    return { success: true, availableForHire: updated.availableForHire };
  } catch {
    return { success: false, error: "Failed to update availability" };
  }
}

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const existing = await prisma.profile.findFirst({ where: { id: "default" } });

    const updated = await prisma.profile.upsert({
      where: { id: "default" },
      update: {
        fullName: String(formData.get("fullName")),
        title: String(formData.get("title")),
        headline: String(formData.get("headline")),
        bio: String(formData.get("bio")),
        location: String(formData.get("location")),
      },
      create: {
        id: "default",
        fullName: String(formData.get("fullName")),
        title: String(formData.get("title")),
        headline: String(formData.get("headline")),
        bio: String(formData.get("bio")),
        location: String(formData.get("location")),
        socialLinks: "{}",
      },
    });

    logAuditSafe({
      userId: session.user.id,
      action: "UPDATE",
      entity: "Profile",
      entityId: "default",
      before: existing,
      after: updated,
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
    return { success: true, profile: updated };
  } catch {
    return { success: false, error: "Failed to update profile" };
  }
}

export async function updateSkillProficiency(id: string, proficiency: number) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const existing = await prisma.skill.findUnique({ where: { id } });
    if (!existing) return { success: false, error: "Skill not found" };

    const updated = await prisma.skill.update({
      where: { id },
      data: { proficiency: Math.min(100, Math.max(1, proficiency)) },
    });

    logAuditSafe({
      userId: session.user.id,
      action: "UPDATE",
      entity: "Skill",
      entityId: id,
      before: { proficiency: existing.proficiency },
      after: { proficiency: updated.proficiency },
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
    return { success: true, proficiency: updated.proficiency };
  } catch {
    return { success: false, error: "Failed to update proficiency" };
  }
}

export async function createSkill(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const name = String(formData.get("name"));
    const categoryId = String(formData.get("categoryId"));
    const proficiency = Number(formData.get("proficiency") || 85);
    const featured = formData.get("featured") === "true";

    const created = await prisma.skill.create({
      data: {
        name,
        categoryId,
        proficiency,
        featured,
      },
    });

    logAuditSafe({
      userId: session.user.id,
      action: "CREATE",
      entity: "Skill",
      entityId: created.id,
      after: created,
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
    return { success: true, skill: created };
  } catch {
    return { success: false, error: "Failed to add skill" };
  }
}

export async function deleteSkill(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const existing = await prisma.skill.findUnique({ where: { id } });
    if (!existing) return { success: false, error: "Skill not found" };

    await prisma.skill.delete({ where: { id } });

    logAuditSafe({
      userId: session.user.id,
      action: "DELETE",
      entity: "Skill",
      entityId: id,
      before: existing,
      after: null,
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete skill" };
  }
}
