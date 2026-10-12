import { prisma } from "@/lib/db";
import { ProjectsManager } from "@/components/dashboard/projects-manager";

export default async function DashboardProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return <ProjectsManager initialProjects={projects} />;
}
