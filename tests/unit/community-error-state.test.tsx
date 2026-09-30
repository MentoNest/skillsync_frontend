import { render, screen, fireEvent } from "@testing-library/react";
import { CommunityErrorState } from "@/components/community/CommunityErrorState";

describe("CommunityErrorState", () => {
  it("announces the failure through an alert with the provided message", () => {
    render(<CommunityErrorState message="Feed unavailable" />);

    expect(screen.getByRole("alert")).toHaveTextContent("Feed unavailable");
  });

  it("invokes the retry handler when the retry action is pressed", () => {
    const onRetry = jest.fn();
    render(<CommunityErrorState onRetry={onRetry} />);

    fireEvent.click(screen.getByRole("button", { name: /try again/i }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("disables retry and announces busy while the request is retrying", () => {
    render(<CommunityErrorState onRetry={() => {}} isRetrying />);

    const retry = screen.getByRole("button", { name: /retrying/i });

    expect(retry).toBeDisabled();
    expect(retry).toHaveAttribute("aria-busy", "true");
  });

  it("omits the retry action when no handler is provided", () => {
    render(<CommunityErrorState />);

    expect(screen.queryByRole("button")).toBeNull();
  });

  it("falls back to a default title and message", () => {
    render(<CommunityErrorState />);

    expect(screen.getByRole("heading", { name: /something went wrong/i })).toBeInTheDocument();
  });
});
