import { NextRequest, NextResponse } from "next/server";

const mockNotifications = [
  {
    id: "notif-1",
    type: "reply" as const,
    title: "New reply to your discussion",
    message: "Alice Johnson replied to 'Getting started with React'",
    link: "/community/general/discussion-1",
    isRead: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "notif-2",
    type: "mention" as const,
    title: "You were mentioned",
    message: "Bob Smith mentioned you in 'Best practices for mentoring'",
    link: "/community/mentoring/discussion-2",
    isRead: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "notif-3",
    type: "category_update" as const,
    title: "New discussion in Technical",
    message: "A new discussion was posted in the Technical category",
    link: "/community/technical",
    isRead: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "notif-4",
    type: "event_reminder" as const,
    title: "Event reminder",
    message: "Mentoring session starts in 1 hour",
    link: "/events/1",
    isRead: true,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({
    notifications: mockNotifications,
    unreadCount: mockNotifications.filter((n) => !n.isRead).length,
  });
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { notificationIds, markAllAsRead } = body;

    if (markAllAsRead) {
      mockNotifications.forEach((n) => (n.isRead = true));
    } else if (notificationIds) {
      notificationIds.forEach((id: string) => {
        const notification = mockNotifications.find((n) => n.id === id);
        if (notification) notification.isRead = true;
      });
    }

    return NextResponse.json({
      notifications: mockNotifications,
      unreadCount: mockNotifications.filter((n) => !n.isRead).length,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
