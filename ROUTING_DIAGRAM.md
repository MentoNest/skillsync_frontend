# SkillSync Routing Diagram

## Application Routes Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Homepage (/)                         │
│                                                             │
│  • Hero Section                                             │
│  • Featured Mentors                                         │
│  • Benefits                                                 │
│  • Call to Action                                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ├──→ [Browse Mentors] ────────────┐
                       │                                  │
                       └──→ [View Profile] ──────────┐   │
                                                     │   │
                       ┌─────────────────────────────┘   │
                       │                                  │
                       ▼                                  │
┌─────────────────────────────────────────────────────────────┐
│                  Mentor Profile Page                        │
│                   /mentors/[id]                             │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Dynamic Route Handler                                │  │
│  │                                                      │  │
│  │ 1. Extract [id] from URL                           │  │
│  │ 2. Fetch mentor data                               │  │
│  │ 3. Generate metadata                               │  │
│  │ 4. Render profile OR not-found                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Components:                                                │
│  • page.tsx       ← Main profile                           │
│  • loading.tsx    ← Skeleton state                         │
│  • not-found.tsx  ← 404 state                              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       └──→ [Back to Mentors] ───────────┐
                                                          │
                       ┌──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  Mentor List Page                           │
│                     /mentors                                │
│                                                             │
│  • Search and Filters                                       │
│  • Mentor Cards Grid                                        │
│  • Pagination Controls ← NEWLY IMPLEMENTED                  │
│  • Sort Options                                             │
│                                                             │
│  Each card links to:                                        │
│  /mentors/{mentor.id} ──────────────────────────────────┐  │
└──────────────────────┬──────────────────────────────────│───┘
                       │                                  │
                       │                                  │
                       └──────────────────────────────────┘
```

## Route Structure

```
app/(public)/
├── page.tsx                    # Homepage (/)
├── layout.tsx                  # Navbar + Footer
│
├── mentors/
│   ├── page.tsx               # List page (/mentors)
│   │                          # • Pagination
│   │                          # • Filters
│   │                          # • Search
│   │
│   └── [id]/                  # Dynamic route (/mentors/[id])
│       ├── page.tsx           # ← Profile page
│       ├── loading.tsx        # ← Loading state
│       └── not-found.tsx      # ← 404 state
│
├── discussions/
│   └── [id]/
│       └── page.tsx           # Discussion detail
│
└── resources/
    └── page.tsx               # Resources list
```

## Data Flow: Mentor Profile

```
┌────────────────────────────────────────────────────────────┐
│                     User Actions                            │
└────────────┬───────────────────────────────────────────────┘
             │
             │ 1. User clicks mentor card
             │    or navigates to /mentors/mentor-123
             │
             ▼
┌────────────────────────────────────────────────────────────┐
│                  Next.js Router                             │
│                                                             │
│  • Matches route pattern: /mentors/[id]                    │
│  • Extracts parameter: id = "mentor-123"                   │
│  • Loads route components                                  │
└────────────┬───────────────────────────────────────────────┘
             │
             ├──→ 2a. Shows loading.tsx immediately
             │        └─→ Skeleton UI displayed
             │
             └──→ 2b. Executes page.tsx (Server Component)
                       │
                       ▼
┌────────────────────────────────────────────────────────────┐
│              page.tsx (Server Component)                    │
│                                                             │
│  const { id } = await params;                              │
│  const mentor = await mentorApi.getMentorById(id);         │
│                                                             │
│  if (error) → notFound();                                  │
└────────────┬───────────────────────────────────────────────┘
             │
             ├──→ 3a. Success Path
             │        │
             │        ▼
             │   ┌────────────────────────────────────────┐
             │   │  MentorProfileContent (Client)         │
             │   │                                        │
             │   │  • Display mentor info                 │
             │   │  • Interactive features                │
             │   │  • Bookmark, Share, Book               │
             │   └────────────────────────────────────────┘
             │
             └──→ 3b. Error Path
                      │
                      ▼
                 ┌────────────────────────────────────────┐
                 │  not-found.tsx                         │
                 │                                        │
                 │  • "Mentor Not Found" message         │
                 │  • Navigation options                  │
                 │  • Support link                        │
                 └────────────────────────────────────────┘
```

## Navigation Flow

```
┌──────────────┐
│   Homepage   │
│      /       │
└──────┬───────┘
       │
       ├──→ Click "Browse Mentors"
       │    │
       │    ▼
       │ ┌──────────────────┐
       │ │  Mentor List     │
       │ │    /mentors      │
       │ └────────┬─────────┘
       │          │
       │          ├──→ Click mentor card
       │          │    │
       │          │    ▼
       │          │ ┌──────────────────┐
       │          │ │ Mentor Profile   │
       │          │ │ /mentors/[id]    │
       │          │ └────────┬─────────┘
       │          │          │
       │          │          ├──→ Click "Back to Mentors"
       │          │          │    └──→ Returns to /mentors
       │          │          │
       │          │          ├──→ Click "Go to Homepage"
       │          │          │    └──→ Returns to /
       │          │          │
       │          │          └──→ Click "Book Session"
       │          │               └──→ (Future: Booking flow)
       │          │
       │          └──→ Change page
       │               └──→ /mentors?page=2
       │
       └──→ Click featured mentor
            └──→ Direct to /mentors/[id]
```

## URL Parameters

### Mentor List Page
```
/mentors
/mentors?page=2
/mentors?page=3&expertise=Frontend
/mentors?expertise=Backend&experience=senior&page=1
```

**Query Parameters:**
- `page` - Current page number
- `expertise[]` - Selected expertise areas
- `experience[]` - Experience levels
- `industry[]` - Industries
- `minRating` - Minimum rating
- `maxHourlyRate` - Maximum rate
- `sortBy` - Sort option

### Mentor Profile Page
```
/mentors/[id]
/mentors/mentor-123
/mentors/john-doe
/mentors/abc-xyz-789
```

**Dynamic Parameter:**
- `id` - Unique mentor identifier

## Component Hierarchy

```
App Layout
│
├── (public) Layout
│   │
│   ├── Navbar
│   │
│   ├── /mentors (List Page)
│   │   │
│   │   ├── MentorDiscovery
│   │   │   │
│   │   │   ├── Header
│   │   │   ├── Filters
│   │   │   ├── MentorCard[] (grid)
│   │   │   └── MentorPagination
│   │   │
│   │   └── MobileFilterDrawer
│   │
│   ├── /mentors/[id] (Profile Page)
│   │   │
│   │   ├── page.tsx (Server)
│   │   │   │
│   │   │   └── MentorProfileContent (Client)
│   │   │       │
│   │   │       ├── Header Section
│   │   │       │   ├── Avatar
│   │   │       │   ├── Info
│   │   │       │   └── Actions
│   │   │       │
│   │   │       ├── Main Content
│   │   │       │   ├── About
│   │   │       │   ├── Skills
│   │   │       │   └── Reviews
│   │   │       │
│   │   │       └── Sidebar
│   │   │           ├── Pricing
│   │   │           ├── Availability
│   │   │           └── Share
│   │   │
│   │   ├── loading.tsx (Skeleton)
│   │   │
│   │   └── not-found.tsx (404)
│   │
│   └── Footer
│
└── (Other route groups...)
```

## State Management Flow

```
┌────────────────────────────────────────────────────────────┐
│                    URL State (Query Params)                 │
│                                                             │
│  /mentors?page=2&expertise=Frontend&minRating=4.0          │
└────────────┬───────────────────────────────────────────────┘
             │
             │ useUrlFilters() hook reads params
             │
             ▼
┌────────────────────────────────────────────────────────────┐
│              MentorDiscovery Component State                │
│                                                             │
│  • filters: { expertise, minRating, ... }                  │
│  • currentPage: 2                                          │
│  • pageSize: 12                                            │
│  • mentors: [...]                                          │
│  • totalPages: 13                                          │
└────────────┬───────────────────────────────────────────────┘
             │
             │ fetchMentors(filters, page, pageSize)
             │
             ▼
┌────────────────────────────────────────────────────────────┐
│                      API Layer                              │
│                                                             │
│  mentorApi.getMentors(filters, page, limit)                │
│  mentorApi.getMentorById(id)                               │
└────────────┬───────────────────────────────────────────────┘
             │
             │ HTTP Request
             │
             ▼
┌────────────────────────────────────────────────────────────┐
│                    Backend API                              │
│                                                             │
│  GET /api/mentors?page=2&expertise=Frontend&limit=12       │
│  GET /api/mentors/:id                                      │
└────────────┬───────────────────────────────────────────────┘
             │
             │ Response
             │
             ▼
┌────────────────────────────────────────────────────────────┐
│                   UI Components                             │
│                                                             │
│  • MentorCard                                              │
│  • MentorPagination                                        │
│  • MentorProfileContent                                    │
└────────────────────────────────────────────────────────────┘
```

## File System Routing

Next.js App Router automatically creates routes based on file structure:

```
File Path                              →  Route
─────────────────────────────────────────────────────────────
app/(public)/page.tsx                  →  /
app/(public)/mentors/page.tsx          →  /mentors
app/(public)/mentors/[id]/page.tsx     →  /mentors/:id
app/(public)/discussions/[id]/page.tsx →  /discussions/:id
app/(public)/resources/page.tsx        →  /resources
```

## Special Files

```
page.tsx       → Route page component
layout.tsx     → Shared layout wrapper
loading.tsx    → Loading UI (automatic)
not-found.tsx  → 404 UI (notFound() triggered)
error.tsx      → Error boundary
```

## Metadata Generation

```
┌────────────────────────────────────────────────────────────┐
│                    Static Metadata                          │
│                                                             │
│  export const metadata = {                                 │
│    title: "Find a Mentor · SkillSync",                     │
│    description: "Browse mentors..."                        │
│  }                                                         │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                   Dynamic Metadata                          │
│                                                             │
│  export async function generateMetadata({ params }) {      │
│    const mentor = await getMentorById(params.id);         │
│    return {                                               │
│      title: `${mentor.name} - Profile`,                   │
│      description: mentor.bio                              │
│    }                                                      │
│  }                                                        │
└────────────────────────────────────────────────────────────┘
```

## Complete User Journey

```
1. User lands on Homepage (/)
   │
   ▼
2. Clicks "Find a Mentor"
   │
   ▼
3. Arrives at /mentors (List Page)
   │
   ├─→ Applies filters
   ├─→ Changes page size
   ├─→ Navigates pages
   │
   ▼
4. Clicks mentor card
   │
   ▼
5. Shows loading.tsx (skeleton)
   │
   ▼
6. Loads /mentors/[id] (Profile)
   │
   ├─→ Views bio, skills, rating
   ├─→ Bookmarks mentor
   ├─→ Clicks "Book Session" (future)
   │
   ▼
7. Clicks "Back to Mentors"
   │
   ▼
8. Returns to /mentors (previous state maintained)
```

## Implementation Summary

✅ **Homepage** - Landing page with featured content
✅ **Mentor List** - `/mentors` with pagination
✅ **Mentor Profile** - `/mentors/[id]` with dynamic routing
✅ **Loading States** - Skeleton UI for async operations
✅ **Error States** - Not found pages with navigation
✅ **Responsive** - All routes work on mobile/tablet/desktop
✅ **SEO** - Dynamic metadata generation
✅ **Accessible** - ARIA labels and semantic HTML
