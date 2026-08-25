import React from "react";
import { Heart, MessageCircle, Flame } from "lucide-react";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * DiscussionCard
 * A reusable, fully-typed card for surfacing a forum/discussion thread.
 * Drop it into any list — just pass a `DiscussionCardProps` object.
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface DiscussionCardProps {
  /** URL to the author's avatar image. Falls back to initials if omitted/broken. */
  avatarUrl?: string;
  /** Author's display name. */
  authorName: string;
  /** The discussion thread's title. */
  title: string;
  /** ISO date string or Date — rendered as a relative timestamp. */
  timestamp: string | Date;
  /** Category / tag the discussion belongs to. */
  category: string;
  /** Number of likes. */
  likeCount: number;
  /** Number of replies. */
  replyCount: number;
  /** Whether to show the "Trending" badge. Optional — defaults to false. */
  isTrending?: boolean;
  /** Called when the like control is pressed. */
  onLike?: () => void;
  /** Called when the card (or reply control) is pressed. */
  onReply?: () => void;
  /** Optional extra class names for layout control from a parent list. */
  className?: string;
}

/** Formats a Date/ISO string as a short relative time, e.g. "2h ago". */
function formatRelativeTime(input: string | Date): string {
  const date = typeof input === "string" ? new Date(input) : input;
  const diffMs = Date.now() - date.getTime();
  const sec = Math.max(1, Math.floor(diffMs / 1000));
  const units: [number, string][] = [
    [31536000, "y"],
    [2592000, "mo"],
    [604800, "w"],
    [86400, "d"],
    [3600, "h"],
    [60, "m"],
  ];
  for (const [secs, label] of units) {
    const val = Math.floor(sec / secs);
    if (val >= 1) return `${val}${label} ago`;
  }
  return "just now";
}

/** Formats large counts as e.g. 1.2k, 8.4k. */
function formatCount(n: number): string {
  if (n < 1000) return String(n);
  if (n < 1000000) return `${(n / 1000).toFixed(n % 1000 >= 100 ? 1 : 0)}k`;
  return `${(n / 1000000).toFixed(1)}m`;
}

/** Deterministic initials + hue from a name, used as an avatar fallback. */
function useAvatarFallback(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const hue = Math.abs(hash) % 360;
  return { initials, hue };
}

export const DiscussionCard: React.FC<DiscussionCardProps> = ({
  avatarUrl,
  authorName,
  title,
  timestamp,
  category,
  likeCount,
  replyCount,
  isTrending = false,
  onLike,
  onReply,
  className = "",
}) => {
  const [imgFailed, setImgFailed] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(likeCount);
  const { initials, hue } = useAvatarFallback(authorName);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    onLike?.();
  };

  return (
    <div
      role="article"
      tabIndex={0}
      onClick={onReply}
      className={`group relative w-full max-w-xl cursor-pointer rounded-2xl border border-[#E4E7EF] bg-white p-5 shadow-[0_1px_2px_rgba(20,22,31,0.04)] transition-all duration-200 hover:-translate-y-[2px] hover:border-[#C9CCFA] hover:shadow-[0_12px_24px_rgba(91,95,239,0.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B5FEF] ${className}`}
    >
      {isTrending && (
        <div className="absolute -top-3 right-4 flex items-center gap-1 rounded-full bg-[#FFF1EA] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-[#E85D1F] shadow-[0_1px_3px_rgba(232,93,31,0.25)]">
          <Flame
            size={12}
            strokeWidth={2.5}
            className="fill-[#FF6B35] text-[#FF6B35]"
          />
          TRENDING
        </div>
      )}

      {/* Header: avatar, author, timestamp */}
      <div className="flex items-center gap-3">
        {avatarUrl && !imgFailed ? (
          <img
            src={avatarUrl}
            alt={authorName}
            onError={() => setImgFailed(true)}
            className="h-10 w-10 flex-shrink-0 rounded-full object-cover ring-1 ring-black/5"
          />
        ) : (
          <div
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
            style={{ backgroundColor: `hsl(${hue}, 58%, 48%)` }}
            aria-hidden
          >
            {initials || "?"}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold text-[#14161F]">
            {authorName}
          </p>
          <p className="font-mono text-[11px] text-[#8A8EA3]">
            {formatRelativeTime(timestamp)}
          </p>
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-3 text-[17px] font-bold leading-snug text-[#14161F] group-hover:text-[#4347C9]">
        {title}
      </h3>

      {/* Footer: category chip + like / reply */}
      <div className="mt-4 flex items-center justify-between">
        <span className="rounded-md bg-[#EEF0FF] px-2 py-1 font-mono text-[11px] font-medium text-[#4B4FD9]">
          #{category}
        </span>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleLike}
            aria-pressed={liked}
            aria-label="Like discussion"
            className="flex items-center gap-1.5 text-[13px] font-medium text-[#6B7086] transition-colors hover:text-[#E8477C]"
          >
            <Heart
              size={16}
              strokeWidth={2}
              className={liked ? "fill-[#E8477C] text-[#E8477C]" : ""}
            />
            {formatCount(likes)}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onReply?.();
            }}
            aria-label="View replies"
            className="flex items-center gap-1.5 text-[13px] font-medium text-[#6B7086] transition-colors hover:text-[#5B5FEF]"
          >
            <MessageCircle size={16} strokeWidth={2} />
            {formatCount(replyCount)}
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * ─────────────────────────────────────────────────────────────────────────
 * Demo — shows DiscussionCard reused across a small feed with varied props.
 * (This default export exists purely to preview the component; in a real
 * app you would just `import { DiscussionCard } from "./DiscussionCard"`.)
 * ─────────────────────────────────────────────────────────────────────────
 */
const sampleThreads: DiscussionCardProps[] = [
  {
    authorName: "Amara Chukwu",
    title: "Is anyone else migrating off REST to tRPC for internal tools?",
    timestamp: new Date(Date.now() - 1000 * 60 * 47),
    category: "backend",
    likeCount: 128,
    replyCount: 34,
    isTrending: true,
    avatarUrl: "https://i.pravatar.cc/100?img=12",
  },
  {
    authorName: "Tunde Bakare",
    title: "Best practices for structuring a Next.js 15 app router monorepo?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    category: "frontend",
    likeCount: 42,
    replyCount: 9,
    avatarUrl: "broken-url-will-fallback",
  },
  {
    authorName: "Ifeoma Nwosu",
    title: "Sharing a small win: cut our CI pipeline time in half this week",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    category: "devops",
    likeCount: 861,
    replyCount: 152,
    isTrending: true,
  },
  {
    authorName: "Segun A.",
    title: "What's your go-to approach for optimistic UI updates?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
    category: "ux",
    likeCount: 17,
    replyCount: 3,
  },
];

export default function DiscussionCardDemo() {
  return (
    <div className="min-h-screen w-full bg-[#F5F6FA] px-4 py-10">
      <div className="mx-auto flex max-w-xl flex-col gap-4">
        <h1 className="mb-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#8A8EA3]">
          Recent discussions
        </h1>
        {sampleThreads.map((t, i) => (
          <DiscussionCard
            key={i}
            {...t}
            onLike={() => console.log(`liked: ${t.title}`)}
            onReply={() => console.log(`open thread: ${t.title}`)}
          />
        ))}
      </div>
    </div>
  );
}
