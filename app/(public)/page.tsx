import dynamic from 'next/dynamic';
import Hero from "../components/hero";
import Empower from '../components/ui/Empower';

// Dynamically import below-fold components to reduce initial payload
const FeaturedMentor = dynamic(() => import("../components/featured-mentor"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
});

const SkillSyncFeatures = dynamic(() => import("../components/why-choose"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
});

const LearningPathSection = dynamic(() => import("../components/mentor-showcase").then(mod => ({ default: mod.MentorShowcase })), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
});

const Testimonials = dynamic(() => import("../components/testimonials"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
});

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Hero />
      <FeaturedMentor />
      <SkillSyncFeatures />
      <LearningPathSection />
      <Empower/>
      <Testimonials />
    </main>
  );
}
