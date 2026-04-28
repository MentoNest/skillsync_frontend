import Link from 'next/link';
import { TrendingUp, Clock, User } from 'lucide-react';

export interface ArticleListItemProps {
  category: string;
  title: string;
  author: string;
  readTime: string;
  href: string;
  isTrending?: boolean;
}

export default function ArticleListItem({
  category,
  title,
  author,
  readTime,
  href,
  isTrending = false,
}: ArticleListItemProps) {
  return (
    <article>
      <Link
        href={href}
        className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={`Read article: ${title}`}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <span className="inline-flex self-start rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
            {category}
          </span>

          <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
            {title}
          </h3>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" aria-hidden="true" />
              {author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {readTime}
            </span>
          </div>
        </div>

        {isTrending && (
          <div className="flex-shrink-0" aria-label="Trending article">
            <TrendingUp className="h-4 w-4 text-red-500" aria-hidden="true" />
          </div>
        )}
      </Link>
    </article>
  );
}
