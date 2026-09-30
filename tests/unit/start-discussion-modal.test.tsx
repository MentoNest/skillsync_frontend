import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  StartDiscussionModal,
  parseTagsInput,
} from "@/components/community/StartDiscussionModal";
import { communityApi } from "@/lib/community-api";

jest.mock("@/lib/community-api", () => ({
  communityApi: { createDiscussion: jest.fn() },
  CommunityApiError: class CommunityApiError extends Error {},
}));

const createDiscussion = communityApi.createDiscussion as jest.Mock;

const createdDiscussion = {
  id: "discussion-99",
  title: "How do I prep for interviews?",
  content: "<p>Any tips?</p>",
  authorId: "user-1",
  authorName: "Test User",
  category: "career",
  tags: ["interview"],
  likeCount: 0,
  replyCount: 0,
  viewCount: 0,
  isPinned: false,
  isLocked: false,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

function fillValidDraft() {
  fireEvent.change(screen.getByLabelText(/title/i), {
    target: { value: "How do I prep for interviews?" },
  });

  const editor = screen.getByRole("textbox", { name: /discussion content/i });
  editor.innerHTML = "Any tips?";
  fireEvent.input(editor);

  fireEvent.change(screen.getByLabelText(/category/i), {
    target: { value: "career" },
  });
}

describe("StartDiscussionModal", () => {
  beforeEach(() => {
    createDiscussion.mockReset();
  });

  it("renders nothing while closed", () => {
    render(
      <StartDiscussionModal isOpen={false} onClose={() => {}} onCreated={() => {}} />
    );

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("exposes an accessible dialog with every composer field", () => {
    render(<StartDiscussionModal isOpen onClose={() => {}} onCreated={() => {}} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /discussion content/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/tags/i)).toBeInTheDocument();
    expect(screen.getByText(/attachments are coming soon/i)).toBeInTheDocument();
  });

  it("closes when Escape is pressed", () => {
    const onClose = jest.fn();
    render(<StartDiscussionModal isOpen onClose={onClose} onCreated={() => {}} />);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes when Cancel is pressed", () => {
    const onClose = jest.fn();
    render(<StartDiscussionModal isOpen onClose={onClose} onCreated={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("validates required fields before submitting", async () => {
    render(<StartDiscussionModal isOpen onClose={() => {}} onCreated={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: /publish/i }));

    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/content is required/i)).toBeInTheDocument();
    expect(createDiscussion).not.toHaveBeenCalled();
  });

  it("publishes the draft and reports the created discussion back", async () => {
    createDiscussion.mockResolvedValue(createdDiscussion);
    const onCreated = jest.fn();
    const onClose = jest.fn();

    render(
      <StartDiscussionModal
        isOpen
        onClose={onClose}
        onCreated={onCreated}
        defaultCategory="career"
      />
    );

    fillValidDraft();
    fireEvent.change(screen.getByLabelText(/tags/i), {
      target: { value: "interview, #career" },
    });

    fireEvent.click(screen.getByRole("button", { name: /publish/i }));

    await waitFor(() => expect(onCreated).toHaveBeenCalledWith(createdDiscussion));
    expect(createDiscussion).toHaveBeenCalledWith({
      title: "How do I prep for interviews?",
      content: "Any tips?",
      category: "career",
      tags: ["interview", "career"],
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("keeps the draft and shows the API error when publishing fails", async () => {
    createDiscussion.mockRejectedValue(new Error("network down"));
    const onCreated = jest.fn();

    render(<StartDiscussionModal isOpen onClose={() => {}} onCreated={onCreated} />);

    fillValidDraft();
    fireEvent.click(screen.getByRole("button", { name: /publish/i }));

    expect(await screen.findByText(/failed to publish/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toHaveValue("How do I prep for interviews?");
    expect(onCreated).not.toHaveBeenCalled();
  });

  describe("parseTagsInput", () => {
    it("splits on commas and newlines, strips hashes and de-duplicates", () => {
      expect(parseTagsInput("react, career\n#react, , Mentoring")).toEqual([
        "react",
        "career",
        "Mentoring",
      ]);
    });

    it("returns an empty list for blank input", () => {
      expect(parseTagsInput("   ")).toEqual([]);
    });
  });
});
