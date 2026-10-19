# Community Module Documentation

## Overview

The Community module provides a discussion platform for SkillSync users to connect, share knowledge, and learn from each other. It includes real-time updates, moderation tools, notifications, and analytics tracking.

## Routing

| Route | Description |
|-------|-------------|
| `/community` | Main community feed with discussions |
| `/community/[category]` | Category-filtered discussions |
| `/community/[category]/[id]` | Individual discussion detail |
| `/admin/moderation` | Moderation dashboard (moderators only) |

## Component Hierarchy

```
CommunityPage
├── DiscussionFilters
│   ├── Category tabs
│   ├── Sort dropdown
│   └── Search input
├── CommunityFeed
│   ├── DiscussionCard (or MemoizedDiscussionCard)
│   │   └── DiscussionModeration (moderator only)
│   └── Infinite scroll trigger
├── CommunitySidebar
│   ├── Category list
│   └── Community guidelines
└── NotificationDropdown
    └── Notification list
```

## API Endpoints

### Discussions

- `GET /api/community/discussions` - List discussions (supports pagination, filtering, sorting)
- `POST /api/community/discussions` - Create a new discussion
- `PATCH /api/community/discussions/[id]/pin` - Pin/unpin a discussion
- `PATCH /api/community/discussions/[id]/lock` - Lock/unlock a discussion

### Categories & Events

- `GET /api/community/categories` - List categories with discussion counts
- `GET /api/community/events/upcoming` - List upcoming community events

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

Community state is centralized in a React Context store (`lib/community-store.tsx`).
`CommunityProvider` owns the shared state and exposes it through hooks, so
components read and update it directly instead of passing props down the tree:

- `useCommunityState` - Discussions, categories, events, filters, sorting,
  loading, errors, and the infinite-scroll sentinel ref
- `useCommunityActions` - Set category/search/sort, refetch, and load more
- `useCommunity` - Convenience hook returning both

`CommunityProvider` also wires `useCommunityRealtime` (SSE updates) and
`useInfiniteScroll` (IntersectionObserver pagination) into the shared state.
Local component state remains for ephemeral UI only (e.g. the debounced
search input, notification read status, and moderation actions).

## Permissions

| Role | Permissions |
|------|-------------|
| User | View discussions, create discussions, like, reply, bookmark |
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
```

### Integration Tests
```bash
npm test -- tests/integration/community-workflows.test.tsx
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
