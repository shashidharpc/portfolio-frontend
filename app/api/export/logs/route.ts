import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { email: true } } },
  });

  // Generate CSV rows
  const headers = ["ID", "Action", "Entity", "EntityID", "User", "IP", "Timestamp", "BeforeJSON", "AfterJSON"];
  const rows = logs.map((l) => [
    l.id,
    l.action,
    l.entity,
    l.entityId || "",
    l.user?.email || "System",
    l.ipAddress || "",
    l.createdAt.toISOString(),
    `"${(l.beforeJson || "").replace(/"/g, '""')}"`,
    `"${(l.afterJson || "").replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="audit-logs-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
