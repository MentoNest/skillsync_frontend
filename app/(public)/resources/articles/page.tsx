import type { Metadata } from "next";
import Link from "next/link";
import ResourceSearchList, {
	ResourceListItem,
} from "@/components/resources/ResourceSearchList";

const RESOURCE_ARTICLES: ResourceListItem[] = [
	{
		title: "What mentorship is actually for",
		summary: "A mentor makes a difficult path legible. Learn how to use support without outsourcing your thinking.",
		type: "Article",
		readMinutes: 6,
		tag: "Career",
	},
	{
		title: "How to ask a question a mentor can answer",
		summary: "Specific questions produce useful advice. Here is a framework that gets you answers worth acting on.",
		type: "Article",
		readMinutes: 5,
		tag: "Communication",
	},
	{
		title: "When to change jobs, and when to stay",
		summary: "Make a decision based on the right signal, not just the loudest story in the room.",
		type: "Article",
		readMinutes: 9,
		tag: "Career",
	},
	{
		title: "The weekly review that keeps momentum",
		summary: "A simple reflection habit helps you notice progress and spot drag before it becomes a crisis.",
		type: "Article",
		readMinutes: 7,
		tag: "Growth",
	},
];

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
