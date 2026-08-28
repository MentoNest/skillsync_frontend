"use client";

import React, { useEffect, useRef, useState } from "react";

type LazySectionProps = {
  children: React.ReactNode;
  /** Placeholder shown until the section scrolls into view. */
  fallback?: React.ReactNode;
  /** Root margin for the IntersectionObserver (default: 200px). */
  rootMargin?: string;
  className?: string;
};

/**
 * Defers rendering of its children until they are near the viewport.
 * Reduces initial render work and avoids pulling heavy below-the-fold
 * assets (images, chunks) until they are actually needed.
 */
const LazySection = ({
  children,
  fallback = null,
  rootMargin = "200px",
  className,
}: LazySectionProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    if (
      typeof window !== "undefined" &&
      "IntersectionObserver" in window
    ) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { rootMargin },
      );

      observer.observe(node);
      return () => observer.disconnect();
    }

    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [visible, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {visible ? children : fallback}
    </div>
  );
};

export default LazySection;
