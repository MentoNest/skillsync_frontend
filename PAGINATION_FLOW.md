# Mentor Pagination Flow Diagram

## Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      MentorsPage                            │
│                   (Server Component)                        │
│                                                             │
│  Props: belowFixedNavbar={true}                           │
│         usePagination={true}                              │
│         pageSize={12}                                     │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                   MentorDiscovery                           │
│                  (Client Component)                         │
│                                                             │
│  State:                                                     │
│    - currentPage: number                                    │
│    - pageSize: number                                       │
│    - totalPages: number                                     │
│    - totalMentors: number                                   │
│    - mentors: Mentor[]                                      │
│    - filters: MentorFilters                                 │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │              Header Section                           │ │
│  │  • Title: "Find Mentors"                             │ │
│  │  • Badge: "156 mentors · Page 2 of 13"              │ │
│  │  • Filters button (mobile)                           │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │           Controls Bar (Desktop only)                 │ │
│  │                                                       │ │
│  │  [Search Input...................] [PageSize ▼]      │ │
│  │                                    [Sort By ▼]       │ │
│  │                                    [Clear filters]   │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────┬───────────────────────────────────────┐│
│  │                 │                                       ││
│  │   Sidebar       │     Mentor Results Grid              ││
│  │   Filters       │                                       ││
│  │                 │  ┌──────┐ ┌──────┐ ┌──────┐         ││
│  │ • Expertise     │  │Card 1│ │Card 2│ │Card 3│         ││
│  │ • Experience    │  └──────┘ └──────┘ └──────┘         ││
│  │ • Industry      │  ┌──────┐ ┌──────┐ ┌──────┐         ││
│  │ • Rating        │  │Card 4│ │Card 5│ │Card 6│         ││
│  │ • Hourly Rate   │  └──────┘ └──────┘ └──────┘         ││
│  │                 │  ┌──────┐ ┌──────┐ ┌──────┐         ││
│  │                 │  │Card 7│ │Card 8│ │Card 9│         ││
│  │                 │  └──────┘ └──────┘ └──────┘         ││
│  │                 │  ┌──────┐ ┌──────┐ ┌──────┐         ││
│  │                 │  │Card10│ │Card11│ │Card12│         ││
│  │                 │  └──────┘ └──────┘ └──────┘         ││
│  │                 │                                       ││
│  │                 │  ┌────────────────────────────────┐  ││
│  │                 │  │     MentorPagination           │  ││
│  │                 │  │                                │  ││
│  │                 │  │ [‹ Prev] 1 ... 5 [6] 7 ... 13 │  ││
│  │                 │  │          [Next ›]              │  ││
│  │                 │  └────────────────────────────────┘  ││
│  └─────────────────┴───────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Initial Load
```
User visits /mentors
        │
        ▼
MentorDiscovery mounts
        │
        ├─ Set currentPage = 1
        ├─ Set pageSize = 12
        └─ fetchMentors(1, false)
               │
               ▼
        mentorApi.getMentors(filters, 1, 12)
               │
               ▼
        API Response: {
          mentors: [...],
          total: 156,
          page: 1,
          totalPages: 13,
          hasMore: true
        }
               │
               ▼
        State Updates:
          ├─ setMentors([...12 mentors])
          ├─ setTotalMentors(156)
          ├─ setTotalPages(13)
          ├─ setCurrentPage(1)
          └─ setHasMore(true)
               │
               ▼
        Render 12 mentor cards
        Render pagination: [‹ Prev] [1] 2 3 ... 13 [Next ›]
```

### 2. Page Change (User clicks "3")
```
User clicks page 3
        │
        ▼
onPageChange(3) called
        │
        ├─ Check: 3 >= 1 && 3 <= 13 && 3 !== currentPage ✓
        └─ fetchMentors(3, false)
               │
               ▼
        setIsLoading(true)
               │
               ▼
        mentorApi.getMentors(filters, 3, 12)
               │
               ▼
        API Response: {
          mentors: [...12 new mentors],
          page: 3,
          ...
        }
               │
               ▼
        State Updates:
          ├─ setMentors([...12 NEW mentors]) ← REPLACES old
          ├─ setCurrentPage(3)
          └─ Smooth scroll to top
               │
               ▼
        Render new 12 mentor cards
        Render pagination: [‹ Prev] 1 2 [3] 4 ... 13 [Next ›]
```

### 3. Page Size Change (User selects "24")
```
User selects 24 per page
        │
        ▼
onPageSizeChange(24) called
        │
        ├─ setPageSize(24)
        ├─ setCurrentPage(1) ← Reset to page 1
        └─ useEffect triggers (pageSize changed)
               │
               ▼
        fetchMentors(1, false)
               │
               ▼
        mentorApi.getMentors(filters, 1, 24)
               │
               ▼
        API Response: {
          mentors: [...24 mentors],
          total: 156,
          totalPages: 7,  ← Fewer pages
          ...
        }
               │
               ▼
        State Updates:
          ├─ setMentors([...24 mentors])
          ├─ setTotalPages(7)
          └─ setCurrentPage(1)
               │
               ▼
        Render 24 mentor cards
        Render pagination: [‹ Prev] [1] 2 3 4 5 6 7 [Next ›]
```

### 4. Filter Change (User adds "Frontend" filter)
```
User clicks "Frontend" checkbox
        │
        ▼
updateFilters({ expertise: ["Frontend"] })
        │
        ├─ Update URL params
        └─ useEffect triggers (filters changed)
               │
               ▼
        setCurrentPage(1) ← Reset to page 1
               │
               ▼
        fetchMentors(1, false)
               │
               ▼
        mentorApi.getMentors({ expertise: ["Frontend"] }, 1, 12)
               │
               ▼
        API Response: {
          mentors: [...filtered mentors],
          total: 45,  ← Fewer total
          totalPages: 4,
          ...
        }
               │
               ▼
        State Updates:
          ├─ setMentors([...12 filtered mentors])
          ├─ setTotalMentors(45)
          ├─ setTotalPages(4)
          └─ setCurrentPage(1)
               │
               ▼
        Render filtered mentor cards
        Render pagination: [‹ Prev] [1] 2 3 4 [Next ›]
```

## Duplicate Prevention Logic

### Scenario: Infinite Scroll Mode (append=true)
```
Page 1 loaded: mentors = [M1, M2, M3, ..., M12]
                            │
                            ▼
Page 2 load attempt with append=true
                            │
                            ▼
        setMentors((prev) => {
          existingIds = Set {M1, M2, M3, ..., M12}
                            │
                            ▼
          newMentors = [M13, M14, ..., M24]
                            │
                            ▼
          Filter: M13 not in existingIds? ✓
                 M14 not in existingIds? ✓
                 ...
                            │
                            ▼
          return [...prev, ...filtered]
        })
                            │
                            ▼
        Result: [M1, M2, ..., M12, M13, M14, ..., M24]
        ✓ No duplicates
```

### Scenario: Pagination Mode (append=false)
```
Page 2 loaded: mentors = [M13, M14, M15, ..., M24]
                            │
                            ▼
User clicks Page 1
                            │
                            ▼
        setMentors([M1, M2, M3, ..., M12]) ← REPLACE
                            │
                            ▼
        Result: [M1, M2, ..., M12]
        ✓ Page 2 mentors removed
        ✓ No mixing of pages
```

## State Persistence Rules

| Event                    | Current Page | Page Size | Mentors Array | Total Pages |
|--------------------------|--------------|-----------|---------------|-------------|
| Initial Load             | Set to 1     | Set       | Set           | Set         |
| Page Change              | Update       | Keep      | Replace       | Keep        |
| Page Size Change         | Reset to 1   | Update    | Replace       | Recalculate |
| Filter Change            | Reset to 1   | Keep      | Replace       | Recalculate |
| Sort Change              | Keep         | Keep      | Replace       | Keep        |
| Bookmark Toggle          | Keep         | Keep      | Keep          | Keep        |

## Component Communication

```
┌──────────────────────┐
│   MentorPagination   │
│                      │
│  Props:              │
│  - currentPage       │  ─┐
│  - totalPages        │   │
│  - onPageChange()    │   │ Callback
└──────────────────────┘   │
                           │
                           ▼
┌──────────────────────────────────────┐
│        MentorDiscovery               │
│                                      │
│  handlePageChange(newPage) {         │
│    if (valid) {                      │
│      fetchMentors(newPage, false)    │
│    }                                 │
│  }                                   │
└──────────────────────────────────────┘
                           │
                           │ API Call
                           ▼
┌──────────────────────────────────────┐
│           mentorApi                  │
│                                      │
│  getMentors(filters, page, limit)    │
│  ↓                                   │
│  Backend API                         │
│  ↓                                   │
│  Database Query                      │
│  ↓                                   │
│  Response                            │
└──────────────────────────────────────┘
```

## PageSizeSelector Integration

```
┌──────────────────────┐
│  PageSizeSelector    │
│                      │
│  [12 ▼] of 156 total │
│                      │
│  Options:            │
│  ├─ 12 per page      │
│  ├─ 24 per page      │  ─┐
│  ├─ 48 per page      │   │
│  └─ 96 per page      │   │ User selects 24
└──────────────────────┘   │
                           │
                           ▼
┌──────────────────────────────────────┐
│        MentorDiscovery               │
│                                      │
│  handlePageSizeChange(24) {          │
│    setPageSize(24)                   │
│    setCurrentPage(1)                 │
│    // fetchMentors called via effect │
│  }                                   │
└──────────────────────────────────────┘
                           │
                           ▼
        New API call with limit=24
        totalPages recalculated: 156/24 = 7 pages
        User sees page 1 with 24 mentors
```

## Accessibility Flow

```
Screen Reader User Navigation:
        │
        ▼
Hears: "Navigation, Mentor listing pages"
        │
        ▼
Hears: "Button, Previous page, disabled"
        │
        ▼
Hears: "Button, 1, current page"
        │
        ▼
Hears: "Button, 2"
        │
        ▼
User activates Page 2
        │
        ▼
Page loads, focus maintained
        │
        ▼
Hears: "Button, Previous page"
        │
        ▼
Hears: "Button, 1"
        │
        ▼
Hears: "Button, 2, current page"
```

## Performance Optimization Points

1. **Duplicate Check:** O(1) lookup using Set
2. **Memoized Callbacks:** useCallback prevents re-renders
3. **Conditional Rendering:** Pagination only renders when totalPages > 1
4. **Smooth Scroll:** Native browser API (hardware accelerated)
5. **State Updates:** Batched React updates
6. **API Calls:** Debounced on rapid filter changes (via useEffect)

## Error Handling Flow

```
API Call fails
        │
        ├─ In append mode:
        │     ├─ setLoadMoreError(message)
        │     └─ Show retry button
        │
        └─ In pagination mode:
              ├─ setError(message)
              ├─ Show error screen
              └─ Offer reload button
```
