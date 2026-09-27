import CommunityDiscussionSearch from "@/components/community/CommunityDiscussionSearch";

export const metadata = {
  title: "Community Discussions | SkillSync",
  description:
    "Search community discussions by title, content, author, or category.",
};

export default function CommunityPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <header className="mb-10 max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-blue-500">
          SkillSync community
        </p>
        <h1 className="mb-4 text-4xl font-bold">Community Discussions</h1>
        <p className="text-lg text-gray-600">
          Search discussions by title, content, author, or category.
        </p>
      </header>

      <CommunityDiscussionSearch />
    </main>
  );
}
