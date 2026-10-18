import {
  PROFILE_DATA,
  SKILLS_CATEGORIES,
  EXPERIENCES_DATA,
  PROJECTS_DATA,
} from "@/lib/portfolio-data";

// In-Memory Database store for purely standalone Next.js deployment (No Prisma/SQLite/Postgres dependency)
class InMemoryDatabase {
  public profile: any = {
    id: "default",
    fullName: PROFILE_DATA.fullName,
    title: PROFILE_DATA.title,
    headline: PROFILE_DATA.headline,
    bio: PROFILE_DATA.bio,
    location: PROFILE_DATA.location,
    avatarUrl: "/portrait-cutout.png",
    resumeUrl: "/resume.pdf",
    availableForHire: PROFILE_DATA.availableForHire,
    socialGithub: PROFILE_DATA.socialLinks.github,
    socialLinkedin: PROFILE_DATA.socialLinks.linkedin,
    socialTwitter: null,
    socialEmail: PROFILE_DATA.socialLinks.email,
    socialPhone: PROFILE_DATA.socialLinks.phone,
    statsExperienceYears: "2+",
    statsProjectsCompleted: "15+",
    statsHappyClients: "10+",
    statsCodeCommits: "850+",
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date(),
  };

  public users: any[] = [
    {
      id: "usr-admin-1",
      email: "admin@shashidhar.dev",
      name: "Shashidhar P C",
      passwordHash: "$2b$10$AB2LyZ4fP03wyemvyH.l/OjQr59q5dVB.lBoic4.qQitSoEqsh3my", // Admin123!
      role: "ADMIN",
      createdAt: new Date("2024-01-01T00:00:00Z"),
      updatedAt: new Date(),
    },
    {
      id: "usr-admin-2",
      email: "shashidharpc1012@gmail.com",
      name: "Shashidhar P C",
      passwordHash: "$2b$10$AB2LyZ4fP03wyemvyH.l/OjQr59q5dVB.lBoic4.qQitSoEqsh3my", // Admin123!
      role: "ADMIN",
      createdAt: new Date("2024-01-01T00:00:00Z"),
      updatedAt: new Date(),
    },
  ];

  public projects: any[] = PROJECTS_DATA.map((p, idx) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    tagline: p.tagline,
    description: p.description,
    contentMdx: p.content,
    coverImage: p.coverImage,
    category: p.category,
    technologies: JSON.stringify(p.technologies),
    tags: p.tags,
    metricsJson: JSON.stringify(p.metrics),
    liveUrl: p.liveUrl ?? null,
    githubUrl: p.githubUrl ?? null,
    featured: p.featured,
    published: p.published,
    order: p.order ?? idx,
    viewsCount: p.viewsCount ?? 100,
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date(p.updatedAt || Date.now()),
  }));

  public skillCategories: any[] = SKILLS_CATEGORIES.map((cat, idx) => ({
    id: cat.id,
    name: cat.name,
    description: cat.description ?? null,
    order: cat.order ?? idx,
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date(),
    skills: cat.skills.map((s, sIdx) => ({
      id: s.id,
      name: s.name,
      proficiency: s.proficiency ?? 90,
      featured: s.featured ?? false,
      categoryId: cat.id,
      order: sIdx,
      createdAt: new Date("2024-01-01T00:00:00Z"),
      updatedAt: new Date(),
    })),
  }));

  public experiences: any[] = EXPERIENCES_DATA.map((exp, idx) => ({
    id: exp.id,
    role: exp.role,
    company: exp.company,
    location: exp.location ?? null,
    period: exp.period,
    startDate: exp.startDate,
    endDate: exp.endDate ?? null,
    isCurrent: exp.isCurrent,
    description: exp.description,
    highlights: exp.highlights,
    achievements: JSON.stringify(exp.achievements ?? []),
    technologies: exp.technologies,
    order: exp.order ?? idx,
    current: exp.current ?? false,
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date(),
  }));

  public messages: any[] = [
    {
      id: "msg-welcome-1",
      name: "Engineering Hiring Team",
      email: "recruiting@techcompany.com",
      subject: "Full Stack Engineer Opportunity - Bengaluru / Remote",
      message:
        "Hi Shashidhar, we reviewed your projects including your Attendance Geofencing architecture and would love to discuss engineering opportunities.",
      isRead: false,
      isArchived: false,
      ipHash: "127.0.0.1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  public layouts: Map<string, any> = new Map();

  public auditLogs: any[] = [
    {
      id: "audit-init-1",
      userId: "usr-admin-1",
      action: "LOGIN",
      entity: "System",
      entityId: "system-init",
      beforeJson: null,
      afterJson: JSON.stringify({ status: "Standalone In-Memory Datastore Active" }),
      ipAddress: "127.0.0.1",
      userAgent: "Next.js Engine",
      createdAt: new Date(),
      user: { email: "admin@shashidhar.dev" },
    },
  ];

  public eventLogs: any[] = [];
}

const db = new InMemoryDatabase();

export const prisma = {
  profile: {
    findFirst: async (_args?: any) => ({ ...db.profile }),
    findUnique: async (_args?: any) => ({ ...db.profile }),
    update: async (args: { where?: any; data: any }) => {
      db.profile = { ...db.profile, ...args.data, updatedAt: new Date() };
      return { ...db.profile };
    },
    upsert: async (args: { where?: any; update: any; create: any }) => {
      db.profile = { ...db.profile, ...args.update, updatedAt: new Date() };
      return { ...db.profile };
    },
  },

  user: {
    findUnique: async (args: { where: { email?: string; id?: string } }) => {
      if (args.where.email) {
        const emailLower = args.where.email.toLowerCase().trim();
        const found = db.users.find((u) => u.email.toLowerCase() === emailLower);
        return found ? { ...found } : null;
      }
      if (args.where.id) {
        const found = db.users.find((u) => u.id === args.where.id);
        return found ? { ...found } : null;
      }
      return null;
    },
    findFirst: async (_args?: any) => (db.users[0] ? { ...db.users[0] } : null),
    create: async (args: { data: any }) => {
      const newUser = {
        id: `usr-${Date.now()}`,
        ...args.data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      db.users.push(newUser);
      return { ...newUser };
    },
  },

  project: {
    findMany: async (args?: { orderBy?: { order?: "asc" | "desc" } }) => {
      const copy = [...db.projects];
      if (args?.orderBy?.order === "asc") {
        copy.sort((a, b) => a.order - b.order);
      } else if (args?.orderBy?.order === "desc") {
        copy.sort((a, b) => b.order - a.order);
      }
      return copy;
    },
    findUnique: async (args: { where: { id?: string; slug?: string } }) => {
      if (args.where.id) {
        const item = db.projects.find((p) => p.id === args.where.id);
        return item ? { ...item } : null;
      }
      if (args.where.slug) {
        const item = db.projects.find((p) => p.slug === args.where.slug);
        return item ? { ...item } : null;
      }
      return null;
    },
    findFirst: async (args?: { where?: { id?: string; slug?: string } }) => {
      const where = args?.where;
      if (!where) return db.projects[0] ? { ...db.projects[0] } : null;
      if (where.id) return db.projects.find((p) => p.id === where.id) ?? null;
      if (where.slug) return db.projects.find((p) => p.slug === where.slug) ?? null;
      return null;
    },
    create: async (args: { data: any }) => {
      const newProj = {
        id: `proj-${Date.now()}`,
        viewsCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...args.data,
      };
      db.projects.push(newProj);
      return { ...newProj };
    },
    update: async (args: { where: { id: string }; data: any }) => {
      const idx = db.projects.findIndex((p) => p.id === args.where.id);
      if (idx === -1) throw new Error("Project not found");
      db.projects[idx] = { ...db.projects[idx], ...args.data, updatedAt: new Date() };
      return { ...db.projects[idx] };
    },
    delete: async (args: { where: { id: string } }) => {
      const idx = db.projects.findIndex((p) => p.id === args.where.id);
      if (idx !== -1) {
        return db.projects.splice(idx, 1)[0];
      }
      return null;
    },
  },

  message: {
    findMany: async (args?: { orderBy?: any; take?: number }) => {
      let copy = [...db.messages];
      copy.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      if (args?.take) copy = copy.slice(0, args.take);
      return copy;
    },
    findUnique: async (args: { where: { id: string } }) => {
      const found = db.messages.find((m) => m.id === args.where.id);
      return found ? { ...found } : null;
    },
    create: async (args: { data: any }) => {
      const newMsg = {
        id: `msg-${Date.now()}`,
        isRead: false,
        isArchived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...args.data,
      };
      db.messages.unshift(newMsg);
      return { ...newMsg };
    },
    update: async (args: { where: { id: string }; data: any }) => {
      const idx = db.messages.findIndex((m) => m.id === args.where.id);
      if (idx === -1) throw new Error("Message not found");
      db.messages[idx] = { ...db.messages[idx], ...args.data, updatedAt: new Date() };
      return { ...db.messages[idx] };
    },
    delete: async (args: { where: { id: string } }) => {
      const idx = db.messages.findIndex((m) => m.id === args.where.id);
      if (idx !== -1) {
        return db.messages.splice(idx, 1)[0];
      }
      return null;
    },
    count: async () => db.messages.length,
  },

  skillCategory: {
    findMany: async (_args?: any) => {
      return db.skillCategories.map((c) => ({
        ...c,
        skills: [...c.skills],
      }));
    },
    findUnique: async (args: { where: { id: string } }) => {
      const cat = db.skillCategories.find((c) => c.id === args.where.id);
      return cat ? { ...cat } : null;
    },
    create: async (args: { data: any }) => {
      const newCat = {
        id: `cat-${Date.now()}`,
        skills: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        ...args.data,
      };
      db.skillCategories.push(newCat);
      return { ...newCat };
    },
    deleteMany: async () => {
      db.skillCategories = [];
      return { count: 0 };
    },
  },

  skill: {
    findMany: async (args?: { orderBy?: any; take?: number; where?: any }) => {
      const allSkills: any[] = [];
      for (const cat of db.skillCategories) {
        allSkills.push(...cat.skills);
      }
      allSkills.sort((a, b) => a.order - b.order);
      if (args?.take) return allSkills.slice(0, args.take);
      return allSkills;
    },
    findUnique: async (args: { where: { id: string } }) => {
      for (const cat of db.skillCategories) {
        const found = cat.skills.find((s: any) => s.id === args.where.id);
        if (found) return { ...found };
      }
      return null;
    },
    create: async (args: { data: any }) => {
      const newSkill = {
        id: `skl-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...args.data,
      };
      const cat = db.skillCategories.find((c) => c.id === args.data.categoryId);
      if (cat) cat.skills.push(newSkill);
      return { ...newSkill };
    },
    update: async (args: { where: { id: string }; data: any }) => {
      for (const cat of db.skillCategories) {
        const idx = cat.skills.findIndex((s: any) => s.id === args.where.id);
        if (idx !== -1) {
          cat.skills[idx] = { ...cat.skills[idx], ...args.data, updatedAt: new Date() };
          return { ...cat.skills[idx] };
        }
      }
      throw new Error("Skill not found");
    },
    delete: async (args: { where: { id: string } }) => {
      for (const cat of db.skillCategories) {
        const idx = cat.skills.findIndex((s: any) => s.id === args.where.id);
        if (idx !== -1) {
          return cat.skills.splice(idx, 1)[0];
        }
      }
      return null;
    },
    deleteMany: async () => {
      for (const cat of db.skillCategories) {
        cat.skills = [];
      }
      return { count: 0 };
    },
  },

  experience: {
    findMany: async (_args?: any) => {
      const copy = [...db.experiences];
      copy.sort((a, b) => a.order - b.order);
      return copy;
    },
    create: async (args: { data: any }) => {
      const newExp = {
        id: `exp-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...args.data,
      };
      db.experiences.push(newExp);
      return { ...newExp };
    },
    deleteMany: async () => {
      db.experiences = [];
      return { count: 0 };
    },
  },

  dashboardLayout: {
    findUnique: async (args: { where: { userId: string } }) => {
      const layout = db.layouts.get(args.where.userId);
      if (layout) return { ...layout };
      return null;
    },
    upsert: async (args: { where: { userId: string }; update: any; create: any }) => {
      const existing = db.layouts.get(args.where.userId);
      const data = existing ? { ...existing, ...args.update } : { id: `lay-${Date.now()}`, ...args.create };
      data.updatedAt = new Date();
      db.layouts.set(args.where.userId, data);
      return { ...data };
    },
  },

  auditLog: {
    findMany: async (args?: { orderBy?: any; take?: number; include?: any }) => {
      let copy = [...db.auditLogs];
      copy.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      if (args?.take) copy = copy.slice(0, args.take);
      return copy;
    },
    create: async (args: { data: any }) => {
      const newLog = {
        id: `aud-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        createdAt: new Date(),
        user: args.data.userId ? { email: "admin@shashidhar.dev" } : null,
        ...args.data,
      };
      db.auditLogs.unshift(newLog);
      return { ...newLog };
    },
    deleteMany: async () => {
      db.auditLogs = [];
      return { count: 0 };
    },
  },

  eventLog: {
    findMany: async (args?: { orderBy?: any; take?: number }) => {
      let copy = [...db.eventLogs];
      copy.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      if (args?.take) copy = copy.slice(0, args.take);
      return copy;
    },
    create: async (args: { data: any }) => {
      const newLog = {
        id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        createdAt: new Date(),
        ...args.data,
      };
      db.eventLogs.unshift(newLog);
      return { ...newLog };
    },
    count: async (args?: { where?: { type?: string } }) => {
      if (args?.where?.type) {
        return db.eventLogs.filter((e) => e.type === args.where?.type).length;
      }
      return db.eventLogs.length;
    },
    deleteMany: async () => {
      db.eventLogs = [];
      return { count: 0 };
    },
  },

  $disconnect: async (): Promise<void> => {
    return Promise.resolve();
  },
};
