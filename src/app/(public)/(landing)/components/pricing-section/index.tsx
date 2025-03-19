import { AnimatedSection } from "@/components/ui/animated-section";
import { StaggeredItems } from "@/components/ui/staggered-items";

import { PricingCard } from "./pricing-card";

import { SECTION_IDS } from "../../constants";

const PRICING_PLANS = [
  {
    name: "Free",
    description: "Perfect for personal use and getting started",
    price: "$0",
    interval: "/month",
    features: [
      "2GB storage",
      "Basic file sharing",
      "Standard encryption",
      "3-day file history",
      "Email support",
    ],
    buttonText: "Get Started",
    variant: "default" as const,
  },
  {
    name: "Premium",
    description: "Enhanced security and storage for professionals",
    price: "$12",
    interval: "/month",
    features: [
      "50GB storage",
      "Advanced sharing controls",
      "End-to-end encryption",
      "30-day file history",
      "Password-protected links",
      "Priority support",
    ],
    buttonText: "Get Started",
    variant: "inverted" as const,
  },
  {
    name: "Epic",
    description: "AI-powered security for maximum protection",
    price: "$29",
    interval: "/month",
    features: [
      "500GB storage",
      "AI threat detection",
      "Real-time file monitoring",
      "Automated security audits",
      "Content verification AI",
      "Unlimited file history",
      "24/7 dedicated support",
    ],
    buttonText: "Get Started",
    variant: "default" as const,
  },
];

function PricingSection() {
  return (
    <section
      id={SECTION_IDS.PRICING}
      className="w-full py-12 md:py-24 lg:py-32 xl:py-48"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Simple, transparent pricing
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that&apos;s right for you or your team.
            </p>
          </div>
        </AnimatedSection>
        <StaggeredItems
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3"
          containerDelay={0.2}
        >
          {PRICING_PLANS.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </StaggeredItems>
      </div>
    </section>
  );
}

export { PricingSection };
