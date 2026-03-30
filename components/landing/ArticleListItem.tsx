import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

interface ArticleListItemProps {
  category: string;
  title: string;
  author: string;
  readTime: string;
  href: string;
}

export default function ArticleListItem({
  category,
  title,
  author,
  readTime,
  href,
}: ArticleListItemProps) {
  const titleId = `article-title-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}`;

  return (
    <li>
      <Link
        href={href}
        className="group block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-purple-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
      >
        <article aria-labelledby={titleId} className="space-y-4">
          <p className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-purple-700">
            {category}
          </p>

          <h3 id={titleId} className="text-lg font-semibold text-slate-900 sm:text-xl">
            {title}
          </h3>

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
            <p>
              <span className="font-medium text-slate-900">{author}</span>
              <span className="mx-2">•</span>
              {readTime}
            </p>
            <TrendingUp className="h-4 w-4 text-emerald-500 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </div>
        </article>
      </Link>
    </li>
  );
}
