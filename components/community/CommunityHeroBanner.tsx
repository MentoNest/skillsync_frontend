import StartDiscussionButton from "@/components/community/StartDiscussionButton";

const CommunityHeroBanner = () => {
  return (
    <section className="rounded-2xl bg-gradient-to-r from-purple-600 to-purple-900 px-6 py-12 text-center text-white sm:px-10 sm:py-16">
      <h1 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        Welcome to the SkillSync Community
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-base text-purple-100 sm:text-lg">
        Ask questions, share experiences, and connect with mentors and
        mentees who are on the same journey as you.
      </p>
      <StartDiscussionButton />
    </section>
  );
};

export default CommunityHeroBanner;