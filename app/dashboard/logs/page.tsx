import { prisma } from "@/lib/db";
import { LogsExplorer } from "@/components/dashboard/logs-explorer";

export const dynamic = "force-dynamic";

export default async function DashboardLogsPage() {
  let auditLogs: any[] = [];
  let eventLogs: any[] = [];

  try {
    const res = await Promise.all([
      prisma.auditLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
        include: {
          user: {
            select: { email: true },
          },
        },
      }),
      prisma.eventLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
    ]);
    auditLogs = res[0] || [];
    eventLogs = res[1] || [];
  } catch (err) {
    console.warn("Could not load logs from database:", err);
  }

  return <LogsExplorer auditLogs={auditLogs} eventLogs={eventLogs} />;
}
