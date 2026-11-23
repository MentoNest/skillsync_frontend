"use client";

import React, { useEffect, useRef, useState } from "react";

export interface NotificationItem {
  id: string;
  type: "reply" | "mention" | "category" | "event";
  title: string;
  message: string;
  isRead: boolean;
  timestamp: string;
  link?: string;
}

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "community-reply",
    type: "reply",
    title: "New reply",
    message: "Someone replied to a discussion you follow.",
    isRead: false,
    timestamp: "5m",
  },
  {
    id: "community-mention",
    type: "mention",
    title: "You were mentioned",
    message: "Open the community to view the mention.",
    isRead: false,
    timestamp: "1h",
  },
];

const STORAGE_KEY = "skillsync.community.notifications";

export interface CommunityNotificationsProps {
  notifications?: NotificationItem[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
}

export function CommunityNotifications({
  notifications: controlledNotifications,
  onMarkAsRead,
  onMarkAllAsRead,
}: CommunityNotificationsProps = {}) {
  const [open, setOpen] = useState(false);
  const [localNotifications, setLocalNotifications] = useState<NotificationItem[]>(() => {
    if (controlledNotifications) return controlledNotifications;
    if (typeof window === "undefined") return DEFAULT_NOTIFICATIONS;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as NotificationItem[];
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Keep the default notification state if persisted data is invalid.
    }
    return DEFAULT_NOTIFICATIONS;
  });
  const rootRef = useRef<HTMLDivElement>(null);
  const notifications = controlledNotifications ?? localNotifications;

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const persist = (next: NotificationItem[]) => {
    setLocalNotifications(next);
    if (!controlledNotifications) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  };

  const markAsRead = (id: string) => {
    persist(notifications.map((item) => item.id === id ? { ...item, isRead: true } : item));
    onMarkAsRead?.(id);
  };

  const markAllAsRead = () => {
    persist(notifications.map((item) => ({ ...item, isRead: true })));
    onMarkAllAsRead?.();
  };

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  return (
    <div ref={rootRef} className="relative">
      <button type="button" onClick={() => setOpen((value) => !value)} aria-label={`Community notifications${unreadCount ? `, ${unreadCount} unread` : ""}`} aria-expanded={open} aria-haspopup="menu" className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-purple-700">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">{unreadCount > 9 ? "9+" : unreadCount}</span>}
      </button>
      {open && (
        <div role="menu" aria-label="Community notifications" className="absolute right-0 z-50 mt-2 w-[22rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-sm font-bold text-gray-900">Community notifications</h2>
            {unreadCount > 0 && <button type="button" onClick={markAllAsRead} className="text-xs font-semibold text-purple-700 hover:underline">Mark all as read</button>}
          </div>
          {notifications.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-gray-500">No notifications</p>
          ) : (
            <ul className="max-h-96 overflow-y-auto">
              {notifications.map((item) => (
                <li key={item.id} className={item.isRead ? "" : "bg-purple-50"}>
                  <button type="button" role="menuitem" onClick={() => markAsRead(item.id)} className="flex w-full items-start gap-3 border-b border-gray-100 px-4 py-3 text-left last:border-0 hover:bg-gray-50">
                    <span className="mt-0.5 text-lg" aria-hidden="true">{item.type === "reply" ? "💬" : item.type === "mention" ? "@" : item.type === "event" ? "📅" : "🏷️"}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-gray-900">{item.title}</span>
                      <span className="mt-0.5 block text-xs text-gray-600">{item.message}</span>
                    </span>
                    <span className="text-xs text-gray-400">{item.timestamp}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default CommunityNotifications;
