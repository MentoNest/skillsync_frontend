import Link from "next/link";

export default function DiscussionNotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-[var(--foreground)]">
        Discussion not found
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        This discussion may have been deleted or the link is incorrect.
      </p>
      <Link
        href="/community"
        className="mt-6 inline-flex rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white"
      >
        Back to community
      </Link>
    </div>
  );
}
