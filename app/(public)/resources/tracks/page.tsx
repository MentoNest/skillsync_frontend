import ResourceCategoryPage from "../../../../components/resources/ResourceCategoryPage";
import { FEATURED_TRACKS } from "../../../../components/resources/resourceData";

export const metadata = { title: "Learning Tracks | Learning Resources | SkillSync" };

export default function TracksPage() {
  return (
    <ResourceCategoryPage
      title="Learning Tracks"
      description="Structured paths that take you from the basics to real-world mastery."
      items={FEATURED_TRACKS}
    />
  );
}
