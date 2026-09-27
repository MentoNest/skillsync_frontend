import CategoryBadge, {
  CategoryBadgeVariant,
} from "@/components/resources/CategoryBadge";
import ResourceSectionHeader from "@/components/resources/ResourceSectionHeader";
import type { ResourceListItem } from "@/components/resources/ResourceSearchList";

export interface FeaturedLearningTracksProps {
  tracks: ResourceListItem[];
  /** How many tracks to show. Defaults to 4, one row on desktop. */
  limit?: number;
  viewAllHref?: string;
}

/** Level → badge colour, so difficulty reads at a glance across the grid. */
const LEVEL_VARIANTS: Record<string, CategoryBadgeVariant> = {
  Beginner: "emerald",
  Intermediate: "sky",
  Advanced: "rose",
  "All Levels": "amber",
};

/**
 * "Featured Learning Tracks" block for the `/resources` landing page.
 *
 * 1 column on mobile, 2 on tablet, 4 on desktop. Cards are equal height so a
 * long summary in one does not stagger the row.
 */
export default function FeaturedLearningTracks({
  tracks,
  limit = 4,
  viewAllHref = "/resources/tracks",
}: FeaturedLearningTracksProps) {
  const featured = tracks.slice(0, limit);

  if (featured.length === 0) return null;

  return (
    <section
      id="featured-tracks"
      aria-labelledby="featured-tracks-heading"
      className="scroll-mt-16 py-16 lg:py-20 border-b border-slate-200 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ResourceSectionHeader
          headingId="featured-tracks-heading"
          eyebrow="Structured paths"
          title="Featured Learning Tracks"
          description="Step-by-step tracks built by mentors. Pick one and follow it from start to finish."
          viewAllHref={viewAllHref}
        />

        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((track, index) => (
            <li key={track.title} className="flex">
              <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-indigo-50/60 to-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white tabular-nums shadow-md shadow-indigo-500/25"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <CategoryBadge
                    label={track.tag}
                    variant={LEVEL_VARIANTS[track.tag] ?? "slate"}
                    outlined
                  />
                </div>

                <h3 className="text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-indigo-700">
                  {track.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-4">
                  {track.summary}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                  <CategoryBadge label={track.type} />
                  <span className="tabular-nums">{track.readMinutes} min</span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
