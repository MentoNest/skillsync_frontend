# Community Module

Documentation for the SkillSync Community feature, covering architecture, routing, state management, API integration, and contribution guidelines.

---

## Table of Contents

1. [Overview](#overview)
2. [Component Hierarchy](#component-hierarchy)
3. [Routing Structure](#routing-structure)
4. [State Management](#state-management)
5. [API Integration Points](#api-integration-points)
6. [Pin & Lock Features](#pin--lock-features)
7. [Testing](#testing)
8. [Contribution Guidelines](#contribution-guidelines)

---

## Overview

The Community module lets mentors and mentees connect through threaded discussions. Key features:

- Browse and search discussions with category/sort filters
- Create new discussions with tags
- Comment and reply on discussions
- Like and bookmark discussions
- Pinned discussions (moderator-only) float to the top of the feed
- Locked discussions (moderator-only) prevent new replies and disable interactions

---

## Component Hierarchy

```
app/(dashboard)/community/
├── layout.tsx                    — wraps the module in CommunityProvider
├── community-context.tsx         — global state (discussions, filters, pin/lock actions)
├── page.tsx                      — main community listing page
└── [id]/
    └── page.tsx                  — discussion detail + comments + moderator controls

components/community/
├── DiscussionFeed.tsx            — renders a paginated list of DiscussionCards
├── DiscussionCard.tsx            — single card with pin/lock badges and metadata
├── DiscussionMetadata.tsx        — like, bookmark, view count, timeAgo display
├── FilterBar.tsx                 — search input + sort select + category filter + clear
├── CategoryFilter.tsx            — category pill buttons
├── CommunityTabs.tsx             — Discussions / Events / Members / Resources tabs
├── StartDiscussion.tsx           — "Start Discussion" button that opens the modal
├── StartDiscussionModal.tsx      — modal form (title, category, content, tags)
├── CreateDiscussionForm.tsx      — inline form alternative to the modal
└── InfiniteScrollWrapper.tsx     — thin wrapper around react-infinite-scroll-component
```

### Key component props

**DiscussionCard**
| Prop | Type | Description |
|------|------|-------------|
| `discussion` | `DiscussionMetadata` | Discussion data including `isPinned`, `isLocked` |
| `onLike` | `(id: string) => void` | Called when like button is clicked (no-op when locked) |
| `onBookmark` | `(id: string) => void` | Called when bookmark button is clicked (no-op when locked) |
| `onClick` | `(id: string) => void` | Called when the card is clicked/Enter-pressed |

**DiscussionMetadata**
| Prop | Type | Description |
|------|------|-------------|
| `metadata` | `DiscussionMetadata` | Source data |
| `onLike` | `(id: string) => void` | Like handler |
| `onBookmark` | `(id: string) => void` | Bookmark handler |
| `disableInteractions` | `boolean` | Disables like and bookmark buttons (used for locked discussions) |

**DiscussionFeed**
| Prop | Type | Description |
|------|------|-------------|
| `discussions` | `DiscussionMetadata[]` | Pre-sorted/filtered list to render |
| `onLike` | `(id: string) => void` | Forwarded to each card |
| `onBookmark` | `(id: string) => void` | Forwarded to each card |
| `onDiscussionClick` | `(id: string) => void` | Forwarded to each card |

---

## Routing Structure

| Route | Component | Description |
|-------|-----------|-------------|
| `/community` | `app/(dashboard)/community/page.tsx` | Discussion feed + sidebar |
| `/community/[id]` | `app/(dashboard)/community/[id]/page.tsx` | Discussion detail + comments |

Both routes are nested inside `app/(dashboard)/layout.tsx`, which wraps the page in the shared dashboard shell (navigation, etc.).

The community layout at `app/(dashboard)/community/layout.tsx` wraps its children in `CommunityProvider` so all nested pages share the same state.

---

## State Management

State lives in `CommunityContext` (`community-context.tsx`) using `useReducer`.

### Shape

```ts
interface CommunityState {
  discussions: Discussion[];   // includes isPinned, isLocked
  categories: Category[];
  filters: {
    sortBy: DiscussionSort;    // 'trending' | 'latest' | 'most-replies' | 'most-liked'
    category: string | null;
    searchQuery: string;
  };
  loading: boolean;
  error: string | null;
  recommended: Discussion[];
  statistics: { totalMembers, activeDiscussions, totalDiscussions, eventsThisMonth };
}
```

### Available actions (via context methods)

| Method | Purpose |
|--------|---------|
| `setSortBy(sort)` | Change sort order |
| `setCategoryFilter(category)` | Filter by category; `null` = all |
| `setSearchQuery(query)` | Text search filter |
| `addDiscussion(discussion)` | Prepend a new discussion |
| `updateDiscussionLikes(id, likes)` | Update like count |
| `updateDiscussionReplies(id, replies)` | Update reply count |
| `togglePin(id)` | Toggle `isPinned` on a discussion |
| `toggleLock(id)` | Toggle `isLocked` on a discussion |
| `getFilteredDiscussions()` | Returns discussions with filters, sort, and pinned-first ordering applied |

### Pinned-first ordering

`getFilteredDiscussions()` applies category, search, and sort filters first, then does a stable secondary sort that moves all `isPinned === true` discussions to the top. This means the primary sort order is preserved within the pinned and unpinned groups.

---

## API Integration Points

API calls are in `lib/community-service.ts`. All methods use a shared `request<T>()` helper that reads `NEXT_PUBLIC_API_URL` from environment variables.

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `likeDiscussion(id)` | POST | `/api/community/discussions/:id/like` | Like a discussion |
| `unlikeDiscussion(id)` | DELETE | `/api/community/discussions/:id/like` | Remove a like |
| `bookmarkDiscussion(id)` | POST | `/api/community/discussions/:id/bookmark` | Bookmark a discussion |
| `removeBookmark(id)` | DELETE | `/api/community/discussions/:id/bookmark` | Remove a bookmark |
| `fetchDiscussions(params)` | GET | `/api/community/discussions` | Paginated discussion list |

### Next.js API route (mock)

`app/api/discussions/` contains the local API route used during development. The community page currently populates state from `CommunityContext`'s initial mock data, not from this route.

### Realtime events

`lib/realtime-discussion.ts` exports `createRealtimeConnection(url, onEvent)` which opens a WebSocket and emits typed `RealtimeEvent` objects. Event types:

- `discussion:new` — a new discussion was created
- `discussion:update` — a discussion was edited
- `discussion:delete` — a discussion was deleted
- `like` — a like was added
- `comment:new` — a new comment was posted

The connection auto-reconnects on close (3-second delay). The returned function tears the connection down.

---

## Pin & Lock Features

### Pinned discussions

- `isPinned: boolean` on `DiscussionMetadata` / `Discussion`
- Pinned cards display a cyan **Pinned** badge and a left cyan border
- `getFilteredDiscussions()` always sorts pinned items before unpinned items
- Moderators see **Pin / Unpin** toggle buttons on the discussion detail page (`data-testid="pin-toggle-button"`)

### Locked discussions

- `isLocked: boolean` on `DiscussionMetadata` / `Discussion`
- Locked cards display an amber **Locked** badge and a notice: "This discussion is locked — no new replies."
- Like and bookmark buttons are `disabled` and callbacks are suppressed
- On the detail page, the comment textarea is hidden and replaced with a locked notice (`data-testid="locked-comment-notice"`)
- Moderators see **Lock / Unlock** toggle buttons (`data-testid="lock-toggle-button"`)

### Moderator role

`CURRENT_USER_IS_MODERATOR` in `app/(dashboard)/community/[id]/page.tsx` controls whether the pin/lock controls are shown. In production this should come from an auth context (e.g. the current user's role from a JWT claim or session).

---

## Testing

Tests live in `__tests__/community/` and use **Jest 30** + **React Testing Library**.

### Setup

```bash
npm test              # run all tests once
npm run test:watch    # watch mode
npm run test:coverage # with coverage report
```

Configuration: `jest.config.ts` (uses `next/jest.js`), setup file: `jest.setup.ts`.

### Test files

| File | Type | What it covers |
|------|------|---------------|
| `DiscussionCard.test.tsx` | Unit | Rendering, pin badge, lock badge, aria-labels, click/keydown |
| `DiscussionMetadata.test.tsx` | Unit | Stats display, like/bookmark callbacks, `disableInteractions`, `timeAgo` |
| `CommunityTabs.test.tsx` | Unit | Rendering, `aria-current`, count badges, tab switching |
| `FilterBar.test.tsx` | Unit | Search input, sort select, clear-filters button |
| `DiscussionFeed.test.tsx` | Integration | Empty state, pagination, load-more, like/bookmark/click callbacks |
| `PinLock.test.tsx` | Integration | Pin/lock visual output across DiscussionCard and DiscussionFeed |

### Writing new tests

1. Place test files in `__tests__/community/` or alongside the component as `ComponentName.test.tsx`.
2. Mock `@/components/Avatar` and `@/components/CategoryBadge` when testing community components — they're not under test and add noise.
3. When a component renders both an `<article role="button">` and `<button>` elements, use `getByRole('button', { name: /discussion:/i })` to target the card specifically (the card's `aria-label` always starts with `"Discussion: "`).
4. Use `data-testid` attributes (`pin-badge`, `lock-badge`, `locked-notice`, `moderator-controls`, etc.) for structural assertions.

---

## Contribution Guidelines

### Adding a new community component

1. Create the component in `components/community/`.
2. Export only named types from `lib/community-types.ts` — don't add business logic there.
3. If the component needs global state, add it to `CommunityContext` via a new action type and reducer case.
4. Write unit tests covering the happy path, edge cases (empty/undefined props), and accessibility attributes.

### Modifying state shape

1. Update the `Discussion` or `DiscussionMetadata` interface in `lib/community-types.ts` and `community-context.tsx`.
2. Add a new `Action` union member and handle it in `communityReducer`.
3. Expose a new method on `CommunityContextType` and implement it in the provider.
4. Update any mock data in `[id]/page.tsx` that uses the affected type.

### Adding a moderator action

1. Add the relevant toggle to `CommunityContext` (see `TOGGLE_PIN` / `TOGGLE_LOCK` as examples).
2. Add the UI control to the detail page guarded by the moderator check.
3. Add integration tests in `PinLock.test.tsx` covering the visual output and callback suppression.
4. When the real backend is available, wire the action to a `communityService` method.

### Coding standards

- Use TypeScript strict mode; no `any`.
- Keep components pure/functional — side effects belong in event handlers or `useEffect`.
- Tailwind only — no inline styles.
- All interactive elements must have an `aria-label` when the label isn't evident from content.
- Disabled buttons must use the `disabled` HTML attribute (not just visual styling) so assistive technology and tests can detect the state.
