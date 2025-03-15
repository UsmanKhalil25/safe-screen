"use client";

import Image from "next/image";
import { motion } from "framer-motion";

function HeroImage() {
  return (
    <motion.div
      className="relative w-full max-w-[500px] aspect-video overflow-hidden rounded-xl border shadow-xl"
      initial={{ y: 20 }}
      animate={{ y: [20, 0, 20] }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <Image
        src="/placeholder.svg?height=500&width=800"
        width={800}
        height={500}
        alt="SafeScreen Dashboard Preview"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
    </motion.div>
  );
}

export { HeroImage };
