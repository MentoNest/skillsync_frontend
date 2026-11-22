# Community Module

This guide describes the current Community frontend, its API integration, and functionality that is still a placeholder. It is intended for contributors working on the SkillSync frontend.

## Routing

| Route | File | Purpose |
| --- | --- | --- |
| `/community` | `app/(public)/community/page.tsx` | Public discussion feed and category browsing. |
| `/community/saved` | `app/(public)/community/saved/page.tsx` | Bookmarked discussions, with remove action and empty state (#1460). |

The `(public)` segment is a Next.js route group and is not part of the URL. The route entry exports page metadata and renders `CommunityLayout`. `PublicNavbar` defines a link to `/community`; check where it is mounted before changing shared navigation.

## Component hierarchy

```text
app/(public)/community/page.tsx
└── components/community/CommunityLayout.tsx
    ├── CommunityHero
    │   └── StartDiscussionButton
    ├── CommunityFeedTabs
    ├── search input
    ├── DiscussionCard (one per API result)
    ├── loading, error/retry, empty, and pagination states
    ├── CommunitySidebar
    │   ├── community statistics
    │   ├── category filter
    │   └── upcoming events
    └── start-discussion mock dialog
```

`components/community/communityData.ts` defines the `DiscussionPost`, `CommunityCategory`, event, and statistics types and the static category, event, statistics, and sample-discussion data. The feed currently fetches discussions through `lib/community/discussionsApi.ts`; `SAMPLE_DISCUSSIONS` is not used as a fallback by that request.

`components/community/DiscussionCard.tsx` renders each discussion and keeps its like count/liked state locally. Other reusable Community components include `AuthorAvatar`, `CommunityStats`, and `TrendingBadge`; check imports before assuming these are part of the current route render tree.

## API integration

The frontend currently implements one Community API operation:

### List discussions

`getDiscussions` sends a `GET` request to:

```text
${NEXT_PUBLIC_API_URL}/community/discussions
```

If `NEXT_PUBLIC_API_URL` is unset, the request uses the relative path `/community/discussions`. The query parameters are:

| Parameter | Meaning |
| --- | --- |
| `page` | Current 1-based page. |
| `limit` | Page size (10 in the Community layout). |
| `sort` | `trending` or `latest`; the `my-posts` tab is sent as `latest`. |
| `category` | Selected category ID; omitted for `all`. |
| `search` | Trimmed search text; omitted when blank. |
| `mine` | Set to `true` for the `my-posts` tab. |

For `my-posts`, the client reads `skillsync.session` from browser local storage and sends its token as a Bearer authorization header when available. The response adapter accepts a discussion array or common `discussions`, `items`, or `results` envelopes, maps API fields to `DiscussionPost`, and derives total/has-more values from pagination metadata. Non-success responses and invalid payloads become errors displayed with a retry action. Requests are aborted when their query changes or the component unmounts.

The endpoint path and response shapes above describe the current frontend contract; confirm them with the backend before changing either side. Authentication has separate `/auth/login` and `/auth/register` requests in `lib/auth/authApi.ts`, but no other Community write endpoints are implemented.

### Not implemented

There are no frontend API calls for creating a discussion, viewing a discussion detail, posting/editing replies, reporting content, or moderation actions. The “Start Discussion” dialog is a mock: its publish button only shows a browser alert and closes the dialog. RSVP controls are also presentational and do not submit an event registration.

## State management and feed behavior

`CommunityLayout` owns the feed state with React local state; there is no Community global store or URL-backed state:

- Feed tab: `trending`, `latest`, or `my-posts`.
- One selected category ID at a time; selecting another category replaces the current selection.
- Category changes immediately refetch the feed and clear the current page back to page 1.
- Search text, debounced by 250 ms when non-empty.
- 1-based page number, page size 10, result count, and `hasMore`.
- Loading and request-error state, with a retry key to reload the current query.
- Start-discussion dialog visibility.

Changing the tab, category, or search resets pagination to page 1. The category list, category counts, event cards, and community statistics are currently static frontend data; the discussion feed comes from the API.

## Permissions

The `/community` route and browsing controls are public and are not wrapped in `ProtectedRoute`. The `my-posts` tab requests `mine=true` and includes a stored access token if available, but this page does not itself enforce or verify a member role. Authentication state is stored in `skillsync.session`; dashboard role checks in `lib/auth/authApi.ts` do not define Community permissions.

The mock discussion dialog is not a real create-post capability. Before implementing writes, define the allowed roles and enforce authorization on the backend as well as conditionally presenting the relevant UI. Do not treat client-side visibility or a local-storage token as an authorization boundary.

## Moderation workflow

Community moderation is not implemented in the frontend: there are no report controls, moderator queue, review actions, or moderation API endpoints. A complete workflow will need backend-defined policies and permissions, reporting, an access-controlled review queue, auditable moderation actions, and appropriate author notifications. Document the agreed backend contract and role behavior when those features are added.

## Accessibility and UX

- The route includes a skip-to-content link.
- Feed tabs expose tab roles, selected state, and panel relationships.
- Search has an accessible label.
- Loading and error states use status/alert semantics; failed requests can be retried.
- The feed presents an empty state and pagination controls.
- Buttons have accessible names or visible labels; keep keyboard focus visible when changing controls.

## Testing

### Automated checks

The repository currently has no dedicated test-runner script. Run these checks from the repository root before submitting a Community change:

```powershell
npm run lint
npm run build
```

### Manual smoke test

1. Start the frontend with `npm run dev` and open `http://localhost:3000/community`.
2. With the backend configured through `NEXT_PUBLIC_API_URL`, confirm the discussion request loads and renders cards.
3. Check the loading, empty, and error/retry states (for example, with an empty result or unavailable API).
4. Change between Trending, Latest, and My Posts; confirm each triggers the expected query. Test My Posts both with and without a saved session.
5. Select categories, search for text, and move between pages. Confirm query changes reset to page 1 and search requests are debounced.
6. Confirm the Start Discussion dialog and RSVP controls are understood to be mock/presentational only; they do not create data.
7. Check keyboard navigation, the skip link, and responsive layout at narrow and wide viewport sizes.

## Likes, bookmarks and followed categories

Community interactions are implemented across four areas:

- **Likes (#1458):** `DiscussionCard` toggles optimistically with an accessible `aria-pressed` control. `lib/community/communityActions.ts` writes local state first, then calls `POST`/`DELETE /community/discussions/:id/like`; a failed request rolls the toggle back. The API response may also carry `isLiked`/`likedByMe`, which is mapped into `DiscussionPost`.
- **Bookmarks (#1459):** The same pattern persists to `/community/discussions/:id/bookmark`. Bookmarked post snapshots are stored locally so `/community/saved` can render immediately.
- **Saved page (#1460):** `components/community/SavedDiscussions.tsx` reads the persisted snapshots, optionally refreshes them from `GET /community/discussions/saved`, supports removal, and shows an empty state with a link back to the feed.
- **Followed categories (#1461):** `CommunitySidebar` renders a Follow/Following control per category and a "Following" badge. State is persisted to local storage and best-effort synced with `POST`/`DELETE /community/categories/:id/follow`.

State lives in `lib/community/communityStorage.ts`, namespaced by the user id from `skillsync.session`, and is exposed through `useSyncExternalStore` hooks in `lib/community/useCommunityInteractions.ts`. A `skillsync:community-change` event plus the `storage` event keep every mounted component (and other tabs) in sync. When no session exists, interactions remain local-only.

## Contributor notes

- Keep API transport and response mapping in `lib/community/discussionsApi.ts`; keep shared Community data types in `components/community/communityData.ts` unless a shared type location is introduced.
- Update this guide and the backend contract together when endpoint paths, query parameters, or payloads change.
- Add focused tests for API response mapping, query construction, and feed state as test tooling is introduced.
- Replace mock write actions only when their backend endpoints, permission rules, and error behavior are defined.
