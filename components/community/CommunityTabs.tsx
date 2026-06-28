'use client';

export type CommunityTab = 'discussions' | 'events' | 'members' | 'resources';

interface Props {
  activeTab: CommunityTab;
  onTabChange: (tab: CommunityTab) => void;
  counts?: Partial<Record<CommunityTab, number>>;
}

const TABS: { key: CommunityTab; label: string }[] = [
  { key: 'discussions', label: 'Discussions' },
  { key: 'events', label: 'Events' },
  { key: 'members', label: 'Members' },
  { key: 'resources', label: 'Resources' },
];

export default function CommunityTabs({ activeTab, onTabChange, counts }: Props) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8" aria-label="Community tabs">
        {TABS.map((tab) => {
          const count = counts?.[tab.key];
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`relative py-4 text-sm font-medium transition-colors ${
                isActive
                  ? 'text-cyan-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.label}
              {count !== undefined && (
                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                    isActive
                      ? 'bg-cyan-100 text-cyan-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {count}
                </span>
              )}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
