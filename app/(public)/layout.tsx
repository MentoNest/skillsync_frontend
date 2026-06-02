import React from "react";
import Navbar from "../../components/navigation/Navbar";
import { MentorSelectionProvider } from "@/lib/context/MentorSelectionContext";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MentorSelectionProvider>
      <Navbar />
      <section className="pt-16 p-6">
        <main>{children}</main>
      </section>
    </MentorSelectionProvider>
  );
}
