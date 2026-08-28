import Link from "next/link";
import ResourceCategoryCard from "@/components/resources/ResourceCategoryCard";

const articles = [
  {
    title: "Building Your First API",
    description:
      "A practical introduction to designing and building reliable APIs.",
  },
  {
    title: "The Essentials of Responsive Design",
    description:
      "Learn the core techniques for creating interfaces that work on every screen.",
  },
];

export const metadata = {
  title: "Articles | SkillSync",
  description: "Browse concise guidance and ideas to support your learning.",
};

export default function ArticlesPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <nav aria-label="Breadcrumb">
        <Link
          href="/"
          className="text-blue-500 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
          aria-label="Back to home"
        >
          ← Back to home
        </Link>
      </nav>

      <header className="mt-4 mb-10">
        <h1 className="text-4xl font-bold">Articles</h1>
        <p className="mt-3 text-lg text-gray-600">
          Browse concise guidance and ideas to support your learning.
        </p>
      </header>

      <section aria-labelledby="articles-list-heading">
        <h2 id="articles-list-heading" className="sr-only">
          Available articles
        </h2>
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2">
          {articles.map((article) => (
            <ResourceCategoryCard
              key={article.title}
              icon={<span aria-hidden="true">A</span>}
              title={article.title}
              description={article.description}
              link="#"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
