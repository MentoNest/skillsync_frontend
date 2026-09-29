import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchInput from "@/components/mentor-discovery/SearchInput";

describe("SearchInput", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders with default placeholder", () => {
    render(<SearchInput value="" onChange={mockOnChange} />);

    const input = screen.getByLabelText("Search mentors");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute(
      "placeholder",
      "Search mentors by name, skill, or company..."
    );
  });

  it("renders with custom placeholder", () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        placeholder="Custom placeholder"
      />
    );

    const input = screen.getByLabelText("Search mentors");
    expect(input).toHaveAttribute("placeholder", "Custom placeholder");
  });

  it("displays the provided value", () => {
    render(<SearchInput value="React" onChange={mockOnChange} />);

    const input = screen.getByLabelText("Search mentors") as HTMLInputElement;
    expect(input.value).toBe("React");
  });

  it("shows search icon", () => {
    const { container } = render(
      <SearchInput value="" onChange={mockOnChange} />
    );

    const searchIcon = container.querySelector('svg[aria-hidden="true"]');
    expect(searchIcon).toBeInTheDocument();
  });

  it("shows clear button when input has value", () => {
    render(<SearchInput value="React" onChange={mockOnChange} />);

    const clearButton = screen.getByLabelText("Clear search");
    expect(clearButton).toBeInTheDocument();
  });

  it("does not show clear button when input is empty", () => {
    render(<SearchInput value="" onChange={mockOnChange} />);

    const clearButton = screen.queryByLabelText("Clear search");
    expect(clearButton).not.toBeInTheDocument();
  });

  it("calls onChange when clear button is clicked", () => {
    render(<SearchInput value="React" onChange={mockOnChange} />);

    const clearButton = screen.getByLabelText("Clear search");
    fireEvent.click(clearButton);

    expect(mockOnChange).toHaveBeenCalledWith("");
  });

  it("debounces onChange calls", async () => {
    render(<SearchInput value="" onChange={mockOnChange} debounceMs={300} />);

    const input = screen.getByLabelText("Search mentors");

    // Type quickly
    fireEvent.change(input, { target: { value: "R" } });
    fireEvent.change(input, { target: { value: "Re" } });
    fireEvent.change(input, { target: { value: "Rea" } });
    fireEvent.change(input, { target: { value: "Reac" } });
    fireEvent.change(input, { target: { value: "React" } });

    // Should not have called onChange yet
    expect(mockOnChange).not.toHaveBeenCalled();

    // Fast-forward time
    jest.advanceTimersByTime(300);

    // Should have called onChange once with final value
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith("React");
    });
  });

  it("respects custom debounce time", async () => {
    render(<SearchInput value="" onChange={mockOnChange} debounceMs={500} />);

    const input = screen.getByLabelText("Search mentors");
    fireEvent.change(input, { target: { value: "TypeScript" } });

    // Should not have called onChange yet
    expect(mockOnChange).not.toHaveBeenCalled();

    // Fast-forward less than debounce time
    jest.advanceTimersByTime(400);
    expect(mockOnChange).not.toHaveBeenCalled();

    // Fast-forward to debounce time
    jest.advanceTimersByTime(100);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith("TypeScript");
    });
  });

  it("cancels previous timer when typing continues", async () => {
    render(<SearchInput value="" onChange={mockOnChange} debounceMs={300} />);

    const input = screen.getByLabelText("Search mentors");

    // First change
    fireEvent.change(input, { target: { value: "Reac" } });
    jest.advanceTimersByTime(200);

    // Second change before first timer completes
    fireEvent.change(input, { target: { value: "React" } });
    jest.advanceTimersByTime(300);

    await waitFor(() => {
      // Should only call onChange once with the final value
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith("React");
    });
  });

  it("updates local value when prop value changes", () => {
    const { rerender } = render(
      <SearchInput value="Initial" onChange={mockOnChange} />
    );

    let input = screen.getByLabelText("Search mentors") as HTMLInputElement;
    expect(input.value).toBe("Initial");

    // Update prop value
    rerender(<SearchInput value="Updated" onChange={mockOnChange} />);

    input = screen.getByLabelText("Search mentors") as HTMLInputElement;
    expect(input.value).toBe("Updated");
  });

  it("has correct input type", () => {
    render(<SearchInput value="" onChange={mockOnChange} />);

    const input = screen.getByLabelText("Search mentors");
    expect(input).toHaveAttribute("type", "search");
  });

  it("has autocomplete disabled", () => {
    render(<SearchInput value="" onChange={mockOnChange} />);

    const input = screen.getByLabelText("Search mentors");
    expect(input).toHaveAttribute("autocomplete", "off");
  });

  it("has accessible label", () => {
    render(<SearchInput value="" onChange={mockOnChange} />);

    const input = screen.getByLabelText("Search mentors");
    expect(input).toHaveAttribute("aria-label", "Search mentors");
  });

  it("applies focus styles on focus", () => {
    render(<SearchInput value="" onChange={mockOnChange} />);

    const input = screen.getByLabelText("Search mentors");
    expect(input).toHaveClass("focus:ring-2", "focus:ring-indigo-500");
  });

  it("handles empty string input", async () => {
    render(<SearchInput value="React" onChange={mockOnChange} />);

    const input = screen.getByLabelText("Search mentors");
    fireEvent.change(input, { target: { value: "" } });

    jest.advanceTimersByTime(300);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith("");
    });
  });

  it("handles special characters in input", async () => {
    render(<SearchInput value="" onChange={mockOnChange} />);

    const input = screen.getByLabelText("Search mentors");
    fireEvent.change(input, { target: { value: "C++ & Java" } });

    jest.advanceTimersByTime(300);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith("C++ & Java");
    });
  });

  it("handles very long input", async () => {
    render(<SearchInput value="" onChange={mockOnChange} />);

    const longString = "a".repeat(200);
    const input = screen.getByLabelText("Search mentors");
    fireEvent.change(input, { target: { value: longString } });

    jest.advanceTimersByTime(300);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(longString);
    });
  });
});
