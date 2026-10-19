import type { Metadata } from "next";
import Link from "next/link";
import ResourceSearchList from "@/components/resources/ResourceSearchList";
import { RESOURCE_ARTICLES } from "@/lib/resources-data";

export const metadata: Metadata = {
	title: "Articles · Learning Resources · SkillSync",
	description: "Short, practical reads on mentorship, careers and growth in tech.",
};

export default function ResourceArticlesPage() {
	return (
		<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
			<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
						Articles
					</p>
					<h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
						Short reads with real utility
					</h1>
				</div>

				<Link
					href="/resources"
					className="inline-flex items-center self-start rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-indigo-300 hover:text-indigo-700"
				>
					← Back to resources
				</Link>
			</div>

			<ResourceSearchList
				items={RESOURCE_ARTICLES}
				searchLabel="Search articles"
				placeholder="Search by title, summary, or topic"
				emptyTitle="No articles match your search."
				emptyHint="Try a different keyword or clear the search."
				ctaLabel="Read article"
			/>
		</div>
	);
}
