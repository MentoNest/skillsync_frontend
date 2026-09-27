"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const RESOURCE_ARTICLES = [
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

const debounceDelayMs = 250;

export default function ResourceArticlesPage() {
	const [query, setQuery] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState("");

	useEffect(() => {
		const timer = window.setTimeout(() => {
			setDebouncedQuery(query.trim());
		}, debounceDelayMs);

		return () => window.clearTimeout(timer);
	}, [query]);

	const filteredArticles = useMemo(() => {
		const value = debouncedQuery.toLowerCase();

		if (!value) return RESOURCE_ARTICLES;

		return RESOURCE_ARTICLES.filter(
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

			<label className="mb-8 block">
				<span className="mb-2 block text-sm font-medium text-slate-700">Search articles</span>
				<input
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					placeholder="Search by title, summary, or topic"
					className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
					aria-label="Search learning articles"
				/>
			</label>

			{filteredArticles.length === 0 ? (
				<div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
					<p className="text-lg font-semibold text-slate-900">No articles match your search.</p>
					<p className="mt-2 text-slate-600">Try a different keyword or clear the search.</p>
				</div>
			) : (
				<ul className="grid gap-6 md:grid-cols-2">
					{filteredArticles.map((article) => (
						<li
							key={article.title}
							className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
						>
							<div className="mb-3 flex items-center justify-between gap-3">
								<span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
									{article.type}
								</span>
								<span className="text-xs text-slate-500">{article.readMinutes} min read</span>
							</div>

							<h2 className="text-xl font-bold text-slate-900">{article.title}</h2>
							<p className="mt-3 text-sm leading-relaxed text-slate-600">{article.summary}</p>

							<div className="mt-5 flex items-center justify-between gap-3">
								<span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
									{article.tag}
								</span>
								<Link
									href="/resources"
									className="text-sm font-semibold text-indigo-700 hover:text-indigo-800"
								>
									Read article →
								</Link>
							</div>
						</li>
					))}
				</ul>
			)}
		</main>
	);
}
