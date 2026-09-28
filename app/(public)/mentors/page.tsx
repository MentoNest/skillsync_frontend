import type { Metadata } from "next";
import MentorDiscovery from "@/components/mentor-discovery/MentorDiscovery";

export const metadata: Metadata = {
  title: "Find a Mentor · SkillSync",
  description:
    "Browse experienced mentors in tech. Filter by expertise, experience, industry, rating and price.",
};

/**
 * `/mentors` — the public mentor marketplace.
 *
 * Lives under `app/(public)/` so the shared layout supplies the Navbar and
 * Footer. The discovery UI itself is a client component; this page stays a
 * server component so it can export metadata.
 */
export default function MentorsPage() {
  return <MentorDiscovery belowFixedNavbar usePagination pageSize={12} />;
}
