import { prisma } from "@/lib/db";
import { ProjectsManager } from "@/components/dashboard/projects-manager";

export const dynamic = "force-dynamic";

export default async function DashboardProjectsPage() {
  let projects: any[] = [];
  try {
    projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
  } catch (err) {
    console.warn("Could not load projects from database:", err);
  }

  return <ProjectsManager initialProjects={projects} />;
}
