import type { Metadata } from "next";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/navigation/Navbar";
import { AuthProvider } from "@/context/AuthContext";

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
    <AuthProvider>
      <div className="relative flex min-h-screen flex-col">
        {/* The Global Navigation Bar requested in issue #813 */}
        <Navbar />

        {/* Main content area expands to fill space, pushing footer down */}
        <main className="flex-1">{children}</main>

        <Footer />
      </div>
    </AuthProvider>
  );
}
