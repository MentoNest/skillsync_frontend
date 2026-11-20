import { Metadata } from "next";
import CommunityLayout from "../../../components/community/CommunityLayout";

export const metadata: Metadata = {
  title: "Community | SkillSync",
  description:
    "Join discussions, ask technical questions, collaborate with mentors and fellow learners across the globe on SkillSync.",
};

/**
 * Public Community route entry point: /community (#1422).
 * Integrates responsive two-column layout, hero banner, and feed navigation.
 */
export default function CommunityPage() {
  return (
    <main id="main-content" className="min-h-screen bg-gray-50 pt-16">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:font-medium focus:text-purple-700 focus:shadow-md"
      >
        Skip to main content
      </a>
      <CommunityLayout />
    </main>
  );
}
