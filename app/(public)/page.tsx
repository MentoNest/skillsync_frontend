import Hero from '@/components/Hero';
import SkillSyncFeatures from '@/components/SkillSyncFeatures';
import LearningPathSection from '@/components/LearningPathSection';
import Footer from "@/components/Footer";
import CallToAction from '@/components/CallToAction';

export default function HomePage() {
  return (
    <div >
    

      <Hero />
      <CallToAction />
      <SkillSyncFeatures />
      <LearningPathSection />
      <Footer />
    </div>
  );
}
