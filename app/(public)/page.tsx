import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Welcome to SkillSync</h2>
      <p className="text-lg text-gray-600">
        Landing page placeholder - Content to be implemented
      </p>



      <Footer />
    </div>
import Hero from '@/components/Hero';
import SkillSyncFeatures from '@/components/SkillSyncFeatures';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SkillSyncFeatures />
    </>
  );
}
