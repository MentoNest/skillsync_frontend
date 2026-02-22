import Hero from "../components/hero";
import FeaturedMentor from "../components/featured-mentor";
import WhyChoose from "../components/why-choose";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedMentor />
      <WhyChoose />
    </main>
  );
}
