"use client";

import { useEffect, useMemo, useCallback, useState } from "react";
import { useNotifications, type NotificationType } from "@/lib/notificationContext";

const AUTO_DISMISS_MS = 5000;

const iconMap: Record<NotificationType, React.ReactNode> = {
  info: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  success: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  error: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
};

const colorMap: Record<NotificationType, string> = {
  info: "bg-indigo-50 border-indigo-200 text-indigo-700",
  success: "bg-emerald-50 border-emerald-200 text-emerald-700",
  warning: "bg-amber-50 border-amber-200 text-amber-700",
  error: "bg-red-50 border-red-200 text-red-700",
};

export default function NotificationToast() {
  const { notifications, dismiss } = useNotifications();
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  const hideToast = useCallback((id: string) => {
    setDismissedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const visibleToasts = useMemo(
    () => notifications.filter((n) => !dismissedIds.has(n.id)).slice(0, 5),
    [notifications, dismissedIds]
  );

  useEffect(() => {
    if (visibleToasts.length === 0) return;
    const timers = visibleToasts.map((n) =>
      setTimeout(() => hideToast(n.id), n.duration ?? AUTO_DISMISS_MS)
    );
    return () => timers.forEach(clearTimeout);
  }, [visibleToasts, hideToast]);

  if (visibleToasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col gap-2" role="region" aria-label="Notifications">
      {visibleToasts.map((notif) => (
        <div
          key={notif.id}
          role="alert"
          className={`pointer-events-auto flex w-80 max-w-[calc(100vw-2rem)] items-start gap-3 rounded-xl border p-4 shadow-lg animate-in slide-in-from-right ${colorMap[notif.type]}`}
        >
          <div className="shrink-0">{iconMap[notif.type]}</div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">{notif.title}</p>
            {notif.message && <p className="mt-0.5 text-xs opacity-80">{notif.message}</p>}
          </div>
          <button
            type="button"
            onClick={() => {
              hideToast(notif.id);
              dismiss(notif.id);
            }}
            title="Dismiss"
            className="shrink-0 rounded p-1 opacity-60 transition-opacity hover:opacity-100"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
