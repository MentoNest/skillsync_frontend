import dynamic from "next/dynamic";
import Hero from "../components/hero";
import ResourceSearchBar from "../components/resource-search-bar";
import QuickAccess from "../components/quick-access";

// Dynamically import below-fold components
const WhyChoose = dynamic(() => import("../components/why-choose"), {
  loading: () => (
    <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
  ),
});

const FeaturedMentor = dynamic(() => import("../components/featured-mentor"), {
  loading: () => (
    <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
  ),
});

const LearningPathSection = dynamic(() =>
  import("../components/mentor-showcase").then((mod) => ({
    default: mod.MentorShowcase,
  }))
);

const Testimonials = dynamic(() => import("../components/testimonials"));

export default function HomePage() {
  return (
    <main className="min-h-screen space-y-10 md:space-y-12">
      <Hero />
      <ResourceSearchBar />
      <WhyChoose />
      <FeaturedMentor />
      <LearningPathSection />
      <Testimonials />
      <QuickAccess />
    </main>
  );
}