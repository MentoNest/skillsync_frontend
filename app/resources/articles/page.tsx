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

export default function ArticlesPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <Link href="/" className="text-blue-500 hover:underline">
        Back to home
      </Link>
      <h1 className="mb-10 mt-4 text-4xl font-bold">Articles</h1>
      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2">
        {articles.map((article) => (
          <ResourceCategoryCard
            key={article.title}
            icon="A"
            title={article.title}
            description={article.description}
            link="#"
          />
        ))}
      </div>
    </main>
  );
}