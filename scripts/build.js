const { execSync } = require("child_process");

// 1. Ensure DATABASE_URL is always defined during build
process.env.DATABASE_URL = process.env.DATABASE_URL || "file:./dev.db";

console.log("=== Vercel Build Step 1: Database Schema Sync ===");
try {
  execSync("npx prisma db push --skip-generate", {
    stdio: "inherit",
    env: process.env,
  });
  console.log("Database schema synchronized successfully.");
} catch (err) {
  console.warn("Database schema sync skipped or non-fatal warning:", err.message);
}

console.log("=== Vercel Build Step 2: Next.js Production Build ===");
execSync("next build", {
  stdio: "inherit",
  env: process.env,
});
