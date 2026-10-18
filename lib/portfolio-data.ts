export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  content: string;
  coverImage: string;
  category: string;
  technologies: string[];
  tags: string; // JSON string array
  metrics: Record<string, string>;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  published: boolean;
  order: number;
  viewsCount: number;
  updatedAt: string;
}

export interface SkillItem {
  id: string;
  name: string;
  proficiency?: number;
  featured?: boolean;
}

export interface SkillCategoryGroup {
  id: string;
  name: string;
  description?: string;
  order: number;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  description: string;
  highlights: string; // JSON string array
  achievements?: string[];
  technologies: string; // JSON string array
  order: number;
  current?: boolean;
}

export const PROFILE_DATA = {
  fullName: "Shashidhar P C",
  title: "Full Stack Software Engineer",
  headline:
    "Developing secure, database-driven web applications using Python, Flask, JavaScript, and PHP. Skilled in architecting REST APIs, implementing Role-Based Access Control, and designing scalable MySQL & MongoDB schemas.",
  bio: "Full Stack Software Engineer based in Bengaluru with a strong foundation in Data Structures, Algorithms, Object Oriented Design, and the full Software Development Life Cycle (SDLC). Experienced in developing secure, multi-tier web platforms with Python, Flask, PHP, JavaScript, and modern database architectures. Master of Computer Applications (MCA) graduate from Presidency College (8.75 CGPA) and BCA graduate from Sahyadri Science College (89.86%). Proven track record through production web application development, including automated QR code & geofencing attendance architectures and multi-tier vehicle rental systems.",
  location: "Bengaluru, Karnataka, India",
  availableForHire: true,
  socialLinks: {
    github: "https://github.com/shashidharpc",
    linkedin: "https://linkedin.com/in/shashidharpc",
    email: "shashidharpc1012@gmail.com",
    phone: "+91 7349128889",
  },
};

export const SKILLS_CATEGORIES: SkillCategoryGroup[] = [
  {
    id: "languages",
    name: "Languages & Core Stack",
    description: "Primary programming languages and web fundamentals",
    order: 1,
    skills: [
      { id: "py", name: "Python", proficiency: 95, featured: true },
      { id: "ts", name: "TypeScript", proficiency: 90, featured: true },
      { id: "js", name: "JavaScript", proficiency: 92, featured: true },
      { id: "php", name: "PHP", proficiency: 88, featured: true },
      { id: "sql", name: "SQL", proficiency: 90, featured: true },
      { id: "java", name: "Java", proficiency: 80, featured: false },
      { id: "c", name: "C", proficiency: 78, featured: false },
      { id: "html", name: "HTML5 & CSS3", proficiency: 94, featured: false },
    ],
  },
  {
    id: "backend",
    name: "Frameworks & Backend Architecture",
    description: "Modern web frameworks, APIs, and microservices",
    order: 2,
    skills: [
      { id: "flask", name: "Flask", proficiency: 92, featured: true },
      { id: "fastapi", name: "FastAPI", proficiency: 90, featured: true },
      { id: "rest", name: "REST APIs", proficiency: 96, featured: true },
      { id: "react", name: "React.js", proficiency: 92, featured: true },
      { id: "next", name: "Next.js", proficiency: 90, featured: true },
      { id: "tailwind", name: "Tailwind CSS", proficiency: 95, featured: true },
      { id: "three", name: "Three.js", proficiency: 82, featured: false },
      { id: "socket", name: "Socket.IO", proficiency: 84, featured: false },
      { id: "node", name: "Node.js", proficiency: 85, featured: false },
    ],
  },
  {
    id: "databases",
    name: "Databases & Cloud Infrastructure",
    description: "Relational, document data stores and cloud deployment",
    order: 3,
    skills: [
      { id: "mysql", name: "MySQL", proficiency: 92, featured: true },
      { id: "mongo", name: "MongoDB", proficiency: 88, featured: true },
      { id: "postgres", name: "PostgreSQL", proficiency: 86, featured: true },
      { id: "aws", name: "AWS", proficiency: 80, featured: false },
      { id: "git", name: "Git", proficiency: 95, featured: true },
      { id: "docker", name: "Docker", proficiency: 82, featured: false },
    ],
  },
  {
    id: "arch",
    name: "Software Engineering & Tools",
    description: "Core computer science fundamentals, design patterns, and SDLC",
    order: 4,
    skills: [
      { id: "oop", name: "Object-Oriented Design (OOP)", proficiency: 95, featured: true },
      { id: "dsa", name: "Data Structures & Algorithms", proficiency: 90, featured: true },
      { id: "rbac", name: "Role-Based Access Control (RBAC)", proficiency: 94, featured: true },
      { id: "linux", name: "Linux & Bash", proficiency: 85, featured: false },
      { id: "postman", name: "Postman API Testing", proficiency: 92, featured: false },
      { id: "bootstrap", name: "Bootstrap", proficiency: 88, featured: false },
    ],
  },
];

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Full Stack Software Engineer",
    company: "Software Projects & Applied Engineering",
    location: "Bengaluru, India",
    period: "2024 — Present",
    startDate: "2024-01-01",
    endDate: null,
    isCurrent: true,
    description:
      "Developing end-to-end full stack web platforms, REST APIs, and automated telemetry systems with emphasis on robust database design and security.",
    highlights: JSON.stringify([
      "Architected and deployed an automated attendance management system using Python, Flask, and GPS geofencing.",
      "Engineered multi-tier vehicle rental system with PHP and MySQL relational schemas.",
      "Designed and implemented RESTful APIs with strict Role-Based Access Control (RBAC) and JWT validation.",
    ]),
    achievements: [
      "Architected and deployed an automated attendance management system using Python, Flask, and GPS geofencing.",
      "Engineered multi-tier vehicle rental system with PHP and MySQL relational schemas.",
      "Designed and implemented RESTful APIs with strict Role-Based Access Control (RBAC) and JWT validation.",
    ],
    technologies: JSON.stringify(["Python", "Flask", "JavaScript", "PHP", "MySQL", "MongoDB", "REST APIs", "Git"]),
    order: 1,
    current: true,
  },
  {
    id: "edu-1",
    role: "Master of Computer Applications (MCA)",
    company: "Presidency College",
    location: "Bengaluru, Karnataka",
    period: "2022 — 2024",
    startDate: "2022-08-01",
    endDate: "2024-07-01",
    isCurrent: false,
    description:
      "Postgraduate coursework in Advanced Software Engineering, Cloud Architecture, Algorithms, and Distributed Computing.",
    highlights: JSON.stringify([
      "Graduated with 8.75 CGPA.",
      "Specialized in full-stack web platforms and database architectures.",
    ]),
    achievements: [
      "Graduated with 8.75 CGPA.",
      "Specialized in full-stack web platforms and database architectures.",
    ],
    technologies: JSON.stringify(["Algorithms", "System Design", "Cloud Computing", "Database Management"]),
    order: 2,
    current: false,
  },
  {
    id: "edu-2",
    role: "Bachelor of Computer Applications (BCA)",
    company: "Sahyadri Science College",
    location: "Kuvempu University",
    period: "2019 — 2022",
    startDate: "2019-06-01",
    endDate: "2022-06-01",
    isCurrent: false,
    description:
      "Undergraduate foundation in Computer Science, Data Structures, Object-Oriented Programming, and Database Management Systems.",
    highlights: JSON.stringify([
      "Graduated with Distinction: 89.86% aggregate score.",
      "Core coursework: C, Java, Python, Web Fundamentals, Software Engineering.",
    ]),
    achievements: [
      "Graduated with Distinction: 89.86% aggregate score.",
      "Core coursework: C, Java, Python, Web Fundamentals, Software Engineering.",
    ],
    technologies: JSON.stringify(["Data Structures", "OOP", "DBMS", "Software Engineering"]),
    order: 3,
    current: false,
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "proj-1",
    slug: "attendance-management-system",
    title: "Attendance Management System",
    tagline: "Automated QR Code & Geofencing Attendance Architecture",
    description:
      "Production web application engineered with Python, Flask, HTML5, CSS3, and JavaScript featuring automated QR scanning and GPS geofence verification.",
    content: `
# Attendance Management System

Engineered a production-grade automated attendance solution to eliminate manual errors and proxy logging.

### Architecture Highlights:
- **Haversine Geofencing Engine**: Enforces exact GPS coordinate radii around authorized campus coordinates.
- **Dynamic QR Code Tokens**: Ephemeral QR tokens expiring every 60 seconds to prevent replay attacks.
- **Role-Based Access Control**: Multi-tier permissions across Student, Instructor, and Campus Administrator portals.
- **Export Pipelines**: Automated generation of PDF & Excel attendance logs for administrative auditing.
    `,
    coverImage: "/projects/attendance-system.jpg",
    category: "Full Stack",
    technologies: ["Python", "Flask", "JavaScript", "HTML5", "CSS3", "MySQL", "Geofencing", "QR Codes"],
    tags: JSON.stringify(["Python", "Flask", "JavaScript", "HTML5", "CSS3", "MySQL", "Geofencing", "QR Codes"]),
    metrics: {
      Accuracy: "99.8%",
      "Scan Latency": "<200ms",
      "Daily Active Users": "1,200+",
    },
    githubUrl: "https://github.com/shashidharpc/attendance-management-system",
    featured: true,
    published: true,
    order: 1,
    viewsCount: 420,
    updatedAt: "2026-10-18T20:00:00Z",
  },
  {
    id: "proj-2",
    slug: "wheelz-vehicle-rental-system",
    title: "Wheelz — Vehicle Rental System",
    tagline: "Multi-tier vehicle booking platform with automated billing",
    description:
      "Comprehensive vehicle rental application built with PHP, MySQL, and JavaScript, handling fleet management and booking workflows.",
    content: `
# Wheelz Vehicle Rental System

Comprehensive rental management platform built with PHP and relational MySQL schemas.

### Key Capabilities:
- **Relational Booking Architecture**: Handles conflict-free vehicle availability calendars.
- **Automated Billing Engine**: Dynamically calculates rental rates, insurance tiers, and late penalty adjustments.
- **Customer Portal**: Self-service vehicle selection, booking confirmation, and digital invoicing.
    `,
    coverImage: "/projects/wheelz-rental.jpg",
    category: "Full Stack",
    technologies: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
    tags: JSON.stringify(["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "Bootstrap"]),
    metrics: {
      "Fleet Capacity": "500+ Vehicles",
      "Query Response": "<120ms",
      "Booking Efficiency": "+45%",
    },
    githubUrl: "https://github.com/shashidharpc/wheelz-vehicle-rental",
    featured: true,
    published: true,
    order: 2,
    viewsCount: 260,
    updatedAt: "2026-10-18T20:00:00Z",
  },
];
