"use client";

export interface TabItem<T extends string = string> {
  value: T;
  label: string;
  count?: number;
}

interface TabsProps<T extends string = string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
}

export function Tabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  ariaLabel = "Tabs",
}: TabsProps<T>) {
  return (
    <nav aria-label={ariaLabel} className="border-b border-gray-200">
      <ul className="flex gap-1 overflow-x-auto" role="tablist">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <li key={tab.value} role="presentation">
              <button
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(tab.value)}
                className={`relative whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 rounded-t-lg ${
                  isActive
                    ? "text-cyan-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span
                    className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                      isActive
                        ? "bg-cyan-100 text-cyan-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600 rounded-full" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
