interface CommunityHeroBannerProps {
  onStartDiscussion?: () => void;
}

export default function CommunityHeroBanner({ onStartDiscussion }: CommunityHeroBannerProps) {
  return (
    <section
      className="bg-gradient-to-r from-purple-700 to-indigo-800 rounded-2xl px-6 py-10 sm:px-10 sm:py-14 text-white shadow-md"
      aria-label="Community hero"
    >
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-3">
          Welcome to the Community
        </h1>
        <p className="text-purple-100/90 text-base sm:text-lg leading-relaxed mb-6">
          Connect with mentors and peers — ask questions, share wins, discover resources, and join live events.
        </p>
        <button
          onClick={onStartDiscussion}
          className="inline-flex items-center gap-2 bg-white text-purple-700 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-purple-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Start a Discussion
        </button>
      </div>
    </section>
  );
}
