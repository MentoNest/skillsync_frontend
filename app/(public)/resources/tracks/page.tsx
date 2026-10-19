import type { Metadata } from "next";
import Link from "next/link";
import ResourceSearchList from "@/components/resources/ResourceSearchList";
import { RESOURCE_TRACKS } from "@/lib/resources-data";

export const metadata: Metadata = {
	title: "Learning Tracks · Learning Resources · SkillSync",
	description: "Structured learning tracks for career growth, interviews and leadership in tech.",
};

export default function ResourceTracksPage() {
	return (
		<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
			<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
						Learning tracks
					</p>
					<h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
						Find the right next step
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
				items={RESOURCE_TRACKS}
				searchLabel="Search tracks"
				placeholder="Search by title, summary, or tag"
				emptyTitle="No tracks match your search."
				emptyHint="Try a broader keyword or clear the filter."
				ctaLabel="Explore track"
			/>
		</div>
	);
}
