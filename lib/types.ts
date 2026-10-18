export interface ProfileDTO {
  id: string;
  full_name: string;
  title: string;
  headline: string;
  bio: string;
  location: string;
  avatar_url?: string | null;
  resume_url?: string | null;
  available_for_hire: boolean;
  social_links?: string | null;
  updated_at: string;
}

export interface SkillItemDTO {
  id: string;
  name: string;
  proficiency?: number | null;
  featured: boolean;
  order: number;
  category_id: string;
}

export interface SkillCategoryDTO {
  id: string;
  name: string;
  description?: string | null;
  order: number;
  skills: SkillItemDTO[];
}

export interface ExperienceDTO {
  id: string;
  role: string;
  company: string;
  location?: string | null;
  period: string;
  description: string;
  achievements?: string | null;
  technologies?: string | null;
  order: number;
  current: boolean;
}

export interface ProjectDTO {
  id: string;
  slug: string;
  title: string;
  tagline?: string | null;
  description: string;
  content?: string | null;
  cover_image: string;
  images?: string | null;
  category: string;
  technologies: string;
  metrics?: string | null;
  github_url?: string | null;
  live_url?: string | null;
  featured: boolean;
  published: boolean;
  order: number;
  views_count: number;
  created_at: string;
  updated_at: string;
}

export interface MessageDTO {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface AttendanceResultDTO {
  is_verified: boolean;
  distance_meters: number;
  zone_name?: string | null;
  message: string;
  timestamp: string;
}

export interface DashboardStatsDTO {
  total_page_views: number;
  total_project_views: number;
  total_messages: number;
  total_projects: number;
}
