import Hero from "../components/hero";
import WhyChoose from "../components/why-choose";
import QuickAccess from "../components/quick-access";
import ResourceSearchBar from "../components/resource-search-bar";
import WhyChoose from "../components/why-choose";
import QuickAccess from "../components/quick-access";

export default function HomePage() {
  return (
    <main className="min-h-screen space-y-10 md:space-y-12">
      <Hero />
      <ResourceSearchBar />
      <WhyChoose />
      <QuickAccess />

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
    <main className="min-h-screen">
      <Hero />
      <WhyChoose />
      <QuickAccess />
    </main>
  );
}
