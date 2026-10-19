"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Discussion, Reply } from "@/lib/community-types";
import { DiscussionActions } from "./DiscussionActions";
import { EditDiscussionForm } from "./EditDiscussionForm";
import { DeleteDiscussionButton } from "./DeleteDiscussionButton";
import { RichTextEditor, richTextPlainLength } from "./RichTextEditor";
import { DiscussionCategoryBadge } from "./DiscussionCategoryBadge";
import { TrendingBadgeForDiscussion } from "./TrendingBadge";

interface Props {
  discussion: Discussion;
  replies: Reply[];
  related: Discussion[];
  /** Current viewer id (demo: discussion author can edit/delete their posts) */
  viewerId: string;
}

function ContentHtml({ html }: { html: string }) {
  // Content may be plain text from seed or HTML from the rich editor
  const looksLikeHtml = /<[a-z][\s\S]*>/i.test(html);
  if (looksLikeHtml) {
    return (
      <div
        className="prose prose-sm max-w-none text-[var(--foreground)]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return (
    <p className="whitespace-pre-wrap text-[var(--foreground)] leading-relaxed">
      {html}
    </p>
  );
}

export function DiscussionDetailView({
  discussion: initial,
  replies: initialReplies,
  related,
  viewerId,
}: Props) {
  const [discussion, setDiscussion] = useState(initial);
  const [replies, setReplies] = useState(initialReplies);
  const [editing, setEditing] = useState(false);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);

  const isAuthor = viewerId === discussion.authorId;

  const relatedCards = useMemo(() => related, [related]);

  const postComment = async () => {
    setCommentError(null);
    if (richTextPlainLength(comment) < 1) {
      setCommentError("Write a comment first");
      return;
    }
    setPosting(true);
    try {
      // Optimistic local append (store-backed API for replies can be wired later)
      const newReply: Reply = {
        id: `local-${Date.now()}`,
        discussionId: discussion.id,
        content: comment,
        authorId: viewerId,
        authorName: "You",
        likeCount: 0,
        createdAt: new Date().toISOString(),
      };
      setReplies((r) => [...r, newReply]);
      setDiscussion((d) => ({
        ...d,
        replyCount: d.replyCount + 1,
      }));
      setComment("");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <Link
        href="/community"
        className="text-sm text-[var(--primary)] hover:underline"
      >
        ← Community
      </Link>

      {editing ? (
        <EditDiscussionForm
          discussion={discussion}
          onSaved={(updated) => {
            setDiscussion(updated);
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <article className="space-y-4">
          <header className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
              <DiscussionCategoryBadge
                label={discussion.category}
                className="font-medium"
              />
              {discussion.isPinned && (
                <span className="text-[var(--primary)]">Pinned</span>
              )}
              {discussion.isLocked && (
                <span className="text-amber-700">Locked</span>
              )}
              <TrendingBadgeForDiscussion discussion={discussion} />
              <time dateTime={discussion.createdAt}>
                {new Date(discussion.createdAt).toLocaleString()}
              </time>
            </div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              {discussion.title}
            </h1>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  discussion.authorAvatar ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${discussion.authorId}`
                }
                alt=""
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-[var(--foreground)]">
                  {discussion.authorName}
                </p>
                <p className="text-xs text-[var(--muted)]">Author</p>
              </div>
            </div>
          </header>

          <ContentHtml html={discussion.content} />

          <DiscussionActions discussion={discussion} />

          {isAuthor && (
            <div className="flex flex-wrap gap-2 border-t border-[var(--border)] pt-3">
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]"
              >
                Edit
              </button>
              <DeleteDiscussionButton
                discussionId={discussion.id}
                authorId={discussion.authorId}
                title={discussion.title}
              />
            </div>
          )}
        </article>
      )}

      {/* Comments */}
      <section aria-labelledby="comments-heading" className="space-y-4">
        <h2
          id="comments-heading"
          className="text-lg font-semibold text-[var(--foreground)]"
        >
          Comments ({replies.length})
        </h2>
        <ul className="space-y-4">
          {replies.map((reply) => (
            <li
              key={reply.id}
              className="rounded-xl border border-[var(--border)] p-4"
            >
              <div className="flex items-center gap-2 text-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    reply.authorAvatar ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${reply.authorId}`
                  }
                  alt=""
                  className="h-8 w-8 rounded-full"
                />
                <span className="font-medium text-[var(--foreground)]">
                  {reply.authorName}
                </span>
                <time
                  className="text-xs text-[var(--muted)]"
                  dateTime={reply.createdAt}
                >
                  {new Date(reply.createdAt).toLocaleString()}
                </time>
              </div>
              <div className="mt-2">
                <ContentHtml html={reply.content} />
              </div>
            </li>
          ))}
          {replies.length === 0 && (
            <li className="text-sm text-[var(--muted)]">No comments yet.</li>
          )}
        </ul>

        {!discussion.isLocked && (
          <div className="space-y-2">
            <RichTextEditor
              value={comment}
              onChange={setComment}
              placeholder="Add a comment…"
              label="Comment"
              minHeight="100px"
            />
            {commentError && (
              <p className="text-sm text-red-600" role="alert">
                {commentError}
              </p>
            )}
            <button
              type="button"
              disabled={posting}
              onClick={postComment}
              className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {posting ? "Posting…" : "Post comment"}
            </button>
          </div>
        )}
      </section>

      {/* Related */}
      {relatedCards.length > 0 && (
        <section aria-labelledby="related-heading" className="space-y-3">
          <h2
            id="related-heading"
            className="text-lg font-semibold text-[var(--foreground)]"
          >
            Related discussions
          </h2>
          <ul className="space-y-2">
            {relatedCards.map((d) => (
              <li key={d.id}>
                <Link
                  href={`/community/discussions/${d.id}`}
                  className="block rounded-xl border border-[var(--border)] p-3 hover:bg-[var(--secondary)]/50"
                >
                  <span className="font-medium text-[var(--foreground)]">
                    {d.title}
                  </span>
                  <span className="mt-1 block text-xs text-[var(--muted)]">
                    {d.category} · {d.replyCount} replies
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
