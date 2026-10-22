"use client";

import { useId, useRef, useState } from "react";
import { COMMUNITY_CATEGORIES } from "@/lib/community-types";
import { RichTextEditor, richTextPlainLength } from "./RichTextEditor";

/**
 * Reusable discussion creation form (#1002).
 *
 * Owns field state and validation only — it does not talk to the API, so it
 * can be embedded in a page, a modal (#1001) or wired to the backend (#1004)
 * without changes. `onSubmit` receives normalised values and may return a
 * promise; the form guards against double submits while it settles.
 *
 * Validation is enforced on submit (title, category and content are required)
 * and surfaced accessibly: the invalid field carries `aria-invalid` and
 * `aria-describedby`, and the message is a `role="alert"` so screen readers
 * announce it. Focus moves to the first invalid field.
 */

export interface DiscussionFormValues {
  title: string;
  category: string;
  content: string;
  tags: string[];
}

export type DiscussionFormField = "title" | "category" | "content";
export type DiscussionFormErrors = Partial<Record<DiscussionFormField, string>>;

export interface DiscussionCategoryOption {
  id: string;
  name: string;
}

export interface DiscussionFormProps {
  /** Called with validated values when the form is submitted. */
  onSubmit: (values: DiscussionFormValues) => void | Promise<void>;
  /** Renders a Cancel button when provided. */
  onCancel?: () => void;
  /** Prefill, e.g. when reusing the form to edit. */
  initialValues?: Partial<DiscussionFormValues>;
  /** Override the category list. Defaults to `COMMUNITY_CATEGORIES`. */
  categories?: readonly DiscussionCategoryOption[];
  submitLabel?: string;
  /** Form-level error from the caller (e.g. a failed request). */
  error?: string | null;
  className?: string;
}

export const TITLE_MAX_LENGTH = 200;
/** Slightly under the 200-char title cap to leave room for the picker label. */
export const DISCUSSION_FORM_ID_PREFIX = "discussion-form";

/**
 * Normalise the free-text tags input into a de-duplicated, trimmed list.
 * Accepts comma- or newline-separated values.
 */
export function parseTags(input: string): string[] {
  return Array.from(
    new Set(
      input
        .split(/[,\n]/)
        .map((tag) => tag.trim())
        .filter(Boolean)
    )
  );
}

/** Pure validation so it can be unit-tested and reused outside the form. */
export function validateDiscussionForm(
  values: Pick<DiscussionFormValues, "title" | "category" | "content">
): DiscussionFormErrors {
  const errors: DiscussionFormErrors = {};

  const title = values.title.trim();
  if (!title) {
    errors.title = "Title is required.";
  } else if (title.length > TITLE_MAX_LENGTH) {
    errors.title = `Title must be ${TITLE_MAX_LENGTH} characters or fewer.`;
  }

  if (!values.category.trim()) {
    errors.category = "Category is required.";
  }

  if (richTextPlainLength(values.content) < 1) {
    errors.content = "Content is required.";
  }

  return errors;
}

export function DiscussionForm({
  onSubmit,
  onCancel,
  initialValues,
  categories = COMMUNITY_CATEGORIES,
  submitLabel = "Post discussion",
  error = null,
  className,
}: DiscussionFormProps) {
  const uid = useId();
  const titleId = `${DISCUSSION_FORM_ID_PREFIX}-title-${uid}`;
  const categoryId = `${DISCUSSION_FORM_ID_PREFIX}-category-${uid}`;
  const contentId = `${DISCUSSION_FORM_ID_PREFIX}-content-${uid}`;
  const tagsId = `${DISCUSSION_FORM_ID_PREFIX}-tags-${uid}`;

  const titleRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [category, setCategory] = useState(initialValues?.category ?? "");
  const [content, setContent] = useState(initialValues?.content ?? "");
  const [tagsInput, setTagsInput] = useState(
    initialValues?.tags?.join(", ") ?? ""
  );
  const [errors, setErrors] = useState<DiscussionFormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const focusFirstInvalid = (nextErrors: DiscussionFormErrors) => {
    if (nextErrors.title) titleRef.current?.focus();
    else if (nextErrors.category) categoryRef.current?.focus();
    else if (nextErrors.content)
      contentRef.current?.querySelector<HTMLElement>('[role="textbox"]')?.focus();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const values: DiscussionFormValues = {
      title: title.trim(),
      category,
      content,
      tags: parseTags(tagsInput),
    };

    const nextErrors = validateDiscussionForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      // Block invalid submissions and move focus to the first problem.
      focusFirstInvalid(nextErrors);
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={className}
      aria-label="Create a discussion"
    >
      {error && (
        <p
          role="alert"
          className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
        >
          {error}
        </p>
      )}

      {/* Title */}
      <div className="space-y-1">
        <label
          htmlFor={titleId}
          className="block text-sm font-medium text-[var(--foreground)]"
        >
          Title <span aria-hidden="true">*</span>
        </label>
        <input
          id={titleId}
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={TITLE_MAX_LENGTH}
          required
          aria-required="true"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? `${titleId}-error` : undefined}
          placeholder="What would you like to discuss?"
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        />
        {errors.title && (
          <p
            id={`${titleId}-error`}
            role="alert"
            className="text-sm text-red-600"
          >
            {errors.title}
          </p>
        )}
      </div>

      {/* Category */}
      <div className="mt-4 space-y-1">
        <label
          htmlFor={categoryId}
          className="block text-sm font-medium text-[var(--foreground)]"
        >
          Category <span aria-hidden="true">*</span>
        </label>
        <select
          id={categoryId}
          ref={categoryRef}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          aria-required="true"
          aria-invalid={Boolean(errors.category)}
          aria-describedby={
            errors.category ? `${categoryId}-error` : undefined
          }
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        >
          <option value="">Select a category…</option>
          {categories.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p
            id={`${categoryId}-error`}
            role="alert"
            className="text-sm text-red-600"
          >
            {errors.category}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="mt-4 space-y-1">
        <span className="block text-sm font-medium text-[var(--foreground)]">
          Content <span aria-hidden="true">*</span>
        </span>
        <div
          ref={contentRef}
          id={contentId}
          aria-describedby={errors.content ? `${contentId}-error` : undefined}
        >
          <RichTextEditor
            value={content}
            onChange={setContent}
            label="Discussion content, required"
            placeholder="Share the details…"
          />
        </div>
        {errors.content && (
          <p
            id={`${contentId}-error`}
            role="alert"
            className="text-sm text-red-600"
          >
            {errors.content}
          </p>
        )}
      </div>

      {/* Tags */}
      <div className="mt-4 space-y-1">
        <label
          htmlFor={tagsId}
          className="block text-sm font-medium text-[var(--foreground)]"
        >
          Tags <span className="text-[var(--muted)]">(optional)</span>
        </label>
        <input
          id={tagsId}
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="react, career, mentoring"
          aria-describedby={`${tagsId}-hint`}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        />
        <p id={`${tagsId}-hint`} className="text-xs text-[var(--muted)]">
          Separate tags with commas.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--primary-dark)] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        >
          {submitting ? "Posting…" : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default DiscussionForm;
