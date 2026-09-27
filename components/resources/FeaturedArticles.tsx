import CategoryBadge from "@/components/resources/CategoryBadge";
import ResourceSectionHeader from "@/components/resources/ResourceSectionHeader";
import type { ResourceListItem } from "@/components/resources/ResourceSearchList";

export interface FeaturedArticlesProps {
  articles: ResourceListItem[];
  /** How many articles to show. Defaults to 4. */
  limit?: number;
  viewAllHref?: string;
}

/**
 * "Featured Articles" block for the `/resources` landing page.
 *
 * A list rather than a grid: articles are scanned by title, and a list keeps
 * every title on the same left edge. Each row uses the same fixed structure —
 * badge + read time, title, one-line-clamped summary — so rows render at a
 * consistent height regardless of copy length. Rows stack on mobile and go
 * two-up from `lg`.
 */
export default function FeaturedArticles({
  articles,
  limit = 4,
  viewAllHref = "/resources/articles",
}: FeaturedArticlesProps) {
  const featured = articles.slice(0, limit);

  if (featured.length === 0) return null;

  return (
    <section
      id="featured-articles"
      aria-labelledby="featured-articles-heading"
      className="scroll-mt-16 py-16 lg:py-20 border-b border-slate-200 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ResourceSectionHeader
          headingId="featured-articles-heading"
          eyebrow="Quick reads"
          title="Featured Articles"
          description="Short, practical reads on one specific thing, picked by our mentors."
          viewAllHref={viewAllHref}
        />

        <ul className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {featured.map((article) => (
            <li key={article.title} className="flex min-w-0">
              <article className="group flex w-full items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 sm:gap-5 sm:p-6">
                <div
                  aria-hidden="true"
                  className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:flex"
                >
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.75}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z M8.25 13.5h7.5M8.25 16.5h4.5"
                    />
                  </svg>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <CategoryBadge label={article.tag} variant="slate" />
                    <span className="text-xs text-slate-500 tabular-nums">
                      {article.readMinutes} min read
                    </span>
                  </div>

                  <h3 className="font-semibold leading-snug text-slate-900 transition-colors group-hover:text-indigo-700 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600 line-clamp-2">
                    {article.summary}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
