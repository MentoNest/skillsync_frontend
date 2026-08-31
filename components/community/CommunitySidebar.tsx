// Right sidebar for the Community page: categories, events, and stats (#867)
import CommunityCategoriesSidebar from "./CommunityCategoriesSidebar";
import UpcomingEventsWidget from "./UpcomingEventsWidget";
import CommunityStatisticsWidget from "./CommunityStatisticsWidget";

const CommunitySidebar = () => (
  <aside aria-label="Community sidebar" className="flex flex-col gap-6">
    <CommunityCategoriesSidebar />
    <UpcomingEventsWidget />
    <CommunityStatisticsWidget />
  </aside>
);

export default CommunitySidebar;