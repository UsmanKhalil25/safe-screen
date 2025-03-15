import { AnimatedSection } from "@/components/ui/animated-section";
import { StaggeredItems } from "@/components/ui/staggered-items";

import { StepItem } from "./step-item";

import { SECTION_IDS } from "../../constants";

const STEPS = [
  {
    number: 1,
    title: "Upload Your Files",
    description:
      "Simply drag and drop your files into SafeScreen. They're automatically encrypted for protection.",
    imageAlt: "Upload illustration",
  },
  {
    number: 2,
    title: "Organize & Manage",
    description:
      "Create folders, add tags, and organize your files however you prefer.",
    imageAlt: "Organize illustration",
  },
  {
    number: 3,
    title: "Share Securely",
    description:
      "Generate secure links to share with others, with optional passwords and expiration dates.",
    imageAlt: "Share illustration",
  },
];

function HowItWorks() {
  return (
    <section
      id={SECTION_IDS.HOW_IT_WORKS}
      className="w-full py-12 md:py-24 lg:py-32 xl:py-48"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Simple, secure, and straightforward
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              SafeScreen makes secure file storage and sharing as easy as 1-2-3.
            </p>
          </div>
        </AnimatedSection>
        <StaggeredItems
          className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3"
          direction="up"
          staggerDelay={0.2}
        >
          {STEPS.map((step) => (
            <StepItem key={step.number} {...step} />
          ))}
        </StaggeredItems>
      </div>
    </section>
  );
}

export { HowItWorks };
