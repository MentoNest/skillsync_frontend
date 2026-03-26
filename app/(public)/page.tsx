// app/(public)/page.tsx

import HeroSection from '@/components/landing/HeroSection';
import CTASection from '@/components/landing/CTASection';
import WhyChooseUsSection from '@/components/landing/WhyChooseUsSection';

export default function PublicHomePage() {
  return (
    <main>
      <HeroSection />
      <CTASection />
      <WhyChooseUsSection />
    </main>
  );
}