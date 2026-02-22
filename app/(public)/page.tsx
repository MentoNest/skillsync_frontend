import Hero from "../components/hero";
import FeaturedMentor from "../components/featured-mentor";
import WhyChoose from "../components/why-choose";
import Testimonials from "../components/testimonials";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedMentor />
      <Testimonials />
      <WhyChoose />
    </main>
  );
}
