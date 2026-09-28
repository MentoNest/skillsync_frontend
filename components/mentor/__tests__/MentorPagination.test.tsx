import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MentorPagination from "../MentorPagination";

describe("MentorPagination", () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it("renders nothing when totalPages <= 1", () => {
    const { container } = render(
      <MentorPagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders all page numbers when totalPages <= maxVisiblePages", () => {
    render(
      <MentorPagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("disables Previous button on first page", () => {
    render(
      <MentorPagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByLabelText("Previous page");
    expect(prevButton).toBeDisabled();
  });

  it("disables Next button on last page", () => {
    render(
      <MentorPagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByLabelText("Next page");
    expect(nextButton).toBeDisabled();
  });

  it("highlights current page", () => {
    render(
      <MentorPagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const currentPageButton = screen.getByText("3");
    expect(currentPageButton).toHaveAttribute("aria-current", "page");
    expect(currentPageButton).toHaveClass("bg-blue-600", "text-white");
  });

  it("calls onPageChange when page button is clicked", () => {
    render(
      <MentorPagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const page4Button = screen.getByText("4");
    fireEvent.click(page4Button);

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it("calls onPageChange with previous page when Previous is clicked", () => {
    render(
      <MentorPagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByLabelText("Previous page");
    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange with next page when Next is clicked", () => {
    render(
      <MentorPagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByLabelText("Next page");
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it("shows ellipsis for large page counts", () => {
    render(
      <MentorPagination
        currentPage={5}
        totalPages={20}
        onPageChange={mockOnPageChange}
        maxVisiblePages={7}
      />
    );

    // Should show: 1 ... 4 5 6 ... 20
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    
    // Check for ellipsis (there should be 2)
    const ellipses = screen.getAllByText("...");
    expect(ellipses).toHaveLength(2);
  });

  it("maintains accessibility attributes", () => {
    render(
      <MentorPagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("aria-label", "Mentor listing pages");
  });

  it("handles edge case with 2 pages", () => {
    render(
      <MentorPagination
        currentPage={1}
        totalPages={2}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    
    const prevButton = screen.getByLabelText("Previous page");
    const nextButton = screen.getByLabelText("Next page");
    
    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });
});
