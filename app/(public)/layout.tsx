import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SkillSync",
  description: "A mentorship platform",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
