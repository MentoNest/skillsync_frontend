import Link from "next/link";
import ArticleListItem from "./ArticleListItem";
import { FEATURED_ARTICLES, type ResourceItem } from "./resourceData";

export default function FeaturedArticles({ articles = FEATURED_ARTICLES }: { articles?: ResourceItem[] }) {
  return (
    <section aria-labelledby="featured-articles" className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 id="featured-articles" className="text-2xl font-semibold">Featured Articles</h2>
        <Link href="/resources/articles" className="text-sm font-medium text-purple-700 hover:underline">
          View All
        </Link>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <li key={article.id}>
            <ArticleListItem
              title={article.title}
              category={article.category}
              description={article.description}
              href={article.href}
              readTime={article.readTime}
              author={article.author}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
