# Mentor Pagination Implementation

## Overview
This document describes the implementation of pagination for mentor results in SkillSync.

## Features Implemented

### 1. **Pagination Controls**
- Previous/Next buttons with disabled states
- Page number buttons with current page highlighting
- Smart ellipsis (...) for large page counts
- Accessible ARIA labels for screen readers

### 2. **Page State Management**
- Current page tracking
- Total pages calculation
- Page size control (12, 24, 48, 96 options)
- Automatic state reset when filters change

### 3. **Duplicate Prevention**
- Mentor IDs are tracked in a Set to prevent duplicates
- Only new mentors are appended when loading more (infinite scroll mode)
- Each page load replaces content in pagination mode

### 4. **Pagination State Persistence**
- Current page is maintained during the session
- Page resets to 1 when filters change
- Smooth scrolling to top of list when page changes

## Components

### MentorPagination (`components/mentor/MentorPagination.tsx`)
Handles the pagination UI with the following props:
- `currentPage`: Current active page number
- `totalPages`: Total number of pages available
- `onPageChange`: Callback when page changes
- `maxVisiblePages`: Maximum page buttons to show (default: 7)

**Features:**
- Shows first and last page always
- Smart ellipsis for middle pages
- Disabled previous/next on boundaries
- Responsive button sizing

### PageSizeSelector (`components/mentor/PageSizeSelector.tsx`)
Allows users to control results per page:
- `pageSize`: Current page size
- `onPageSizeChange`: Callback when size changes
- `options`: Available page sizes (default: [12, 24, 48, 96])
- `totalResults`: Total mentor count for context

### MentorDiscovery Updates (`components/mentor-discovery/MentorDiscovery.tsx`)
Enhanced with pagination support:
- `usePagination`: Toggle between pagination and infinite scroll
- `pageSize`: Initial page size (default: 12)
- Dual-mode support (pagination or infinite scroll)
- Automatic scroll to top on page change

## Usage

### Enable Pagination Mode
```tsx
<MentorDiscovery 
  belowFixedNavbar 
  usePagination 
  pageSize={12} 
/>
```

### Infinite Scroll Mode (Legacy)
```tsx
<MentorDiscovery 
  belowFixedNavbar 
  usePagination={false} 
/>
```

## API Integration

The pagination uses the existing `mentorApi.getMentors()` function with:
- `filters`: Current filter state
- `page`: Page number (1-indexed)
- `limit`: Results per page

**Response Structure:**
```typescript
{
  mentors: Mentor[];
  total: number;        // Total mentor count
  page: number;         // Current page
  totalPages: number;   // Total pages
  hasMore: boolean;     // More results available
}
```

## Acceptance Criteria

### ✅ No Duplicate Results
- Mentor IDs are tracked in a Set
- Duplicates are filtered before adding to state
- Each page load in pagination mode replaces content entirely

### ✅ Pagination State is Maintained
- Current page stored in component state
- Page size changes reset to page 1
- Filter changes reset to page 1
- State persists during filter-only changes

### ✅ Current Page Display
- Badge shows "Page X of Y" in pagination mode
- Current page button is highlighted
- Previous/Next buttons show current state

### ✅ Page Size Control
- Dropdown selector with 12, 24, 48, 96 options
- Shows total results count
- Resets to page 1 on size change
- Visible only in pagination mode

### ✅ Previous/Next Controls
- "Previous" button disabled on page 1
- "Next" button disabled on last page
- Smooth transitions between pages
- Accessible keyboard navigation

## Technical Details

### State Management
```typescript
const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(initialPageSize);
const [totalPages, setTotalPages] = useState(1);
const [totalMentors, setTotalMentors] = useState(0);
const [mentors, setMentors] = useState<Mentor[]>([]);
```

### Duplicate Prevention Logic
```typescript
setMentors((prev) => {
  const existingIds = new Set(prev.map((m) => m.id));
  const newMentors = response.mentors.filter((m) => !existingIds.has(m.id));
  return [...prev, ...newMentors];
});
```

### Page Change Handler
```typescript
const handlePageChange = useCallback((newPage: number) => {
  if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
    fetchMentors(newPage, false);
    // Smooth scroll to top of results
    mentorListRef.current?.scrollIntoView({ behavior: "smooth" });
  }
}, [totalPages, currentPage, fetchMentors]);
```

## UI/UX Improvements

1. **Visual Feedback**
   - Loading spinner when fetching
   - Disabled states for boundary buttons
   - Highlighted current page

2. **Accessibility**
   - ARIA labels on all controls
   - `aria-current="page"` on active page
   - Screen reader friendly navigation

3. **Responsive Design**
   - Page size selector hidden on mobile
   - Compact pagination on small screens
   - Touch-friendly button sizes

4. **User Experience**
   - Smooth scroll to top on page change
   - Persistent filter state across pages
   - Clear indication of total results

## Testing Recommendations

1. **Pagination Flow**
   - Navigate through multiple pages
   - Test boundary conditions (first/last page)
   - Verify page count updates with filters

2. **Duplicate Prevention**
   - Load multiple pages
   - Change filters and return to previous state
   - Verify no duplicate mentor cards appear

3. **State Persistence**
   - Apply filters and navigate pages
   - Change page size
   - Clear filters and verify reset

4. **Edge Cases**
   - Single page of results
   - Empty results
   - Large page counts (50+ pages)
   - Network errors during page load

## Future Enhancements

1. **URL Parameter Sync**
   - Add page number to URL query params
   - Enable browser back/forward navigation
   - Share links to specific pages

2. **Jump to Page**
   - Direct page number input
   - Quick jump to first/last page

3. **Results Summary**
   - "Showing X-Y of Z mentors"
   - Results range indicator

4. **Performance**
   - Cache previous pages
   - Prefetch next/previous pages
   - Virtualized rendering for large pages
