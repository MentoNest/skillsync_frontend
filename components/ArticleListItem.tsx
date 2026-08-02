import React from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import type { Article } from "@/lib/types";

interface ArticleListItemProps extends Article {
  className?: string;
}

export default function ArticleListItem({
  category,
  title,
  author,
  readTime,
  href,
  className = "",
}: ArticleListItemProps) {
  const articleSlug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const targetHref = href || `/resources/articles/${articleSlug}`;

  return (
    <article className={className}>
      <Link
        href={targetHref}
        className="flex items-center justify-between gap-4 py-4 px-2 hover:bg-slate-50 dark:hover:bg-gray-800/60 rounded-xl transition-all group focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-cyan-500"
      >
        <div className="min-w-0 flex-1">
          <header>
            <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide">
              {category}
            </span>
          </header>
          <h3 className="text-base font-bold text-gray-900 dark:text-white mt-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            By {author} &middot; {readTime}
          </p>
        </div>
        <div className="flex-shrink-0 p-2 bg-slate-50 rounded-full group-hover:bg-cyan-50 group-hover:text-cyan-600 dark:bg-gray-800 dark:group-hover:bg-cyan-900/30 dark:group-hover:text-cyan-400 transition-colors">
          <TrendingUp
            className="w-4 h-4 text-cyan-600 dark:text-cyan-400 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            aria-hidden="true"
          />
        </div>
      </Link>
    </article>
  );
}
