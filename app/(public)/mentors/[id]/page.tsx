import { Metadata } from "next";
import { notFound } from "next/navigation";
import { mentorApi } from "@/lib/api";
import MentorProfileContent from "@/components/mentor-profile/MentorProfileContent";

interface MentorProfilePageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate metadata for the mentor profile page
 */
export async function generateMetadata({
  params,
}: MentorProfilePageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const mentor = await mentorApi.getMentorById(id);

    return {
      title: `${mentor.name} - Mentor Profile · SkillSync`,
      description: mentor.bio || `Connect with ${mentor.name}, a ${mentor.headline}. View profile, skills, and book a mentorship session.`,
    };
  } catch (error) {
    return {
      title: "Mentor Profile · SkillSync",
      description: "View mentor profile and book mentorship sessions.",
    };
  }
}

/**
 * Individual mentor profile page at /mentors/[id]
 * 
 * Displays comprehensive mentor information including:
 * - Profile details (name, headline, bio)
 * - Skills and expertise
 * - Experience and ratings
 * - Availability and pricing
 * - Booking interface
 */
export default async function MentorProfilePage({ params }: MentorProfilePageProps) {
  const { id } = await params;

  let mentor;
  try {
    mentor = await mentorApi.getMentorById(id);
  } catch (error) {
    // If mentor not found or API error, show 404
    notFound();
  }

  return <MentorProfileContent mentor={mentor} />;
}
