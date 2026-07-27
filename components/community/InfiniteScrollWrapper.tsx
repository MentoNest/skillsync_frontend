'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  loadMore: () => Promise<void>;
  hasMore: boolean;
  threshold?: number;
  children: React.ReactNode;
}

export default function InfiniteScrollWrapper({ loadMore, hasMore, threshold = 200, children }: Props) {
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !loading) {
        setLoading(true);
        try {
          await loadMore();
        } finally {
          setLoading(false);
        }
      }
    },
    [loadMore, hasMore, loading],
  );

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: `${threshold}px`,
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, [handleIntersect, threshold]);

  return (
    <div>
      {children}
      <div ref={sentinelRef} className="w-full py-4 flex justify-center">
        {loading && (
          <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        )}
      </div>
    </div>
  );
}
