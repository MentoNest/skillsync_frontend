import ResourceCategoryPage from "../../../../components/resources/ResourceCategoryPage";
import { TOOLS_AND_TEMPLATES } from "../../../../components/resources/resourceData";

export const metadata = { title: "Templates | Learning Resources | SkillSync" };

export default function TemplatesPage() {
  return (
    <ResourceCategoryPage
      title="Templates"
      description="Ready-made starting points you can tailor to your goals."
      items={TOOLS_AND_TEMPLATES.filter((item) => item.category === "Template")}
    />
  );
}
