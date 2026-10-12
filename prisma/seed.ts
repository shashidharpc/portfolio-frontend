import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // 1. Clean existing records (idempotent seed)
  await prisma.auditLog.deleteMany();
  await prisma.eventLog.deleteMany();
  await prisma.message.deleteMany();
  await prisma.dashboardLayout.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.project.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // 2. Admin User
  const hashedPassword = await bcrypt.hash("adminpassword123", 10);
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@portfolio.dev",
      name: "Shashidhar P C",
      passwordHash: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✓ Admin user created:", adminUser.email);

  // 3. User Dashboard Layout
  const defaultWidgets = [
    { id: "stats", colSpan: 12, isVisible: true, order: 0 },
    { id: "quick_actions", colSpan: 4, isVisible: true, order: 1 },
    { id: "projects", colSpan: 8, isVisible: true, order: 2 },
    { id: "messages", colSpan: 6, isVisible: true, order: 3 },
    { id: "skills", colSpan: 6, isVisible: true, order: 4 },
    { id: "activity", colSpan: 8, isVisible: true, order: 5 },
    { id: "appearance", colSpan: 4, isVisible: true, order: 6 },
  ];

  await prisma.dashboardLayout.create({
    data: {
      userId: adminUser.id,
      widgetsConfig: JSON.stringify(defaultWidgets),
      accentGradient: "violet-blue",
      fontSize: "default",
      motionEnabled: true,
      themePreference: "system",
    },
  });
  console.log("✓ Dashboard layout initialized");

  // 4. Profile
  await prisma.profile.create({
    data: {
      id: "default",
      fullName: "Shashidhar P C",
      title: "Senior Fullstack Engineer & Distributed Systems Designer",
      headline:
        "Building resilient cloud architectures, high-performance web applications, and intuitive developer experiences.",
      bio: "Senior engineer with 8+ years of expertise spanning modern full-stack TypeScript, React Server Components, distributed systems, and design systems. Committed to writing type-safe, accessible, and high-performance software that solves meaningful problems at scale.",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
      resumeUrl: "/resume.pdf",
      location: "Bengaluru, India",
      availableForHire: true,
      socialLinks: JSON.stringify({
        github: "https://github.com/shashidharpc",
        linkedin: "https://linkedin.com/in/shashidharpc",
        twitter: "https://twitter.com/shashidharpc",
        email: "shashidharpc10@gmail.com",
      }),
    },
  });
  console.log("✓ Profile data created");

  // 5. Skill Categories & Skills
  const skillData = [
    {
      category: "Languages & Runtimes",
      order: 0,
      skills: [
        { name: "TypeScript", proficiency: 96, featured: true },
        { name: "JavaScript (ESNext)", proficiency: 95, featured: true },
        { name: "Node.js", proficiency: 92, featured: true },
        { name: "Python", proficiency: 86, featured: false },
        { name: "Go", proficiency: 80, featured: false },
        { name: "SQL", proficiency: 90, featured: true },
      ],
    },
    {
      category: "Frontend & UI Engineering",
      order: 1,
      skills: [
        { name: "Next.js 15 (App Router)", proficiency: 96, featured: true },
        { name: "React 19 & Server Components", proficiency: 95, featured: true },
        { name: "Tailwind CSS v4", proficiency: 94, featured: true },
        { name: "Framer Motion", proficiency: 88, featured: true },
        { name: "Radix Primitives & shadcn/ui", proficiency: 92, featured: true },
        { name: "Accessibility (WCAG AA)", proficiency: 90, featured: false },
      ],
    },
    {
      category: "Backend & Persistence",
      order: 2,
      skills: [
        { name: "PostgreSQL & SQLite", proficiency: 94, featured: true },
        { name: "Prisma ORM", proficiency: 95, featured: true },
        { name: "REST & GraphQL APIs", proficiency: 92, featured: false },
        { name: "Redis Caching", proficiency: 88, featured: true },
        { name: "Auth.js / NextAuth", proficiency: 90, featured: true },
      ],
    },
    {
      category: "DevOps, Cloud & Architecture",
      order: 3,
      skills: [
        { name: "Docker & Containerization", proficiency: 88, featured: true },
        { name: "CI/CD & GitHub Actions", proficiency: 90, featured: true },
        { name: "AWS Cloud Infrastructure", proficiency: 85, featured: false },
        { name: "Vercel Edge Platform", proficiency: 94, featured: true },
        { name: "Structured Logging & Observability", proficiency: 89, featured: false },
      ],
    },
  ];

  for (const cat of skillData) {
    const createdCat = await prisma.skillCategory.create({
      data: {
        name: cat.category,
        order: cat.order,
      },
    });

    let sOrder = 0;
    for (const s of cat.skills) {
      await prisma.skill.create({
        data: {
          name: s.name,
          proficiency: s.proficiency,
          featured: s.featured,
          order: sOrder++,
          categoryId: createdCat.id,
        },
      });
    }
  }
  console.log("✓ Skill categories and skills created");

  // 6. Work Experience Timeline
  const experiences = [
    {
      company: "Aurora Cloud Technologies",
      role: "Lead Fullstack & Systems Engineer",
      location: "Bengaluru, India (Hybrid)",
      startDate: new Date("2023-03-01"),
      isCurrent: true,
      description:
        "Spearheaded architectural transition of core SaaS platform to React Server Components and edge computing, delivering 42% latency reduction.",
      highlights: JSON.stringify([
        "Designed and implemented distributed observability dashboard handling over 250,000 queries daily.",
        "Architected zero-downtime database migration pipelines with Prisma and PostgreSQL.",
        "Authored internal RFCs establishing component isolation and design token standards across 4 squads.",
      ]),
      technologies: JSON.stringify([
        "Next.js 15",
        "TypeScript",
        "Prisma",
        "PostgreSQL",
        "Tailwind CSS",
        "Docker",
      ]),
      order: 0,
    },
    {
      company: "Apex Labs & Design Systems",
      role: "Senior Frontend Architect",
      location: "Remote",
      startDate: new Date("2021-02-01"),
      endDate: new Date("2023-02-28"),
      isCurrent: false,
      description:
        "Led frontend engineering team building enterprise UI library and data visualization engines.",
      highlights: JSON.stringify([
        "Engineered accessible component library adhering strictly to WCAG AA guidelines, reducing team feature turnaround by 35%.",
        "Optimized web vital scores across key funnel pages to maintain 98+ Lighthouse scores.",
        "Spearheaded end-to-end testing strategy with Vitest and Playwright across CI pipelines.",
      ]),
      technologies: JSON.stringify([
        "React",
        "TypeScript",
        "Radix UI",
        "Tailwind CSS",
        "Framer Motion",
        "Storybook",
      ]),
      order: 1,
    },
    {
      company: "Horizon Software Systems",
      role: "Fullstack Software Engineer",
      location: "Bengaluru, India",
      startDate: new Date("2018-07-01"),
      endDate: new Date("2021-01-31"),
      isCurrent: false,
      description:
        "Built resilient transactional billing workflows, customer management microservices, and audit logging layers.",
      highlights: JSON.stringify([
        "Engineered audit compliance logging tracking all mutations with cryptographic IP verification.",
        "Implemented Redis caching layers reducing peak database loads by 60%.",
        "Constructed automated invoice generation processing 50k+ transactions monthly.",
      ]),
      technologies: JSON.stringify([
        "Node.js",
        "Express",
        "PostgreSQL",
        "Redis",
        "Docker",
        "Jest",
      ]),
      order: 2,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }
  console.log("✓ Work experience timeline created");

  // 7. Projects
  const projects = [
    {
      slug: "nexus-cloud-orchestrator",
      title: "Nexus Cloud Orchestrator",
      tagline: "Zero-config edge deployment and container mesh router.",
      description:
        "An enterprise-grade orchestration and telemetry platform providing real-time log ingestion, automated canary deployments, and multi-region DNS routing with sub-second health checks.",
      contentMdx: `## System Architecture & Motivation
Nexus was built to bridge the gap between heavy enterprise Kubernetes clusters and lightweight serverless deployments. It provides an intuitive control plane for deploying microservices with instant canary rollbacks, automatic SSL provisioning, and real-time WebSocket telemetry.

### Core Technical Accomplishments
- **Edge-first Routing**: Implemented dynamic traffic splitting algorithms supporting weight-based canary tests.
- **Real-Time Telemetry**: Sub-50ms ingestion latency for distributed container logs streamed directly to the frontend.
- **Resilient Fallback**: Automatic failover to secondary zones within 300ms of health check degradation.

### Technology Stack
- **Frontend & Admin UI**: Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion
- **Persistence & ORM**: PostgreSQL, Prisma ORM, Redis for cached routing tables
- **Infrastructure**: Docker Engine API, Envoy Proxy, Go micro-agents
`,
      coverImage:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80",
      tags: JSON.stringify(["Next.js", "TypeScript", "Go", "Docker", "PostgreSQL", "Tailwind CSS"]),
      liveUrl: "https://nexus-cloud.dev",
      githubUrl: "https://github.com/shashidharpc/nexus-orchestrator",
      featured: true,
      order: 0,
      published: true,
      viewsCount: 1480,
    },
    {
      slug: "pulse-analytics-telemetry",
      title: "Pulse Analytics Engine",
      tagline: "Privacy-first real-time analytics with sub-second OLAP queries.",
      description:
        "High-throughput analytics engine processing millions of events daily without storing third-party cookies or intrusive device fingerprints. Respects Do Not Track and anonymizes IPs with cryptographic salts.",
      contentMdx: `## Problem Space
Modern web analytics are often bloated with third-party tracking cookies that compromise user privacy and slow down page performance. Pulse provides a 1.2KB script that delivers rich funnel insights while guaranteeing 100% GDPR and CCPA compliance.

### Performance Highlights
- **Zero Layout Impact**: Ultra-lightweight asynchronous tracking script with zero render-blocking time.
- **Salted IP Hashes**: IPs are hashed using daily rotating cryptographic salts, preventing persistent cross-session tracking while providing accurate daily unique visitor counts.
- **OLAP Aggregations**: Pre-aggregated time-series views enabling instant query execution on dashboards.
`,
      coverImage:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
      tags: JSON.stringify(["React", "TypeScript", "Node.js", "Prisma", "SQLite", "Analytics"]),
      liveUrl: "https://pulse-telemetry.io",
      githubUrl: "https://github.com/shashidharpc/pulse-analytics",
      featured: true,
      order: 1,
      published: true,
      viewsCount: 1120,
    },
    {
      slug: "krypton-design-system",
      title: "Krypton Design System",
      tagline: "Accessible, tokens-driven component library for high-density SaaS.",
      description:
        "A comprehensive WCAG AA compliant design system built with Radix Primitives and Tailwind CSS v4, supporting dynamic CSS variable theming, dark mode, and zero layout shift.",
      contentMdx: `## Design Philosophy
Engineered for developer productivity and rigorous design consistency. Krypton features over 35 accessible primitives designed for data-intensive enterprise interfaces with keyboard navigation, visible focus rings, and screen-reader accessibility out of the box.

### Features
- **4px/8px Grid Tokens**: Zero arbitrary values across margins, paddings, and typography scales.
- **Fluid Micro-Animations**: GPU-accelerated motion tokens built on Framer Motion respecting user motion preferences.
- **Dark Mode Architecture**: Contrast-tested HSL color tokens achieving WCAG AAA compliance.
`,
      coverImage:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
      tags: JSON.stringify(["React", "TypeScript", "Tailwind CSS", "Radix UI", "Framer Motion"]),
      liveUrl: "https://krypton-ds.dev",
      githubUrl: "https://github.com/shashidharpc/krypton-ui",
      featured: true,
      order: 2,
      published: true,
      viewsCount: 1820,
    },
    {
      slug: "veloce-distributed-cache",
      title: "Veloce Distributed Cache",
      tagline: "Ultra-low latency in-memory cache layer with Raft consensus.",
      description:
        "High-performance distributed key-value store engineered for microservice state synchronization, achieving 180,000 ops/sec with consistent hashing and leader election.",
      contentMdx: `## Distributed Systems Engineering
Veloce explores distributed consensus over low-latency TCP connections. It provides atomic compare-and-swap operations, dynamic cluster membership rebalancing, and configurable snapshotting intervals.
`,
      coverImage:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
      tags: JSON.stringify(["Go", "Distributed Systems", "Raft", "TCP", "Concurrency"]),
      liveUrl: "https://veloce-cache.dev",
      githubUrl: "https://github.com/shashidharpc/veloce-cache",
      featured: false,
      order: 3,
      published: true,
      viewsCount: 740,
    },
  ];

  for (const proj of projects) {
    await prisma.project.create({ data: proj });
  }
  console.log("✓ Projects created");

  // 8. Initial Messages
  const messages = [
    {
      name: "Sarah Jenkins",
      email: "sarah.j@venturecapital.co",
      subject: "Lead Fullstack Role & Advisory Opportunity",
      message:
        "Hi Shashidhar, I came across your Nexus Orchestrator project and was very impressed with your architecture. We are funding a high-scale developer tools startup and would love to discuss a potential lead engineering role or advisory collaboration.",
      isRead: false,
      isArchived: false,
      ipHash: "salt_9a8b7c6d5e",
      createdAt: new Date(Date.now() - 3600 * 1000 * 4), // 4 hours ago
    },
    {
      name: "Marcus Vance",
      email: "m.vance@techscale.io",
      subject: "Consulting Inquiry: Next.js 15 Migration & Performance",
      message:
        "Hello! Our team is currently planning a large-scale migration to Next.js 15 App Router and React Server Components. Are you available for a technical consultation or architecture audit over the coming month?",
      isRead: true,
      isArchived: false,
      ipHash: "salt_1f2e3d4c5b",
      createdAt: new Date(Date.now() - 3600 * 1000 * 28), // 28 hours ago
    },
  ];

  for (const msg of messages) {
    await prisma.message.create({ data: msg });
  }
  console.log("✓ Messages initialized");

  // 9. Initial Audit Logs
  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      action: "LOGIN",
      entity: "User",
      entityId: adminUser.id,
      beforeJson: null,
      afterJson: JSON.stringify({ email: adminUser.email, role: "ADMIN" }),
      ipAddress: "127.0.0.1",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      createdAt: new Date(Date.now() - 3600 * 1000 * 2),
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      action: "UPDATE",
      entity: "Project",
      entityId: "nexus-cloud-orchestrator",
      beforeJson: JSON.stringify({ featured: false, viewsCount: 1400 }),
      afterJson: JSON.stringify({ featured: true, viewsCount: 1480 }),
      ipAddress: "127.0.0.1",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      createdAt: new Date(Date.now() - 3600 * 1000 * 1),
    },
  });

  // 10. Initial Event Logs
  await prisma.eventLog.create({
    data: {
      type: "PAGE_VIEW",
      path: "/",
      entityId: null,
      metadata: JSON.stringify({ referrer: "github.com", device: "desktop" }),
      ipHash: "salt_a1b2c3d4",
      userAgent: "Mozilla/5.0",
      dnt: false,
      createdAt: new Date(Date.now() - 3600 * 1000 * 3),
    },
  });

  await prisma.eventLog.create({
    data: {
      type: "PROJECT_VIEW",
      path: "/projects/nexus-cloud-orchestrator",
      entityId: "nexus-cloud-orchestrator",
      metadata: JSON.stringify({ durationSeconds: 45 }),
      ipHash: "salt_e5f6g7h8",
      userAgent: "Mozilla/5.0",
      dnt: false,
      createdAt: new Date(Date.now() - 3600 * 1000 * 2),
    },
  });

  console.log("🚀 Database successfully seeded with realistic production data!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
