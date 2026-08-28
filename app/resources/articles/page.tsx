import Link from "next/link";

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
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {articles.map((article) => (
          <article key={article.title} className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-2 text-2xl font-semibold">{article.title}</h2>
            <p className="text-gray-600">{article.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}