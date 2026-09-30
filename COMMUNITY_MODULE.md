# Community Module Documentation

## Overview

The Community module provides a discussion platform for SkillSync users to connect, share knowledge, and learn from each other. It includes real-time updates, moderation tools, notifications, and analytics tracking.

## Routing

| Route | Description |
|-------|-------------|
| `/community` | Main community feed with discussions |
| `/community/[category]` | Category-filtered discussions |
| `/community/[category]/[id]` | Individual discussion detail |
| `/community/saved` | Discussions bookmarked by the signed-in user (#1013) |
| `/admin/moderation` | Moderation dashboard (moderators only) |

## Component Hierarchy

```
CommunityPage
├── CommunityHeroBanner
│   └── Start Discussion CTA (opens StartDiscussionModal)  #1001
├── DiscussionFilters
│   ├── Category tabs
│   ├── Sort dropdown
│   └── Search input
├── CommunityFeed
│   ├── DiscussionListSkeleton (initial load)      #997
│   ├── CommunityErrorState (message + retry)     #999
│   ├── CommunityEmptyState (icon + message + CTA) #998
│   ├── DiscussionCard (or MemoizedDiscussionCard)
│   │   ├── DiscussionCategoryBadge                #984
│   │   ├── TrendingBadgeForDiscussion             #985
│   │   ├── DiscussionActions
│   │   │   ├── FollowButton (follow author)      #1015
│   │   │   ├── Bookmark toggle                   #1013
│   │   │   └── ShareDiscussionButton (copy/native share) #1016
│   │   └── DiscussionModeration (moderator only)
│   └── Infinite scroll trigger
├── CommunitySidebar
│   ├── Category list with FollowButton per category #1014
│   └── Community guidelines
├── StartDiscussionModal                            #1001, #1004
│   └── RichTextEditor
├── CommunityToast (success notification)           #1004
└── NotificationDropdown
    └── Notification list
```

## Discussion creation (#998, #999, #1001, #1004)

The composer flow is owned by `CommunityPage`, which holds a single
`isComposerOpen` flag so both the hero banner CTA and the empty state CTA open
the same modal:

1. **Empty state** (`CommunityEmptyState`, #998) — icon, message and a *Start
   Discussion* call to action, shown when the feed has no discussions. A
   filtered variant (`No discussions found`) is used when filters return no
   matches.
2. **Error state** (`CommunityErrorState`, #999) — rendered as `role="alert"`
   with the failure message and a retry action that re-issues the feed request
   with the current filters.
3. **Composer** (`StartDiscussionModal`, #1001) — title, category, rich-text
   content, free-form tags and an attachments placeholder. Supports Publish,
   Cancel, a close button, Escape, backdrop click, a focus trap and focus
   restoration. The dialog is a bottom sheet on mobile and centred on desktop.
4. **Backend submission** (#1004) — `communityApi.createDiscussion` posts to
   `POST /api/community/discussions` while the modal shows a loading state and
   blocks closing. Failures render inline and keep the draft; success closes
   the modal, prepends the created discussion to the feed, resets infinite
   scroll, announces a `CommunityToast` confirmation and tracks a
   `discussion_created` analytics event.

The API client attaches the signed-in user's id (`x-user-id`) and display name
to the request, so the composer does not need to wire up auth itself.

## API Endpoints

### Discussions

- `GET /api/community/discussions` - List discussions (supports pagination, filtering, sorting)
- `POST /api/community/discussions` - Create a new discussion (#1004; used by the Start Discussion composer)
- `PATCH /api/community/discussions/[id]/pin` - Pin/unpin a discussion
- `PATCH /api/community/discussions/[id]/lock` - Lock/unlock a discussion
- `POST /api/community/discussions/[id]/share` - Record a share, returns the canonical URL and share count (#1016)

### Bookmarks (#1013)

- `GET /api/community/discussions/saved` - Discussions bookmarked by the viewer, newest first
- `GET /api/community/discussions/[id]/bookmark` - Current bookmark state
- `POST /api/community/discussions/[id]/bookmark` - Bookmark a discussion
- `DELETE /api/community/discussions/[id]/bookmark` - Remove a bookmark

### User follows (#1015)

- `GET /api/community/users/following` - Members the viewer follows
- `GET /api/community/users/[id]/follow` - Current follow state for one member
- `POST /api/community/users/[id]/follow` - Follow a member
- `DELETE /api/community/users/[id]/follow` - Unfollow a member

### Category follows (#1014)

- `GET /api/community/categories/following` - Followed category ids in display order
- `GET /api/community/categories/[id]/follow` - Current follow state for one category
- `POST /api/community/categories/[id]/follow` - Follow a category
- `DELETE /api/community/categories/[id]/follow` - Unfollow a category

All social endpoints scope their state to the viewer, resolved from the
`x-user-id` request header (sent by `lib/community-api.ts`), the
`skillsync-user-id` cookie, or the shared demo viewer.

### Overview (#990, #996)

- `GET /api/community/overview` - Sidebar payload: community statistics plus the events list

### Notifications

- `GET /api/community/notifications` - Get user notifications
- `PATCH /api/community/notifications` - Mark notifications as read

### Reports

- `GET /api/community/reports` - List reports (moderators only)
- `POST /api/community/reports/[id]/resolve` - Resolve a report

### Analytics

- `POST /api/community/analytics` - Track community engagement events

### Real-Time

- `GET /api/community/events` - Server-Sent Events stream for real-time updates

## State Management

Shared feed state lives in `CommunityProvider` (#996) and is read with the
`useCommunity` hook, so the page, the feed and the sidebar do not thread
props between them:

- `CommunityProvider` / `useCommunity` - Discussions, categories, events,
  statistics, filters, sorting, loading and error state. Owns the feed fetch
  (`GET /api/community/discussions`, #995) and the sidebar overview
  (`GET /api/community/overview`).

Focused hooks cover the rest:

- `useCommunityRealtime` - Manages SSE connection and real-time updates
- `useInfiniteScroll` - Handles infinite scroll with IntersectionObserver
- `useDiscussionBookmark` - Bookmark state for a discussion (#1013)
- `useUserFollow` - Follow state for a community member (#1015)
- `useCategoryFollows` - Followed categories for the sidebar (#1014)

Server-side social state (bookmarks, follows, share counts) lives in
`lib/community-store.ts`, so it stays consistent between the feed, the saved
page and the sidebar. The store also derives the community statistics and owns
the event seed used by the sidebar (#989, #990).

Local component state is used for:
- Notification read status
- Moderation actions

## Permissions

| Role | Permissions |
|------|-------------|
| User | View discussions, create discussions, like, reply, bookmark, share, follow members, follow categories |
| Moderator | All user permissions + pin, lock, resolve reports |
| Admin | All moderator permissions + access moderation dashboard |

## Moderation Workflow

1. Users report inappropriate content
2. Reports appear in the moderation dashboard
3. Moderators review reports and take action:
   - **Dismiss**: Report is invalid, no action taken
   - **Warn User**: User receives a warning
   - **Remove Content**: Content is removed from the platform
4. Resolved reports are logged with timestamp and moderator ID

## Analytics Events

| Event | Description | Trigger |
|-------|-------------|---------|
| `discussion_created` | New discussion posted | User creates discussion |
| `discussion_viewed` | Discussion viewed | User opens discussion |
| `discussion_liked` | Discussion liked | User likes discussion |
| `discussion_replied` | Reply posted | User replies to discussion |
| `discussion_shared` | Discussion shared | User shares discussion |
| `discussion_bookmarked` | Discussion bookmarked | User bookmarks discussion |
| `event_registered` | Event registration | User registers for event |

## Testing Instructions

### Unit Tests
```bash
npm test -- tests/unit/discussion-card.test.tsx
npm test -- tests/unit/community-event-card.test.tsx
npm test -- tests/unit/community-statistics-widget.test.tsx
```

### Integration Tests
```bash
npm test -- tests/integration/community-workflows.test.tsx
npm test -- tests/integration/discussion-creation-flow.test.tsx
```

### E2E Tests
```bash
npx playwright test tests/e2e/community.spec.ts
```

## Performance Optimizations

- **Lazy loading**: Discussion list uses `React.memo` to prevent unnecessary re-renders
- **Image optimization**: `OptimizedImage` component with lazy loading and error handling
- **Infinite scroll**: Efficient pagination with IntersectionObserver
- **Analytics batching**: Events are queued and sent in batches to reduce network requests
- **SSE connection**: Single connection for all real-time updates with automatic reconnection

## Accessibility

- Semantic HTML with proper heading hierarchy
- ARIA labels and roles for interactive elements
- Keyboard navigation support with visible focus states
- Screen reader announcements for dynamic content
- Reduced motion support for animations
