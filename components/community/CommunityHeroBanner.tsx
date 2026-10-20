"use client";

interface CommunityHeroBannerProps {
  /** Opens the Start Discussion composer (#1001). */
  onStartDiscussion: () => void;
}

const CTA_CLASS_NAME =
  "inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-white text-indigo-700 font-bold text-base sm:text-lg hover:bg-indigo-50 transition-colors shadow-xl shadow-indigo-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-700";

export default function CommunityHeroBanner({
  onStartDiscussion,
}: CommunityHeroBannerProps) {
  return (
    <section
      className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-cyan-500"
      aria-labelledby="community-hero-heading"
    >
      <div className="relative max-w-4xl mx-auto px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20 text-center">
        {/* Heading */}
        <h1
          id="community-hero-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight"
        >
          Join the conversation
        </h1>

        {/* Description */}
        <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-indigo-100 leading-relaxed max-w-2xl mx-auto">
          Connect with fellow mentees and mentors, share experiences, and grow together in our supportive community.
        </p>

        {/* CTA button opens the composer (#1001). */}
        <div className="mt-6 sm:mt-8">
          <button
            type="button"
            onClick={onStartDiscussion}
            aria-haspopup="dialog"
            className={CTA_CLASS_NAME}
          >
            Start Discussion
            <svg
              className="ml-2 w-5 h-5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
