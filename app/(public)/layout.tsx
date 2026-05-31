import React from "react";
import Navbar from "../../components/navigation/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <section className="pt-16 p-6">
        <main>{children}</main>
      </section>
    </>
  );
}
