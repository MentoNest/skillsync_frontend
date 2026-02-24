import Hero from "../components/hero";
import WhyChoose from "../components/why-choose";
import QuickAccess from "../components/quick-access";
import ResourceSearchBar from "../components/resource-search-bar";
import FeaturedArticles from "../components/featured-articles";

export default function HomePage() {
  return (
    <main className="min-h-screen space-y-10 md:space-y-12">
      <Hero />
      <ResourceSearchBar />
      <FeaturedArticles />
      <WhyChoose />
      <QuickAccess />
    </main>
  );
}
