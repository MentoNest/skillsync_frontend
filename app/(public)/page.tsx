import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import MentorDiscoverySection from "@/components/landing/MentorDiscoverySection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <MentorDiscoverySection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
