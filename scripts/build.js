const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const defaultEnv = 'DATABASE_URL="file:./dev.db"\nAUTH_SECRET="portfolio-production-auth-secret-fallback-key-32chars"\n';

// 1. Guarantee .env exists in project root for Prisma CLI and Next.js
const rootEnv = path.join(__dirname, "..", ".env");
if (!fs.existsSync(rootEnv)) {
  fs.writeFileSync(rootEnv, defaultEnv);
  console.log("Created root .env for build.");
}

// 2. Guarantee .env exists inside prisma directory for Prisma WASM engine
const prismaEnv = path.join(__dirname, "..", "prisma", ".env");
if (!fs.existsSync(prismaEnv)) {
  fs.writeFileSync(prismaEnv, defaultEnv);
  console.log("Created prisma/.env for build.");
}

process.env.DATABASE_URL = process.env.DATABASE_URL || "file:./dev.db";

console.log("=== Vercel Build: Next.js Production Build ===");
execSync("npx next build", {
  stdio: "inherit",
  env: process.env,
});
