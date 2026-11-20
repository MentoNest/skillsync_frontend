import MentorDiscovery from "../../../components/mentor-discovery/MentorDiscovery";
import PublicNavbar from "../../../components/navigation/PublicNavbar";

export const metadata = {
  title: "Discover Mentors | SkillSync",
  description: "Find mentors by name, skills, or professional headline.",
};

export default function MentorsPage() {
  return (
    <>
      <PublicNavbar />
      <MentorDiscovery />
    </>
  );
}
