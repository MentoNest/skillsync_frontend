// app/(public)/page.tsx

import HeroSection from '@/components/landing/HeroSection';
import WhyChooseUsSection from '@/components/landing/WhyChooseUsSection';
import PlatformStatisticsSection from '@/components/landing/PlatformStatisticsSection';

export default function PublicHomePage() {
  return (
    <main>
      <HeroSection />
      <PlatformStatisticsSection />
      <WhyChooseUsSection />
    </main>
  );
}