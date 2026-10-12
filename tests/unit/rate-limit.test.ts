import { describe, it, expect } from "vitest";
import { checkRateLimit } from "@/lib/rate-limit";

describe("Rate Limiter", () => {
  it("allows initial requests within limit", () => {
    const key = `test-ip-${Date.now()}`;
    const res = checkRateLimit(key, 3, 10000);
    expect(res.success).toBe(true);
    expect(res.remaining).toBe(2);
  });

  it("blocks requests that exceed limit", () => {
    const key = `test-block-${Date.now()}`;
    checkRateLimit(key, 2, 10000); // 1
    checkRateLimit(key, 2, 10000); // 2
    const blocked = checkRateLimit(key, 2, 10000); // 3 (exceeded)
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
  });
});
