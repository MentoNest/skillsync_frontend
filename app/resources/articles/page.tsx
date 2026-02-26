// ResourcesPage.jsx
import React, { Suspense, lazy } from "react";

const ResourceList = lazy(() => import("../components/ResourceList"));
const ResourceDetails = lazy(() => import("../components/ResourceDetails"));

export default function ResourcesPage() {
  return (
    <div>
      <h1>Resources</h1>
      <Suspense fallback={<div>Loading resources...</div>}>
        <ResourceList />
        <ResourceDetails />
      </Suspense>
    </div>
  );
}
