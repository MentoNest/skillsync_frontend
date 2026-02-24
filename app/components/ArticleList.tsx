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
                className="group block rounded-lg border p-4 hover:bg-gray-50 transition"
            >
                <article className="flex items-start justify-between gap-4">
                    <div>
                        {/* Category */}
                        <span className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-700 mb-2">
                            {category}
                        </span>

                        {/* Title */}
                        <h3 className="text-base font-semibold text-gray-900 group-hover:underline">
                            {title}
                        </h3>

                        {/* Meta */}
                        <p className="text-sm text-gray-500 mt-1">
                            By {author} • {readTime}
                        </p>
                    </div>

                    {/* Trending Arrow */}
                    <TrendingUp className="w-4 h-4 text-green-500 shrink-0" />
                </article>
            </a>
        </li>
    );
}