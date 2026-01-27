import Hero from '@/components/Hero';
import SkillSyncFeatures from '@/components/SkillSyncFeatures';
import LearningPathSection from '@/components/LearningPathSection';
import Footer from "@/components/Footer";
import CallToAction from '@/components/CallToAction';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Welcome to SkillSync</h2>
      <p className="text-lg text-gray-600">
        Landing page placeholder - Content to be implemented
      </p>

      <Hero />
      <CallToAction />
      <SkillSyncFeatures />
      <LearningPathSection />
      <Footer />
    </div>
  );
}
