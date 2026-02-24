import Hero from "../components/hero";
import WhyChoose from "../components/why-choose";
import QuickAccess from "../components/quick-access";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <WhyChoose />
      <QuickAccess />
    </main>
  );
}
