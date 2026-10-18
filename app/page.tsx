import { prisma } from "@/lib/db";
import { logEventSafe } from "@/lib/analytics";
import { headers } from "next/headers";
import { PortfolioNavbar } from "@/components/portfolio/navbar";
import { PortfolioHero } from "@/components/portfolio/hero";
import { PortfolioAbout } from "@/components/portfolio/about-section";
import { PortfolioExperienceEducation } from "@/components/portfolio/experience-education-section";
import { PortfolioSkills } from "@/components/portfolio/skills-section";
import { PortfolioProjectsGrid } from "@/components/portfolio/projects-grid";
import { PortfolioCertifications } from "@/components/portfolio/certifications-section";
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
    title: "Full Stack Software Engineer",
    headline:
      "Developing secure, database-driven web applications using Python, Flask, JavaScript, and PHP. Skilled in architecting REST APIs, implementing Role-Based Access Control, and designing scalable MySQL & MongoDB schemas.",
    bio: "Full Stack Software Engineer based in Bengaluru with a strong foundation in Data Structures, Algorithms, Object Oriented Design, and the full Software Development Life Cycle (SDLC). Experienced in developing secure, multi-tier web platforms with Python, Flask, PHP, JavaScript, and modern database architectures. Master of Computer Applications (MCA) graduate from Presidency College (8.75 CGPA) and BCA graduate from Sahyadri Science College (89.86%). Proven track record through production web application development, including automated QR code & geofencing attendance architectures and multi-tier vehicle rental systems.",
    location: "Bengaluru, Karnataka, India",
    availableForHire: true,
    socialLinks: JSON.stringify({
      github: "https://github.com/shashidharpc",
      linkedin: "https://linkedin.com/in/shashidharpc",
      email: "shashidharpc1012@gmail.com",
      phone: "+91 7349128889",
    }),
  };

  let socialLinks = {
    github: "https://github.com/shashidharpc",
    linkedin: "https://linkedin.com/in/shashidharpc",
    email: "shashidharpc1012@gmail.com",
    phone: "+91 7349128889",
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
    sameAs: [socialLinks.github, socialLinks.linkedin].filter(Boolean),
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

        <PortfolioAbout
          bio={profileData.bio}
          location={profileData.location}
          availableForHire={profileData.availableForHire}
        />

        <PortfolioSkills categories={categories} />

        <PortfolioExperienceEducation experiences={experiences} />

        <PortfolioProjectsGrid projects={projects} />

        <PortfolioCertifications />

        <PortfolioContactForm />
      </main>

      <PortfolioFooter socialLinks={socialLinks} />
    </div>
  );
}
