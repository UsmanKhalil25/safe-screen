"use client";

import { motion } from "framer-motion";
import { StarRating } from "./star-rating";

interface TestimonialItemProps {
  rating: number;
  content: string;
  author: string;
  role: string;
}

export function TestimonialItem({
  rating,
  content,
  author,
  role,
}: TestimonialItemProps) {
  return (
    <motion.div
      className="flex flex-col justify-between space-y-4 rounded-lg border bg-background p-6 shadow-sm h-full"
      whileHover={{
        y: -10,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-2">
        <StarRating rating={rating} />
        <p className="text-muted-foreground">{content}</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="rounded-full bg-muted p-1">
          <div className="h-8 w-8 rounded-full bg-primary/20" />
        </div>
        <div>
          <p className="text-sm font-medium">{author}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}
