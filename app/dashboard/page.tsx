import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { WidgetCanvas, WidgetConfig } from "@/components/dashboard/dnd/WidgetCanvas";

const DEFAULT_WIDGETS: WidgetConfig[] = [
  { id: "stats", colSpan: 12, isVisible: true, order: 0 },
  { id: "quick_actions", colSpan: 4, isVisible: true, order: 1 },
  { id: "projects", colSpan: 8, isVisible: true, order: 2 },
  { id: "messages", colSpan: 6, isVisible: true, order: 3 },
  { id: "skills", colSpan: 6, isVisible: true, order: 4 },
  { id: "activity", colSpan: 8, isVisible: true, order: 5 },
  { id: "appearance", colSpan: 4, isVisible: true, order: 6 },
];

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;

  // Concurrently fetch user layout and widget data
  const [
    userLayout,
    profile,
    projects,
    messages,
    skills,
    auditLogs,
    totalPageViews,
    totalProjectViews,
    totalMessagesCount,
  ] = await Promise.all([
    userId ? prisma.dashboardLayout.findUnique({ where: { userId } }) : null,
    prisma.profile.findFirst({ where: { id: "default" } }),
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    prisma.message.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.skill.findMany({ orderBy: { order: "asc" }, take: 6 }),
    prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.eventLog.count({ where: { type: "PAGE_VIEW" } }),
    prisma.eventLog.count({ where: { type: "PROJECT_VIEW" } }),
    prisma.message.count(),
  ]);

  let activeWidgets = DEFAULT_WIDGETS;
  if (userLayout?.widgetsConfig) {
    try {
      activeWidgets = JSON.parse(userLayout.widgetsConfig);
    } catch {
      activeWidgets = DEFAULT_WIDGETS;
    }
  }

  const canvasData = {
    stats: {
      totalPageViews: totalPageViews + 1420, // seeded baseline + real
      totalProjectViews: totalProjectViews + 4820,
      totalMessages: totalMessagesCount,
      totalProjects: projects.length,
    },
    availableForHire: profile?.availableForHire ?? true,
    projects,
    messages,
    skills,
    auditLogs,
    appearance: {
      accentGradient: userLayout?.accentGradient || "violet-blue",
      fontSize: userLayout?.fontSize || "default",
      motionEnabled: userLayout?.motionEnabled ?? true,
    },
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
          Control Plane & Live Canvas
        </h1>
        <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] mt-1">
          Customizable administrative workspace. Rearrange, inspect, or manage portfolio properties in real time.
        </p>
      </div>

      <WidgetCanvas initialWidgets={activeWidgets} data={canvasData} />
    </div>
  );
}
