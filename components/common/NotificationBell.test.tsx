import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NotificationProvider, useNotifications } from "@/lib/notificationContext";
import NotificationBell from "@/components/common/NotificationBell";

function TestConsumer() {
  const { notify, unreadCount } = useNotifications();
  return (
    <div>
      <span data-testid="count">{unreadCount}</span>
      <button onClick={() => notify("success", "Test notification")} data-testid="trigger">
        Trigger
      </button>
    </div>
  );
}

function renderWithProvider(ui: React.ReactElement) {
  return render(<NotificationProvider>{ui}</NotificationProvider>);
}

describe("NotificationBell", () => {
  it("renders with zero unread count", () => {
    renderWithProvider(<NotificationBell />);
    expect(screen.getByLabelText("Notifications")).toBeInTheDocument();
  });

  it("opens dropdown on click", () => {
    renderWithProvider(
      <>
        <NotificationBell />
        <TestConsumer />
      </>
    );
    fireEvent.click(screen.getByLabelText(/notifications/i));
    expect(screen.getByText("No notifications yet")).toBeInTheDocument();
  });

  it("shows unread count badge after notification", () => {
    renderWithProvider(
      <>
        <NotificationBell />
        <TestConsumer />
      </>
    );
    fireEvent.click(screen.getByTestId("trigger"));
    expect(screen.getByTestId("count").textContent).toBe("1");
  });

  it("marks all as read", () => {
    renderWithProvider(
      <>
        <NotificationBell />
        <TestConsumer />
      </>
    );
    fireEvent.click(screen.getByTestId("trigger"));
    fireEvent.click(screen.getByLabelText(/notifications/i));
    fireEvent.click(screen.getByText("Mark all read"));
    expect(screen.getByTestId("count").textContent).toBe("0");
  });
});

describe("NotificationProvider", () => {
  it("notifies and tracks unread count", () => {
    renderWithProvider(<TestConsumer />);
    expect(screen.getByTestId("count").textContent).toBe("0");
    fireEvent.click(screen.getByTestId("trigger"));
    expect(screen.getByTestId("count").textContent).toBe("1");
  });
});
