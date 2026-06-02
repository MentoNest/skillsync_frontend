import { Dispatch, SetStateAction } from 'react';

const CATEGORIES = ['All', 'Engineering', 'Design', 'Product', 'Business', 'Data'];
const AVAILABILITY = ['All', 'Available', 'Fully Booked'];

type FilterSidebarProps = {
  activeCategory: string;
  setActiveCategory: Dispatch<SetStateAction<string>>;
  activeAvailability: string;
  setActiveAvailability: Dispatch<SetStateAction<string>>;
  minRate?: string;
  maxRate?: string;
  setMinRate?: Dispatch<SetStateAction<string>>;
  setMaxRate?: Dispatch<SetStateAction<string>>;
  mode?: 'sidebar' | 'pill';
};

export default function FilterSidebar({
  activeCategory,
  setActiveCategory,
  activeAvailability,
  setActiveAvailability,
  minRate,
  maxRate,
  setMinRate,
  setMaxRate,
  mode = 'sidebar',
}: FilterSidebarProps) {
  const buttonBase =
    'text-[13px] px-3 py-2 rounded-lg transition-colors w-full text-left';
  const canFilterRate = setMinRate && setMaxRate;

  if (mode === 'pill') {
    return (
      <>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex-shrink-0 text-[12.5px] font-medium px-4 py-2 rounded-full border transition-all ${
                activeCategory === category
                  ? 'bg-[#141210] text-[#f7f5f2] border-[#141210]'
                  : 'text-[#6b6860] border-[rgba(20,18,16,0.15)] hover:border-[rgba(20,18,16,0.4)] hover:text-[#141210]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {AVAILABILITY.map(option => (
            <button
              key={option}
              onClick={() => setActiveAvailability(option)}
              className={`flex-shrink-0 text-[12.5px] font-medium px-4 py-2 rounded-full border transition-all ${
                activeAvailability === option
                  ? 'bg-[#141210] text-[#f7f5f2] border-[#141210]'
                  : 'text-[#6b6860] border-[rgba(20,18,16,0.15)] hover:border-[rgba(20,18,16,0.4)] hover:text-[#141210]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-5 border border-[rgba(20,18,16,0.07)]">
        <h3 className="text-[13px] font-semibold text-[#141210] mb-3 uppercase tracking-wider">
          Category
        </h3>
        <ul className="space-y-0.5">
          {CATEGORIES.map(category => (
            <li key={category}>
              <button
                onClick={() => setActiveCategory(category)}
                className={`${buttonBase} ${
                  activeCategory === category
                    ? 'bg-[#141210] text-[#f7f5f2] font-medium'
                    : 'text-[#6b6860] hover:bg-[#f7f5f2] hover:text-[#141210]'
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-[rgba(20,18,16,0.07)]">
        <h3 className="text-[13px] font-semibold text-[#141210] mb-3 uppercase tracking-wider">
          Availability
        </h3>
        <ul className="space-y-0.5">
          {AVAILABILITY.map(option => (
            <li key={option}>
              <button
                onClick={() => setActiveAvailability(option)}
                className={`${buttonBase} ${
                  activeAvailability === option
                    ? 'bg-[#141210] text-[#f7f5f2] font-medium'
                    : 'text-[#6b6860] hover:bg-[#f7f5f2] hover:text-[#141210]'
                }`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {canFilterRate ? (
        <div className="bg-white rounded-2xl p-5 border border-[rgba(20,18,16,0.07)]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[13px] font-semibold text-[#141210] uppercase tracking-wider">
              Hourly rate
            </h3>
            <span className="text-[11px] text-[#6b6860]">USD</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-[12px] text-[#6b6860]">
              Min
              <input
                type="number"
                min={0}
                value={minRate ?? ''}
                onChange={event => setMinRate(event.target.value)}
                placeholder="Any"
                className="mt-2 w-full rounded-xl border border-[rgba(20,18,16,0.12)] bg-[#f7f5f2] px-3 py-2 text-sm text-[#141210] focus:border-[#141210] focus:outline-none"
              />
            </label>
            <label className="block text-[12px] text-[#6b6860]">
              Max
              <input
                type="number"
                min={0}
                value={maxRate ?? ''}
                onChange={event => setMaxRate(event.target.value)}
                placeholder="Any"
                className="mt-2 w-full rounded-xl border border-[rgba(20,18,16,0.12)] bg-[#f7f5f2] px-3 py-2 text-sm text-[#141210] focus:border-[#141210] focus:outline-none"
              />
            </label>
          </div>
        </div>
      ) : null}
    </div>
  );
}
