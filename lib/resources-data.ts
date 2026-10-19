import type { ResourceListItem } from "@/components/resources/ResourceSearchList";

/**
 * Learning tracks and articles, shared by the `/resources` featured sections
 * and the `/resources/tracks` and `/resources/articles` "View all" pages, so a
 * featured entry can never drift from its listing.
 *
 * Placeholder content until the editorial is written.
 */

export const RESOURCE_TRACKS: ResourceListItem[] = [
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

export const RESOURCE_ARTICLES: ResourceListItem[] = [
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
