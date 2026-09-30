import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  DiscussionForm,
  parseTags,
  validateDiscussionForm,
} from "@/components/community/DiscussionForm";
import type { DiscussionFormValues } from "@/components/community/DiscussionForm";

describe("DiscussionForm", () => {
  it("blocks submission when required fields are empty", async () => {
    const onSubmit = jest.fn();
    render(<DiscussionForm onSubmit={onSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: "Post discussion" }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText("Title is required.")).toBeInTheDocument();
    expect(screen.getByText("Category is required.")).toBeInTheDocument();
    expect(screen.getByText("Content is required.")).toBeInTheDocument();
  });

  it("surfaces validation messages as accessible alerts", () => {
    render(<DiscussionForm onSubmit={jest.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "Post discussion" }));
    expect(screen.getAllByRole("alert").length).toBeGreaterThanOrEqual(3);
  });

  it("marks invalid fields with aria-invalid and links the message", () => {
    render(<DiscussionForm onSubmit={jest.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "Post discussion" }));

    const title = screen.getByLabelText(/Title/);
    expect(title).toHaveAttribute("aria-invalid", "true");
    expect(title).toHaveAttribute("aria-describedby");
  });

  it("submits normalised values when valid", async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    render(
      <DiscussionForm
        onSubmit={onSubmit}
        initialValues={{
          title: "  Hello  ",
          category: "general",
          content: "<p>Body</p>",
          tags: ["react"],
        }}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Post discussion" }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit).toHaveBeenCalledWith({
      title: "Hello",
      category: "general",
      content: "<p>Body</p>",
      tags: ["react"],
    } as DiscussionFormValues);
  });

  it("renders a cancel button when onCancel is provided", () => {
    const onCancel = jest.fn();
    render(<DiscussionForm onSubmit={jest.fn()} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onCancel).toHaveBeenCalled();
  });

  it("shows a form-level error from the caller", () => {
    render(<DiscussionForm onSubmit={jest.fn()} error="Network down" />);
    expect(screen.getByText("Network down")).toBeInTheDocument();
  });
});

describe("validateDiscussionForm", () => {
  it("requires title, category and content", () => {
    expect(validateDiscussionForm({ title: "", category: "", content: "" })).toEqual({
      title: "Title is required.",
      category: "Category is required.",
      content: "Content is required.",
    });
  });

  it("rejects an over-long title", () => {
    expect(
      validateDiscussionForm({
        title: "a".repeat(201),
        category: "general",
        content: "<p>x</p>",
      }).title
    ).toMatch(/200 characters/);
  });

  it("accepts a complete form", () => {
    expect(
      validateDiscussionForm({
        title: "Hello",
        category: "general",
        content: "<p>Hi</p>",
      })
    ).toEqual({});
  });
});

describe("parseTags", () => {
  it("trims, splits and de-duplicates", () => {
    expect(parseTags("react, career , react\nmentoring")).toEqual([
      "react",
      "career",
      "mentoring",
    ]);
  });

  it("returns an empty list for blank input", () => {
    expect(parseTags("   ")).toEqual([]);
  });
});
