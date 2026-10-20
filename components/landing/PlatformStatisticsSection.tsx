import React from "react";
import CommunityStatCard from "@/components/community/CommunityStatCard";

const stats = [
  { value: "1,200+", label: "Active Mentors" },
  { value: "5,000+", label: "Enrolled Mentees" },
  { value: "10,000+", label: "Completed Sessions" },
  { value: "98%", label: "Positive Feedback" },
];

const PlatformStatisticsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <CommunityStatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStatisticsSection;
