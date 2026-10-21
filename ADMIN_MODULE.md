# Admin Module Documentation

## Overview

The Admin module provides administrative functionality for SkillSync, including a dashboard for platform management and a moderation system for reviewing community reports. It includes role-based access control, content moderation tools, and report management capabilities.

## Routing

| Route | Description | Access Level |
|-------|-------------|--------------|
| `/admin` | Admin dashboard with overview | Admin only |
| `/admin/moderation` | Moderation dashboard for reviewing reports | Admin only |

**Route Structure:**
- The admin module uses Next.js route groups `(admin)` for shared layout and role-based protection
- All admin routes are wrapped with `RoleGuard` to enforce access control
- Non-admin users are automatically redirected to their appropriate dashboard

## Component Hierarchy

```
Admin Module
├── (admin) Route Group
│   ├── AdminLayout
│   │   └── RoleGuard (role="admin")
│   │       └── AdminDashboardPage
│   └── AdminLayout
│       └── RoleGuard (role="admin")
│           └── AdminDashboardPage
└── admin Route
    └── ModerationDashboard
        └── RoleGuard (role="admin")
            └── ModerationDashboardContent
                ├── Report Queue
                │   ├── Loading state
                │   ├── Empty state
                │   └── Report cards
                │       ├── Report metadata
                │       └── Action buttons (Dismiss, Warn User, Remove Content)
                └── Filter tabs (Pending, Reviewed, Resolved)

Related Components (used by admin functionality):
├── RoleGuard (Auth Provider)
├── DiscussionModeration (pin/lock discussions)
└── ReportDiscussionButton (user-facing reporting)
```

### Key Components

#### AdminLayout
- **Location**: `app/(admin)/layout.tsx`
- **Purpose**: Wraps all admin pages with role-based access control
- **Features**: 
  - Applies `RoleGuard` with `role="admin"`
  - Provides consistent admin layout styling
  - Redirects unauthorized users to their appropriate dashboard

#### AdminDashboardPage
- **Location**: `app/(admin)/admin/page.tsx`
- **Purpose**: Basic admin dashboard placeholder
- **Current State**: Minimal implementation with welcome message
- **Future Enhancement**: Should display platform statistics, user counts, activity metrics

#### ModerationDashboard
- **Location**: `app/admin/moderation/page.tsx`
- **Purpose**: Central hub for reviewing and managing community reports
- **Features**:
  - Report filtering by status (pending, reviewed, resolved)
  - Pending count alert banner
  - Real-time report queue with action buttons
  - Error handling and loading states
  - Optimistic UI updates for report resolution

#### ReportQueue
- **Location**: `components/community/ReportQueue.tsx`
- **Purpose**: Displays list of reports with moderation actions
- **Features**:
  - Loading spinner during data fetch
  - Empty state when no reports exist
  - Report cards with metadata (ID, reason, dates, status)
  - Action buttons for pending reports (Dismiss, Warn User, Remove Content)
  - Status badges with color coding (amber for pending, blue for reviewed, green for resolved)

#### RoleGuard
- **Location**: `components/auth/AuthProvider.tsx`
- **Purpose**: Protects routes based on user role
- **Features**:
  - Redirects unauthenticated users to `/login`
  - Redirects authenticated users with wrong role to their dashboard
  - Renders children only when user has correct role
  - Uses `getDashboardPath()` for role-based routing

#### DiscussionModeration
- **Location**: `components/community/DiscussionModeration.tsx`
- **Purpose**: Provides pin/lock controls for discussions
- **Features**:
  - Pin/unpin discussions (highlights important content)
  - Lock/unlock discussions (prevents new replies)
  - Moderator-only visibility
  - Error handling and loading states

#### ReportDiscussionButton
- **Location**: `components/community/ReportDiscussionButton.tsx`
- **Purpose**: User-facing component for reporting inappropriate content
- **Features**:
  - Modal dialog with report reason selection
  - Validated report reasons (spam, harassment, offensive_content, misinformation, other)
  - Success confirmation state
  - Keyboard support (Escape to close)
  - Accessibility features (ARIA labels, focus management)

## API Endpoints

### Reports

#### GET /api/community/reports
- **Purpose**: List all community reports
- **Access**: Admin only (enforced via role check in middleware/component)
- **Response**:
  ```json
  {
    "reports": [
      {
        "id": "report-123",
        "discussionId": "discussion-456",
        "reporterId": "user-789",
        "reason": "spam",
        "status": "pending",
        "createdAt": "2024-01-15T10:30:00Z",
        "resolvedAt": null,
        "resolvedBy": null,
        "resolution": null
      }
    ],
    "pendingCount": 5
  }
  ```
- **Used by**: ModerationDashboard

#### POST /api/community/reports
- **Purpose**: Create a new report
- **Access**: Any authenticated user
- **Request Body**:
  ```json
  {
    "discussionId": "discussion-456",
    "reason": "spam"
  }
  ```
- **Valid Reasons**: `spam`, `harassment`, `offensive_content`, `misinformation`, `other`
- **Response**: Created report object (201)
- **Errors**:
  - 400: Missing discussionId or reason
  - 400: Invalid report reason
  - 404: Discussion not found
- **Used by**: ReportDiscussionButton via `communityApi.reportDiscussion()`

#### POST /api/community/reports/[id]/resolve
- **Purpose**: Resolve a report with moderation action
- **Access**: Admin only
- **Request Body**:
  ```json
  {
    "action": "dismiss" | "remove_content" | "warn_user"
  }
  ```
- **Response**: Updated report object
- **Errors**:
  - 400: Invalid action
  - 404: Report not found
- **Used by**: ModerationDashboard

### Discussion Moderation

#### PATCH /api/community/discussions/[id]/pin
- **Purpose**: Pin or unpin a discussion
- **Access**: Admin/Moderator only
- **Request Body**:
  ```json
  {
    "isPinned": true
  }
  ```
- **Used by**: DiscussionModeration component

#### PATCH /api/community/discussions/[id]/lock
- **Purpose**: Lock or unlock a discussion
- **Access**: Admin/Moderator only
- **Request Body**:
  ```json
  {
    "isLocked": true
  }
  ```
- **Used by**: DiscussionModeration component

## State Management

### Authentication State
- **Provider**: `AuthProvider` (components/auth/AuthProvider.tsx)
- **Storage**: LocalStorage key `skillsync-user`
- **Hooks**:
  - `useAuth()` - Requires auth context (throws if missing)
  - `useOptionalAuth()` - Optional auth context (returns null if missing)
- **User Shape**:
  ```typescript
  interface AuthUser {
    id?: string;
    name?: string;
    email?: string;
    role: UserRole; // "mentor" | "mentee" | "admin"
  }
  ```

### Report State
- **Storage**: In-memory store in `lib/community-store.ts`
- **Functions**:
  - `createReport({ discussionId, reporterId, reason })` - Creates a new report
  - `listReports()` - Returns all reports sorted by creation date (newest first)
  - `getReport(id)` - Get single report by ID
  - `resolveReport(id, action, resolvedBy)` - Marks report as resolved
- **Report Type**:
  ```typescript
  interface Report {
    id: string;
    discussionId: string;
    reporterId: string;
    reason: ReportReason;
    status: "pending" | "reviewed" | "resolved";
    createdAt: string;
    resolvedAt?: string;
    resolvedBy?: string;
    resolution?: "dismiss" | "remove_content" | "warn_user";
  }
  ```

### Component State (ModerationDashboard)
- **Local State**:
  - `reports` - Array of fetched reports
  - `isLoading` - Loading state for fetch operations
  - `error` - Error message for failed operations
  - `filter` - Current status filter ("pending" | "reviewed" | "resolved")
- **Optimistic Updates**: Report resolution updates local state immediately before API confirmation

### Data Flow
1. User reports content → POST to `/api/community/reports` → `createReport()` in store
2. Admin views moderation dashboard → GET `/api/community/reports` → `listReports()` from store
3. Admin resolves report → POST to `/api/community/reports/[id]/resolve` → `resolveReport()` in store
4. Optimistic UI update → Component updates local state → API confirms

## Permissions

### Role Definition
```typescript
type UserRole = "mentor" | "mentee" | "admin";
```

### Role-Based Access Control

| Role | Dashboard Route | Admin Access | Moderation Capabilities |
|------|-----------------|--------------|-------------------------|
| Admin | `/admin` | Full access | All moderation actions |
| Mentor | `/mentor` | None | None |
| Mentee | `/mentee` | None | None |

### RoleGuard Implementation
The `RoleGuard` component enforces access control:
1. Checks if user is authenticated
2. Redirects to `/login` if not authenticated
3. Checks if user has required role
4. Redirects to appropriate dashboard if role mismatch
5. Renders children only when all checks pass

### Permission Enforcement Levels
- **Route Level**: `RoleGuard` wraps entire route groups
- **Component Level**: `DiscussionModeration` checks `isModerator` prop
- **API Level**: Backend should validate role (currently relies on client-side checks in mock implementation)

### Viewer Identification
- **Method**: `resolveViewerId(request)` in `lib/community-store.ts`
- **Sources** (in order of priority):
  1. `x-user-id` request header (set by `communityApi`)
  2. `skillsync-user-id` cookie
  3. Shared demo viewer ID (for development)

## Moderation Workflow

### 1. Report Submission
1. User clicks "Report" button on a discussion
2. `ReportDiscussionButton` opens modal with reason selection
3. User selects reason and submits
4. `communityApi.reportDiscussion()` calls POST `/api/community/reports`
5. `createReport()` validates and stores report with `status: "pending"`
6. Success confirmation shown to user

### 2. Report Review
1. Admin navigates to `/admin/moderation`
2. `ModerationDashboard` fetches reports via GET `/api/community/reports`
3. Reports displayed in `ReportQueue` with status badges
4. Pending count alert shows urgency
5. Admin can filter by status (pending, reviewed, resolved)

### 3. Report Resolution
Admin has three resolution options:

#### Dismiss
- **Action**: `dismiss`
- **Use Case**: Report is invalid or content is acceptable
- **Effect**: Report marked as resolved, no action taken on content
- **User Impact**: None

#### Warn User
- **Action**: `warn_user`
- **Use Case**: Content violates guidelines but doesn't require removal
- **Effect**: Report marked as resolved, user receives warning
- **User Impact**: Warning recorded against user account
- **Future Enhancement**: Should implement warning tracking and escalation

#### Remove Content
- **Action**: `remove_content`
- **Use Case**: Content violates community guidelines severely
- **Effect**: Report marked as resolved, content removed from platform
- **User Impact**: Discussion deleted or hidden
- **Future Enhancement**: Should actually delete/hide the discussion

### 4. Resolution Logging
When a report is resolved:
- `status` changes to `"resolved"`
- `resolvedAt` set to current timestamp
- `resolvedBy` set to admin's user ID
- `resolution` set to action taken
- Report remains in system for audit trail

### 5. Status Transitions
```
pending → reviewed → resolved
         ↓
       resolved (direct)
```

## Testing Instructions

### Unit Tests

Currently, there are no specific unit tests for the admin module. Tests should be added following the patterns used in other modules:

```bash
# Example test structure (to be created)
npm test -- tests/unit/report-queue.test.tsx
npm test -- tests/unit/discussion-moderation.test.tsx
npm test -- tests/unit/role-guard.test.tsx
```

### Integration Tests

Test the full moderation workflow:

```bash
# Example test structure (to be created)
npm test -- tests/integration/moderation-workflow.test.tsx
```

**Test Scenarios:**
1. User submits a report
2. Admin views moderation dashboard
3. Admin filters reports by status
4. Admin resolves report with each action type
5. Optimistic UI updates correctly
6. Error handling for failed operations

### E2E Tests

Test the complete user journey:

```bash
# Example test structure (to be created)
npx playwright test tests/e2e/admin-moderation.spec.ts
```

**Test Scenarios:**
1. Login as admin, navigate to moderation dashboard
2. Verify pending reports display correctly
3. Resolve a report and verify status change
4. Login as regular user, verify access denied to admin routes
5. Report a discussion as a user, verify it appears in admin queue

### Manual Testing

**Test Admin Access:**
1. Login as admin user (`role: "admin"`)
2. Navigate to `/admin` - should see dashboard
3. Navigate to `/admin/moderation` - should see moderation dashboard
4. Verify role-based redirect works for non-admin users

**Test Report Submission:**
1. Login as regular user
2. Navigate to a discussion
3. Click "Report" button
4. Select a reason and submit
5. Verify success confirmation
6. Login as admin and verify report appears in queue

**Test Moderation Actions:**
1. Login as admin
2. Navigate to `/admin/moderation`
3. Click "Dismiss" on a pending report
4. Verify report moves to resolved status
5. Test "Warn User" and "Remove Content" actions
6. Verify filter tabs work correctly

**Test Discussion Moderation:**
1. Login as admin
2. Navigate to a discussion
3. Verify "Pin" and "Lock" buttons are visible
4. Pin a discussion and verify visual state change
5. Lock a discussion and verify state change
6. Login as regular user and verify buttons are hidden

## Architecture Notes

### Current Limitations
1. **No Backend Persistence**: Reports stored in-memory only (lost on server restart)
2. **No Role Enforcement at API Level**: Backend validation not implemented in mock
3. **No Warning System**: "Warn User" action doesn't actually warn users
4. **No Content Removal**: "Remove Content" action doesn't delete discussions
5. **Minimal Admin Dashboard**: `/admin` route is just a placeholder

### Recommended Enhancements
1. **Database Integration**: Persist reports, warnings, and moderation history
2. **API Middleware**: Add role validation middleware to all admin endpoints
3. **Warning System**: Implement user warning tracking and escalation
4. **Content Deletion**: Integrate with discussion deletion API
5. **Admin Dashboard**: Add platform statistics, user management, activity logs
6. **Audit Trail**: Comprehensive logging of all moderation actions
7. **Notification System**: Notify users of warnings and content removals
8. **Bulk Actions**: Allow resolving multiple reports at once
9. **Report Appeals**: Allow users to appeal moderation decisions
10. **Analytics**: Track moderation metrics (resolution time, action distribution)

### Dependencies
- **Next.js 15.3.4**: App router and route groups
- **React 19**: Component state and hooks
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling with CSS variables for theming

### Key Files
- `app/(admin)/layout.tsx` - Admin layout with role guard
- `app/(admin)/admin/page.tsx` - Admin dashboard page
- `app/admin/moderation/page.tsx` - Moderation dashboard
- `components/auth/AuthProvider.tsx` - Auth context and RoleGuard
- `components/community/ReportQueue.tsx` - Report list component
- `components/community/DiscussionModeration.tsx` - Pin/lock controls
- `components/community/ReportDiscussionButton.tsx` - User reporting UI
- `lib/auth.ts` - Auth types and utilities
- `lib/community-store.ts` - Report storage and management
- `lib/community-api.ts` - API client for report operations
- `lib/community-types.ts` - TypeScript type definitions

## Accessibility

The admin module follows accessibility best practices:
- **ARIA Roles**: `role="alert"` for error messages, `role="dialog"` for modals
- **ARIA Labels**: Descriptive labels for all interactive elements
- **Keyboard Navigation**: Tab focus management, Escape key to close modals
- **Focus Management**: Focus trap in modals, focus restoration on close
- **Screen Reader Support**: `sr-only` labels for form controls
- **Color Coding**: Status badges use color + text for clarity
- **Error States**: Clear error messages with role="alert"

## Security Considerations

### Current Implementation
- Role checks are client-side in `RoleGuard` component
- API endpoints rely on client-provided user ID
- No server-side role validation in mock implementation

### Production Requirements
1. **Server-Side Role Validation**: All admin endpoints must verify user role
2. **Authentication Tokens**: Use secure tokens instead of localStorage
3. **CSRF Protection**: Implement CSRF tokens for state-changing operations
4. **Rate Limiting**: Prevent abuse of report submission
5. **Audit Logging**: Log all moderation actions with timestamps and admin IDs
6. **Input Validation**: Strict validation on all report reasons and actions
7. **Authorization Headers**: Use proper authorization headers instead of custom headers

## Related Documentation
- [Community Module Documentation](./COMMUNITY_MODULE.md) - Related moderation features
- [Authentication System](./lib/auth.ts) - Role definitions and auth utilities
- [Community Store](./lib/community-store.ts) - Report storage implementation
