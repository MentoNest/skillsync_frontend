import { Suspense } from "react";
import FeaturedLearningTracks from "../../../components/resources/FeaturedLearningTracks";
import { ResourceSearchBar } from "../../../components/resources/ResourceSearchBar";
import { ArticlesSkeleton, CategoryGridSkeleton, LearningTracksSkeleton, ToolsSkeleton } from "../../../components/resources/ResourceSkeletons";
import { LatestArticles, PopularTools, QuickAccessGrid, ResourcesHero } from "../../../components/resources/ResourcesSections";

export const metadata = { title: "Learning Resources | SkillSync" };

/** Public Learning Resources route: /resources (#1370). */
export default function ResourcesPage() {
  return (
    <main id="main-content" className="pt-16">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:font-medium focus:text-purple-700 focus:shadow-md">Skip to main content</a>
      <ResourcesHero />
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-10">
        <ResourceSearchBar />
        <Suspense fallback={<CategoryGridSkeleton />}>
          <QuickAccessGrid />
        </Suspense>
      </div>
      <Suspense fallback={<LearningTracksSkeleton />}>
        <FeaturedLearningTracks />
      </Suspense>
      <div className="mx-auto max-w-7xl space-y-10 px-4 pb-16">
        <Suspense fallback={<ArticlesSkeleton />}>
          <LatestArticles />
        </Suspense>
        <Suspense fallback={<ToolsSkeleton />}>
          <PopularTools />
        </Suspense>
      </div>
    </main>
  );
}
