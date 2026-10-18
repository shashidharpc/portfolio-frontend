import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed with Shashidhar P C's resume data...");

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
      email: "shashidharpc1012@gmail.com",
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
      title: "Full Stack Software Engineer",
      headline:
        "Developing secure, database-driven web applications using Python, Flask, JavaScript, and PHP. Skilled in architecting REST APIs, implementing Role-Based Access Control, and designing scalable MySQL & MongoDB schemas.",
      bio: "Full Stack Software Engineer based in Bengaluru with a strong foundation in Data Structures, Algorithms, Object Oriented Design, and the full Software Development Life Cycle (SDLC). Experienced in engineering secure, multi-tier web platforms with Python, Flask, PHP, JavaScript, and modern database architectures. Master of Computer Applications (MCA) graduate from Presidency College (8.75 CGPA) and BCA graduate from Sahyadri Science College (89.86%). Proven track record through production web application development, including automated QR code & geofencing attendance architectures and multi-tier vehicle rental systems.",
      avatarUrl: "/portrait.jpg",
      resumeUrl: "/resume.pdf",
      location: "Bengaluru, Karnataka, India",
      availableForHire: true,
      socialLinks: JSON.stringify({
        github: "https://github.com/shashidharpc",
        linkedin: "https://linkedin.com/in/shashidharpc",
        email: "shashidharpc1012@gmail.com",
        phone: "+91 7349128889",
      }),
    },
  });
  console.log("✓ Profile data created");

  // 5. Skill Categories & Skills from Resume
  const skillData = [
    {
      category: "Programming Languages",
      order: 0,
      skills: [
        { name: "Python", proficiency: 94, featured: true },
        { name: "JavaScript", proficiency: 92, featured: true },
        { name: "PHP", proficiency: 90, featured: true },
        { name: "SQL", proficiency: 92, featured: true },
        { name: "Java", proficiency: 84, featured: false },
        { name: "C", proficiency: 80, featured: false },
      ],
    },
    {
      category: "Backend & Web Frameworks",
      order: 1,
      skills: [
        { name: "Flask", proficiency: 95, featured: true },
        { name: "REST APIs Architecture", proficiency: 94, featured: true },
        { name: "Role-Based Access Control (RBAC)", proficiency: 93, featured: true },
        { name: "HTML5 & Semantic Web", proficiency: 95, featured: true },
        { name: "CSS3 & Modern Layouts", proficiency: 92, featured: true },
        { name: "Bootstrap 5", proficiency: 92, featured: true },
      ],
    },
    {
      category: "Databases & Development Tools",
      order: 2,
      skills: [
        { name: "MongoDB", proficiency: 93, featured: true },
        { name: "MySQL", proficiency: 93, featured: true },
        { name: "Git & Version Control", proficiency: 90, featured: true },
        { name: "GitHub & Collaborative CI", proficiency: 90, featured: true },
        { name: "Visual Studio Code", proficiency: 95, featured: false },
        { name: "XAMPP Stack", proficiency: 88, featured: false },
      ],
    },
    {
      category: "Core Competencies & Engineering",
      order: 3,
      skills: [
        { name: "Object-Oriented Design (OOP)", proficiency: 94, featured: true },
        { name: "Data Structures & Algorithms", proficiency: 90, featured: true },
        { name: "CRUD Operations & Schemas", proficiency: 96, featured: true },
        { name: "Authentication & Authorization", proficiency: 94, featured: true },
        { name: "API Integration & SDLC", proficiency: 92, featured: true },
        { name: "Troubleshooting & Debugging", proficiency: 90, featured: false },
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

  // 6. Work Experience Timeline from Resume
  const experiences = [
    {
      company: "Innovant IT Solutions",
      role: "Web Developer Intern",
      location: "Bengaluru, India",
      startDate: new Date("2024-06-01"),
      endDate: new Date("2024-07-31"),
      isCurrent: false,
      description:
        "Architected and delivered fullstack features for multi-tier client web applications with PHP, JavaScript, and MySQL, focusing on relational data integrity and checkout workflows.",
      highlights: JSON.stringify([
        "Architected and delivered a multi-tier Car Rental Management web platform utilizing PHP, JavaScript, and MySQL to streamline user registration and booking.",
        "Engineered search and filtering modules allowing users to filter vehicles by category and reserve units over validated date ranges, preventing double booking errors.",
        "Structured relational MySQL database tables, establishing primary/foreign key constraints and indexing schemas to optimize booking query retrieval speeds.",
        "Implemented robust client and server side form validation mechanisms to sanitize user inputs and safeguard data integrity across transactional checkout paths.",
      ]),
      technologies: JSON.stringify([
        "PHP",
        "MySQL",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Bootstrap",
        "XAMPP",
        "Form Validation",
      ]),
      order: 0,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }
  console.log("✓ Work experience timeline created");

  // 7. Projects from Resume
  const projects = [
    {
      slug: "smart-attendance-management-system",
      title: "Smart Attendance Management System",
      tagline: "Dynamic QR Code generation & HTML5 Geofencing verification platform.",
      description:
        "An automated attendance management platform designed to eradicate proxy sign-ins through multi-layer physical and temporal verification. Combines dynamic expiring QR codes, HTML5 Geolocation API coordinate validation against preset classroom geofences, and secure Role-Based Access Control (RBAC).",
      contentMdx: `## System Architecture & Motivation
Traditional classroom attendance methods often suffer from proxy check-ins, manual tally errors, and excessive administrative overhead. The Smart Attendance Management System was engineered to eliminate proxy sign-ins completely through **multi-layer physical (geofencing) and temporal (dynamic QR) verification**.

### Core Technical Accomplishments
- **Dynamic Expiring QR Code Algorithms**: Implemented dynamic QR code generation with real-time expiration intervals, requiring on-site scanning via client mobile browsers to prevent screenshot sharing.
- **HTML5 Geolocation Geofence Validation**: Engineered client-side coordinate capture validated against preset classroom polygonal and radial geofences on the Flask backend prior to authorizing check-in entries.
- **Role-Based Access Control (RBAC)**: Designed isolated dashboards with secure session management for Administrators, Instructors, and Students.
- **Bulk Roster Ingestion**: Engineered multi-row Excel and CSV data ingestion pipelines with automated data normalization.
- **Automated Absence Notification Pipeline**: Built asynchronous SMTP mailer integration alerting students and parents on low attendance thresholds.

### Technology Stack
- **Backend & Logic**: Python, Flask, REST APIs, Session Auth
- **Database**: MongoDB (Flexible document schema for student records, timetable, and attendance logs)
- **Frontend & UI**: HTML5 Geolocation API, JavaScript, Bootstrap 5, CSS3
- **Tools**: Git, GitHub, VS Code
`,
      coverImage:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80",
      tags: JSON.stringify(["Python", "Flask", "MongoDB", "JavaScript", "Geolocation API", "Bootstrap", "RBAC", "SMTP"]),
      liveUrl: "https://github.com/shashidharpc",
      githubUrl: "https://github.com/shashidharpc",
      featured: true,
      order: 0,
      published: true,
      viewsCount: 2450,
    },
    {
      slug: "task-manager-web-application",
      title: "Task Manager Web Application",
      tagline: "Full-stack project tracking web app with Flask and MongoDB.",
      description:
        "Developed a full stack project tracking web application utilizing Flask for modular routing and MongoDB for schema-flexible document persistence. Built end-to-end CRUD operations supporting task creation, priority assignment, and atomic updates across Todo, In Progress, and Completed states.",
      contentMdx: `## Overview & Objectives
A responsive productivity suite engineered to provide seamless task lifecycle tracking, project organization, and multi-user data isolation.

### Technical Highlights
- **Modular Flask Blueprint Architecture**: Decoupled routing structure separating authentication, task operations, and user profile management.
- **Schema-Flexible Persistence with MongoDB**: Leveraged MongoDB collections for fast document storage, nested task metadata, and dynamic tags.
- **End-to-End CRUD Workflows**: Built instant create, read, update, and delete actions with atomic state transitions across *Todo*, *In Progress*, and *Completed*.
- **Priority & Due Date Engine**: Dynamic color-coded priority flags (Low, Medium, High, Urgent) and chronological filtering.
- **User Authorization Pipelines**: Secure session-based authentication ensuring complete workspace and data isolation across individual accounts.

### Technology Stack
- **Backend**: Python, Flask, Werkzeug Security
- **Database**: MongoDB (PyMongo / Document Store)
- **Frontend**: JavaScript, HTML5, CSS3, Bootstrap
`,
      coverImage:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&auto=format&fit=crop&q=80",
      tags: JSON.stringify(["Python", "Flask", "MongoDB", "JavaScript", "HTML5", "CSS3", "CRUD", "Authentication"]),
      liveUrl: "https://github.com/shashidharpc",
      githubUrl: "https://github.com/shashidharpc",
      featured: true,
      order: 1,
      published: true,
      viewsCount: 1890,
    },
    {
      slug: "car-rental-management-platform",
      title: "Car Rental Management Web Platform",
      tagline: "Multi-tier vehicle fleet booking system with relational MySQL schemas.",
      description:
        "Architected and delivered during internship at Innovant IT Solutions. Features multi-tier user registration and booking, category search and filtering, validated reservation date ranges to prevent double-booking errors, and normalized MySQL schemas.",
      contentMdx: `## Enterprise Project Scope
Engineered at Innovant IT Solutions to streamline vehicle fleet management, customer reservation requests, and payment checkout workflows.

### Key Engineering Contributions
- **Multi-Tier Role Hierarchy**: Administrative catalog management, vehicle availability dispatch, and customer booking portals.
- **Reservation Date Range Validation**: Algorithmic overlap checks preventing double-booking errors across all active fleet units.
- **Normalized Relational Schema**: Designed MySQL tables with strict primary/foreign key constraints and indexing for fast query response.
- **Transactional Input Sanitization**: Client and server-side form validation safeguards defending against SQL injection and transactional data corruption.

### Technology Stack
- **Core**: PHP, MySQL, JavaScript
- **Interface**: HTML5, CSS3, Bootstrap
- **Environment**: XAMPP, Apache, phpMyAdmin
`,
      coverImage:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=80",
      tags: JSON.stringify(["PHP", "MySQL", "JavaScript", "Bootstrap", "Relational Schemas", "XAMPP"]),
      liveUrl: "https://github.com/shashidharpc",
      githubUrl: "https://github.com/shashidharpc",
      featured: true,
      order: 2,
      published: true,
      viewsCount: 1640,
    },
  ];

  for (const proj of projects) {
    await prisma.project.create({ data: proj });
  }
  console.log("✓ Projects created");

  // 8. Initial Messages
  const messages = [
    {
      name: "Engineering Recruiter",
      email: "recruiter@innovativetech.in",
      subject: "Full Stack Software Engineer Opportunity",
      message:
        "Hi Shashidhar, we reviewed your work on the Smart Attendance System and your internship accomplishments at Innovant IT Solutions. Your strong background in Python, Flask, and database architecture is a great match for our engineering team. Let's connect!",
      isRead: false,
      isArchived: false,
      ipHash: "salt_9a8b7c6d5e",
      createdAt: new Date(Date.now() - 3600 * 1000 * 4),
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

  console.log("🚀 Database successfully seeded with Shashidhar P C's verified resume data!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
