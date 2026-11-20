import FeaturedArticles from "../../../components/resources/FeaturedArticles";
import ToolsAndTemplates from "../../../components/resources/ToolsAndTemplates";
import { QuickAccessGrid, ResourceSearchBar, ResourcesHero } from "../../../components/resources/ResourcesSections";

export const metadata = { title: "Learning Resources | SkillSync" };

/** Public Learning Resources route: /resources (#1370). */
export default function ResourcesPage() {
  return (
    <main className="pt-16">
      <ResourcesHero />
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-10">
        <ResourceSearchBar />
        <QuickAccessGrid />
      </div>
      <FeaturedArticles />
      <ToolsAndTemplates />
    </main>
  );
}
