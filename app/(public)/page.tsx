// app/(public)/page.tsx

import HeroSection from '@/components/landing/HeroSection';
import CTASection from '@/components/landing/CTASection';

export default function PublicHomePage() {
  return (
    <>
      <HeroSection />
      <CTASection />
    </>
  );
}