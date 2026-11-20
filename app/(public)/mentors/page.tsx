import MentorDiscovery from "../../../components/mentor-discovery/MentorDiscovery";
import PublicNavbar from "../../../components/navigation/PublicNavbar";

export const metadata = { title: "Discover Mentors | SkillSync" };

export default function MentorsPage() {
  return (
    <>
      <PublicNavbar />
      <main className="pt-16">
        <section className="bg-gradient-to-r from-purple-700 to-indigo-600 px-4 py-12 text-center text-white sm:py-16">
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">Discover Mentors</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg">
            Filter by expertise, industry and experience level to find the right mentor for your goals.
          </p>
        </section>
        <MentorDiscovery />
      </main>
    </>
  );
}
