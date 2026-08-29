// Filter panel used by both the desktop sidebar and the mobile drawer (#862).
"use client";

import FilterSidebar, { FilterSidebarProps } from "./FilterSidebar";

export type MentorFilterSidebarProps = FilterSidebarProps;

const MentorFilterSidebar = (props: MentorFilterSidebarProps) => {
  return <FilterSidebar {...props} />;
};

export default MentorFilterSidebar;