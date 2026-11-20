import ResourceCategoryPage from "../../../../components/resources/ResourceCategoryPage";
import { TOOLS_AND_TEMPLATES } from "../../../../components/resources/resourceData";

export const metadata = { title: "Tools | Learning Resources | SkillSync" };

export default function ToolsPage() {
  return (
    <ResourceCategoryPage
      title="Tools"
      description="Practical utilities that make everyday career work easier."
      items={TOOLS_AND_TEMPLATES.filter((item) => item.category === "Tool")}
    />
  );
}
