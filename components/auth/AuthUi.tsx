"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";

/** Google/GitHub buttons with an "or" divider, ready for provider wiring (#1362). */
export function SocialButtons({ onSelect }: { onSelect?: (provider: "google" | "github") => void }) {
  const btn = "flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2 text-sm font-medium hover:bg-gray-50";
  return (
    <div className="space-y-3">
      <button type="button" className={btn} aria-label="Continue with Google" onClick={() => onSelect?.("google")}>
        <svg aria-hidden width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#4285F4" /></svg>
        Continue with Google
      </button>
      <button type="button" className={btn} aria-label="Continue with GitHub" onClick={() => onSelect?.("github")}>
        <svg aria-hidden width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#111827" /></svg>
        Continue with GitHub
      </button>
      <div className="flex items-center gap-3 text-xs text-gray-500" role="separator">
        <span className="h-px flex-1 bg-gray-200" />or<span className="h-px flex-1 bg-gray-200" />
      </div>
    </div>
  );
}

/** Split-screen auth layout: form first on mobile, mentor highlight on desktop (#1363). */
export function AuthSplitLayout({ children, highlight }: { children: ReactNode; highlight?: ReactNode }) {
  return (
    <div className="grid min-h-screen overflow-hidden md:grid-cols-2">
      <section className="flex items-center justify-center px-4 py-12">{children}</section>
      <aside className="hidden items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-600 p-12 text-white md:flex">
        {highlight ?? <p className="max-w-sm text-2xl font-semibold">Learn faster with mentors who have done it before.</p>}
      </aside>
    </div>
  );
}

/** Password input with an accessible show/hide toggle; fixed width avoids layout shift (#1365). */
export function PasswordInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input {...props} type={visible ? "text" : "password"} className={`${props.className ?? ""} pr-16`} />
      <button type="button" aria-label={visible ? "Hide password" : "Show password"} aria-pressed={visible}
        onClick={() => setVisible((v) => !v)} className="absolute inset-y-0 right-2 w-12 text-sm text-purple-700">
        {visible ? "Hide" : "Show"}
      </button>
    </div>
  );
}
