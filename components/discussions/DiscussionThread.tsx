"use client";

import { FormEvent, useState } from "react";
import { notifyCommunityUpdate } from "@/lib/useDiscussions";
import LikeButton from "../common/LikeButton";
import ShareButton from "../common/ShareButton";
import PinButton from "./PinButton";
import LockButton from "./LockButton";
import { useNotifications } from "@/lib/notificationContext";

type Reply = {
  id: number;
  name: string;
  initials: string;
  role: string;
  time: string;
  body: string;
  votes: number;
  color: string;
  replies?: Reply[];
  parentId?: number | null;
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
    parentId: null,
    replies: [
      {
        id: 4,
        name: "Alex Lee",
        initials: "AL",
        role: "Junior developer",
        time: "1 hour ago",
        body: "This is really helpful advice! I have been focusing too much on listing features instead of telling the story behind them.",
        votes: 3,
        color: "bg-sky-100 text-sky-700",
        parentId: 1,
        replies: [
          {
            id: 5,
            name: "Maya Chen",
            initials: "MC",
            role: "Frontend engineer",
            time: "45 minutes ago",
            body: "Glad it helps! Storytelling makes you memorable in interviews.",
            votes: 2,
            color: "bg-rose-100 text-rose-700",
            parentId: 4,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Jordan Bell",
    initials: "JB",
    role: "Career mentor",
    time: "1 hour ago",
    body: "The biggest unlock for me was asking for specific feedback. A mentor helped me turn \"learn more JavaScript\" into a weekly plan with a project at the end of every milestone.",
    votes: 11,
    color: "bg-amber-100 text-amber-700",
    parentId: null,
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
    parentId: null,
  },
];

function ReplyItem({ 
  reply, 
  depth = 0, 
  onAddReply,
  collapsedThreads,
  toggleCollapse,
  isLocked = false,
}: { 
  reply: Reply; 
  depth?: number;
  onAddReply: (parentId: number, body: string) => void;
  collapsedThreads: Set<number>;
  toggleCollapse: (id: number) => void;
  isLocked?: boolean;
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyDraft, setReplyDraft] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCollapsed = collapsedThreads.has(reply.id);
  const hasNestedReplies = reply.replies && reply.replies.length > 0;
  const totalNestedReplies = hasNestedReplies ? countAllReplies(reply.replies!) : 0;

  const handleReplySubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const body = replyDraft.trim();
      if (!body) return;

      setIsSubmitting(true);
      setTimeout(() => {
        onAddReply(reply.id, body);
        setReplyDraft("");
        setShowReplyForm(false);
        setIsSubmitting(false);
      }, 500);
    },
    [reply.id, replyDraft, onAddReply]
  );

  return (
    <div className={depth > 0 ? "ml-6 mt-3 border-l-2 border-slate-100 pl-4" : ""}>
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${reply.color}`}
          >
            {reply.initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <p className="text-sm font-bold text-slate-800">{reply.name}</p>
              <span className="text-xs text-slate-400">
                {reply.role} · {reply.time}
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">{reply.body}</p>
            <div className="mt-4 flex items-center gap-4">
              <button type="button" className="text-xs font-bold text-slate-500 hover:text-indigo-600">↑ {reply.votes} helpful</button>
              {!isLocked && (
                <button 
                  type="button" 
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="text-xs font-bold text-slate-500 hover:text-indigo-600"
                >
                  Reply
                </button>
              )}
              {hasNestedReplies && (
                <button
                  type="button"
                  onClick={() => toggleCollapse(reply.id)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                >
                  {isCollapsed
                    ? `↑ Show ${totalNestedReplies} nested repl${totalNestedReplies > 1 ? "ies" : "y"}`
                    : `↓ Hide ${totalNestedReplies} nested repl${totalNestedReplies > 1 ? "ies" : "y"}`}
                </button>
              )}
            </div>

            {showReplyForm && (
              <form
                onSubmit={handleReplySubmit}
                className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <label
                  htmlFor={`reply-${reply.id}`}
                  className="text-sm font-bold text-slate-950"
                >
                  Reply to {reply.name}
                </label>
                <textarea
                  id={`reply-${reply.id}`}
                  value={replyDraft}
                  onChange={(event) => setReplyDraft(event.target.value)}
                  placeholder="Write your reply..."
                  rows={3}
                  className="mt-3 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
                <div className="mt-3 flex items-center justify-between gap-4">
                  <span className="text-xs text-slate-400">
                    Be kind. Be specific. Be useful.
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowReplyForm(false);
                        setReplyDraft("");
                      }}
                      className="rounded-lg px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!replyDraft.trim() || isSubmitting}
                      className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      {isSubmitting && (
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      )}
                      Post Reply
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </article>
      
      {!isCollapsed && hasNestedReplies && reply.replies!.map((nestedReply) => (
        <ReplyItem
          key={nestedReply.id}
          reply={nestedReply}
          depth={depth + 1}
          onAddReply={onAddReply}
          collapsedThreads={collapsedThreads}
          toggleCollapse={toggleCollapse}
          isLocked={isLocked}
        />
      ))}
    </div>
  );
});

export default function DiscussionThread() {
  const { trackReply } = useCommunityAnalytics();
  const [replies, setReplies] = useState<Reply[]>(initialReplies);
  const [mainDraft, setMainDraft] = useState("");
  const [isSubmittingMain, setIsSubmittingMain] = useState(false);
  const [collapsedThreads, setCollapsedThreads] = useState<Set<number>>(new Set());
  const [mainFormError, setMainFormError] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const { notify } = useNotifications();

  const toggleCollapse = useCallback((id: number) => {
    setCollapsedThreads((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }

  function addReplyToTree(repliesList: Reply[], parentId: number, newReply: Reply): Reply[] {
    return repliesList.map(reply => {
      if (reply.id === parentId) {
        return {
          ...reply,
          replies: [...(reply.replies || []), newReply]
        };
      }
      if (reply.replies) {
        return {
          ...reply,
          replies: addReplyToTree(reply.replies, parentId, newReply)
        };
      }
      return reply;
    });
  }

  function handleAddReply(parentId: number, body: string) {
    const newReply: Reply = {
      id: Date.now(),
      name: "You",
      initials: "YO",
      role: "SkillSync member",
      time: "just now",
      body,
      votes: 0,
      color: "bg-indigo-100 text-indigo-700",
      parentId,
    };
    setReplies(current => addReplyToTree(current, parentId, newReply));
    notifyCommunityUpdate();
  }

  async function handleMainSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = mainDraft.trim();
    setMainFormError("");
    
    if (!body) {
      setMainFormError("Please enter a comment before posting.");
      return;
    }
    
    if (body.length < 10) {
      setMainFormError("Comment must be at least 10 characters long.");
      return;
    }

  const handleAddReply = useCallback(
    (parentId: number, body: string) => {
      const newReply: Reply = {
        id: Date.now(),
        name: "You",
        initials: "YO",
        role: "SkillSync member",
        time: "just now",
        body,
        votes: 0,
        color: "bg-indigo-100 text-indigo-700",
        parentId: null,
      },
    ]);
    notifyCommunityUpdate();
    setMainDraft("");
    setIsSubmittingMain(false);
    notify("success", "Reply posted", "Your reply has been added to the discussion.");
  }

  const handleMainSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const body = mainDraft.trim();
      setMainFormError("");

      if (!body) {
        setMainFormError("Please enter a comment before posting.");
        return;
      }

      if (body.length < 10) {
        setMainFormError("Comment must be at least 10 characters long.");
        return;
      }

      setIsSubmittingMain(true);
      await new Promise((resolve) => setTimeout(resolve, 800));

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
          parentId: null,
        },
      ]);
      setMainDraft("");
      setIsSubmittingMain(false);
      trackReply("thread-1");
    },
    [mainDraft, trackReply]
  );

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
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">
            AL
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Alex Lee</p>
            <p className="text-xs text-slate-500">Junior developer · 3 days ago</p>
          </div>
        </div>
        <p className="mt-7 text-base leading-8 text-slate-700">
          I&apos;m six months into my learning journey and starting to apply for junior
          roles. For those of you who have made the jump, what made the biggest
          difference in your search? I&apos;d especially love to hear about the projects,
          habits, or conversations that helped you stand out.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <LikeButton id="discussion-thread-1" initialCount={42} />
          <ShareButton url="/discussions/1" title="How did you land your first engineering role?" text="Join the conversation with the SkillSync community." />
          <PinButton
            isPinned={isPinned}
            onToggle={() => {
              setIsPinned((p) => {
                const next = !p;
                notify(
                  next ? "success" : "info",
                  next ? "Discussion pinned" : "Discussion unpinned",
                  next ? "This discussion is now at the top of the feed." : undefined
                );
                return next;
              });
            }}
          />
          <LockButton
            isLocked={isLocked}
            onToggle={() => {
              setIsLocked((l) => {
                const next = !l;
                notify(
                  next ? "warning" : "info",
                  next ? "Discussion locked" : "Discussion unlocked",
                  next ? "No new replies can be added to this discussion." : "Replies are now allowed again."
                );
                return next;
              });
            }}
          />
          <span className="text-sm text-slate-500">{countTotalReplies(replies)} replies</span>
          <span className="text-sm text-slate-400">5 min read</span>
          <button
            type="button"
            onClick={() => setShowReportDialog(true)}
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
            title="Report this discussion"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
              />
            </svg>
            Report
          </button>
        </div>
      </article>

      <section className="mt-8" aria-labelledby="replies-heading">
        <div className="flex items-center justify-between">
          <h2 id="replies-heading" className="text-xl font-bold text-slate-950">
            Replies
          </h2>
          <button
            type="button"
            className="text-sm font-semibold text-slate-500 hover:text-indigo-600"
          >
            Most helpful⌄
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {replies.filter(r => r.parentId === null).map((reply) => (
            <ReplyItem
              key={reply.id}
              reply={reply}
              onAddReply={handleAddReply}
              collapsedThreads={collapsedThreads}
              toggleCollapse={toggleCollapse}
              isLocked={isLocked}
            />
          ))}
        </div>
      </section>

      <form onSubmit={handleMainSubmit} className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <label htmlFor="main-reply" className="text-base font-bold text-slate-950">Add to the discussion</label>
        {isLocked ? (
          <p className="mt-3 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 1C8.676 1 6 3.676 6 7v2H4v14h16V9h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4z" />
            </svg>
            This discussion is locked. No new replies can be added.
          </p>
        ) : (
          <>
            <textarea
              id="main-reply"
              value={mainDraft}
              onChange={(event) => setMainDraft(event.target.value)}
              placeholder="Share what worked for you..."
              rows={4}
              className="mt-4 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
            {mainFormError && (
              <p className="mt-2 text-sm text-red-600">{mainFormError}</p>
            )}
            <div className="mt-3 flex items-center justify-between gap-4">
              <span className="text-xs text-slate-400">Be kind. Be specific. Be useful.</span>
              <button 
                type="submit" 
                disabled={!mainDraft.trim() || isSubmittingMain} 
                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300 flex items-center gap-2"
              >
                {isSubmittingMain && (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                )}
                {isSubmittingMain ? "Posting..." : "Post reply"}
              </button>
            </div>
          </>
        )}
      </form>

      {showReportDialog && (
        <ReportDialog
          discussionId="thread-1"
          discussionTitle="How did you land your first engineering role?"
          onClose={() => setShowReportDialog(false)}
        />
      )}
    </div>
  );
}
