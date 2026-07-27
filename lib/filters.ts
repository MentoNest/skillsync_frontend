export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterState {
  category: string | null;
  sort: SortOrder;
  search: string;
}

export type SortOrder = 'latest' | 'popular' | 'trending';

export const CATEGORIES: FilterOption[] = [
  { value: 'general', label: 'General', count: 42 },
  { value: 'mentorship', label: 'Mentorship', count: 28 },
  { value: 'courses', label: 'Courses', count: 35 },
  { value: 'career', label: 'Career', count: 19 },
  { value: 'technical', label: 'Technical', count: 31 },
  { value: 'events', label: 'Events', count: 15 },
];

export const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'trending', label: 'Trending' },
];

export const DEFAULT_FILTER_STATE: FilterState = {
  category: null,
  sort: 'latest',
  search: '',
};

export function filterDiscussions<T extends { category?: string; title?: string }>(
  items: T[],
  filters: FilterState
): T[] {
  let result = [...items];

  if (filters.category) {
    result = result.filter((item) => item.category === filters.category);
  }

  if (filters.search) {
    const query = filters.search.toLowerCase();
    result = result.filter((item) =>
      item.title?.toLowerCase().includes(query)
    );
  }

  return result;
}

export function getCategoryLabel(value: string): string {
  const category = CATEGORIES.find((c) => c.value === value);
  return category?.label ?? value;
}
