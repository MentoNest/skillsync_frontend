import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import MentorSearchBar from "@/components/mentor-discovery/MentorSearchBar";

function ControlledSearchBar({ initial = "" }: { initial?: string }) {
  const [value, setValue] = useState(initial);
  return <MentorSearchBar value={value} onChange={setValue} />;
}

describe("MentorSearchBar controlled state", () => {
  it("renders the value it is given, not its own state", () => {
    const { rerender } = render(<MentorSearchBar value="react" onChange={jest.fn()} />);
    const input = screen.getByRole("searchbox") as HTMLInputElement;
    expect(input.value).toBe("react");

    rerender(<MentorSearchBar value="redux" onChange={jest.fn()} />);
    expect(input.value).toBe("redux");
  });

  it("reports edits to the parent instead of mutating itself", async () => {
    const onChange = jest.fn();
    render(<MentorSearchBar value="re" onChange={onChange} />);

    await userEvent.type(screen.getByRole("searchbox"), "a");

    expect(onChange).toHaveBeenCalledWith("rea");
  });

  it("stays empty when the parent ignores changes", async () => {
    render(<MentorSearchBar value="" onChange={jest.fn()} />);
    const input = screen.getByRole("searchbox") as HTMLInputElement;

    await userEvent.type(input, "react");

    expect(input.value).toBe("");
  });

  it("updates when the parent feeds changes back in", async () => {
    render(<ControlledSearchBar />);
    const input = screen.getByRole("searchbox") as HTMLInputElement;

    await userEvent.type(input, "react");

    expect(input.value).toBe("react");
  });
});

describe("MentorSearchBar accessibility", () => {
  it("exposes a search landmark", () => {
    render(<MentorSearchBar value="" onChange={jest.fn()} />);
    expect(screen.getByRole("search")).toBeInTheDocument();
  });

  it("labels the input programmatically", () => {
    render(<MentorSearchBar value="" onChange={jest.fn()} />);
    expect(screen.getByRole("searchbox", { name: "Search mentors" })).toBeInTheDocument();
  });

  it("associates a custom label", () => {
    render(<MentorSearchBar value="" onChange={jest.fn()} label="Find a mentor" />);
    expect(screen.getByRole("searchbox", { name: "Find a mentor" })).toBeInTheDocument();
  });

  it("describes the searchable fields", () => {
    render(<MentorSearchBar value="" onChange={jest.fn()} />);
    const input = screen.getByRole("searchbox");
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)).toHaveTextContent(
      /names, skills, and headlines/i
    );
  });

  it("announces a supplied status in a live region", () => {
    render(<MentorSearchBar value="react" onChange={jest.fn()} status="3 mentors matching" />);
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("3 mentors matching");
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  it("caps input length", () => {
    render(<MentorSearchBar value="" onChange={jest.fn()} />);
    expect(screen.getByRole("searchbox")).toHaveAttribute("maxlength", "100");
  });

  it("hides decorative icons from assistive tech", () => {
    const { container } = render(<MentorSearchBar value="react" onChange={jest.fn()} />);
    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThan(0);
    icons.forEach((icon) => expect(icon).toHaveAttribute("aria-hidden", "true"));
  });
});

describe("MentorSearchBar clearing", () => {
  it("hides the clear button while empty", () => {
    render(<MentorSearchBar value="" onChange={jest.fn()} />);
    expect(screen.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();
  });

  it("shows the clear button when a query is present", () => {
    render(<MentorSearchBar value="react" onChange={jest.fn()} />);
    expect(screen.getByRole("button", { name: "Clear search" })).toBeInTheDocument();
  });

  it("treats a whitespace-only value as empty", () => {
    render(<MentorSearchBar value="   " onChange={jest.fn()} />);
    expect(screen.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();
  });

  it("emits an empty string when cleared", async () => {
    const onChange = jest.fn();
    render(<MentorSearchBar value="react" onChange={onChange} />);

    await userEvent.click(screen.getByRole("button", { name: "Clear search" }));

    expect(onChange).toHaveBeenCalledWith("");
  });

  it("clears the parent state when clicked", async () => {
    render(<ControlledSearchBar initial="react" />);
    const input = screen.getByRole("searchbox") as HTMLInputElement;
    expect(input.value).toBe("react");

    await userEvent.click(screen.getByRole("button", { name: "Clear search" }));

    expect(input.value).toBe("");
    expect(screen.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();
  });

  it("clears on Escape", async () => {
    const onChange = jest.fn();
    render(<MentorSearchBar value="react" onChange={onChange} />);

    await userEvent.type(screen.getByRole("searchbox"), "{Escape}");

    expect(onChange).toHaveBeenCalledWith("");
  });

  it("ignores Escape when already empty", async () => {
    const onChange = jest.fn();
    render(<MentorSearchBar value="" onChange={onChange} />);

    await userEvent.type(screen.getByRole("searchbox"), "{Escape}");

    expect(onChange).not.toHaveBeenCalled();
  });

  it("does not submit the surrounding form", () => {
    const { container } = render(<MentorSearchBar value="react" onChange={jest.fn()} />);
    const form = container.querySelector("form")!;
    const submit = new Event("submit", { bubbles: true, cancelable: true });
    form.dispatchEvent(submit);
    expect(submit.defaultPrevented).toBe(true);
  });
});
