import { ArrowUpRight, TrendingUp } from "lucide-react";

interface ArticleListItemProps {
    category: string;
    title: string;
    author: string;
    readTime: string;
    href?: string;
}

export default function ArticleListItem({
    category,
    title,
    author,
    readTime,
    href = "#",
}: ArticleListItemProps) {
    return (
        <li>
            <a
                href={href}
                className="group block rounded-lg border p-4 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-label={`Read article: ${title} by ${author}, ${readTime}`}
            >
                <article className="flex items-start justify-between gap-4">
                    <div>
                        {/* Category */}
                        <span
                            className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-700 mb-2"
                            aria-label={`Category: ${category}`}
                        >
                            {category}
                        </span>

                        {/* Title */}
                        <h3 className="text-base font-semibold text-gray-900 group-hover:underline">
                            {title}
                        </h3>

                        {/* Meta */}
                        <p className="text-sm text-gray-500 mt-1">
                            By <span className="font-medium">{author}</span> • <span>{readTime}</span>
                        </p>
                    </div>

                    {/* Trending Arrow */}
                    <TrendingUp
                        className="w-4 h-4 text-green-500 shrink-0"
                        aria-hidden="true"
                        title="Trending article"
                    />
                </article>
            </a>
        </li>
    );
}