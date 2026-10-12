"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { logAuditSafe } from "@/lib/audit";
import { revalidatePath } from "next/cache";

export async function toggleMessageRead(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const existing = await prisma.message.findUnique({ where: { id } });
    if (!existing) return { success: false, error: "Message not found" };

    const updated = await prisma.message.update({
      where: { id },
      data: { isRead: !existing.isRead },
    });

    logAuditSafe({
      userId: session.user.id,
      action: "UPDATE",
      entity: "Message",
      entityId: id,
      before: { isRead: existing.isRead },
      after: { isRead: updated.isRead },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/messages");
    return { success: true, isRead: updated.isRead };
  } catch {
    return { success: false, error: "Failed to update message status" };
  }
}

export async function deleteMessage(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const existing = await prisma.message.findUnique({ where: { id } });
    if (!existing) return { success: false, error: "Message not found" };

    await prisma.message.delete({ where: { id } });

    logAuditSafe({
      userId: session.user.id,
      action: "DELETE",
      entity: "Message",
      entityId: id,
      before: { email: existing.email, name: existing.name },
      after: null,
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/messages");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete message" };
  }
}
