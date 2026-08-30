import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PinButton from "@/components/discussions/PinButton";
import LockButton from "@/components/discussions/LockButton";

describe("PinButton", () => {
  it("renders as not pinned by default", () => {
    const onToggle = vi.fn();
    render(<PinButton isPinned={false} onToggle={onToggle} />);
    expect(screen.getByRole("button", { name: /pin discussion/i })).toBeInTheDocument();
    expect(screen.getByText("Pin")).toBeInTheDocument();
  });

  it("renders as pinned when isPinned is true", () => {
    const onToggle = vi.fn();
    render(<PinButton isPinned={true} onToggle={onToggle} />);
    expect(screen.getByRole("button", { name: /unpin discussion/i })).toBeInTheDocument();
    expect(screen.getByText("Pinned")).toBeInTheDocument();
  });

  it("calls onToggle when clicked", () => {
    const onToggle = vi.fn();
    render(<PinButton isPinned={false} onToggle={onToggle} />);
    fireEvent.click(screen.getByRole("button", { name: /pin discussion/i }));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("reflects aria-pressed state", () => {
    const onToggle = vi.fn();
    const { rerender } = render(<PinButton isPinned={false} onToggle={onToggle} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
    rerender(<PinButton isPinned={true} onToggle={onToggle} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });
});

describe("LockButton", () => {
  it("renders as unlocked by default", () => {
    const onToggle = vi.fn();
    render(<LockButton isLocked={false} onToggle={onToggle} />);
    expect(screen.getByRole("button", { name: /lock discussion/i })).toBeInTheDocument();
    expect(screen.getByText("Lock")).toBeInTheDocument();
  });

  it("renders as locked when isLocked is true", () => {
    const onToggle = vi.fn();
    render(<LockButton isLocked={true} onToggle={onToggle} />);
    expect(screen.getByRole("button", { name: /unlock discussion/i })).toBeInTheDocument();
    expect(screen.getByText("Locked")).toBeInTheDocument();
  });

  it("calls onToggle when clicked", () => {
    const onToggle = vi.fn();
    render(<LockButton isLocked={false} onToggle={onToggle} />);
    fireEvent.click(screen.getByRole("button", { name: /lock discussion/i }));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("reflects aria-pressed state", () => {
    const onToggle = vi.fn();
    const { rerender } = render(<LockButton isLocked={false} onToggle={onToggle} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
    rerender(<LockButton isLocked={true} onToggle={onToggle} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });
});
