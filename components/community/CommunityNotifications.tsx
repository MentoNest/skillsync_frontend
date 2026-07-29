'use client';

import React, { useState } from 'react';

export interface NotificationItem {
  id: string;
  type: 'reply' | 'mention' | 'category' | 'event';
  title: string;
  message: string;
  isRead: boolean;
  timestamp: string;
}

export function CommunityNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'reply',
      title: 'New Reply',
      message: 'Alex replied to your discussion on React 19 features',
      isRead: false,
      timestamp: '5m ago',
    },
    {
      id: '2',
      type: 'mention',
      title: 'You were mentioned',
      message: 'Sarah mentioned you in Frontend Best Practices',
      isRead: false,
      timestamp: '1h ago',
    },
    {
      id: '3',
      type: 'category',
      title: 'Category Activity',
      message: 'New discussion posted in Next.js Development',
      isRead: true,
      timestamp: '1d ago',
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-2 mb-4">
        <span className="font-semibold text-lg">Community Notifications</span>
        {unreadCount > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
        <button
          onClick={markAllAsRead}
          className="text-xs text-blue-600 hover:underline ml-auto"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-2 border rounded-md p-3 bg-white shadow-sm">
        {notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => markAsRead(item.id)}
            className={`p-3 rounded-md cursor-pointer transition ${
              item.isRead ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-blue-500'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm text-gray-900">{item.title}</span>
              <span className="text-xs text-gray-500">{item.timestamp}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
