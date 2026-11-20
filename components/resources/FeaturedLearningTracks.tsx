import Link from "next/link";
import { LearningTrackCard, type LearningTrack } from "./ResourceCards";

const DEFAULT_TRACKS: LearningTrack[] = [
  { image: "/next.svg", category: "Career", title: "Land Your First Tech Role", description: "Resumes, portfolios and interview prep.", lessons: 12, duration: "3h 20m", href: "/resources/tracks" },
  { image: "/next.svg", category: "Design", title: "UI/UX Fundamentals", description: "Core design principles with practical exercises.", lessons: 9, duration: "2h 45m", href: "/resources/tracks" },
  { image: "/next.svg", category: "Engineering", title: "Frontend with React", description: "Build modern interfaces step by step.", lessons: 15, duration: "4h 10m", href: "/resources/tracks" },
];

/** Featured Learning Tracks section with heading, View All link and responsive cards (#1375). */
export default function FeaturedLearningTracks({ tracks = DEFAULT_TRACKS }: { tracks?: LearningTrack[] }) {
  return (
    <section aria-labelledby="featured-tracks" className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="featured-tracks" className="break-words text-xl font-semibold sm:text-2xl">Featured Learning Tracks</h2>
        <Link href="/resources/tracks" className="shrink-0 text-sm font-medium text-purple-700 hover:underline">View All</Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tracks.map((t) => <LearningTrackCard key={t.title} {...t} />)}
      </div>
    </section>
  );
}
