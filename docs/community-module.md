# Community Module — Documentation

> Last updated: August 2026

## Table of Contents

1. [Overview](#overview)
2. [Component Hierarchy](#component-hierarchy)
3. [Routing Structure](#routing-structure)
4. [State Management](#state-management)
5. [Analytics Integration](#analytics-integration)
6. [API Integration Points](#api-integration-points)
7. [Testing](#testing)
8. [Contribution Guidelines](#contribution-guidelines)

---

## Overview

The Community module lets users connect, share knowledge, and engage with the SkillSync platform. It lives under the authenticated dashboard route and provides:

- A hero banner with a call-to-action to start a discussion
- A tabbed discussion feed (All, Questions, Success Stories, Resources, Events)
- Per-post actions: view, like, reply, share, bookmark
- A sidebar with browsable categories, upcoming events with registration, and community statistics
- Full analytics tracking on every engagement event

---

## Component Hierarchy

```
app/(dashboard)/community/page.tsx       ← Page (client component, owns state + analytics)
│
├── components/community/CommunityHeroBanner.tsx
│     Props: onStartDiscussion?: () => void
│     Renders: heading, description, "Start a Discussion" button
│
├── [inline] DiscussionCard
│     Props: post, onView, onLike, onReply, onShare, onBookmark
│     Renders: avatar, author meta, title, excerpt, action buttons
│
└── components/CategoryBadge.tsx
      Props: category: string, color?: string
      Renders: a styled pill badge
```

### Shared utilities used

| File | Purpose |
|---|---|
| `hooks/useCommunityAnalytics.ts` | Provides typed, stable analytics callbacks |
| `lib/analytics/communityAnalytics.ts` | Core event tracker and type definitions |

---

## Routing Structure

```
app/
└── (dashboard)/
    └── community/
        └── page.tsx          GET /community
```

The `(dashboard)` route group wraps the page in `app/(dashboard)/layout.tsx`, which renders a `max-w-7xl` centred container with `bg-gray-50`. No additional nested routes exist yet.

**Planned routes** (not yet implemented):
- `/community/[discussionId]` — discussion detail / thread view
- `/community/new` — create a new discussion form

---

## State Management

The community page is fully client-side rendered (`'use client'`). There is no global state store — all state is local:

| State | Location | Purpose |
|---|---|---|
| `activeTab` | `CommunityPage` (planned) | Which tab filter is active |
| `discussions` | `CommunityPage` (currently static mock data) | The list of posts rendered in the feed |

When a backend API is integrated, discussions should be fetched via a server action or `useEffect` + SWR/React Query and stored in local component state or a lightweight cache.

### Data flow

```
CommunityPage
  ↓ passes handlers
DiscussionCard (onLike, onReply, onShare, onBookmark, onView)
  ↓ calls
useCommunityAnalytics hooks
  ↓ calls
trackEvent() → sendToAnalytics() [dev: console.log | prod: your provider]
```

---

## Analytics Integration

All engagement events are tracked through the `communityAnalytics` module. See `lib/analytics/communityAnalytics.ts` for full type definitions.

### Events

| Event name | Trigger | Key fields |
|---|---|---|
| `discussion_created` | "Start a Discussion" button clicked | `discussionId`, `title`, `category` |
| `discussion_viewed` | Page mount (all visible posts) + title click | `discussionId`, `title`, `category` |
| `discussion_liked` | Like button clicked | `discussionId`, `title` |
| `discussion_replied` | Reply button clicked | `discussionId`, `title` |
| `discussion_shared` | Share button clicked | `discussionId`, `title`, `shareMethod` |
| `discussion_bookmarked` | Save/Bookmark button clicked | `discussionId`, `title` |
| `event_registered` | Register button on a sidebar event | `eventId`, `eventTitle` |

### Swapping in a real provider

Open `lib/analytics/communityAnalytics.ts` and replace the body of `sendToAnalytics()`:

```ts
// Segment
analytics.track(event.name, event);

// PostHog
posthog.capture(event.name, event);

// Google Analytics 4
gtag('event', event.name, event);
```

No other changes are needed — all call sites use `useCommunityAnalytics` which delegates to `trackEvent`.

---

## API Integration Points

The module currently uses static mock data. When connecting to a real backend, replace the following:

### Discussions

```ts
// Current (mock)
const DISCUSSIONS = [ /* hardcoded array */ ];

// Replace with (example — React Query)
const { data: discussions } = useQuery({
  queryKey: ['discussions'],
  queryFn: () => fetch('/api/community/discussions').then(r => r.json()),
});
```

**Expected API contract:**

```ts
// GET /api/community/discussions
// Response: Discussion[]
interface Discussion {
  id: string;
  author: string;
  authorId: string;
  role: 'Mentor' | 'Mentee';
  time: string;           // relative or ISO-8601
  category: string;
  title: string;
  excerpt: string;
  likes: number;
  replies: number;
}
```

### Events

```ts
// GET /api/community/events
interface CommunityEvent {
  id: string;
  title: string;
  date: string;           // e.g. "Jul 5, 2026"
  time: string;
  attendees: number;
}
```

### Mutations (planned)

| Action | Method | Endpoint |
|---|---|---|
| Like a discussion | POST | `/api/community/discussions/:id/like` |
| Reply to a discussion | POST | `/api/community/discussions/:id/replies` |
| Bookmark a discussion | POST | `/api/community/discussions/:id/bookmark` |
| Register for an event | POST | `/api/community/events/:id/register` |

---

## Testing

### Test structure

```
__tests__/
├── unit/
│   ├── CommunityHeroBanner.test.tsx     Component rendering + interaction
│   ├── communityAnalytics.test.ts       trackEvent — stamping, error handling, all event types
│   └── useCommunityAnalytics.test.ts    Hook — all trackers, stability, payload pass-through
├── integration/
│   └── discussionWorkflow.test.tsx      Full page render + all engagement analytics flows
└── e2e/
    └── communityFlows.test.ts           Playwright — browser-level interaction & layout
```

### Running tests

**Unit & integration (Vitest)**

```bash
# Install test dependencies (one-time)
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# Run all tests once
npx vitest run

# Watch mode during development
npx vitest
```

Add `vitest.config.ts` to the project root:

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
});
```

Add `vitest.setup.ts`:

```ts
import '@testing-library/jest-dom';
```

**End-to-end (Playwright)**

```bash
# Install Playwright (one-time)
npm install -D @playwright/test
npx playwright install chromium

# Start the dev server in one terminal
npm run dev

# Run E2E tests in another terminal
npx playwright test __tests__/e2e/
```

---

## Contribution Guidelines

### Adding a new engagement event

1. Add the event type to `lib/analytics/communityAnalytics.ts`:
   ```ts
   export interface DiscussionReportedEvent extends BaseEvent {
     name: 'discussion_reported';
     discussionId: string;
     title: string;
     reason: string;
   }
   ```
2. Add it to the `CommunityEvent` union type in the same file.
3. Add a `trackDiscussionReported` callback to `hooks/useCommunityAnalytics.ts`.
4. Wire the callback to the relevant UI element in `page.tsx`.
5. Add unit tests to `__tests__/unit/communityAnalytics.test.ts` and `__tests__/unit/useCommunityAnalytics.test.ts`.
6. Add an integration test case to `__tests__/integration/discussionWorkflow.test.tsx`.

### Adding a new component

- Create it in `components/community/` to keep all community-specific UI co-located.
- Export a named type for its props.
- Add a unit test file under `__tests__/unit/`.

### Code style

- All community page components are `'use client'` — avoid async server components in this module until the API layer is integrated.
- Use Tailwind utility classes only — no inline `style` attributes.
- Follow the existing `aria-label` and `role` patterns for accessibility.
- Never `console.log` in application code. Analytics logging happens only inside `sendToAnalytics` and only in `NODE_ENV === 'development'`.

### Branch naming

```
feat/community-<description>    New features
fix/community-<description>     Bug fixes
test/community-<description>    Test-only changes
docs/community-<description>    Documentation-only changes
```
