import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

export interface LearningTrack {
  /** Unique identifier */
  id: string;
  /** Short category / tag label (e.g. "Beginner", "Backend", "DevOps") */
  category: string;
  /** Track title */
  title: string;
  /** Brief description of what the learner will get out of this track */
  description: string;
  /** Destination URL */
  link: string;
}

export interface FeaturedLearningTracksProps {
  /** Section heading */
  sectionTitle?: string;
  /** "View All" link href */
  viewAllHref?: string;
  /** Array of exactly 3 (or more) tracks — first 3 are rendered */
  tracks: LearningTrack[];
  /** Optional className for the outer section */
  className?: string;
}

// ── Sub-component: LearningTrackCard ─────────────────────────────────────────

interface LearningTrackCardProps {
  track: LearningTrack;
}

function LearningTrackCard({ track }: LearningTrackCardProps) {
  return (
    <a
      href={track.link}
      aria-label={track.title}
      className={[
        // Layout
        "group relative flex flex-col gap-4 p-6 rounded-xl",
        // Colours — all from your CSS custom properties
        "bg-card text-card-foreground border border-border",
        // Interaction
        "transition-all duration-200",
        "hover:shadow-lg hover:border-ring hover:-translate-y-1",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      ].join(" ")}
    >
      {/* Category tag */}
      <span
        className={[
          "self-start px-2.5 py-1 rounded-md",
          "text-[11px] font-semibold uppercase tracking-wider",
          "bg-secondary text-secondary-foreground",
          "transition-colors duration-200",
          "group-hover:bg-primary group-hover:text-primary-foreground",
        ].join(" ")}
      >
        {track.category}
      </span>

      {/* Text */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-base font-semibold leading-snug text-foreground">
          {track.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {track.description}
        </p>
      </div>

      {/* CTA row */}
      <div
        className={[
          "flex items-center gap-1 mt-auto",
          "text-sm font-medium text-muted-foreground",
          "transition-colors duration-200",
          "group-hover:text-foreground",
        ].join(" ")}
        aria-hidden="true"
      >
        <span>Start track</span>
        <ArrowUpRight
          size={15}
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </a>
  );
}

// ── Main Section Component ───────────────────────────────────────────────────

export function FeaturedLearningTracks({
  sectionTitle = "Featured Learning Tracks",
  viewAllHref = "/tracks",
  tracks,
  className = "",
}: FeaturedLearningTracksProps) {
  const visible = tracks.slice(0, 3);

  return (
    <section
      aria-labelledby="learning-tracks-heading"
      className={["w-full", className].join(" ")}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <h2
          id="learning-tracks-heading"
          className="text-xl font-semibold tracking-tight text-foreground"
        >
          {sectionTitle}
        </h2>

        <a
          href={viewAllHref}
          className={[
            "inline-flex items-center gap-1.5",
            "text-sm font-medium text-muted-foreground",
            "transition-colors duration-200 hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded",
          ].join(" ")}
        >
          View All
          <ArrowRight size={15} />
        </a>
      </div>

      {/* Cards grid — stacks on mobile, 3-col on md+ */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {visible.map((track) => (
          <LearningTrackCard key={track.id} track={track} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedLearningTracks;
