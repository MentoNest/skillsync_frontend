import dynamic from "next/dynamic";
import React from "react";
import LazySection from "@/components/LazySection";

const sectionSkeleton = (label: string) =>
  React.createElement(
    "div",
    {
      className: "py-16 container mx-auto px-4",
      "aria-hidden": true,
      "data-skeleton": label,
    },
    React.createElement("div", {
      className: "h-8 w-1/3 mx-auto mb-8 rounded bg-gray-200 animate-pulse",
    }),
    React.createElement("div", {
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
    },
      ...Array.from({ length: 4 }, (_, i) =>
        React.createElement("div", {
          key: i,
          className: "h-40 rounded-lg bg-gray-100 animate-pulse",
        }),
      ),
    ),
  );

const LearningPathSection = dynamic(
  () => import("@/components/landing/LearningPathSection"),
);
const BenefitsSection = dynamic(
  () => import("@/components/landing/BenefitsSection"),
  { loading: () => sectionSkeleton("benefits") },
);
const PlatformStatisticsSection = dynamic(
  () => import("@/components/landing/PlatformStatisticsSection"),
  { loading: () => sectionSkeleton("stats") },
);
const TestimonialsSection = dynamic(
  () => import("@/components/landing/TestimonialsSection"),
  { loading: () => sectionSkeleton("testimonials") },
);
const CTASection = dynamic(() => import("@/components/landing/CTASection"), {
  loading: () => sectionSkeleton("cta"),
});

export const metadata = {
  title: "Resources | SkillSync",
  description:
    "Explore SkillSync learning paths, platform statistics, and stories from our community.",
};

export default function ResourcesPage() {
  return (
    <main>
      <LearningPathSection />
      <LazySection fallback={sectionSkeleton("benefits")}>
        <BenefitsSection />
      </LazySection>
      <LazySection fallback={sectionSkeleton("stats")}>
        <PlatformStatisticsSection />
      </LazySection>
      <LazySection fallback={sectionSkeleton("testimonials")}>
        <TestimonialsSection />
      </LazySection>
      <LazySection fallback={sectionSkeleton("cta")}>
        <CTASection />
      </LazySection>
    </main>
  );
}
