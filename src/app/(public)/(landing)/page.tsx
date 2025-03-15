import { Header } from "./components/header";
import { FeatureSection } from "./components/feature-section";
import { HeroSection } from "./components/hero-section";
import { HowItWorks } from "./components/how-it-works";
import { TestimonalsSection } from "./components/testimonals-section";
import { PricingSection } from "./components/pricing-section";
import { CTASection } from "./components/cta-section";
import { Footer } from "./components/footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeatureSection />
        <HowItWorks />
        <TestimonalsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
