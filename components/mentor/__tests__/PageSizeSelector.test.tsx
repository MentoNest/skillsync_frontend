import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PageSizeSelector from "../PageSizeSelector";

describe("PageSizeSelector", () => {
  const mockOnPageSizeChange = jest.fn();

  beforeEach(() => {
    mockOnPageSizeChange.mockClear();
  });

  it("renders with default options", () => {
    render(
      <PageSizeSelector
        pageSize={12}
        onPageSizeChange={mockOnPageSizeChange}
      />
    );

    const select = screen.getByLabelText("Results per page");
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("12");
  });

  it("displays current page size", () => {
    render(
      <PageSizeSelector
        pageSize={24}
        onPageSizeChange={mockOnPageSizeChange}
      />
    );

    const select = screen.getByLabelText("Results per page") as HTMLSelectElement;
    expect(select.value).toBe("24");
  });

  it("renders all default options", () => {
    render(
      <PageSizeSelector
        pageSize={12}
        onPageSizeChange={mockOnPageSizeChange}
      />
    );

    expect(screen.getByText("12 per page")).toBeInTheDocument();
    expect(screen.getByText("24 per page")).toBeInTheDocument();
    expect(screen.getByText("48 per page")).toBeInTheDocument();
    expect(screen.getByText("96 per page")).toBeInTheDocument();
  });

  it("renders custom options when provided", () => {
    render(
      <PageSizeSelector
        pageSize={10}
        onPageSizeChange={mockOnPageSizeChange}
        options={[10, 20, 50]}
      />
    );

    expect(screen.getByText("10 per page")).toBeInTheDocument();
    expect(screen.getByText("20 per page")).toBeInTheDocument();
    expect(screen.getByText("50 per page")).toBeInTheDocument();
    expect(screen.queryByText("12 per page")).not.toBeInTheDocument();
  });

  it("calls onPageSizeChange when selection changes", () => {
    render(
      <PageSizeSelector
        pageSize={12}
        onPageSizeChange={mockOnPageSizeChange}
      />
    );

    const select = screen.getByLabelText("Results per page");
    fireEvent.change(select, { target: { value: "48" } });

    expect(mockOnPageSizeChange).toHaveBeenCalledWith(48);
  });

  it("displays total results when provided", () => {
    render(
      <PageSizeSelector
        pageSize={12}
        onPageSizeChange={mockOnPageSizeChange}
        totalResults={156}
      />
    );

    expect(screen.getByText("of 156 total")).toBeInTheDocument();
  });

  it("does not display total results when not provided", () => {
    render(
      <PageSizeSelector
        pageSize={12}
        onPageSizeChange={mockOnPageSizeChange}
      />
    );

    expect(screen.queryByText(/of \d+ total/)).not.toBeInTheDocument();
  });

  it("displays singular 'total' for 1 result", () => {
    render(
      <PageSizeSelector
        pageSize={12}
        onPageSizeChange={mockOnPageSizeChange}
        totalResults={1}
      />
    );

    expect(screen.getByText("of 1 total")).toBeInTheDocument();
  });

  it("has proper accessibility labels", () => {
    render(
      <PageSizeSelector
        pageSize={12}
        onPageSizeChange={mockOnPageSizeChange}
      />
    );

    const label = screen.getByText("Show:");
    expect(label).toBeInTheDocument();
    
    const select = screen.getByLabelText("Results per page");
    expect(select).toHaveAttribute("id", "page-size-select");
  });

  it("converts string values to numbers when calling onChange", () => {
    render(
      <PageSizeSelector
        pageSize={12}
        onPageSizeChange={mockOnPageSizeChange}
      />
    );

    const select = screen.getByLabelText("Results per page");
    fireEvent.change(select, { target: { value: "96" } });

    // Should call with number 96, not string "96"
    expect(mockOnPageSizeChange).toHaveBeenCalledWith(96);
    expect(typeof mockOnPageSizeChange.mock.calls[0][0]).toBe("number");
  });
});
