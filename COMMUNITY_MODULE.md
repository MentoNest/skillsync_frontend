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

The module uses React hooks for state management:

- `useCommunityRealtime` - Manages SSE connection and real-time updates
- `useInfiniteScroll` - Handles infinite scroll with IntersectionObserver

Local component state is used for:
- Discussion list and pagination
- Filter/search/sort state
- Notification read status
- Moderation actions

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
