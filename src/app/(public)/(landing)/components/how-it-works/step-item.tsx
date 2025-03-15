"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface StepItemProps {
  number: number;
  title: string;
  description: string;
  imageAlt: string;
}

export function StepItem({
  number,
  title,
  description,
  imageAlt,
}: StepItemProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <motion.div
        className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {number}
      </motion.div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-center text-muted-foreground">{description}</p>
      <motion.div
        whileHover={{
          y: -5,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src="/placeholder.svg?height=200&width=300"
          width={300}
          height={200}
          alt={imageAlt}
          className="rounded-lg border shadow-sm"
        />
      </motion.div>
    </div>
  );
}
