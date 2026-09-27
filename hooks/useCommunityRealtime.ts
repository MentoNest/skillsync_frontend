"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseCommunityRealtimeOptions {
  onNewDiscussion?: (discussion: unknown) => void;
  onNewReply?: (discussionId: string, reply: unknown) => void;
  onLikeUpdate?: (discussionId: string, likeCount: number) => void;
}

export function useCommunityRealtime({
  onNewDiscussion,
  onNewReply,
  onLikeUpdate,
}: UseCommunityRealtimeOptions = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const connect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    try {
      const eventSource = new EventSource("/api/community/events");
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        setIsConnected(true);
      };

      eventSource.onerror = () => {
        setIsConnected(false);
        // Attempt to reconnect after 5 seconds
        setTimeout(connect, 5000);
      };

      eventSource.addEventListener("new-discussion", (event) => {
        const data = JSON.parse(event.data);
        setLastEvent("new-discussion");
        onNewDiscussion?.(data);
      });

      eventSource.addEventListener("new-reply", (event) => {
        const data = JSON.parse(event.data);
        setLastEvent("new-reply");
        onNewReply?.(data.discussionId, data.reply);
      });

      eventSource.addEventListener("like-update", (event) => {
        const data = JSON.parse(event.data);
        setLastEvent("like-update");
        onLikeUpdate?.(data.discussionId, data.likeCount);
      });
    } catch {
      setIsConnected(false);
    }
  }, [onNewDiscussion, onNewReply, onLikeUpdate]);

  useEffect(() => {
    connect();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [connect]);

  return { isConnected, lastEvent };
}
