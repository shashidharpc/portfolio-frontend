import { prisma } from "@/lib/db";
import { ContentManager } from "@/components/dashboard/content-manager";

export default async function DashboardContentPage() {
  const [profile, categories] = await Promise.all([
    prisma.profile.findFirst({ where: { id: "default" } }),
    prisma.skillCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        skills: {
          orderBy: { order: "asc" },
        },
      },
    }),
  ]);

  const defaultProfile = profile ?? {
    fullName: "Shashidhar P C",
    title: "Senior Fullstack Engineer & Distributed Systems Designer",
    headline: "Building resilient cloud architectures, high-performance web applications, and intuitive developer experiences.",
    bio: "Senior engineer with 8+ years of engineering experience.",
    location: "Bengaluru, India",
  };

  return <ContentManager initialProfile={defaultProfile} categories={categories} />;
}
