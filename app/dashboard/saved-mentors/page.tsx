import type { Metadata } from "next";
import SavedMentorsPage from "@/components/mentor/SavedMentorsPage";

export const metadata: Metadata = {
  title: "Saved Mentors | SkillSync",
  description: "View the mentors you have bookmarked.",
};

export default function SavedMentorsRoute() {
  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-900">
      <SavedMentorsPage />
    </main>
  );
}