"use client";

import React, { useState, useEffect } from "react";
import ArticleListItem from "@/components/ArticleListItem";
import ArticleListItemSkeleton from "@/components/skeletons/ArticleListItemSkeleton";

const articles = [
  {
    category: "Career",
    title: "How to Land Your First Tech Job",
    author: "Jane Doe",
    readTime: "5 min read",
  },
  {
    category: "Skills",
    title: "Top 10 In-Demand Skills for 2025",
    author: "John Smith",
    readTime: "7 min read",
  },
  {
    category: "Mentorship",
    title: "Getting the Most Out of a Mentor",
    author: "Sarah Lee",
    readTime: "4 min read",
  },
  {
    category: "Engineering",
    title: "Understanding System Design Basics",
    author: "Alex Chen",
    readTime: "10 min read",
  },
  {
    category: "Product",
    title: "Defining a Product MVP That Works",
    author: "Rachel Green",
    readTime: "8 min read",
  },
  {
    category: "Design",
    title: "Color Theory in Modern UI Design",
    author: "David Foster",
    readTime: "6 min read",
  },
  {
    category: "Data",
    title: "Introduction to Machine Learning Models",
    author: "Priya Sharma",
    readTime: "12 min read",
  },
  {
    category: "Leadership",
    title: "Transitioning from IC to Engineering Manager",
    author: "Marcus Williams",
    readTime: "9 min read",
  },
];

export default function Articles() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ArticleListItemSkeleton key={index} />
            ))
          : articles.map((article) => (
              <ArticleListItem key={article.title} {...article} />
            ))}
      </div>
    </div>
  );
}
