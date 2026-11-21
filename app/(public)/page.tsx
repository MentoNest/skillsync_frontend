import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import dynamic from "next/dynamic";

// Below-the-fold sections are code-split so the hero renders first (#1358).
const MentorDiscoverySection = dynamic(() => import("@/components/landing/MentorDiscoverySection"));
const TestimonialsSection = dynamic(() => import("@/components/landing/TestimonialsSection"));
const CTASection = dynamic(() => import("@/components/landing/CTASection"));
const WhyChooseUsSection = dynamic(() => import("@/components/landing/WhyChooseUsSection"));
const LearningPathsSection = dynamic(() => import("@/components/landing/LearningPathsSection"));
const FeaturedMentorHighlight = dynamic(() => import("@/components/landing/FeaturedMentorHighlight"));
const Footer = dynamic(() => import("@/components/landing/Footer"));

/**
 * The landing page.
 *
 * Reading order is the argument the page makes: what the product is (hero), who
 * it is for (mentor discovery), evidence it works (stats), and what people say
 * (testimonials) before the ask (CTA). Putting the CTA last rather than after
 * the hero is the main change from the previous version of this file, and it is
 * the reason the other two sections have anywhere to sit.
 *
 * The `Navbar` is `fixed`, so the hero carries `pt-16` to clear it. Every
 * section after the hero does not need that, and does not have it.
 */
export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <StatsSection />
        <MentorDiscoverySection />
        <TestimonialsSection />
        <WhyChooseUsSection />
        <LearningPathsSection />
        <FeaturedMentorHighlight />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}