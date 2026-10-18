import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://shashidharpc.vercel.app";

  let projectEntries: MetadataRoute.Sitemap = [];
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });

    if (projects && projects.length > 0) {
      projectEntries = projects.map((p) => ({
        url: `${baseUrl}/projects/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "weekly",
        priority: 0.8,
      }));
    }
  } catch (err) {
    console.warn("Could not fetch database projects for sitemap, using defaults:", err);
  }

  // Fallback project entries if database is clean/empty during build
  if (projectEntries.length === 0) {
    projectEntries = [
      "attendance-management-system",
      "wheelz-vehicle-rental-system",
    ].map((slug) => ({
      url: `${baseUrl}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...projectEntries,
  ];
}
