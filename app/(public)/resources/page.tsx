import { Suspense } from "react";
import Footer from "../../../components/landing/Footer";
import ResourcesView from "../../../components/resources/ResourcesView";

export const metadata = { title: "Learning Resources | SkillSync" };

/** Public Learning Resources route: /resources (#1370). */
export default function ResourcesPage() {
  return (
    <>
      <main className="min-w-0 overflow-x-hidden pt-16">
        <Suspense fallback={<div className="min-h-[50vh]" aria-busy="true" />}>
          <ResourcesView />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
