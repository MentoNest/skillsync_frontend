import ResourceCategoryPage from "../../../../components/resources/ResourceCategoryPage";
import { FEATURED_ARTICLES } from "../../../../components/resources/resourceData";

export const metadata = { title: "Articles | Learning Resources | SkillSync" };

export default function ArticlesPage() {
  return (
    <ResourceCategoryPage
      title="Articles"
      description="Practical guides and insights to help you grow in your career."
      items={FEATURED_ARTICLES}
    />
  );
}
