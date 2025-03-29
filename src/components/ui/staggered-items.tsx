"use client";

import React from "react";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface StaggeredItemsProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  containerDelay?: number;
  threshold?: number;
}

export function StaggeredItems({
  children,
  className,
  staggerDelay = 0.1,
  duration = 0.5,
  once = true,
  direction = "up",
  distance = 30,
  containerDelay = 0,
}: StaggeredItemsProps) {
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

  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      case "none":
        return {};
      default:
        return { y: distance };
    }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: containerDelay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, ...getDirectionOffset() },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  };

  // Clone children and wrap each one in a motion.div with animation variants
  const childrenArray = React.Children.toArray(children);
  const staggeredChildren = childrenArray.map((child, index) => (
    <motion.div key={index} variants={item}>
      {child}
    </motion.div>
  ));

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={controls}
    >
      {staggeredChildren}
    </motion.div>
  );
}
