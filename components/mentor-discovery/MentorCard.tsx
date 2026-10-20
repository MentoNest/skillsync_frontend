import { Mentor } from "@/lib/mentor-types";
import BaseMentorCard from "../landing/MentorCard";
export type { MentorCardProps } from "../landing/MentorCard";

interface MentorDiscoveryCardProps {
  mentor: Mentor;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
  onProfileClick?: () => void;
}

export default function MentorCard({
  mentor,
  isBookmarked,
  onToggleBookmark,
  onProfileClick,
}: MentorDiscoveryCardProps) {
  return (
    <BaseMentorCard
      id={mentor.id}
      name={mentor.name}
      headline={mentor.headline}
      bio={mentor.bio}
      avatar={mentor.avatar}
      rating={mentor.rating}
      sessions={mentor.sessions}
      hourlyRate={mentor.hourlyRate}
      skills={mentor.skills}
      availability={mentor.availability}
      profileHref={mentor.profileHref}
      onCtaClick={onProfileClick}
    >
      <div className="mt-auto px-6 pb-6 flex gap-3">
        <a
          href={mentor.profileHref || `/mentors/${mentor.id}`}
          onClick={onProfileClick}
          className="flex-1 text-center px-4 py-2.5 rounded-xl border border-indigo-200 text-indigo-600 text-sm font-semibold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          View profile
        </a>
        {onToggleBookmark && (
          <button
            onClick={onToggleBookmark}
            className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isBookmarked
                ? "border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white hover:border-rose-600 focus:ring-rose-500"
                : "border-slate-300 text-slate-600 hover:bg-slate-600 hover:text-white hover:border-slate-600 focus:ring-slate-500"
            }`}
            aria-label={isBookmarked ? `Remove ${mentor.name} from bookmarks` : `Bookmark ${mentor.name}`}
          >
            <svg
              className="w-5 h-5"
              fill={isBookmarked ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        )}
      </div>
    </BaseMentorCard>
  );
}

export { MentorCard };
