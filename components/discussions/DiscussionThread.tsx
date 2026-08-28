"use client";

import { FormEvent, useState } from "react";

type Reply = {
  id: number;
  name: string;
  initials: string;
  role: string;
  time: string;
  body: string;
  votes: number;
  color: string;
};

const initialReplies: Reply[] = [
  {
    id: 1,
    name: "Maya Chen",
    initials: "MC",
    role: "Frontend engineer",
    time: "2 hours ago",
    body: "I treated every small project as a chance to tell a story. In interviews I focused less on the feature list and more on the decisions I made, what broke, and what I would improve next time.",
    votes: 18,
    color: "bg-rose-100 text-rose-700",
  },
  {
    id: 2,
    name: "Jordan Bell",
    initials: "JB",
    role: "Career mentor",
    time: "1 hour ago",
    body: "The biggest unlock for me was asking for specific feedback. A mentor helped me turn “learn more JavaScript” into a weekly plan with a project at the end of every milestone.",
    votes: 11,
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: 3,
    name: "Sam Rivera",
    initials: "SR",
    role: "Product designer",
    time: "45 minutes ago",
    body: "I second this. Showing how you think is so much more memorable than trying to look perfect. My first role came from a case study I almost did not include because it had a messy beginning.",
    votes: 7,
    color: "bg-emerald-100 text-emerald-700",
  },
];

export default function DiscussionThread() {
  const [replies, setReplies] = useState(initialReplies);
  const [draft, setDraft] = useState("");
  const [hasVoted, setHasVoted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = draft.trim();
    if (!body) return;

    setReplies((current) => [
      ...current,
      {
        id: Date.now(),
        name: "You",
        initials: "YO",
        role: "SkillSync member",
        time: "just now",
        body,
        votes: 0,
        color: "bg-indigo-100 text-indigo-700",
      },
    ]);
    setDraft("");
  }

  return (
    <div>
      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-indigo-600">
          <span className="rounded-full bg-indigo-50 px-3 py-1">Career growth</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-400">Featured discussion</span>
        </div>
        <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
          How did you land your first engineering role?
        </h1>
        <div className="mt-6 flex items-center gap-3 border-b border-slate-100 pb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">AL</div>
          <div>
            <p className="text-sm font-bold text-slate-800">Alex Lee</p>
            <p className="text-xs text-slate-500">Junior developer · 3 days ago</p>
          </div>
        </div>
        <p className="mt-7 text-base leading-8 text-slate-700">
          I’m six months into my learning journey and starting to apply for junior roles. For those of you who have made the jump, what made the biggest difference in your search? I’d especially love to hear about the projects, habits, or conversations that helped you stand out.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setHasVoted((current) => !current)}
            aria-pressed={hasVoted}
            className={`rounded-lg border px-4 py-2 text-sm font-bold transition-colors ${hasVoted ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600"}`}
          >
            {hasVoted ? "Upvoted" : "↑ Helpful"} · {hasVoted ? 43 : 42}
          </button>
          <span className="text-sm text-slate-500">12 replies</span>
          <span className="text-sm text-slate-400">5 min read</span>
        </div>
      </article>

      <section className="mt-8" aria-labelledby="replies-heading">
        <div className="flex items-center justify-between">
          <h2 id="replies-heading" className="text-xl font-bold text-slate-950">Replies</h2>
          <button type="button" className="text-sm font-semibold text-slate-500 hover:text-indigo-600">Most helpful⌄</button>
        </div>
        <div className="mt-4 space-y-3">
          {replies.map((reply) => (
            <article key={reply.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${reply.color}`}>{reply.initials}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <p className="text-sm font-bold text-slate-800">{reply.name}</p>
                    <span className="text-xs text-slate-400">{reply.role} · {reply.time}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{reply.body}</p>
                  <button type="button" className="mt-4 text-xs font-bold text-slate-500 hover:text-indigo-600">↑ {reply.votes} helpful</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <label htmlFor="reply" className="text-base font-bold text-slate-950">Add to the discussion</label>
        <textarea
          id="reply"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Share what worked for you..."
          rows={4}
          className="mt-4 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />
        <div className="mt-3 flex items-center justify-between gap-4">
          <span className="text-xs text-slate-400">Be kind. Be specific. Be useful.</span>
          <button type="submit" disabled={!draft.trim()} className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300">Post reply</button>
        </div>
      </form>
    </div>
  );
}