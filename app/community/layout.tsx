import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <div id="main-content" className="pt-16">
        {children}
      </div>
      <Footer />
    </>
  );
}