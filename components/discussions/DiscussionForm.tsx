"use client";

import { FormEvent, useMemo, useState, useCallback, memo } from "react";
import { useCommunityAnalytics } from "@/lib/useCommunityAnalytics";

export type DiscussionFormValues = {
  title: string;
  category: string;
  content: string;
  tags: string[];
};

export type DiscussionFormErrors = Partial<
  Record<keyof DiscussionFormValues, string>
>;

const defaultCategories = [
  "Career Growth",
  "Leadership",
  "Interview Prep",
  "Networking",
  "Salary & Compensation",
  "Work-Life Balance",
];

interface DiscussionFormProps {
  categories?: string[];
  initialValues?: Partial<DiscussionFormValues>;
  submitLabel?: string;
  onSubmit?: (values: DiscussionFormValues) => void | Promise<void>;
  className?: string;
}

const normalizeTags = (rawTags: string) =>
  rawTags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

const DiscussionForm = memo(function DiscussionForm({
  categories = defaultCategories,
  initialValues,
  submitLabel = "Create discussion",
  onSubmit,
  className = "",
}: DiscussionFormProps) {
  const { trackPost } = useCommunityAnalytics();
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [category, setCategory] = useState(initialValues?.category ?? "");
  const [content, setContent] = useState(initialValues?.content ?? "");
  const [tagsInput, setTagsInput] = useState(
    initialValues?.tags?.join(", ") ?? ""
  );
  const [errors, setErrors] = useState<DiscussionFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fieldClassName = useMemo(
    () =>
      "mt-2 w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100",
    []
  );

  const validate = useCallback(
    (values: DiscussionFormValues): DiscussionFormErrors => {
      const nextErrors: DiscussionFormErrors = {};

      if (!values.title.trim()) {
        nextErrors.title = "Title is required.";
      }

      if (!values.category.trim()) {
        nextErrors.category = "Category is required.";
      }

      if (!values.content.trim()) {
        nextErrors.content = "Content is required.";
      }

      return nextErrors;
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const values: DiscussionFormValues = {
        title: title.trim(),
        category: category.trim(),
        content: content.trim(),
        tags: normalizeTags(tagsInput),
      };

      const nextErrors = validate(values);
      setErrors(nextErrors);

      if (Object.keys(nextErrors).length > 0) {
        return;
      }

      setIsSubmitting(true);

      try {
        await onSubmit?.(values);
        trackPost(values.category);
        setTitle("");
        setCategory("");
        setContent("");
        setTagsInput("");
        setErrors({});
      } finally {
        setIsSubmitting(false);
      }
    },
    [title, category, content, tagsInput, validate, onSubmit, trackPost]
  );

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 ${className}`}
    >
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
          Community
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
          Start a discussion
        </h2>
      </div>

      <div className="grid gap-5">
        <div>
          <label
            htmlFor="discussion-title"
            className="text-sm font-semibold text-slate-700"
          >
            Title
          </label>
          <input
            id="discussion-title"
            name="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="How do you structure your first mentoring session?"
            aria-invalid={Boolean(errors.title)}
            className={`${fieldClassName} ${
              errors.title
                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200"
            }`}
          />
          {errors.title ? (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.title}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="discussion-category"
            className="text-sm font-semibold text-slate-700"
          >
            Category
          </label>
          <select
            id="discussion-category"
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-invalid={Boolean(errors.category)}
            className={`${fieldClassName} ${
              errors.category
                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200"
            }`}
          >
            <option value="">Select a category</option>
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.category ? (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.category}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="discussion-content"
            className="text-sm font-semibold text-slate-700"
          >
            Content
          </label>
          <textarea
            id="discussion-content"
            name="content"
            rows={6}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Share your experience, ask a question, or offer advice for others in the community."
            aria-invalid={Boolean(errors.content)}
            className={`${fieldClassName} resize-y ${
              errors.content
                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200"
            }`}
          />
          {errors.content ? (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.content}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="discussion-tags"
            className="text-sm font-semibold text-slate-700"
          >
            Tags
          </label>
          <input
            id="discussion-tags"
            name="tags"
            type="text"
            value={tagsInput}
            onChange={(event) => setTagsInput(event.target.value)}
            placeholder="mentoring, career, networking"
            className={`${fieldClassName} border-slate-200`}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
        <p className="text-sm text-slate-500">
          Required fields: title, category, and content.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isSubmitting ? "Publishing..." : submitLabel}
        </button>
      </div>
    </form>
  );
});

export default DiscussionForm;
