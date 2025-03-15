import { ShieldCheck, Share2, Lock, FileCheck, Users, Eye } from "lucide-react";

import { AnimatedSection } from "@/components/ui/animated-section";
import { StaggeredItems } from "@/components/ui/staggered-items";

import { FeatureCard } from "./feature-card";

import { SECTION_IDS } from "../../constants";

const FEATURES = [
  {
    title: "End-to-End Encryption",
    description:
      "Your files are encrypted before they leave your device, ensuring maximum security.",
    icon: Lock,
  },
  {
    title: "Secure Sharing",
    description:
      "Share files with anyone using protected links with optional passwords and expiration dates.",
    icon: Share2,
  },
  {
    title: "File Version History",
    description:
      "Access previous versions of your files and restore them with a single click.",
    icon: FileCheck,
  },
  {
    title: "Team Collaboration",
    description:
      "Work together with your team on shared files with granular permission controls.",
    icon: Users,
  },
  {
    title: "Access Controls",
    description:
      "Set permissions for who can view, edit, or share your files and folders.",
    icon: ShieldCheck,
  },
  {
    title: "Activity Monitoring",
    description:
      "Track who accessed your files and when, with detailed activity logs.",
    icon: Eye,
  },
];

function FeatureSection() {
  return (
    <section
      id={SECTION_IDS.FEATURES}
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <AnimatedSection
          className="flex flex-col items-center justify-center space-y-4 text-center"
          duration={0.7}
        >
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything you need for secure file management
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              SafeScreen combines powerful security features with an intuitive
              interface to keep your files protected.
            </p>
          </div>
        </AnimatedSection>
        <StaggeredItems
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.1}
          containerDelay={0.2}
        >
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </StaggeredItems>
      </div>
    </section>
  );
}

export { FeatureSection };
