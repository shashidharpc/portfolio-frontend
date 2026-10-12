"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { logAuditSafe } from "@/lib/audit";
import { revalidatePath } from "next/cache";

const projectSchema = z.object({
  title: z.string().trim().min(2, "Title is required"),
  slug: z.string().trim().min(2, "Slug is required"),
  tagline: z.string().trim().min(5, "Tagline is required"),
  description: z.string().trim().min(10, "Description is required"),
  contentMdx: z.string().optional(),
  coverImage: z.string().url("Must be a valid image URL"),
  tags: z.string().default("[]"), // JSON string
  liveUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

export async function createProject(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  const rawTags = formData.get("tags") as string;
  let formattedTags = "[]";
  try {
    const split = rawTags.split(",").map((s) => s.trim()).filter(Boolean);
    formattedTags = JSON.stringify(split);
  } catch {
    formattedTags = "[]";
  }

  const parsed = projectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    tagline: formData.get("tagline"),
    description: formData.get("description"),
    contentMdx: formData.get("contentMdx") || undefined,
    coverImage: formData.get("coverImage"),
    tags: formattedTags,
    liveUrl: formData.get("liveUrl") || "",
    githubUrl: formData.get("githubUrl") || "",
    featured: formData.get("featured") === "true",
    published: formData.get("published") !== "false",
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  try {
    const created = await prisma.project.create({
      data: {
        ...parsed.data,
        liveUrl: parsed.data.liveUrl || null,
        githubUrl: parsed.data.githubUrl || null,
      },
    });

    logAuditSafe({
      userId: session.user.id,
      action: "CREATE",
      entity: "Project",
      entityId: created.id,
      after: created,
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/projects");
    return { success: true, project: created };
  } catch (err) {
    return { success: false, error: "Failed to create project (slug might be taken)" };
  }
}

export async function updateProject(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  const rawTags = formData.get("tags") as string;
  let formattedTags = "[]";
  try {
    const split = rawTags.split(",").map((s) => s.trim()).filter(Boolean);
    formattedTags = JSON.stringify(split);
  } catch {
    formattedTags = "[]";
  }

  const parsed = projectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    tagline: formData.get("tagline"),
    description: formData.get("description"),
    contentMdx: formData.get("contentMdx") || undefined,
    coverImage: formData.get("coverImage"),
    tags: formattedTags,
    liveUrl: formData.get("liveUrl") || "",
    githubUrl: formData.get("githubUrl") || "",
    featured: formData.get("featured") === "true",
    published: formData.get("published") !== "false",
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  try {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) return { success: false, error: "Project not found" };

    const updated = await prisma.project.update({
      where: { id },
      data: {
        ...parsed.data,
        liveUrl: parsed.data.liveUrl || null,
        githubUrl: parsed.data.githubUrl || null,
      },
    });

    logAuditSafe({
      userId: session.user.id,
      action: "UPDATE",
      entity: "Project",
      entityId: id,
      before: existing,
      after: updated,
    });

    revalidatePath("/");
    revalidatePath(`/projects/${updated.slug}`);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/projects");
    return { success: true, project: updated };
  } catch (err) {
    return { success: false, error: "Failed to update project" };
  }
}

export async function deleteProject(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) return { success: false, error: "Project not found" };

    await prisma.project.delete({ where: { id } });

    logAuditSafe({
      userId: session.user.id,
      action: "DELETE",
      entity: "Project",
      entityId: id,
      before: existing,
      after: null,
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/projects");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to delete project" };
  }
}

export async function toggleProjectFeatured(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) return { success: false, error: "Project not found" };

    const updated = await prisma.project.update({
      where: { id },
      data: { featured: !existing.featured },
    });

    logAuditSafe({
      userId: session.user.id,
      action: "UPDATE",
      entity: "Project",
      entityId: id,
      before: { featured: existing.featured },
      after: { featured: updated.featured },
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/projects");
    return { success: true, featured: updated.featured };
  } catch (err) {
    return { success: false, error: "Failed to toggle featured status" };
  }
}
