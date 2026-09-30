import { render, screen } from "@testing-library/react";
import { DiscussionMetadata } from "@/components/community/DiscussionMetadata";

const props = {
  createdAt: "2024-01-01T00:00:00Z",
  category: "general",
  likeCount: 10,
  replyCount: 5,
  viewCount: 50,
};

describe("DiscussionMetadata", () => {
  it("renders the like and reply counts", () => {
    render(<DiscussionMetadata {...props} viewCount={undefined} />);
    expect(screen.getByText("Likes")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Replies")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders the view count when provided", () => {
    render(<DiscussionMetadata {...props} />);
    expect(screen.getByText("Views")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
  });

  it("omits the view count when it is not provided", () => {
    render(<DiscussionMetadata {...props} viewCount={undefined} />);
    expect(screen.queryByText("Views")).toBeNull();
  });

  it("renders the category badge", () => {
    render(<DiscussionMetadata {...props} />);
    expect(screen.getByText("general")).toBeInTheDocument();
  });

  it("renders the posted time as a machine readable <time> element", () => {
    const { container } = render(<DiscussionMetadata {...props} />);
    const time = container.querySelector("time");
    expect(time).not.toBeNull();
    expect(time?.getAttribute("datetime")).toBe(props.createdAt);
  });

  it("drops the posted time when the timestamp is invalid", () => {
    const { container } = render(
      <DiscussionMetadata {...props} createdAt="not-a-date" />
    );
    expect(container.querySelector("time")).toBeNull();
    expect(screen.queryByText("Posted")).toBeNull();
  });

  it("exposes labelled metadata for assistive technology", () => {
    const { container } = render(<DiscussionMetadata {...props} />);
    expect(container.querySelector("dl")).not.toBeNull();
    ["Posted", "Likes", "Replies", "Views", "Category"].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
