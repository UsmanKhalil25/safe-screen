import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";

import { HeroImage } from "./hero-image";
import { SECTION_IDS } from "../../constants";

function HeroSection() {
  return (
    <section
      id={SECTION_IDS.HERO}
      className="w-full py-12 md:py-24 lg:py-32 xl:py-48"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <AnimatedSection
            direction="left"
            className="flex flex-col justify-center space-y-4"
            duration={0.7}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Secure File Storage & Sharing Made Simple
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                SafeScreen provides a secure place to store your files and share
                them with others using protected links.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="gap-1" asChild>
                <Link href="/sign-up" prefetch={true}>
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
          <AnimatedSection
            direction="right"
            className="flex items-center justify-center"
            duration={0.7}
          >
            <HeroImage />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

export { HeroSection };
