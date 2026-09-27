"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const RESOURCE_TRACKS = [
	{
		title: "Career Growth Foundations",
		summary: "Build momentum with the habits, systems, and conversations that compound across your first few roles.",
		type: "Track",
		readMinutes: 18,
		tag: "Beginner",
	},
	{
		title: "Interview Prep Sprint",
		summary: "Prepare for coding and behavioral interviews with a realistic weekly plan and clear progress markers.",
		type: "Track",
		readMinutes: 24,
		tag: "Intermediate",
	},
	{
		title: "Leadership for ICs",
		summary: "Learn the subtle shifts in communication, planning, and stakeholder work that come with senior roles.",
		type: "Track",
		readMinutes: 30,
		tag: "Advanced",
	},
	{
		title: "Mentor-Led Product Thinking",
		summary: "Translate abstract product work into sharper decisions, more confidence, and better examples in interviews.",
		type: "Track",
		readMinutes: 16,
		tag: "All Levels",
	},
];

const debounceDelayMs = 250;

export default function ResourceTracksPage() {
	const [query, setQuery] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState("");

	useEffect(() => {
		const timer = window.setTimeout(() => {
			setDebouncedQuery(query.trim());
		}, debounceDelayMs);

		return () => window.clearTimeout(timer);
	}, [query]);

	const filteredTracks = useMemo(() => {
		const value = debouncedQuery.toLowerCase();

		if (!value) return RESOURCE_TRACKS;

		return RESOURCE_TRACKS.filter(
			({ title, summary, tag }) =>
				title.toLowerCase().includes(value) ||
				summary.toLowerCase().includes(value) ||
				tag.toLowerCase().includes(value),
		);
	}, [debouncedQuery]);

	return (
		<main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
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

			<label className="mb-8 block">
				<span className="mb-2 block text-sm font-medium text-slate-700">
					Search tracks
				</span>
				<input
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					placeholder="Search by title, summary, or tag"
					className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
					aria-label="Search learning tracks"
				/>
			</label>

			{filteredTracks.length === 0 ? (
				<div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
					<p className="text-lg font-semibold text-slate-900">
						No tracks match your search.
					</p>
					<p className="mt-2 text-slate-600">
						Try a broader keyword or clear the filter.
					</p>
				</div>
			) : (
				<ul className="grid gap-6 md:grid-cols-2">
					{filteredTracks.map((track) => (
						<li
							key={track.title}
							className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
						>
							<div className="mb-3 flex items-center justify-between gap-3">
								<span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
									{track.type}
								</span>
								<span className="text-xs text-slate-500">
									{track.readMinutes} min read
								</span>
							</div>

							<h2 className="text-xl font-bold text-slate-900">
								{track.title}
							</h2>
							<p className="mt-3 text-sm leading-relaxed text-slate-600">
								{track.summary}
							</p>

							<div className="mt-5 flex items-center justify-between gap-3">
								<span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
									{track.tag}
								</span>
								<Link
									href="/resources"
									className="text-sm font-semibold text-indigo-700 hover:text-indigo-800"
								>
									Explore track →
								</Link>
							</div>
						</li>
					))}
				</ul>
			)}
		</main>
	);
}
