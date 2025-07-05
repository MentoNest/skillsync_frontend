"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Dashboard", link: "/dashboard" },
    { id: 3, name: "Find a Mentor", link: "/find-a-mentor" },
    { id: 4, name: "Courses", link: "/courses" },
    { id: 5, name: "Connect Wallet", link: "/connect-wallet" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-full shadow">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image
              src="/assets/skill-logo.png"
              alt="logo"
              width={100}
              height={100}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="font-playfair hidden lg:flex items-center space-x-8 ">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="text-gray-700 hover:text-opacity-80 transition-all duration-300 font-medium relative group"
                style={{ color: "#0A0F2C" }}
              >
                {item.name}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: "#944DFF" }}
                ></span>
              </Link>
            ))}
            <button className="px-6 py-2 text-black rounded-lg font-medium cursor-pointer transition-all duration-300 border border-[#944DFF] pointer hover:shadow-lg hover:scale-105">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
              style={{ color: "#0A0F2C" }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="font-playfair px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100 h-[100vh]">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  className="block px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md transition-colors"
                  style={{ color: "#0A0F2C" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => (window.location.href = "#contact")}
                className="w-full mt-3 px-6 py-2 rounded-lg font-medium cursor-pointer transition-all duration-300"
                style={{
                  backgroundColor: "#944DFF",
                  color: "#fff",
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
