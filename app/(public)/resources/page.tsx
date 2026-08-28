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
import Link from "next/link";

const resourceCategories = [
  {
    title: "Learning Tracks",
    description: "Follow a focused path to build practical skills step by step.",
    href: "/resources/tracks",
  },
  {
    title: "Articles",
    description: "Browse concise guidance and ideas to support your learning.",
    href: "/resources/articles",
  },
];

export default function ResourcesPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <header className="mb-10 max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-blue-500">
          SkillSync resources
        </p>
        <h1 className="mb-4 text-4xl font-bold">Learning Resources</h1>
        <p className="text-lg text-gray-600">
          Explore learning paths and articles designed to help you make steady
          progress with your goals.
        </p>
      </header>

      <section aria-labelledby="resource-categories-heading">
        <h2 id="resource-categories-heading" className="sr-only">
          Resource categories
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {resourceCategories.map((category) => (
            <article
              key={category.href}
              className="rounded-lg bg-white p-6 shadow-md"
            >
              <h3 className="mb-2 text-2xl font-semibold">{category.title}</h3>
              <p className="mb-5 text-gray-600">{category.description}</p>
              <Link href={category.href} className="text-blue-500 hover:underline">
                Explore {category.title}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
