import React from "react";
import Link from "next/link";
import Footer from "@/components/navigation/Footer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <div className="border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
          <div className="mx-auto flex max-w-7xl items-center gap-6">
            <h1 className="text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-white">
              Admin Panel
            </h1>
            <nav className="flex gap-4">
              <Link
                href="/admin/moderation"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400"
              >
                Moderation
              </Link>
              <Link
                href="/community"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400"
              >
                Community
              </Link>
            </nav>
          </div>
        </div>
        {children}
      </div>
      <Footer />
    </div>
  );
}
