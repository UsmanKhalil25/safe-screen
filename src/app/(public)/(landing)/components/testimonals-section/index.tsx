import { AnimatedSection } from "@/components/ui/animated-section";
import { StaggeredItems } from "@/components/ui/staggered-items";
import { SECTION_IDS } from "../../constants";
import { TestimonialItem } from "./testimonial-item";

const TESTIMONIALS = [
  {
    rating: 5,
    content:
      "SafeScreen has completely transformed how our team shares sensitive documents with clients. The secure links feature is a game-changer.",
    author: "Sarah Johnson",
    role: "Financial Advisor",
  },
  {
    rating: 5,
    content:
      "As a healthcare provider, data security is paramount. SafeScreen gives us peace of mind with its end-to-end encryption and access controls.",
    author: "Dr. Michael Chen",
    role: "Medical Director",
  },
  {
    rating: 5,
    content:
      "The ability to set expiration dates on shared links has been invaluable for our legal team. SafeScreen is now an essential part of our workflow.",
    author: "Amanda Rodriguez",
    role: "Legal Counsel",
  },
];

function TestimonalsSection() {
  return (
    <section
      id={SECTION_IDS.TESTIMONIALS}
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Trusted by thousands
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what our users have to say about SafeScreen.
            </p>
          </div>
        </AnimatedSection>
        <StaggeredItems
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
          direction="up"
          distance={20}
          staggerDelay={0.15}
        >
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialItem key={testimonial.author} {...testimonial} />
          ))}
        </StaggeredItems>
      </div>
    </section>
  );
}

export { TestimonalsSection };
