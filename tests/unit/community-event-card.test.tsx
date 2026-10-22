import { render, screen, fireEvent } from "@testing-library/react";
import {
  CommunityEventCard,
  type CommunityEventCardProps,
} from "@/components/community/CommunityEventCard";
import type { CommunityEvent } from "@/lib/community-types";

const baseEvent: CommunityEvent = {
  id: "event-1",
  title: "Resume Review Clinic",
  host: "Alice Johnson",
  startsAt: "2026-09-30T17:00:00.000Z",
  endsAt: "2026-09-30T19:00:00.000Z",
  registrationCount: 42,
  capacity: 60,
};

function renderCard(props: Partial<CommunityEventCardProps> = {}) {
  return render(<CommunityEventCard event={baseEvent} {...props} />);
}

describe("CommunityEventCard", () => {
  it("renders the event title and host", () => {
    renderCard();
    expect(screen.getByText("Resume Review Clinic")).toBeInTheDocument();
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
  });

  it("renders the registration count and capacity", () => {
    renderCard();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText(/registered of 60/)).toBeInTheDocument();
  });

  it("omits the capacity when none is provided", () => {
    renderCard({ event: { ...baseEvent, capacity: undefined } });
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.queryByText(/of \d/)).not.toBeInTheDocument();
  });

  it("renders date and time in semantic time elements", () => {
    const { container } = renderCard();
    const times = container.querySelectorAll("time");
    expect(times).toHaveLength(2);
    times.forEach((time) => {
      expect(time).toHaveAttribute("datetime", baseEvent.startsAt);
      expect(time.textContent).not.toBe("");
    });
  });

  it("calls onRegister with the event id", () => {
    const onRegister = jest.fn();
    renderCard({ onRegister });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(onRegister).toHaveBeenCalledWith("event-1");
  });

  it("disables the action when no handler is provided", () => {
    renderCard();
    expect(screen.getByRole("button", { name: /register/i })).toBeDisabled();
  });

  it("shows a registered state and disables the action", () => {
    renderCard({ event: { ...baseEvent, isRegistered: true }, onRegister: jest.fn() });
    const button = screen.getByRole("button", { name: /register/i });
    expect(button).toHaveTextContent("Registered");
    expect(button).toBeDisabled();
  });

  it("shows a full state when capacity is reached", () => {
    renderCard({
      event: { ...baseEvent, registrationCount: 60 },
      onRegister: jest.fn(),
    });
    const button = screen.getByRole("button", { name: /register/i });
    expect(button).toHaveTextContent("Full");
    expect(button).toBeDisabled();
  });

  it("shows a pending state while registering", () => {
    renderCard({ isRegistering: true, onRegister: jest.fn() });
    expect(screen.getByRole("button", { name: /register/i })).toBeDisabled();
  });
});
