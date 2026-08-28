import Link from "next/link";

const featured = [
  {
    id: "building-your-first-api",
    title: "Building Your First API",
    description: "A practical introduction to designing and building reliable APIs.",
    href: "/resources/articles#building-your-first-api",
  },
  {
    id: "responsive-design-essentials",
    title: "The Essentials of Responsive Design",
    description: "Core techniques for creating interfaces that work on every screen.",
    href: "/resources/articles#responsive-design-essentials",
  },
  {
    id: "career-growth-paths",
    title: "Career Growth Paths for Engineers",
    description: "Strategies to level up technically and professionally.",
    href: "/resources/articles#career-growth-paths",
  },
];

export default function FeaturedArticlesSection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Featured articles</h2>
        <Link
          href="/resources/articles"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View all
        </Link>
      </div>

      <ul className="space-y-3">
        {featured.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="block rounded-md px-4 py-3 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors shadow-sm hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 truncate">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0 text-sm text-gray-400">›</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
