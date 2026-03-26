// app/(public)/page.tsx

import HeroSection from '@/components/landing/HeroSection';
import WhyChooseUsSection from '@/components/landing/WhyChooseUsSection';

export default function PublicHomePage() {
  return (
    <main>
      <HeroSection />
      <WhyChooseUsSection />
    </main>
  );
}