"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

interface TypewriterRotatorProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export function TypewriterRotator({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  className = "",
}: TypewriterRotatorProps) {
  const [index, setIndex] = React.useState(0);
  const [subIndex, setSubIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    if (words.length === 0) return;

    const currentWord = words[index];

    // Finished typing current word, pause before deleting
    if (!isDeleting && subIndex === currentWord.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }

    // Finished deleting, move to next word
    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    // Typing or deleting interval
    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, words, typingSpeed, deletingSpeed, pauseDuration]);

  const currentText = words[index]?.substring(0, subIndex) || "";

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{currentText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="ml-1 inline-block h-[1.1em] w-[3px] bg-gradient-to-b from-[#8B5CF6] to-[#3B82F6] rounded-full align-middle"
      />
    </span>
  );
}

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789!@#$%^&*";

export function ScrambleText({
  text,
  className = "",
  as: Component = "span",
}: ScrambleTextProps) {
  const [displayedText, setDisplayedText] = React.useState(text);
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = React.useState(false);

  const scramble = React.useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayedText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 25);

    return () => clearInterval(interval);
  }, [text]);

  React.useEffect(() => {
    if (isInView) {
      scramble();
    }
  }, [isInView, scramble]);

  return (
    <Component
      ref={ref as any}
      className={`cursor-default ${className}`}
      onMouseEnter={() => {
        if (!isHovered) {
          setIsHovered(true);
          scramble();
          setTimeout(() => setIsHovered(false), text.length * 30 + 300);
        }
      }}
    >
      {displayedText}
    </Component>
  );
}

interface SplitRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function SplitRevealHeading({
  text,
  className = "",
  delay = 0,
}: SplitRevealProps) {
  const words = text.split(" ");
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 18,
        stiffness: 120,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-block ${className}`}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className="inline-block mr-[0.25em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
