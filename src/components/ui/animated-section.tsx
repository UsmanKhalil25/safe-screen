"use client";

import type React from "react";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation, type Variant } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  threshold?: number;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  duration = 0.5,
  once = true,
  direction = "up",
  distance = 50,
}: AnimatedSectionProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
  });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  const getDirectionOffset = (): Record<string, Variant> => {
    switch (direction) {
      case "up":
        return {
          hidden: { y: distance, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case "down":
        return {
          hidden: { y: -distance, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case "left":
        return {
          hidden: { x: distance, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case "right":
        return {
          hidden: { x: -distance, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case "none":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      default:
        return {
          hidden: { y: distance, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
    }
  };

  const variants = {
    ...getDirectionOffset(),
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
