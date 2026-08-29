import LearningResourcesHero from "@/components/resources/LearningResourcesHero";
import QuickAccessSection from "@/components/resources/QuickAccessSection";
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

export const metadata = {
  title: "Resources | SkillSync",
  description:
    "Explore SkillSync learning paths, platform statistics, and stories from our community.",
};

export default function ResourcesPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <LearningResourcesHero />

      {/* Resource Categories Section */}
      <div className="container mx-auto px-4 py-16">
        <section aria-labelledby="resource-categories-heading">
          <div className="mb-8">
            <h2 id="resource-categories-heading" className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Explore by Category
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Select a learning format that best fits your study preferences.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2">
            {resourceCategories.map((category) => (
              <article
                key={category.href}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary-200 hover:shadow-md"
                aria-label={category.title}
              >
                <h3 className="mb-2 text-2xl font-semibold text-gray-900">{category.title}</h3>
                <p className="mb-5 text-gray-600">{category.description}</p>
                <Link
                  href={category.href}
                  className="inline-flex items-center font-medium text-primary-600 hover:text-primary-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
                  aria-label={`Explore ${category.title}`}
                >
                  Explore {category.title} →
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Quick Access grid section */}
      <div className="bg-gray-50">
        <QuickAccessSection />
      </div>
    </main>
  );
}

