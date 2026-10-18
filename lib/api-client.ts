import {
  ProfileDTO,
  SkillCategoryDTO,
  ExperienceDTO,
  ProjectDTO,
  MessageDTO,
  AttendanceResultDTO,
  DashboardStatsDTO,
} from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include", // Send session cookies cross-origin
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `API Error [${response.status}] ${response.statusText}: ${errorBody}`
      );
    }

    if (response.status === 204) {
      return null as T;
    }

    return response.json();
  }

  // ----------------------------------------------------
  // Public Content Endpoints
  // ----------------------------------------------------
  async getProfile(): Promise<ProfileDTO> {
    return this.request<ProfileDTO>("/content/profile");
  }

  async getSkills(): Promise<SkillCategoryDTO[]> {
    return this.request<SkillCategoryDTO[]>("/content/skills");
  }

  async getExperiences(): Promise<ExperienceDTO[]> {
    return this.request<ExperienceDTO[]>("/content/experiences");
  }

  async getProjects(category?: string): Promise<ProjectDTO[]> {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    return this.request<ProjectDTO[]>(`/projects${query}`);
  }

  async getProjectBySlug(slug: string): Promise<ProjectDTO> {
    return this.request<ProjectDTO>(`/projects/${encodeURIComponent(slug)}`);
  }

  async incrementProjectView(slug: string): Promise<{ slug: string; views_count: number }> {
    return this.request<{ slug: string; views_count: number }>(
      `/projects/${encodeURIComponent(slug)}/view`,
      { method: "POST" }
    );
  }

  async submitContact(data: {
    name: string;
    email: string;
    subject?: string;
    content: string;
  }): Promise<MessageDTO> {
    return this.request<MessageDTO>("/messages", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async scanQRAttendance(data: {
    user_identifier: string;
    qr_token: string;
    latitude: number;
    longitude: number;
    device_id?: string;
  }): Promise<AttendanceResultDTO> {
    return this.request<AttendanceResultDTO>("/attendance/qr/scan", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // ----------------------------------------------------
  // Admin & Dashboard Endpoints
  // ----------------------------------------------------
  async getDashboardStats(): Promise<DashboardStatsDTO> {
    return this.request<DashboardStatsDTO>("/dashboard/stats");
  }

  async getDashboardLayout(): Promise<{ widgets_config: string; accent_gradient: string }> {
    return this.request<{ widgets_config: string; accent_gradient: string }>("/dashboard/layout");
  }

  async updateDashboardLayout(data: {
    widgets_config: string;
    accent_gradient?: string;
    font_size?: string;
    motion_enabled?: boolean;
  }): Promise<unknown> {
    return this.request("/dashboard/layout", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async getInboxMessages(): Promise<MessageDTO[]> {
    return this.request<MessageDTO[]>("/messages");
  }

  async markMessageRead(id: string): Promise<MessageDTO> {
    return this.request<MessageDTO>(`/messages/${id}/read`, {
      method: "PATCH",
    });
  }
}

export const api = new ApiClient(API_BASE_URL);
