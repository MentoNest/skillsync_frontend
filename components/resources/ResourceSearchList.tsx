"use client";

import Link from "next/link";
import { memo, useDeferredValue, useMemo, useState } from "react";

export interface ResourceListItem {
	title: string;
	summary: string;
	type: string;
	readMinutes: number;
	tag: string;
}

interface ResourceSearchListProps {
	items: ResourceListItem[];
	searchLabel: string;
	placeholder: string;
	emptyTitle: string;
	emptyHint: string;
	ctaLabel: string;
}

/**
 * The only interactive part of the resource listing pages. Kept as a small
 * client island so the page shell, heading and back link stay server-rendered.
 *
 * `useDeferredValue` replaces the old timer-based debounce: typing stays
 * responsive and the list re-renders at low priority, without an extra state
 * update per keystroke.
 */
export default function ResourceSearchList({
	items,
	searchLabel,
	placeholder,
	emptyTitle,
	emptyHint,
	ctaLabel,
}: ResourceSearchListProps) {
	const [query, setQuery] = useState("");
	const deferredQuery = useDeferredValue(query);

	const filtered = useMemo(() => {
		const value = deferredQuery.trim().toLowerCase();
		if (!value) return items;

		return items.filter(
			({ title, summary, tag }) =>
				title.toLowerCase().includes(value) ||
				summary.toLowerCase().includes(value) ||
				tag.toLowerCase().includes(value),
		);
	}, [deferredQuery, items]);

	return (
		<>
			<label className="mb-8 block">
				<span className="mb-2 block text-sm font-medium text-slate-700">{searchLabel}</span>
				<input
					type="search"
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					placeholder={placeholder}
					className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
				/>
			</label>

			{filtered.length === 0 ? (
				<div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
					<p className="text-lg font-semibold text-slate-900">{emptyTitle}</p>
					<p className="mt-2 text-slate-600">{emptyHint}</p>
				</div>
			) : (
				<ul className="grid gap-6 md:grid-cols-2">
					{filtered.map((item) => (
						<ResourceListCard key={item.title} item={item} ctaLabel={ctaLabel} />
					))}
				</ul>
			)}
		</>
	);
}

const ResourceListCard = memo(function ResourceListCard({
	item,
	ctaLabel,
}: {
	item: ResourceListItem;
	ctaLabel: string;
}) {
	return (
		<li className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-200 hover:shadow-md">
			<div className="mb-3 flex items-center justify-between gap-3">
				<span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
					{item.type}
				</span>
				<span className="text-xs text-slate-500">{item.readMinutes} min read</span>
			</div>

			<h2 className="text-xl font-bold text-slate-900">{item.title}</h2>
			<p className="mt-3 text-sm leading-relaxed text-slate-600">{item.summary}</p>

			<div className="mt-5 flex items-center justify-between gap-3">
				<span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
					{item.tag}
				</span>
				<Link
					href="/resources"
					prefetch={false}
					className="text-sm font-semibold text-indigo-700 hover:text-indigo-800"
				>
					{ctaLabel} →
				</Link>
			</div>
		</li>
	);
});
