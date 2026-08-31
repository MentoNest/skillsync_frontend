"use client";

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from "react";

export type NotificationType = "info" | "success" | "warning" | "error";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  read: boolean;
  createdAt: number;
  duration?: number;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}

type Action =
  | { type: "ADD"; notification: Notification }
  | { type: "MARK_READ"; id: string }
  | { type: "MARK_ALL_READ" }
  | { type: "DISMISS"; id: string };

function reducer(state: NotificationState, action: Action): NotificationState {
  switch (action.type) {
    case "ADD": {
      const notifications = [action.notification, ...state.notifications];
      return {
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
      };
    }
    case "MARK_READ": {
      const notifications = state.notifications.map((n) =>
        n.id === action.id ? { ...n, read: true } : n
      );
      return { notifications, unreadCount: notifications.filter((n) => !n.read).length };
    }
    case "MARK_ALL_READ": {
      const notifications = state.notifications.map((n) => ({ ...n, read: true }));
      return { notifications, unreadCount: 0 };
    }
    case "DISMISS": {
      const notifications = state.notifications.filter((n) => n.id !== action.id);
      return { notifications, unreadCount: notifications.filter((n) => !n.read).length };
    }
    default:
      return state;
  }
}

interface NotificationContextValue {
  notifications: Notification[];
  unreadCount: number;
  notify: (type: NotificationType, title: string, message?: string, duration?: number) => string;
  markRead: (id: string) => void;
  markAllRead: () => void;
  dismiss: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { notifications: [], unreadCount: 0 });

  const notify = useCallback(
    (type: NotificationType, title: string, message?: string, duration?: number): string => {
      const id = `notif-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      dispatch({
        type: "ADD",
        notification: { id, type, title, message, read: false, createdAt: Date.now(), duration },
      });
      return id;
    },
    []
  );

  const markRead = useCallback((id: string) => {
    dispatch({ type: "MARK_READ", id });
  }, []);

  const markAllRead = useCallback(() => {
    dispatch({ type: "MARK_ALL_READ" });
  }, []);

  const dismiss = useCallback((id: string) => {
    dispatch({ type: "DISMISS", id });
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications: state.notifications, unreadCount: state.unreadCount, notify, markRead, markAllRead, dismiss }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}
