# Implementation: #1003, #1005, #1006, #1007

## Routes
- `GET /community/discussions/[discussionId]` — full post, author, comments, related
- `not-found` when id is missing
- API: `GET|PATCH|DELETE /api/community/discussions/[id]`

## Features
- **#1003** `RichTextEditor` — bold, italic, lists, links, code, quotes; HTML serialization
- **#1005** `EditDiscussionForm` — prefilled title/content, Save/Cancel, in-place update
- **#1006** `DeleteDiscussionButton` — confirmation dialog, success/error, removes from store/feed
- **#1007** Detail page + related discussions + comments list

## Notes
- Demo viewer is set to the discussion author so Edit/Delete are exercisable without auth wiring.
- `buildDiscussionPath` now points at `/community/discussions/:id`.
