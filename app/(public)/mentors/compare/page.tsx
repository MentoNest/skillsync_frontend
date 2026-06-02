'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { mentors } from '@/lib/data/mentors';

export default function MentorComparePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ids = searchParams.get('ids')?.split(',').map(Number) || [];
  const selectedMentors = mentors.filter(m => ids.includes(m.id));

  if (selectedMentors.length < 2) {
    return (
      <div className="min-h-screen bg-[#f7f5f2] flex items-center justify-center px-4">
        <div className="text-center">
          <h1
            className="text-[32px] font-extrabold text-[#141210] mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Select at least 2 mentors
          </h1>
          <p className="text-[15px] text-[#6b6860] mb-6">
            You need to select at least 2 mentors to compare.
          </p>
          <Link
            href="/mentors"
            className="inline-block bg-[#141210] text-[#f7f5f2] text-[13px] font-semibold px-6 py-3 rounded-xl hover:bg-[#2d2a27] transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Browse Mentors
          </Link>
        </div>
      </div>
    );
  }

  const comparisonFields = [
    {
      label: 'Name',
      render: (m: typeof mentors[0]) => (
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-[14px] font-bold relative overflow-hidden flex-shrink-0"
            style={{ background: m.bg, color: m.accent }}
          >
            {m.image ? (
              <Image
                src={m.image}
                alt=""
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            ) : (
              m.initials
            )}
          </div>
          <span className="font-bold text-[#141210] text-[15px]" style={{ fontFamily: "'Syne', sans-serif" }}>
            {m.name}
          </span>
        </div>
      ),
    },
    { label: 'Role', render: (m: typeof mentors[0]) => m.role },
    { label: 'Company', render: (m: typeof mentors[0]) => m.company },
    {
      label: 'Rating',
      render: (m: typeof mentors[0]) => (
        <div className="flex items-center gap-1">
          <span className="text-amber-400">★</span>
          <span className="font-semibold text-[#141210]">{m.rating}</span>
        </div>
      ),
    },
    {
      label: 'Hourly Rate',
      render: (m: typeof mentors[0]) => (
        <span className="font-semibold text-[#141210]">${m.rate}/hr</span>
      ),
    },
    {
      label: 'Sessions',
      render: (m: typeof mentors[0]) => (
        <span className="font-semibold text-[#141210]">{m.sessions}</span>
      ),
    },
    {
      label: 'Availability',
      render: (m: typeof mentors[0]) => (
        <span
          className={`inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-full ${
            m.available
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${m.available ? 'bg-emerald-500' : 'bg-gray-300'}`} />
          {m.available ? 'Available' : 'Fully Booked'}
        </span>
      ),
    },
    { label: 'Category', render: (m: typeof mentors[0]) => m.category },
    { label: 'Description', render: (m: typeof mentors[0]) => m.description },
    {
      label: 'Skills',
      render: (m: typeof mentors[0]) => (
        <div className="flex flex-wrap gap-1.5">
          {m.tags.map(tag => (
            <span
              key={tag}
              className="text-[11.5px] font-medium px-2.5 py-1 rounded-md bg-[#f7f5f2] text-[#6b6860] border border-[rgba(20,18,16,0.08)]"
            >
              {tag}
            </span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-[rgba(20,18,16,0.07)]">
        <Link
          href="/mentors"
          className="inline-flex items-center gap-2 text-[13px] text-[#94928d] hover:text-[#141210] transition-colors mb-4"
        >
          ← Back to mentors
        </Link>
        <h1
          className="text-[clamp(28px,4vw,42px)] font-extrabold text-[#141210] leading-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Compare Mentors
        </h1>
        <p className="mt-2 text-[15px] text-[#6b6860]">
          Side-by-side comparison of {selectedMentors.length} mentors
        </p>
      </div>

      {/* Comparison Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-[rgba(20,18,16,0.07)] overflow-hidden">
          <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(250px,1fr))] divide-x divide-[rgba(20,18,16,0.07)]">
            {/* Label column */}
            <div className="bg-[#faf9f7]">
              {comparisonFields.map((field, idx) => (
                <div
                  key={field.label}
                  className={`px-6 py-4 text-[13px] font-semibold text-[#6b6860] uppercase tracking-wider ${
                    idx !== 0 ? 'border-t border-[rgba(20,18,16,0.07)]' : ''
                  }`}
                >
                  {field.label}
                </div>
              ))}
            </div>

            {/* Mentor columns */}
            {selectedMentors.map((mentor, mentorIdx) => (
              <div key={mentor.id}>
                {comparisonFields.map((field, idx) => (
                  <div
                    key={field.label}
                    className={`px-6 py-4 text-[13.5px] text-[#141210] ${
                      idx !== 0 ? 'border-t border-[rgba(20,18,16,0.07)]' : ''
                    } ${mentorIdx % 2 === 1 ? 'bg-[#faf9f7]' : ''}`}
                  >
                    {field.render(mentor)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/mentors"
            className="bg-[#141210] text-[#f7f5f2] text-[13px] font-semibold px-6 py-3 rounded-xl hover:bg-[#2d2a27] transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Browse More Mentors
          </Link>
        </div>
      </div>
    </div>
  );
}
