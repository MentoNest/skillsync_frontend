# Mentor Pagination - Visual Guide

## UI Components Overview

### 1. Header Section
```
┌─────────────────────────────────────────────────────────────────┐
│  Find Mentors    [156 mentors · Page 2 of 13]    [Filters 🔽]  │
└─────────────────────────────────────────────────────────────────┘
```

### 2. Controls Bar (Desktop)
```
┌─────────────────────────────────────────────────────────────────┐
│  [Search mentors by name, skill, company....................]   │
│                                                                  │
│  [Show: 12 per page 🔽]  [Sort: Relevance 🔽]  [Clear filters]│
│  of 156 total                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 3. Pagination Controls (Various States)

#### Current Page: 1 (First Page)
```
┌────────────────────────────────────────────────────┐
│  [‹ Previous] [1] 2  3  4  5 ... 13 [Next ›]      │
│   (disabled)  ^                                    │
│             active                                 │
└────────────────────────────────────────────────────┘
```

#### Current Page: 6 (Middle Page)
```
┌────────────────────────────────────────────────────┐
│  [‹ Previous] 1 ... 5 [6] 7 ... 13 [Next ›]       │
│                       ^                            │
│                     active                         │
└────────────────────────────────────────────────────┘
```

#### Current Page: 13 (Last Page)
```
┌────────────────────────────────────────────────────┐
│  [‹ Previous] 1 ... 11 12 [13] [Next ›]           │
│                           ^    (disabled)          │
│                         active                     │
└────────────────────────────────────────────────────┘
```

#### Small Page Count (5 pages)
```
┌────────────────────────────────────────────────────┐
│  [‹ Previous] 1 [2] 3  4  5 [Next ›]              │
│               (no ellipsis needed)                 │
└────────────────────────────────────────────────────┘
```

## Color Coding

### Active Page Button
```
┌──────┐
│  6   │  Background: bg-blue-600
│      │  Text: text-white
│      │  Border: border-blue-600
└──────┘
```

### Inactive Page Button
```
┌──────┐
│  7   │  Background: bg-white
│      │  Text: text-slate-900
│      │  Border: border-gray-300
│      │  Hover: bg-gray-50
└──────┘
```

### Disabled Button
```
┌───────────┐
│ ‹ Previous│  Background: bg-white
│           │  Text: text-slate-900
│           │  Border: border-gray-300
│           │  Opacity: opacity-40
│           │  Cursor: cursor-not-allowed
└───────────┘
```

## Page Size Selector States

### Default (12 per page)
```
┌────────────────────────────────┐
│ Show: [12 per page 🔽]        │
│       of 156 total             │
└────────────────────────────────┘
```

### Expanded Dropdown
```
┌────────────────────────────────┐
│ Show: [12 per page 🔽]        │
│       ┌─────────────────┐      │
│       │ 12 per page  ✓  │      │
│       │ 24 per page     │      │
│       │ 48 per page     │      │
│       │ 96 per page     │      │
│       └─────────────────┘      │
│       of 156 total             │
└────────────────────────────────┘
```

### After Selection (24 per page)
```
┌────────────────────────────────┐
│ Show: [24 per page 🔽]        │
│       of 156 total             │
└────────────────────────────────┘

Pagination Updates:
[‹ Previous] [1] 2  3  4  5  6  7 [Next ›]
             ^
           active (reset to page 1)
```

## Full Page Layout Example

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  📊 Find Mentors    [156 mentors · Page 2 of 13]          [Filters 🔽] │
│                                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  [Search mentors...............]  [12 per page 🔽]  [Sort: Rating 🔽] │
│                                   of 156 total      [Clear filters]    │
│                                                                          │
├──────────────┬──────────────────────────────────────────────────────────┤
│              │                                                           │
│ ☰ FILTERS    │  ┌────────────┐ ┌────────────┐ ┌────────────┐         │
│              │  │            │ │            │ │            │         │
│ Expertise    │  │  Mentor 1  │ │  Mentor 2  │ │  Mentor 3  │         │
│ □ Frontend   │  │  Card      │ │  Card      │ │  Card      │         │
│ ☑ Backend    │  │            │ │            │ │            │         │
│ □ Full Stack │  └────────────┘ └────────────┘ └────────────┘         │
│              │                                                           │
│ Experience   │  ┌────────────┐ ┌────────────┐ ┌────────────┐         │
│ □ Junior     │  │            │ │            │ │            │         │
│ ☑ Mid        │  │  Mentor 4  │ │  Mentor 5  │ │  Mentor 6  │         │
│ ☑ Senior     │  │  Card      │ │  Card      │ │  Card      │         │
│ □ Lead       │  │            │ │            │ │            │         │
│              │  └────────────┘ └────────────┘ └────────────┘         │
│ Industry     │                                                           │
│ ☑ Fintech    │  ┌────────────┐ ┌────────────┐ ┌────────────┐         │
│ □ Healthcare │  │            │ │            │ │            │         │
│ □ E-commerce │  │  Mentor 7  │ │  Mentor 8  │ │  Mentor 9  │         │
│              │  │  Card      │ │  Card      │ │  Card      │         │
│ Min Rating   │  │            │ │            │ │            │         │
│ [4.0+ 🔽]   │  └────────────┘ └────────────┘ └────────────┘         │
│              │                                                           │
│ Max Rate     │  ┌────────────┐ ┌────────────┐ ┌────────────┐         │
│ [$200____]   │  │            │ │            │ │            │         │
│              │  │ Mentor 10  │ │ Mentor 11  │ │ Mentor 12  │         │
│              │  │  Card      │ │  Card      │ │  Card      │         │
│              │  │            │ │            │ │            │         │
│              │  └────────────┘ └────────────┘ └────────────┘         │
│              │                                                           │
│              │  ┌────────────────────────────────────────────────┐     │
│              │  │ [‹ Previous] 1 [2] 3  4  5 ... 13 [Next ›]    │     │
│              │  └────────────────────────────────────────────────┘     │
│              │                                                           │
└──────────────┴──────────────────────────────────────────────────────────┘
```

## Mobile View (Responsive)

```
┌─────────────────────────────────┐
│                                 │
│ 📊 Find Mentors  [Filters 🔽] │
│ [45 mentors · Page 1 of 4]     │
│                                 │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐   │
│  │                         │   │
│  │      Mentor 1           │   │
│  │      Card               │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │                         │   │
│  │      Mentor 2           │   │
│  │      Card               │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │                         │   │
│  │      Mentor 3           │   │
│  │      Card               │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌───────────────────────────┐ │
│  │ [‹] [1] 2 3 4 [›]        │ │
│  └───────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

## Loading States

### Initial Load
```
┌─────────────────────────────────────────┐
│  Loading mentors...                     │
│                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │ ░░░░░░░ │ │ ░░░░░░░ │ │ ░░░░░░░ │  │
│  │ ░░░░░░░ │ │ ░░░░░░░ │ │ ░░░░░░░ │  │
│  │ ░░░░░   │ │ ░░░░░   │ │ ░░░░░   │  │
│  └─────────┘ └─────────┘ └─────────┘  │
│  (Skeleton cards showing)               │
└─────────────────────────────────────────┘
```

### Page Change Loading
```
┌─────────────────────────────────────────┐
│  Mentors loaded                         │
│                                         │
│  [Cards shown normally...]              │
│                                         │
│  [‹ Previous] 1 [2] 3 ... [Next ›]     │
│  (buttons disabled during load)         │
│                                         │
│  [🔄 Loading...] (if slow)             │
└─────────────────────────────────────────┘
```

## Error States

### Load Error
```
┌─────────────────────────────────────────┐
│              ⚠️                         │
│     Something went wrong                │
│                                         │
│  Failed to load mentors.                │
│  Please try again.                      │
│                                         │
│     [Try again]                         │
└─────────────────────────────────────────┘
```

### No Results
```
┌─────────────────────────────────────────┐
│              😕                         │
│     No mentors found                    │
│                                         │
│  Try adjusting your filters to          │
│  find more mentors.                     │
│                                         │
│     [Clear all filters]                 │
└─────────────────────────────────────────┘
```

## Interaction Animations

### Page Button Click
```
Before Click:        On Click:          After Load:
┌──────┐            ┌──────┐           ┌──────┐
│  3   │    →       │  3   │    →      │  3   │
│      │            │ ⏳   │           │      │
└──────┘            └──────┘           └──────┘
(normal)            (loading)          (active)
                                       bg-blue-600
```

### Scroll to Top on Page Change
```
User at bottom of page
        ↓
[Clicks Page 3]
        ↓
Page scrolls smoothly to top
        ↓
New mentors load
        ↓
User sees new page at top
```

## State Indicator Colors

### Current Page Badge
```
┌─────────────────────────────────┐
│ [156 mentors · Page 2 of 13]   │
│  bg-indigo-50 text-indigo-700   │
└─────────────────────────────────┘
```

### Active Filter Badge
```
┌──────────────┐
│ Fintech   ×  │  bg-indigo-50
│              │  text-indigo-700
└──────────────┘
```

## Accessibility Indicators

### Focus States
```
Keyboard Focus:
┌────────────┐
│    3       │  ring-2 ring-indigo-500
│            │  ring-offset-2
└────────────┘
```

### Screen Reader Announcements
```
User navigates to pagination:
"Navigation, Mentor listing pages"

User on Previous button:
"Button, Previous page, disabled"

User on page 2:
"Button, 2, current page"

User clicks page 3:
"Loading mentors for page 3"
"Page 3 loaded, 12 mentors displayed"
```

## Responsive Breakpoints

### Desktop (lg: 1024px+)
- 3 columns of mentor cards
- Full pagination with all buttons
- Page size selector visible
- Sidebar filters visible

### Tablet (md: 768px - 1023px)
- 2 columns of mentor cards
- Compact pagination
- Page size selector visible
- Sidebar filters visible

### Mobile (< 768px)
- 1 column of mentor cards
- Minimal pagination (fewer buttons)
- Page size selector hidden
- Filters in drawer

## Visual States Summary

| Element           | State      | Background  | Text Color  | Border       |
|-------------------|------------|-------------|-------------|--------------|
| Active Page       | Active     | blue-600    | white       | blue-600     |
| Inactive Page     | Normal     | white       | slate-900   | gray-300     |
| Inactive Page     | Hover      | gray-50     | slate-900   | gray-300     |
| Disabled Button   | Disabled   | white       | slate-900   | gray-300     |
| Current Badge     | Display    | indigo-50   | indigo-700  | none         |
| Loading Spinner   | Loading    | n/a         | indigo-600  | 4px          |

## Example Page Transitions

### Transition 1: Page 1 → Page 2
```
Before:
[‹ Previous] [1] 2  3  4 ... 10 [Next ›]
(disabled)   ↑

After:
[‹ Previous] 1 [2] 3  4 ... 10 [Next ›]
             ↑
```

### Transition 2: Change Page Size
```
Before: 12 per page, Page 3 of 13
[‹ Previous] 1  2 [3] 4  5 ... 13 [Next ›]

User selects: 24 per page

After: 24 per page, Page 1 of 7
[‹ Previous] [1] 2  3  4  5  6  7 [Next ›]
(disabled)   ↑
```

### Transition 3: Apply Filter
```
Before: 156 total, Page 5 of 13
[‹ Previous] 1 ... 4 [5] 6 ... 13 [Next ›]

User adds: "Frontend" filter

After: 45 total, Page 1 of 4
[‹ Previous] [1] 2  3  4 [Next ›]
(disabled)   ↑
```
