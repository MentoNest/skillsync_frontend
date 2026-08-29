import type { Metadata } from "next";
import Link from "next/link";
import DiscussionThread from "@/components/discussions/DiscussionThread";

export const metadata: Metadata = {
  title: "How did you land your first engineering role? | SkillSync",
  description: "Join the conversation with the SkillSync community.",
};

export default async function DiscussionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-900">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-indigo-600"
          >
            <span aria-hidden="true">←</span> Back to community
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:py-12">
        <DiscussionThread />

        <aside className="space-y-5 lg:pt-1">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
              Discussion details
            </p>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Started</dt>
                <dd className="font-semibold text-slate-800">May 18, 2024</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Activity</dt>
                <dd className="font-semibold text-slate-800">12 replies</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Category</dt>
                <dd className="font-semibold text-indigo-600">Career growth</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl bg-slate-900 p-5 text-white">
            <p className="text-lg font-bold">Keep the conversation going</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Good questions get better with a few different perspectives.
            </p>
            <Link
              href="/register"
              className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-bold transition-colors hover:bg-indigo-400"
            >
              Join SkillSync
            </Link>
          </section>
        </aside>
      </div>
    </main>
  );
}