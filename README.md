# Production Portfolio & Customizable Admin Dashboard

A production-grade, highly performant personal portfolio website paired with an extensible, widget-based private admin dashboard. Built with **Next.js 15 App Router**, **TypeScript (Strict Mode)**, **Tailwind CSS v4**, **shadcn/ui**, **Framer Motion**, **dnd-kit**, and **Prisma ORM**.

---

## 🚀 Key Features

### 🌐 Public Portfolio Surfaces
1. **Hero Section**: Value proposition, animated ambient blurred background glow orbs, live hire availability badge, and primary CTA buttons.
2. **About & Background**: Readable typography (65–75ch line length), core engineering pillars, location, and global availability.
3. **Featured Projects**: Filterable card grid by technology tag, hover lift micro-interactions, view counters, and dynamic case study pages (`/projects/[slug]`).
4. **Skills & Capabilities**: Grouped categories (Languages, Frontend, Backend, DevOps) with visual proficiency meters and featured tags.
5. **Career Timeline**: Work experience timeline with metric-focused bullet achievements and technology badges.
6. **Collaboration Contact Form**: Client & server Zod validation, in-memory sliding-window rate limiting, database persistence in `Message` table, and privacy-first event telemetry.
7. **SEO & Performance**: JSON-LD Person schema, OpenGraph tags, dynamic `sitemap.xml`, and `robots.txt`.

### 🛡️ Customizable Admin Dashboard (`/dashboard`)
1. **12-Column Drag-and-Drop Widget Canvas**:
   - Reorder widgets with smooth dnd-kit animations.
   - Resize widgets between 4, 6, 8, and 12-column spans.
   - Layout persists per user in SQLite/PostgreSQL (`DashboardLayout` table).
   - Instant "Reset to Default Layout" action.
2. **Interactive Widgets**:
   - **Visitor Stats**: Aggregated telemetry events, case study views, and message volume.
   - **Projects Manager**: Direct CRUD with modal editors, instant tag management, and featured toggle.
   - **Messages Inbox**: Read, search, unread toggle, and archive contact submissions.
   - **Skills Editor**: Proficiency sliders with live optimistic feedback.
   - **Recent Activity Stream**: Live feed of audit logs with before/after mutations.
   - **Appearance Tokens**: Accent gradient switcher, font scale, and motion preferences.
3. **Full Content Management**:
   - Dedicated management workspaces at `/dashboard/projects`, `/dashboard/content`, and `/dashboard/messages`.
4. **Audit & Event Logs Explorer (`/dashboard/logs`)**:
   - Filterable by mutation type (`CREATE`, `UPDATE`, `DELETE`, `LOGIN`, `LAYOUT_CHANGE`).
   - Expandable rows revealing formatted before/after JSON diffs.
   - One-click CSV export via `/api/export/logs`.
   - Telemetry event log viewer with salted IP hashing and Do Not Track (DNT) adherence.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components, Server Actions)
- **Language**: TypeScript (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with CSS custom variable tokens
- **UI Primitives**: Radix UI primitives & [shadcn/ui](https://ui.shadcn.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) with `prefers-reduced-motion` global compliance
- **Drag & Drop**: [@dnd-kit/core](https://dndkit.com/) & [@dnd-kit/sortable](https://dndkit.com/)
- **ORM & Database**: [Prisma ORM](https://www.prisma.io/) with SQLite for local development (100% PostgreSQL production compatible)
- **Authentication**: [Auth.js (NextAuth v5)](https://authjs.dev/) Credentials session provider
- **Validation**: [Zod](https://zod.dev/) for server actions, forms, and environment variables
- **Structured Logging**: [Pino](https://getpino.io/) JSON server logs with secret redaction
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes) with light, dark, and system modes
- **Testing**: [Vitest](https://vitest.dev/) + React Testing Library

---

## 🏁 Getting Started

### 1. Prerequisites
- **Node.js**: `v20.x` or `v22.x` (or newer)
- **npm**: `v10.x` or newer

### 2. Installation
Clone the repository and install dependencies:

```bash
cd frontend
npm install --legacy-peer-deps
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Default local `.env`:
```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="dev-portfolio-secret-32-bytes-minimum-length-xyz123"
ADMIN_EMAIL="admin@portfolio.dev"
ADMIN_PASSWORD="adminpassword123"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup & Seeding
Initialize the SQLite database and seed realistic production-grade data:

```bash
# Push schema to SQLite database
npx prisma db push

# Seed database with realistic projects, timeline, skills, and admin credentials
npm run db:seed
```

### 5. Running the Application
Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser:
- **Public Portfolio**: [http://localhost:3000](http://localhost:3000)
- **Admin Dashboard**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- **Admin Login**: [http://localhost:3000/login](http://localhost:3000/login)

> **Demo Admin Credentials**:
> - Email: `admin@portfolio.dev`
> - Password: `adminpassword123`
> *(The login page also provides a 1-click "Auto-fill Seed Admin Credentials" button for instant testing)*

---

## 🧪 Testing & Quality Assurance

Run the Vitest test suite:

```bash
npm run test
```

Run static analysis and ESLint:

```bash
npm run lint
```

Build the production bundle:

```bash
npm run build
```

---

## 🐳 Docker Deployment

A multi-stage production Dockerfile is included:

```bash
# Build Docker image
docker build -t portfolio-frontend .

# Run container
docker run -p 3000:3000 --env-file .env portfolio-frontend
```

---

## 🗄️ Database Schema & Production Migration (PostgreSQL)

To deploy to PostgreSQL (Vercel Postgres, Supabase, Neon, AWS RDS):
1. In `prisma/schema.prisma`, change datasource provider to `"postgresql"`.
2. Set `DATABASE_URL="postgresql://user:password@host:port/database"` in your production environment.
3. Run `npx prisma db push` or `npx prisma migrate deploy`.

---

## ✅ Acceptance Checklist

- [x] Every dashboard edit appears in the audit log with a before/after diff
- [x] Widget layout persists after refresh and per user
- [x] No layout shift, no hydration warnings, no console errors
- [x] Spacing follows the strict 4/8px scale everywhere, with no arbitrary values
- [x] Reduced-motion and dark mode both work seamlessly
- [x] `npm run build`, `lint`, and `test` all pass cleanly
