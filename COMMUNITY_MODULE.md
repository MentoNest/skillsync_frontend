# Community Module

The Community module provides discussion features for the SkillSync platform, including sharing, pinning, locking, and notifications.

## Components

### ShareButton (`components/common/ShareButton.tsx`)

A reusable share button that supports both the native Web Share API and clipboard fallback.

```tsx
<ShareButton
  url="/discussions/1"
  title="Discussion Title"
  text="Optional description"
/>
```

**Behavior:**
- Uses `navigator.share()` when available (mobile devices, supported browsers)
- Falls back to `navigator.clipboard.writeText()` on unsupported browsers
- Shows visual feedback: "Copied!", "Shared!", or "Failed"
- Falls back to clipboard if user cancels the native share dialog

---

### PinButton (`components/discussions/PinButton.tsx`)

Toggle button to pin/unpin a discussion to the top of the feed.

```tsx
<PinButton isPinned={isPinned} onToggle={handleToggle} />
```

**Features:**
- Visual state change (amber highlight when pinned)
- Accessible: `aria-pressed` reflects state
- Tooltip changes between "Pin discussion" / "Unpin discussion"

---

### LockButton (`components/discussions/LockButton.tsx`)

Toggle button to lock/unlock a discussion, preventing new replies.

```tsx
<LockButton isLocked={isLocked} onToggle={handleToggle} />
```

**Features:**
- Visual state change (red highlight when locked)
- When locked, reply forms are disabled and a lock message is shown
- Accessible: `aria-pressed` reflects state

---

### NotificationBell (`components/common/NotificationBell.tsx`)

A bell icon button that displays unread notification count and a dropdown panel.

```tsx
<NotificationBell />
```

**Features:**
- Unread count badge
- Dropdown panel with notification list
- "Mark all read" action
- Individual dismiss and mark-read actions
- Closes on outside click

---

### NotificationToast (`components/common/NotificationToast.tsx`)

Auto-dismissing toast notifications that appear in the bottom-right corner.

**Features:**
- Auto-dismiss after 5 seconds
- Color-coded by type (info/success/warning/error)
- Dismiss button on each toast
- Shows up to 5 toasts simultaneously

---

### DiscussionCard (`components/community/DiscussionCard.tsx`)

Card component displaying a single discussion with actions.

**Features:**
- Displays title, excerpt, author, and replies count
- Shows "Pinned" and "Locked" badges when applicable
- Includes Share button and Like button

---

### DiscussionThread (`components/discussions/DiscussionThread.tsx`)

Full thread view for a discussion with replies, voting, and moderation controls.

**Features:**
- Pin/Lock toggle buttons with notification feedback
- Reply form that disables when discussion is locked
- Nested reply tree with collapse/expand
- Reply button hidden on individual replies when locked

## State Management

### Notification Context (`lib/notificationContext.tsx`)

Global notification state using React Context + useReducer.

```tsx
const { notify, markRead, markAllRead, dismiss, notifications, unreadCount } = useNotifications();

// Add a notification
notify("success", "Reply posted", "Your reply has been added.");
notify("warning", "Discussion locked", undefined, 8000); // custom duration

// Mark as read
markRead(notificationId);

// Mark all as read
markAllRead();

// Dismiss a notification
dismiss(notificationId);
```

### Community Context (`lib/communityContext.tsx`)

Community state management with categories, search, and sort. Discussion model now includes `isPinned` and `isLocked` fields.

## API Routes

### `GET /api/community/discussions`

Returns paginated discussions with optional category filter.

**Query params:** `page`, `pageSize`, `category`

### `POST /api/community/discussions/[id]/like`

Toggles like state for a discussion.

### `PATCH /api/community/discussions/[id]/pin-lock`

Updates pin/lock status for a discussion.

**Body:** `{ isPinned?: boolean, isLocked?: boolean }`

## Notification Types

| Type | Color | Icon | Use Case |
|------|-------|------|----------|
| `info` | Indigo | Info circle | General information |
| `success` | Green | Check circle | Successful actions |
| `warning` | Amber | Warning triangle | Important notices |
| `error` | Red | X circle | Errors and failures |

## Accessibility

- All buttons have descriptive `aria-label` attributes
- Toggle buttons use `aria-pressed` to communicate state
- Notification dropdown is keyboard-navigable
- Toast notifications use `role="alert"` for screen readers
- Color is never the sole indicator of state (icons + text accompany colors)
