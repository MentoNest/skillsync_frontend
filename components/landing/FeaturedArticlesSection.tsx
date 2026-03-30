import Link from 'next/link';
import ArticleListItem from './ArticleListItem';

const featuredArticles = [
  {
    category: 'Career Growth',
    title: 'How to Negotiate Your Salary Like a Pro',
    author: 'By Sarah Johnson',
    readTime: '5 min read',
    href: '/articles/negotiate-salary',
  },
  {
    category: 'Personal Branding',
    title: 'Building a Personal Brand on LinkedIn',
    author: 'By Marcus Williams',
    readTime: '7 min read',
    href: '/articles/personal-branding-linkedin',
  },
  {
    category: 'Career Change',
    title: 'Transitioning to Tech: A Complete Guide',
    author: 'By Emily Chen',
    readTime: '10 min read',
    href: '/articles/transitioning-to-tech',
  },
];

export default function FeaturedArticlesSection() {
  return (
    <section
      aria-labelledby="featured-articles-heading"
      className="w-full bg-slate-50 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">
              Featured Articles
            </p>
            <h2 id="featured-articles-heading" className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Explore our latest insights
            </h2>
          </div>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 transition hover:text-purple-700"
          >
            View All
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ul role="list" className="grid gap-4">
          {featuredArticles.map((article) => (
            <ArticleListItem key={article.title} {...article} />
          ))}
        </ul>
      </div>
    </section>
  );
}
