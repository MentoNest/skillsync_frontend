"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { communityApi, CommunityApiError } from "@/lib/community-api";
import {
  COMMUNITY_CATEGORIES,
  isCommunityCategoryId,
  type CommunityCategoryId,
  type Discussion,
} from "@/lib/community-types";
import { RichTextEditor, richTextPlainLength } from "./RichTextEditor";

/** Maximum number of free-form tags accepted by the composer. */
export const MAX_TAGS = 5;

/** Maximum tag length accepted by the composer. */
export const MAX_TAG_LENGTH = 30;

const MAX_TITLE_LENGTH = 200;

interface StartDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Called with the created discussion after a successful publish. */
  onCreated: (discussion: Discussion) => void;
  /** Category preselected when the composer opens. */
  defaultCategory?: CommunityCategoryId;
}

type FieldErrors = Partial<
  Record<"title" | "category" | "content" | "tags", string>
>;

/**
 * Parse the comma/newline separated tags input into a trimmed, de-duplicated
 * list of tags. A leading `#` is stripped so both `react` and `#react` work.
 */
export function parseTagsInput(value: string): string[] {
  const seen = new Set<string>();
  const tags: string[] = [];
  for (const raw of value.split(/[,\n]/)) {
    const tag = raw.trim().replace(/^#/, "").trim();
    if (!tag) continue;
    const key = tag.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    tags.push(tag);
  }
  return tags;
}

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

/**
 * Modal used to start a new discussion (#1001) and submit it to the backend
 * (#1004).
 *
 * Owns its own form state and validation, then delegates the network call to
 * `communityApi.createDiscussion` (which targets
 * `POST /api/community/discussions`). While the request is in flight the modal
 * shows a loading state and blocks closing so the draft is not lost; failures
 * are surfaced inline and keep the entered values so the user can retry.
 * Supports Escape, backdrop click, a focus trap and focus restoration.
 */
export function StartDiscussionModal({
  isOpen,
  onClose,
  onCreated,
  defaultCategory = "general",
}: StartDiscussionModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CommunityCategoryId>(defaultCategory);
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const dialogRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const categorySelectRef = useRef<HTMLSelectElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const tagsInputRef = useRef<HTMLInputElement>(null);

  const titleId = useId();
  const categoryId = useId();
  const contentId = useId();
  const tagsId = useId();
  const headingId = useId();

  const parsedTags = useMemo(() => parseTagsInput(tagsInput), [tagsInput]);

  /* Reset the draft every time the composer is opened. */
  useEffect(() => {
    if (!isOpen) return;
    setTitle("");
    setCategory(defaultCategory);
    setContent("");
    setTagsInput("");
    setError(null);
    setFieldErrors({});
  }, [isOpen, defaultCategory]);

  /* Lock background scroll, move focus in, and restore it on close. */
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => titleInputRef.current?.focus(), 0);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    // Never close mid-publish: the in-flight draft would be lost.
    if (isSubmitting) return;
    onClose();
  }, [isSubmitting, onClose]);

  /* Escape closes; Tab is trapped inside the dialog. */
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (isSubmitting) return;
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== "Tab") return;

      const root = dialogRef.current;
      if (!root) return;
      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (focusable.length === 0) return;

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !root.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, handleClose]);

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      errors.title = "Title is required.";
    } else if (trimmedTitle.length > MAX_TITLE_LENGTH) {
      errors.title = `Title must be ${MAX_TITLE_LENGTH} characters or fewer.`;
    }

    if (!isCommunityCategoryId(category)) {
      errors.category = "Choose a category.";
    }

    const plainLength = richTextPlainLength(content);
    if (plainLength < 1) {
      errors.content = "Content is required.";
    } else if (plainLength > 10000) {
      errors.content = "Content is too long.";
    }

    if (parsedTags.length > MAX_TAGS) {
      errors.tags = `You can add up to ${MAX_TAGS} tags.`;
    } else if (parsedTags.some((tag) => tag.length > MAX_TAG_LENGTH)) {
      errors.tags = `Each tag must be ${MAX_TAG_LENGTH} characters or fewer.`;
    }

    return errors;
  }

  function focusFirstInvalid(errors: FieldErrors) {
    if (errors.title) titleInputRef.current?.focus();
    else if (errors.category) categorySelectRef.current?.focus();
    else if (errors.content)
      contentWrapperRef.current
        ?.querySelector<HTMLElement>('[role="textbox"]')
        ?.focus();
    else if (errors.tags) tagsInputRef.current?.focus();
    else dialogRef.current?.focus();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      focusFirstInvalid(errors);
      return;
    }

    setFieldErrors({});
    setError(null);
    setIsSubmitting(true);

    try {
      const created = await communityApi.createDiscussion({
        title: title.trim(),
        content,
        category,
        tags: parsedTags,
      });
      onCreated(created);
      onClose();
    } catch (err) {
      setError(
        err instanceof CommunityApiError
          ? err.message
          : "Failed to publish your discussion. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  const titleErrorId = `${titleId}-error`;
  const categoryErrorId = `${categoryId}-error`;
  const contentErrorId = `${contentId}-error`;
  const tagsErrorId = `${tagsId}-error`;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-black/50 sm:items-center sm:p-4">
      <div
        className="absolute inset-0"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        data-testid="start-discussion-modal"
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-xl sm:rounded-2xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id={headingId}
              className="text-lg font-semibold text-[var(--foreground)] sm:text-xl"
            >
              Start a discussion
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Share a question or insight with the community.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close"
            className="rounded-lg p-1.5 text-[var(--muted)] transition-colors hover:bg-[var(--secondary)] hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:opacity-50"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 6l12 12M18 6L6 18"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          {/* Title */}
          <div className="space-y-1">
            <label
              htmlFor={titleId}
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Title <span aria-hidden="true">*</span>
            </label>
            <input
              id={titleId}
              ref={titleInputRef}
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={MAX_TITLE_LENGTH}
              disabled={isSubmitting}
              required
              aria-invalid={fieldErrors.title ? true : undefined}
              aria-describedby={fieldErrors.title ? titleErrorId : undefined}
              placeholder="What would you like to discuss?"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:opacity-60"
            />
            {fieldErrors.title && (
              <p id={titleErrorId} role="alert" className="text-xs text-red-600">
                {fieldErrors.title}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label
              htmlFor={categoryId}
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Category <span aria-hidden="true">*</span>
            </label>
            <select
              id={categoryId}
              ref={categorySelectRef}
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as CommunityCategoryId)
              }
              disabled={isSubmitting}
              required
              aria-invalid={fieldErrors.category ? true : undefined}
              aria-describedby={
                fieldErrors.category ? categoryErrorId : undefined
              }
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:opacity-60"
            >
              {COMMUNITY_CATEGORIES.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            {fieldErrors.category && (
              <p
                id={categoryErrorId}
                role="alert"
                className="text-xs text-red-600"
              >
                {fieldErrors.category}
              </p>
            )}
          </div>

          {/* Content */}
          <div className="space-y-1" ref={contentWrapperRef}>
            <span className="text-sm font-medium text-[var(--foreground)]">
              Content <span aria-hidden="true">*</span>
            </span>
            <RichTextEditor
              value={content}
              onChange={setContent}
              disabled={isSubmitting}
              label="Discussion content"
            />
            {fieldErrors.content && (
              <p
                id={contentErrorId}
                role="alert"
                className="text-xs text-red-600"
              >
                {fieldErrors.content}
              </p>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-1">
            <label
              htmlFor={tagsId}
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Tags
            </label>
            <input
              id={tagsId}
              ref={tagsInputRef}
              type="text"
              value={tagsInput}
              onChange={(event) => setTagsInput(event.target.value)}
              disabled={isSubmitting}
              aria-invalid={fieldErrors.tags ? true : undefined}
              aria-describedby={`${tagsId}-hint${
                fieldErrors.tags ? ` ${tagsErrorId}` : ""
              }`}
              placeholder="react, career, mentoring"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:opacity-60"
            />
            <p id={`${tagsId}-hint`} className="text-xs text-[var(--muted)]">
              Separate tags with commas. Up to {MAX_TAGS} tags.
            </p>
            {parsedTags.length > 0 && (
              <ul className="flex flex-wrap gap-1.5 pt-1" aria-label="Tags to add">
                {parsedTags.map((tag) => (
                  <li
                    key={tag.toLowerCase()}
                    className="rounded-full bg-[var(--secondary)] px-2.5 py-1 text-xs font-medium text-[var(--muted)]"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            )}
            {fieldErrors.tags && (
              <p id={tagsErrorId} role="alert" className="text-xs text-red-600">
                {fieldErrors.tags}
              </p>
            )}
          </div>

          {/* Attachments placeholder */}
          <div className="space-y-1">
            <span className="text-sm font-medium text-[var(--foreground)]">
              Attachments
            </span>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-dashed border-[var(--border)] bg-[var(--secondary)]/50 px-3 py-3">
              <p className="text-sm text-[var(--muted)]">
                Attachments are coming soon.
              </p>
              <button
                type="button"
                disabled
                aria-disabled="true"
                title="Attachments are coming soon"
                className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Add attachment
              </button>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-200"
            >
              {error}
            </div>
          )}

          <div className="flex flex-col-reverse gap-2 border-t border-[var(--border)] pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="w-full rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:opacity-60 sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting && (
                <span
                  className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent"
                  aria-hidden="true"
                />
              )}
              {isSubmitting ? "Publishing…" : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StartDiscussionModal;
