import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ShareButton from "@/components/common/ShareButton";

describe("ShareButton", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders a share button", () => {
    render(<ShareButton url="/discussions/1" title="Test Discussion" />);
    expect(screen.getByRole("button", { name: /share discussion/i })).toBeInTheDocument();
  });

  it("copies URL to clipboard when navigator.share is unavailable", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    delete (navigator as unknown as { share?: unknown }).share;

    render(<ShareButton url="/discussions/1" title="Test Discussion" />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /share discussion/i }));
    });

    expect(writeText).toHaveBeenCalledWith(expect.stringContaining("/discussions/1"));
    expect(screen.getByText("Copied!")).toBeInTheDocument();
  });

  it("uses navigator.share when available", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { share });
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(<ShareButton url="/discussions/1" title="Test Discussion" />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /share discussion/i }));
    });

    expect(share).toHaveBeenCalledWith({
      title: "Test Discussion",
      text: "Test Discussion",
      url: expect.stringContaining("/discussions/1"),
    });
    expect(writeText).not.toHaveBeenCalled();
    expect(screen.getByText("Shared!")).toBeInTheDocument();
  });

  it("falls back to clipboard when navigator.share is aborted", async () => {
    const abortError = new DOMException("Aborted", "AbortError");
    const share = vi.fn().mockRejectedValue(abortError);
    Object.assign(navigator, { share });
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(<ShareButton url="/discussions/1" title="Test Discussion" />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /share discussion/i }));
    });

    expect(share).toHaveBeenCalled();
    expect(writeText).not.toHaveBeenCalled();
  });

  it("shows error state when clipboard fails", async () => {
    delete (navigator as unknown as { share?: unknown }).share;
    const writeText = vi.fn().mockRejectedValue(new Error("Clipboard failed"));
    Object.assign(navigator, { clipboard: { writeText } });

    render(<ShareButton url="/discussions/1" title="Test Discussion" />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /share discussion/i }));
    });

    expect(screen.getByText("Failed")).toBeInTheDocument();
  });
});
