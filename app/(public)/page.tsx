import Hero from "../components/hero";
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
    </main>
  );
}
