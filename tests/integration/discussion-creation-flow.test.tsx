import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CommunityPage from "@/app/community/page";
import { trackDiscussionCreated } from "@/lib/community-analytics";

// The realtime stream and infinite scroll observer are unavailable in jsdom and
// are not under test here, so they are replaced with deterministic stand-ins.
jest.mock("@/hooks/useCommunityRealtime", () => ({
  useCommunityRealtime: () => ({ isConnected: false, lastEvent: null }),
}));

jest.mock("@/hooks/useInfiniteScroll", () => ({
  useInfiniteScroll: () => ({ resetInfiniteScroll: jest.fn() }),
}));

jest.mock("@/lib/community-analytics", () => ({
  trackDiscussionCreated: jest.fn(),
}));

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

describe("Discussion creation flow", () => {
  beforeEach(() => {
    global.fetch = jest.fn((input: RequestInfo | URL, init?: RequestInit) => {
      // #1004: the composer POSTs to the discussions endpoint.
      if (init?.method === "POST") {
        return Promise.resolve({
          ok: true,
          status: 201,
          json: async () => createdDiscussion,
        });
      }

      // Empty feed so the empty state renders (#998).
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ discussions: [], hasMore: false, total: 0, page: 1 }),
      });
    }) as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("shows the empty state when the feed has no discussions", async () => {
    render(<CommunityPage />);

    expect(
      await screen.findByRole("heading", { name: /no discussions yet/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /start discussion/i })
    ).toBeInTheDocument();
  });

  it("opens the composer from the CTA, publishes and surfaces the new discussion", async () => {
    render(<CommunityPage />);

    const [heroCta] = await screen.findAllByRole("button", {
      name: /start discussion/i,
    });
    fireEvent.click(heroCta!);

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "How do I prep for interviews?" },
    });
    const editor = screen.getByRole("textbox", { name: /discussion content/i });
    editor.innerHTML = "Any tips?";
    fireEvent.input(editor);

    fireEvent.click(screen.getByRole("button", { name: /publish/i }));

    // The composer closes and the created discussion appears in the feed.
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(
      await screen.findByText("How do I prep for interviews?")
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /no discussions yet/i })).toBeNull();

    // A success notification is announced and the event is tracked.
    expect(screen.getByText(/your discussion was published/i)).toBeInTheDocument();
    expect(trackDiscussionCreated).toHaveBeenCalledWith(
      createdDiscussion.id,
      createdDiscussion.category
    );
  });

  it("renders the error state with a retry action when the feed request fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: "Server exploded" }),
    });

    render(<CommunityPage />);

    expect(await screen.findByRole("alert")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /try again/i })
    ).toBeInTheDocument();
  });
});
