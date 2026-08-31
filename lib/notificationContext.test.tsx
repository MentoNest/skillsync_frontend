import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NotificationProvider, useNotifications } from "@/lib/notificationContext";

function TestComponent() {
  const { notify, markRead, markAllRead, dismiss, notifications, unreadCount } = useNotifications();
  return (
    <div>
      <span data-testid="unread">{unreadCount}</span>
      <span data-testid="total">{notifications.length}</span>
      <button onClick={() => notify("success", "New notification", "Details here")} data-testid="add">
        Add
      </button>
      <button onClick={() => notifications[0] && markRead(notifications[0].id)} data-testid="read">
        Mark Read
      </button>
      <button onClick={() => markAllRead()} data-testid="readAll">
        Mark All Read
      </button>
      <button onClick={() => notifications[0] && dismiss(notifications[0].id)} data-testid="dismiss">
        Dismiss
      </button>
    </div>
  );
}

describe("notificationContext reducer logic", () => {
  function renderTest() {
    return render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );
  }

  it("starts with zero notifications", () => {
    renderTest();
    expect(screen.getByTestId("unread").textContent).toBe("0");
    expect(screen.getByTestId("total").textContent).toBe("0");
  });

  it("adds a notification and increments unread", () => {
    renderTest();
    fireEvent.click(screen.getByTestId("add"));
    expect(screen.getByTestId("total").textContent).toBe("1");
    expect(screen.getByTestId("unread").textContent).toBe("1");
  });

  it("marks a notification as read", () => {
    renderTest();
    fireEvent.click(screen.getByTestId("add"));
    expect(screen.getByTestId("unread").textContent).toBe("1");
    fireEvent.click(screen.getByTestId("read"));
    expect(screen.getByTestId("unread").textContent).toBe("0");
  });

  it("marks all notifications as read", () => {
    renderTest();
    fireEvent.click(screen.getByTestId("add"));
    fireEvent.click(screen.getByTestId("add"));
    expect(screen.getByTestId("unread").textContent).toBe("2");
    fireEvent.click(screen.getByTestId("readAll"));
    expect(screen.getByTestId("unread").textContent).toBe("0");
  });

  it("dismisses a notification", () => {
    renderTest();
    fireEvent.click(screen.getByTestId("add"));
    expect(screen.getByTestId("total").textContent).toBe("1");
    fireEvent.click(screen.getByTestId("dismiss"));
    expect(screen.getByTestId("total").textContent).toBe("0");
    expect(screen.getByTestId("unread").textContent).toBe("0");
  });

  it("supports multiple notification types", () => {
    function TypeTest() {
      const { notify } = useNotifications();
      return (
        <div>
          <button onClick={() => notify("info", "Info msg")} data-testid="info">Info</button>
          <button onClick={() => notify("warning", "Warn msg")} data-testid="warn">Warn</button>
          <button onClick={() => notify("error", "Err msg")} data-testid="error">Error</button>
        </div>
      );
    }
    render(
      <NotificationProvider>
        <TypeTest />
      </NotificationProvider>
    );
    fireEvent.click(screen.getByTestId("info"));
    fireEvent.click(screen.getByTestId("warn"));
    fireEvent.click(screen.getByTestId("error"));
  });
});
