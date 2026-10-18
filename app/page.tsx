import {
  PROFILE_DATA,
  SKILLS_CATEGORIES,
  EXPERIENCES_DATA,
  PROJECTS_DATA,
} from "@/lib/portfolio-data";
import { PortfolioNavbar } from "@/components/portfolio/navbar";
import { PortfolioHero } from "@/components/portfolio/hero";
import { PortfolioAbout } from "@/components/portfolio/about-section";
import { PortfolioExperienceEducation } from "@/components/portfolio/experience-education-section";
import { PortfolioSkills } from "@/components/portfolio/skills-section";
import { PortfolioProjectsGrid } from "@/components/portfolio/projects-grid";
import { PortfolioCertifications } from "@/components/portfolio/certifications-section";
import { PortfolioContactForm } from "@/components/portfolio/contact-form";
import { PortfolioFooter } from "@/components/portfolio/footer";

export default function PortfolioHomePage() {
  const socialLinks = PROFILE_DATA.socialLinks;

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE_DATA.fullName,
    jobTitle: PROFILE_DATA.title,
    description: PROFILE_DATA.headline,
    url: "https://shashidharpc.vercel.app",
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
          fullName={PROFILE_DATA.fullName}
          title={PROFILE_DATA.title}
          headline={PROFILE_DATA.headline}
          availableForHire={PROFILE_DATA.availableForHire}
          socialLinks={socialLinks}
        />

        <PortfolioAbout
          bio={PROFILE_DATA.bio}
          location={PROFILE_DATA.location}
          availableForHire={PROFILE_DATA.availableForHire}
        />

        <PortfolioSkills categories={SKILLS_CATEGORIES} />

        <PortfolioExperienceEducation experiences={EXPERIENCES_DATA} />

        <PortfolioProjectsGrid projects={PROJECTS_DATA} />

        <PortfolioCertifications />

        <PortfolioContactForm />
      </main>

      <PortfolioFooter socialLinks={socialLinks} />
    </div>
  );
}
