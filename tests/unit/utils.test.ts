import { describe, it, expect } from "vitest";
import { cn, formatDate } from "@/lib/utils";

describe("Utils", () => {
  it("merges class names correctly with twMerge", () => {
    const result = cn("px-2 py-1", "px-4", "text-sm");
    expect(result).toBe("py-1 px-4 text-sm");
  });

  it("formats dates gracefully", () => {
    const d = new Date("2024-05-15T00:00:00Z");
    const formatted = formatDate(d);
    expect(formatted).toContain("2024");
  });
});
