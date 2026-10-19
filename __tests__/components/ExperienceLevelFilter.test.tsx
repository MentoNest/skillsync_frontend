import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ExperienceLevelFilter, { EXPERIENCE_LEVELS } from "@/components/mentor-discovery/ExperienceLevelFilter";

describe("ExperienceLevelFilter", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders all experience level options", () => {
    render(
      <ExperienceLevelFilter
        selectedLevels={[]}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText("Experience Level")).toBeInTheDocument();
    expect(screen.getByText("Junior")).toBeInTheDocument();
    expect(screen.getByText("Mid-Level")).toBeInTheDocument();
    expect(screen.getByText("Senior")).toBeInTheDocument();
    expect(screen.getByText("Executive")).toBeInTheDocument();
  });

  it("shows correct number of checkboxes", () => {
    render(
      <ExperienceLevelFilter
        selectedLevels={[]}
        onChange={mockOnChange}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(4);
  });

  it("marks selected levels as checked", () => {
    render(
      <ExperienceLevelFilter
        selectedLevels={["junior", "senior"]}
        onChange={mockOnChange}
      />
    );

    const juniorCheckbox = screen.getByLabelText("Filter by Junior experience level");
    const midLevelCheckbox = screen.getByLabelText("Filter by Mid-Level experience level");
    const seniorCheckbox = screen.getByLabelText("Filter by Senior experience level");
    const executiveCheckbox = screen.getByLabelText("Filter by Executive experience level");

    expect(juniorCheckbox).toBeChecked();
    expect(midLevelCheckbox).not.toBeChecked();
    expect(seniorCheckbox).toBeChecked();
    expect(executiveCheckbox).not.toBeChecked();
  });

  it("calls onChange with added level when checking a box", () => {
    render(
      <ExperienceLevelFilter
        selectedLevels={["junior"]}
        onChange={mockOnChange}
      />
    );

    const seniorCheckbox = screen.getByLabelText("Filter by Senior experience level");
    fireEvent.click(seniorCheckbox);

    expect(mockOnChange).toHaveBeenCalledWith(["junior", "senior"]);
  });

  it("calls onChange with removed level when unchecking a box", () => {
    render(
      <ExperienceLevelFilter
        selectedLevels={["junior", "senior"]}
        onChange={mockOnChange}
      />
    );

    const juniorCheckbox = screen.getByLabelText("Filter by Junior experience level");
    fireEvent.click(juniorCheckbox);

    expect(mockOnChange).toHaveBeenCalledWith(["senior"]);
  });

  it("handles toggling multiple levels", () => {
    const { rerender } = render(
      <ExperienceLevelFilter
        selectedLevels={[]}
        onChange={mockOnChange}
      />
    );

    // Add Junior
    fireEvent.click(screen.getByLabelText("Filter by Junior experience level"));
    expect(mockOnChange).toHaveBeenCalledWith(["junior"]);

    // Simulate parent updating state
    rerender(
      <ExperienceLevelFilter
        selectedLevels={["junior"]}
        onChange={mockOnChange}
      />
    );

    // Add Mid-Level
    fireEvent.click(screen.getByLabelText("Filter by Mid-Level experience level"));
    expect(mockOnChange).toHaveBeenCalledWith(["junior", "mid-level"]);

    // Simulate parent updating state
    rerender(
      <ExperienceLevelFilter
        selectedLevels={["junior", "mid-level"]}
        onChange={mockOnChange}
      />
    );

    // Add Senior
    fireEvent.click(screen.getByLabelText("Filter by Senior experience level"));
    expect(mockOnChange).toHaveBeenCalledWith(["junior", "mid-level", "senior"]);
  });

  it("handles selecting all levels", () => {
    const { rerender } = render(
      <ExperienceLevelFilter
        selectedLevels={[]}
        onChange={mockOnChange}
      />
    );

    // Click all checkboxes
    EXPERIENCE_LEVELS.forEach(({ value, label }) => {
      const checkbox = screen.getByLabelText(`Filter by ${label} experience level`);
      fireEvent.click(checkbox);
    });

    // Should have been called 4 times, once for each level
    expect(mockOnChange).toHaveBeenCalledTimes(4);
  });

  it("handles deselecting all levels", () => {
    const allLevels = EXPERIENCE_LEVELS.map(({ value }) => value);
    
    render(
      <ExperienceLevelFilter
        selectedLevels={allLevels}
        onChange={mockOnChange}
      />
    );

    // Click all checkboxes to uncheck them
    EXPERIENCE_LEVELS.forEach(({ label }) => {
      const checkbox = screen.getByLabelText(`Filter by ${label} experience level`);
      fireEvent.click(checkbox);
    });

    // Should have been called 4 times
    expect(mockOnChange).toHaveBeenCalledTimes(4);
    
    // Last call should result in empty array
    const lastCall = mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1][0];
    expect(lastCall).toHaveLength(0);
  });

  it("has accessible labels for screen readers", () => {
    render(
      <ExperienceLevelFilter
        selectedLevels={[]}
        onChange={mockOnChange}
      />
    );

    EXPERIENCE_LEVELS.forEach(({ label }) => {
      const checkbox = screen.getByLabelText(`Filter by ${label} experience level`);
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute("type", "checkbox");
    });
  });

  it("applies correct CSS classes", () => {
    render(
      <ExperienceLevelFilter
        selectedLevels={["junior"]}
        onChange={mockOnChange}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toHaveClass("w-4", "h-4", "text-indigo-600");
    });
  });

  describe("EXPERIENCE_LEVELS constant", () => {
    it("has correct number of levels", () => {
      expect(EXPERIENCE_LEVELS).toHaveLength(4);
    });

    it("has correct level values", () => {
      const values = EXPERIENCE_LEVELS.map(({ value }) => value);
      expect(values).toEqual(["junior", "mid-level", "senior", "executive"]);
    });

    it("has correct level labels", () => {
      const labels = EXPERIENCE_LEVELS.map(({ label }) => label);
      expect(labels).toEqual(["Junior", "Mid-Level", "Senior", "Executive"]);
    });

    it("maintains correct order", () => {
      expect(EXPERIENCE_LEVELS[0].value).toBe("junior");
      expect(EXPERIENCE_LEVELS[1].value).toBe("mid-level");
      expect(EXPERIENCE_LEVELS[2].value).toBe("senior");
      expect(EXPERIENCE_LEVELS[3].value).toBe("executive");
    });
  });
});
