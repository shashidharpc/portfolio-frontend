"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = React.useState(false);
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);
  const [cursorText, setCursorText] = React.useState("");
  const [cursorVariant, setCursorVariant] = React.useState<
    "default" | "hover" | "project" | "text" | "hidden"
  >("default");
  const [isClicking, setIsClicking] = React.useState(false);
  const [ripples, setRipples] = React.useState<
    { id: number; x: number; y: number }[]
  >([]);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for outer ring
  const springConfig = { damping: 24, stiffness: 280, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  React.useEffect(() => {
    setMounted(true);

    // Check if device supports fine hover pointer
    const checkTouch = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
      );
    };

    if (checkTouch()) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check cursor data attribute or tag
      const clickable = target.closest("a, button, [role='button'], input, textarea, select");
      const projectCard = target.closest("[data-cursor='project']");
      const textElement = target.closest("h1, h2, h3, p, [data-cursor='text']");

      if (projectCard) {
        setCursorVariant("project");
        setCursorText("EXPLORE");
      } else if (clickable) {
        setCursorVariant("hover");
        setCursorText("");
      } else if (textElement && !clickable) {
        setCursorVariant("text");
        setCursorText("");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-4), newRipple]);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setCursorVariant("hidden");
    };

    const handleMouseEnter = () => {
      setCursorVariant("default");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  // Clean up old ripples
  React.useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.filter((r) => Date.now() - r.id < 700));
    }, 700);
    return () => clearTimeout(timer);
  }, [ripples]);

  if (!mounted || isTouchDevice) return null;

  const ringVariants = {
    default: {
      width: 32,
      height: 32,
      borderWidth: "1.5px",
      borderColor: "rgba(212, 71, 27, 0.7)",
      backgroundColor: "rgba(212, 71, 27, 0.08)",
      opacity: 1,
    },
    hover: {
      width: 52,
      height: 52,
      borderWidth: "2px",
      borderColor: "rgba(234, 88, 12, 0.95)",
      backgroundColor: "rgba(234, 88, 12, 0.15)",
      scale: 1.15,
      opacity: 1,
    },
    project: {
      width: 76,
      height: 76,
      borderWidth: "2px",
      borderColor: "rgba(251, 146, 60, 0.95)",
      backgroundColor: "rgba(212, 71, 27, 0.25)",
      opacity: 1,
    },
    text: {
      width: 24,
      height: 24,
      borderWidth: "1px",
      borderColor: "rgba(212, 71, 27, 0.5)",
      backgroundColor: "rgba(212, 71, 27, 0)",
      opacity: 0.6,
    },
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Click ripples */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0.2, opacity: 0.8 }}
          animate={{ scale: 3.5, opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{
            position: "fixed",
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "2px solid #D4471B",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Trailing Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center backdrop-blur-[1px] shadow-[0_0_20px_rgba(212,71,27,0.35)]"
        variants={ringVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          transformOrigin: "center center",
          scale: isClicking ? 0.85 : 1,
        }}
      >
        {cursorText && (
          <span className="text-[9px] font-mono font-bold tracking-widest text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Direct Inner Pointer Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-gradient-to-tr from-[#EA580C] to-[#D4471B] shadow-[0_0_10px_rgba(212,71,27,0.8)]"
        animate={{
          scale: cursorVariant === "hover" ? 1.4 : cursorVariant === "project" ? 0 : 1,
          opacity: cursorVariant === "hidden" ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
        }}
      />
    </div>
  );
}
