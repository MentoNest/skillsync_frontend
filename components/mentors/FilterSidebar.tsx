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
  minRate?: string;
  maxRate?: string;
  setMinRate?: Dispatch<SetStateAction<string>>;
  setMaxRate?: Dispatch<SetStateAction<string>>;
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
  minRate,
  maxRate,
  setMinRate,
  setMaxRate,
}: FilterSidebarProps) {
  const buttonBase =
    'text-[13px] px-3 py-2 rounded-lg transition-colors w-full text-left';
  const canFilterRate = setMinRate && setMaxRate;
  const hasRateControls = Boolean(setMinRate && setMaxRate);

  if (mode === 'pill') {
    return (
      <>
        <div role="group" aria-label="Filter by category" className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map(category => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
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
        <div role="group" aria-label="Filter by availability" className="flex gap-2 overflow-x-auto pb-1">
          {AVAILABILITY.map(option => (
            <button
              key={option}
              type="button"
              onClick={() => setActiveAvailability(option)}
              aria-pressed={activeAvailability === option}
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
      <section aria-labelledby="mentor-category-heading" className="bg-white rounded-2xl p-5 border border-[rgba(20,18,16,0.07)]">
        <h2 id="mentor-category-heading" className="text-[13px] font-semibold text-[#141210] mb-3 uppercase tracking-wider">
          Category
        </h2>
        <ul className="space-y-0.5">
          {CATEGORIES.map(category => (
            <li key={category}>
              <button
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
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
      </section>

      <section aria-labelledby="mentor-availability-heading" className="bg-white rounded-2xl p-5 border border-[rgba(20,18,16,0.07)]">
        <h2 id="mentor-availability-heading" className="text-[13px] font-semibold text-[#141210] mb-3 uppercase tracking-wider">
          Availability
        </h2>
        <ul className="space-y-0.5">
          {AVAILABILITY.map(option => (
            <li key={option}>
              <button
                type="button"
                onClick={() => setActiveAvailability(option)}
                aria-pressed={activeAvailability === option}
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
      </section>

      {hasRateControls ? (
        <section aria-labelledby="mentor-rate-heading" className="bg-white rounded-2xl p-5 border border-[rgba(20,18,16,0.07)]">
          <div className="flex items-center justify-between mb-3">
            <h2 id="mentor-rate-heading" className="text-[13px] font-semibold text-[#141210] uppercase tracking-wider">
              Hourly rate
            </h2>
            <span className="text-[11px] text-[#6b6860]">USD</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label htmlFor="mentor-min-rate" className="block text-[12px] text-[#6b6860]">
              Min
              <input
                id="mentor-min-rate"
                type="number"
                min={0}
                value={minRate}
                onChange={e => setMinRate?.(e.target.value)}
                placeholder="Any"
                className="mt-2 w-full rounded-xl border border-[rgba(20,18,16,0.12)] bg-[#f7f5f2] px-3 py-2 text-sm text-[#141210] focus:border-[#141210] focus:outline-none focus:ring-2 focus:ring-[#d6d3d1]"
              />
            </label>
            <label htmlFor="mentor-max-rate" className="block text-[12px] text-[#6b6860]">
              Max
              <input
                id="mentor-max-rate"
                type="number"
                min={0}
                value={maxRate}
                onChange={e => setMaxRate?.(e.target.value)}
                placeholder="Any"
                className="mt-2 w-full rounded-xl border border-[rgba(20,18,16,0.12)] bg-[#f7f5f2] px-3 py-2 text-sm text-[#141210] focus:border-[#141210] focus:outline-none focus:ring-2 focus:ring-[#d6d3d1]"
              />
            </label>
          </div>
        </section>
      ) : null}
    </div>
  );
}
