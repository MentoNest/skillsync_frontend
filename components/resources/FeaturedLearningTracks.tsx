import Link from "next/link";
import { LearningTrackCard, type LearningTrack } from "./ResourceCards";

const DEFAULT_TRACKS: LearningTrack[] = [
  { image: "/next.svg", imageAlt: "Career track illustration", category: "Career", title: "Land Your First Tech Role", description: "Resumes, portfolios and interview prep.", lessons: 12, duration: "3h 20m", href: "/resources/tracks/first-role" },
  { image: "/window.svg", imageAlt: "UI design track illustration", category: "Design", title: "UI/UX Fundamentals", description: "Core design principles with practical exercises.", lessons: 9, duration: "2h 45m", href: "/resources/tracks/ui-ux" },
  { image: "/file.svg", imageAlt: "Frontend engineering track illustration", category: "Engineering", title: "Frontend with React", description: "Build modern interfaces step by step.", lessons: 15, duration: "4h 10m", href: "/resources/tracks/react" },
];

/** Featured Learning Tracks section with heading, View All link and responsive cards (#1375). */
export default function FeaturedLearningTracks({ tracks = DEFAULT_TRACKS }: { tracks?: LearningTrack[] }) {
  return (
    <section aria-labelledby="featured-tracks" className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 id="featured-tracks" className="text-2xl font-semibold">Featured Learning Tracks</h2>
        <Link href="/resources/tracks" aria-label="View all learning tracks" className="text-sm font-medium text-purple-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2">View All</Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tracks.map((t, index) => <LearningTrackCard key={t.href} {...t} priority={index === 0} />)}
      </div>
    </section>
  );
}
