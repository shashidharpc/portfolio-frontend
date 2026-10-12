import { prisma } from "@/lib/db";
import { LogsExplorer } from "@/components/dashboard/logs-explorer";

export default async function DashboardLogsPage() {
  const [auditLogs, eventLogs] = await Promise.all([
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

  return <LogsExplorer auditLogs={auditLogs} eventLogs={eventLogs} />;
}
