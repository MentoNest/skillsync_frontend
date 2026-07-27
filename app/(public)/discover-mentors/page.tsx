import type { Metadata } from 'next';
import MentorDiscoveryView from './MentorDiscoveryView';
import { MOCK_MENTORS } from '@/components/mentors/data';

export const metadata: Metadata = {
  title: 'Discover Mentors · SkillSync',
  description:
    'Browse vetted mentors by expertise, availability, and price. Find the right mentor for your goals on SkillSync.',
};

export default function DiscoverMentorsPage() {
  return (
    <div className="bg-slate-50 dark:bg-gray-950 min-h-screen transition-colors">
      {/* Header / hero strip */}
      <section
        aria-labelledby="discover-mentors-heading"
        className="bg-gradient-to-br from-cyan-700 via-cyan-600 to-blue-700 text-white"
      >
        <div className="max-w-screen-xl mx-auto px-4 py-12 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-100/80">
            Mentor Discovery
          </p>
          <h1
            id="discover-mentors-heading"
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
          >
            Find a mentor who fits your goals
          </h1>
          <p className="mt-4 text-base sm:text-lg text-cyan-50/90 max-w-2xl leading-relaxed">
            Browse {MOCK_MENTORS.length}+ vetted mentors across frontend, backend, design,
            product, and more. Use the filters on the left to narrow down by expertise
            area — results update instantly.
          </p>
        </div>
      </section>

      {/* Two-column layout: filter sidebar + mentor grid */}
      <MentorDiscoveryView mentors={MOCK_MENTORS} />
    </div>
  );
}
