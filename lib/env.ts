import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().default("file:./dev.db"),
  AUTH_SECRET: z.string().default("portfolio-production-auth-secret-fallback-key-32chars"),
  ADMIN_EMAIL: z.string().email().default("admin@portfolio.dev"),
  ADMIN_PASSWORD: z.string().min(8).default("adminpassword123"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL || "file:./dev.db",
  AUTH_SECRET: process.env.AUTH_SECRET || "portfolio-production-auth-secret-fallback-key-32chars",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});
