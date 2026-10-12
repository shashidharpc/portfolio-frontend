import { prisma } from "@/lib/db";
import { logEventSafe } from "@/lib/analytics";
import { headers } from "next/headers";
import { PortfolioNavbar } from "@/components/portfolio/navbar";
import { PortfolioHero } from "@/components/portfolio/hero";
import { PortfolioAbout } from "@/components/portfolio/about-section";
import { PortfolioSkills } from "@/components/portfolio/skills-section";
import { PortfolioExperience } from "@/components/portfolio/experience-section";
import { PortfolioProjectsGrid } from "@/components/portfolio/projects-grid";
import { PortfolioContactForm } from "@/components/portfolio/contact-form";
import { PortfolioFooter } from "@/components/portfolio/footer";

export default async function PortfolioHomePage() {
  const reqHeaders = await headers();
  const forwarded = reqHeaders.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
  const userAgent = reqHeaders.get("user-agent") || "";
  const dnt = reqHeaders.get("dnt") === "1";

  // Fire-and-forget page view logging
  logEventSafe({
    type: "PAGE_VIEW",
    path: "/",
    ip,
    userAgent,
    dnt,
  });

  // Concurrent queries from Database
  const [profile, categories, experiences, projects] = await Promise.all([
    prisma.profile.findFirst({ where: { id: "default" } }),
    prisma.skillCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        skills: {
          orderBy: { order: "asc" },
        },
      },
    }),
    prisma.experience.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.project.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
  ]);

  const profileData = profile ?? {
    fullName: "Shashidhar P C",
    title: "Senior Fullstack Engineer & Distributed Systems Designer",
    headline:
      "Crafting resilient cloud architectures, high-performance web applications, and intuitive developer experiences.",
    bio: "Senior engineer with 8+ years of engineering experience architecting scalable fullstack web applications, event-driven microservices, and design systems.",
    location: "Bengaluru, India",
    availableForHire: true,
    socialLinks: JSON.stringify({
      github: "https://github.com/shashidharpc",
      linkedin: "https://linkedin.com/in/shashidharpc",
      email: "shashidharpc10@gmail.com",
    }),
  };

  let socialLinks = {
    github: "https://github.com/shashidharpc",
    linkedin: "https://linkedin.com/in/shashidharpc",
    email: "shashidharpc10@gmail.com",
  };

  try {
    socialLinks = JSON.parse(profileData.socialLinks);
  } catch {
    // fallback
  }

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.fullName,
    jobTitle: profileData.title,
    description: profileData.headline,
    url: "http://localhost:3000",
    sameAs: [
      socialLinks.github,
      socialLinks.linkedin,
    ].filter(Boolean),
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PortfolioNavbar />

      <main id="main-content" className="flex-1">
        <PortfolioHero
          fullName={profileData.fullName}
          title={profileData.title}
          headline={profileData.headline}
          availableForHire={profileData.availableForHire}
          socialLinks={socialLinks}
        />

        <PortfolioProjectsGrid projects={projects} />

        <PortfolioAbout
          bio={profileData.bio}
          location={profileData.location}
          availableForHire={profileData.availableForHire}
        />

        <PortfolioSkills categories={categories} />

        <PortfolioExperience experiences={experiences} />

        <PortfolioContactForm />
      </main>

      <PortfolioFooter socialLinks={socialLinks} />
    </div>
  );
}
