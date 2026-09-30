import { render, screen, fireEvent, act } from "@testing-library/react";
import { CommunityToast } from "@/components/community/CommunityToast";

describe("CommunityToast", () => {
  it("renders the message in a polite live region", () => {
    render(<CommunityToast message="Discussion published" onDismiss={() => {}} />);

    const toast = screen.getByTestId("community-toast");
    expect(toast).toHaveAttribute("role", "status");
    expect(toast).toHaveAttribute("aria-live", "polite");
    expect(toast).toHaveTextContent("Discussion published");
  });

  it("dismisses when the close button is pressed", () => {
    const onDismiss = jest.fn();
    render(<CommunityToast message="Discussion published" onDismiss={onDismiss} />);

    fireEvent.click(screen.getByRole("button", { name: /dismiss notification/i }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("auto-dismisses after the configured duration", () => {
    jest.useFakeTimers();
    const onDismiss = jest.fn();
    render(
      <CommunityToast message="Discussion published" onDismiss={onDismiss} duration={1000} />
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(onDismiss).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it("stays open when the duration is disabled", () => {
    jest.useFakeTimers();
    const onDismiss = jest.fn();
    render(
      <CommunityToast message="Discussion published" onDismiss={onDismiss} duration={0} />
    );

    act(() => {
      jest.advanceTimersByTime(60000);
    });

    expect(onDismiss).not.toHaveBeenCalled();
    jest.useRealTimers();
  });
});
