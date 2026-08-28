import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <nav className="flex items-center justify-between">
          <div>
            <Link href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                SkillSync
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href="/resources"
              className="text-gray-500 dark:text-gray-400 hover:underline py-2 px-4"
            >
              Resources
            </Link>
            <Link
              href="/login"
              className="text-gray-500 dark:text-gray-400 hover:underline py-2 px-4"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="ml-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
