import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillSync - Mentorship Platform",
  description: "A blockchain-powered mentorship platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <style>{`
          .skip-link{
            position: absolute; left: -9999px; top: auto; width: 1px; height: 1px; overflow: hidden;
          }
          .skip-link:focus{
            position: static; width: auto; height: auto; left: auto; padding: 8px 12px; background:#111827; color:#fff; border-radius:6px; z-index:9999;
          }
        `}</style>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
        <Footer />
      </body>
    </html>
  );
}
