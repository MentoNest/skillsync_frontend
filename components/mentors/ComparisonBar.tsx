'use client';

import { useRouter } from 'next/navigation';
import { useMentorSelection } from '@/lib/context/MentorSelectionContext';
import Image from 'next/image';

export default function ComparisonBar() {
  const { selectedMentors, clearSelection, removeMentor } = useMentorSelection();
  const router = useRouter();

  if (selectedMentors.length === 0) return null;

  const handleCompare = () => {
    const ids = selectedMentors.map(m => m.id).join(',');
    router.push(`/mentors/compare?ids=${ids}`);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white rounded-2xl shadow-[0_20px_60px_rgba(20,18,16,0.15)] border border-[rgba(20,18,16,0.1)] px-6 py-4 flex items-center gap-4 max-w-2xl w-[calc(100%-2rem)]">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-[13px] font-semibold text-[#141210] flex-shrink-0">
          {selectedMentors.length}/3 selected
        </span>
        <div className="flex gap-2 overflow-x-auto">
          {selectedMentors.map(mentor => (
            <div
              key={mentor.id}
              className="flex items-center gap-2 bg-[#f7f5f2] rounded-lg px-2 py-1 flex-shrink-0"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold relative overflow-hidden"
                style={{ background: mentor.bg, color: mentor.accent }}
              >
                {mentor.image ? (
                  <Image
                    src={mentor.image}
                    alt=""
                    width={24}
                    height={24}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  mentor.initials
                )}
              </div>
              <span className="text-[12px] text-[#6b6860] truncate max-w-[80px]">
                {mentor.name.split(' ')[0]}
              </span>
              <button
                onClick={() => removeMentor(mentor.id)}
                className="text-[#94928d] hover:text-[#141210] transition-colors text-[14px] leading-none"
                aria-label={`Remove ${mentor.name} from comparison`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={clearSelection}
          className="text-[12px] text-[#94928d] hover:text-[#141210] transition-colors px-3 py-2"
        >
          Clear
        </button>
        <button
          onClick={handleCompare}
          disabled={selectedMentors.length < 2}
          className={`text-[12.5px] font-semibold px-4 py-2 rounded-xl transition-all duration-200 ${
            selectedMentors.length >= 2
              ? 'bg-[#141210] text-[#f7f5f2] hover:bg-[#2d2a27]'
              : 'bg-[#f0efed] text-[#94928d] cursor-not-allowed'
          }`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Compare
        </button>
      </div>
    </div>
  );
}
