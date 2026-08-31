"use client";

import { useState, useEffect, useRef } from "react";
import { useNotifications } from "@/lib/notificationContext";

export default function NotificationBell() {
  const { notifications, unreadCount, markRead, markAllRead, dismiss } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
        aria-expanded={isOpen}
        className="relative inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition-colors hover:border-indigo-300 hover:text-indigo-600"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <p className="text-sm font-bold text-slate-900">Notifications</p>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-slate-500">No notifications yet</p>
              </div>
            ) : (
              notifications.slice(0, 20).map((notif) => (
                <div
                  key={notif.id}
                  className={`flex items-start gap-3 border-b border-slate-50 px-4 py-3 last:border-0 ${
                    !notif.read ? "bg-indigo-50/50" : ""
                  }`}
                >
                  <div className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                    notif.type === "success" ? "bg-emerald-500" :
                    notif.type === "warning" ? "bg-amber-500" :
                    notif.type === "error" ? "bg-red-500" :
                    "bg-indigo-500"
                  }`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800">{notif.title}</p>
                    {notif.message && (
                      <p className="mt-0.5 text-xs text-slate-500 line-clamp-2">{notif.message}</p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    {!notif.read && (
                      <button
                        type="button"
                        onClick={() => markRead(notif.id)}
                        title="Mark as read"
                        className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                      >
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => dismiss(notif.id)}
                      title="Dismiss"
                      className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
