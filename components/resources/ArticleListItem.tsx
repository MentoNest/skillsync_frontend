import Link from "next/link";
import { CategoryBadge } from "./ResourceCards";
import type { ResourceItem } from "./resourceData";

export type ArticleListItemProps = Pick<ResourceItem, "title" | "category" | "href" | "readTime" | "author" | "description"> & {
  className?: string;
};

export default function ArticleListItem({
  title,
  category,
  href,
  readTime,
  author,
  description,
  className = "",
}: ArticleListItemProps) {
  return (
    <article className={`h-full rounded-xl border border-gray-200 bg-white transition hover:border-purple-300 hover:shadow-md ${className}`}>
      <Link href={href} className="group flex h-full flex-col gap-3 rounded-xl p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600">
        <CategoryBadge label={category} />
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700">{title}</h3>
        {description ? <p className="flex-1 text-sm text-gray-600">{description}</p> : null}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
          {author ? <span>By {author}</span> : null}
          {readTime ? <span>{readTime}</span> : null}
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-purple-700">
          Read article
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path d="M7.3 4.3a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4l3.3-3.3H3.5a1 1 0 1 1 0-2h7.1L7.3 5.7a1 1 0 0 1 0-1.4Z" />
          </svg>
        </span>
      </Link>
    </article>
  );
}
