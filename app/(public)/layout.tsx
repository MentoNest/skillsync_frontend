import type { Metadata } from "next";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";

export const metadata: Metadata = {
  title: "SkillSync",
  description: "A mentorship platform",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
