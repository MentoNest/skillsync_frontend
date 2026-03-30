import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mentorship Platform",
  description: "Role-Based Dashboards for Mentorship",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
