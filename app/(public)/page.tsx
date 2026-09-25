import HeroSection from "@/components/landing/HeroSection";
import MentorDiscoverySection from "@/components/landing/MentorDiscoverySection";
import StatsSection from "@/components/landing/StatsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";

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
    <main>
      <HeroSection />
      <MentorDiscoverySection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
