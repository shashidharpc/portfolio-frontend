import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button Component", () => {
  it("renders with default props and text content", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("applies min height 44px style token by default", () => {
    render(<Button>Touch Target</Button>);
    const button = screen.getByRole("button", { name: /touch target/i });
    expect(button.className).toContain("h-[44px]");
  });
});
