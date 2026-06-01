import ResourceSearchBar from '@/components/resources/ResourceSearchBar'
import QuickAccessSection from '@/components/resources/QuickAccessSection'
import FeaturedLearningTracksSection from '@/components/resources/FeaturedLearningTracksSection'

export default function ResourcesPage() {
  return (
    <div className="space-y-10">
      {/* #317 - Search Bar */}
      <ResourceSearchBar />

      {/* #318 & #319 - Quick Access Section with Reusable Cards */}
      <QuickAccessSection />

      {/* #320 - Featured Learning Tracks */}
      <FeaturedLearningTracksSection />
    </div>
  )
}
