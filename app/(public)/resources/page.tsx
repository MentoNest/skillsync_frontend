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
      {/* Page header + category cards */}
      <div className="container mx-auto px-4 py-16">
        <header className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-blue-500">
            <span aria-hidden="true">SkillSync resources</span>
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
          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2">
            {resourceCategories.map((category) => (
              <article
                key={category.href}
                className="rounded-lg bg-white p-6 shadow-md"
                aria-label={category.title}
              >
                <h2 className="mb-2 text-2xl font-semibold">{category.title}</h2>
                <p className="mb-5 text-gray-600">{category.description}</p>
                <Link
                  href={category.href}
                  className="text-blue-500 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
                  aria-label={`Explore ${category.title}`}
                >
                  Explore {category.title}
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
