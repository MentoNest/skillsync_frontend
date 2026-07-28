import React from "react";
import FilterSidebar from "./components/FilterSidebar";
import DiscoveryMentorCard from "./components/DiscoveryMentorCard";
import { mockMentors } from "./data/mockMentors";

export default function MentorDiscoveryPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <FilterSidebar />
        </aside>
        <main className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockMentors.map((mentor) => (
              <DiscoveryMentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
