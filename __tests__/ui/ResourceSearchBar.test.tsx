import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ResourceSearchBar from "@/components/ResourceSearchBar";

const mockPush = jest.fn();
const mockGet = jest.fn().mockReturnValue(null);

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({ get: mockGet }),
}));

describe("ResourceSearchBar", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders search input with placeholder text", () => {
    render(<ResourceSearchBar />);
    const input = screen.getByRole("searchbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute(
      "placeholder",
      "Search learning tracks, articles, tools, and templates...",
    );
  });

  it("renders a search icon", () => {
    render(<ResourceSearchBar />);
    const icon = document.querySelector(".lucide-search");
    expect(icon).toBeInTheDocument();
  });

  it("updates input value on typing", () => {
    render(<ResourceSearchBar />);
    const input = screen.getByRole("searchbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "react" } });
    expect(input.value).toBe("react");
  });

  it("calls onSearch and navigates on form submit", () => {
    const onSearch = jest.fn();
    render(<ResourceSearchBar onSearch={onSearch} />);
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "react hooks" } });
    fireEvent.submit(screen.getByRole("search"));
    expect(onSearch).toHaveBeenCalledWith("react hooks");
    expect(mockPush).toHaveBeenCalledWith("/resources?q=react%20hooks");
  });

  it("does not navigate on empty query", () => {
    render(<ResourceSearchBar />);
    fireEvent.submit(screen.getByRole("search"));
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("renders with custom placeholder", () => {
    render(<ResourceSearchBar placeholder="Custom placeholder" />);
    expect(screen.getByRole("searchbox")).toHaveAttribute(
      "placeholder",
      "Custom placeholder",
    );
  });

  it("renders the search button", () => {
    render(<ResourceSearchBar />);
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });
});
