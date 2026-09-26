"use client";

interface CommunitySidebarProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const categories = [
  { id: "general", name: "General", count: 45 },
  { id: "career", name: "Career", count: 32 },
  { id: "technical", name: "Technical", count: 28 },
  { id: "mentoring", name: "Mentoring", count: 19 },
  { id: "announcements", name: "Announcements", count: 8 },
];

export function CommunitySidebar({
  selectedCategory,
  onCategoryChange,
}: CommunitySidebarProps) {
  return (
    <div className="space-y-6">
      <nav aria-label="Community categories">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
          Categories
        </h2>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => onCategoryChange(cat.id)}
                aria-current={selectedCategory === cat.id ? "true" : undefined}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${
                  selectedCategory === cat.id
                    ? "bg-[var(--primary)]/10 font-medium text-[var(--primary)]"
                    : "text-[var(--foreground)] hover:bg-[var(--secondary)]"
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-xs text-[var(--muted)]">{cat.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--secondary)] p-4">
        <h2 className="mb-2 text-sm font-semibold text-[var(--foreground)]">
          Community Guidelines
        </h2>
        <ul className="space-y-1 text-sm text-[var(--muted)]">
          <li>Be respectful and constructive</li>
          <li>Stay on topic</li>
          <li>No spam or self-promotion</li>
          <li>Search before posting</li>
        </ul>
      </div>
    </div>
  );
}
