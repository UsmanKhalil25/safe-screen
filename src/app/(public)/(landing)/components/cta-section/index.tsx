"use client";

import { motion } from "framer-motion";

import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function CTASection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6 mx-auto">
        <AnimatedSection
          className="flex flex-col items-center justify-center space-y-4 text-center"
          direction="up"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Ready to secure your files?
            </h2>
            <p className="max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed">
              Join thousands of users who trust SafeScreen with their most
              important data.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="text-primary"
                asChild
              >
                <Link href="/register" prefetch={true}>
                  Get Started
                </Link>
              </Button>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export { CTASection };
