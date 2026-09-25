import HeroSection from "@/components/landing/HeroSection";
import MentorDiscoverySection from "@/components/landing/MentorDiscoverySection";
import CTASection from "@/components/landing/CTASection";
import WhyChooseUsSection from "@/components/landing/WhyChooseUsSection";
import LearningPathsSection from "@/components/landing/LearningPathsSection";
import FeaturedMentorHighlight from "@/components/landing/FeaturedMentorHighlight";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <MentorDiscoverySection />
      <WhyChooseUsSection />
      <LearningPathsSection />
      <FeaturedMentorHighlight />
      <CTASection />
    </main>
  );
}