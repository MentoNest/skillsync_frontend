import Link from "next/link";
import { ClockIcon, TrendingUpIcon } from "@/components/ui/icons";

export interface ArticleListItemProps {
  category: string;
  title: string;
  author: string;
  readTime: string;
  href?: string;
  trending?: boolean;
}

export default function ArticleListItem({
  category,
  title,
  author,
  readTime,
  href = "#",
  trending = false,
}: ArticleListItemProps) {
  return (
    <article>
      <Link
        href={href}
        className="group flex items-start justify-between gap-4 rounded-xl border border-gray-100
                   bg-white px-5 py-4 shadow-sm transition-all duration-200
                   hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md
                   focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      >
        {/* left: text content */}
        <div className="flex min-w-0 flex-col gap-1.5">
          {/* category label */}
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
            {category}
          </span>

          {/* article title */}
          <h3 className="truncate text-base font-semibold text-gray-900 transition-colors duration-200 group-hover:text-primary-600">
            {title}
          </h3>

          {/* meta: author + read time */}
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span>{author}</span>
            <span aria-hidden>·</span>
            <span className="flex items-center gap-1">
              <ClockIcon width={13} height={13} aria-hidden />
              {readTime}
            </span>
          </div>
        </div>

        {/* right: trending icon */}
        {trending && (
          <span
            aria-label="Trending"
            className="mt-0.5 flex shrink-0 items-center justify-center rounded-full
                       bg-emerald-50 p-1.5 text-emerald-500 transition-colors duration-200
                       group-hover:bg-emerald-100"
          >
            <TrendingUpIcon width={15} height={15} />
          </span>
        )}
      </Link>
    </article>
  );
}
