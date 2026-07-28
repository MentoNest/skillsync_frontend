export type RealtimeEvent =
  | { type: 'discussion:new'; payload: { id: string } }
  | { type: 'discussion:update'; payload: { id: string } }
  | { type: 'discussion:delete'; payload: { id: string } }
  | { type: 'like'; payload: { discussionId: string; userId: string } }
  | { type: 'comment:new'; payload: { discussionId: string; commentId: string } };

type EventHandler = (event: RealtimeEvent) => void;

export function createRealtimeConnection(url: string, onEvent: EventHandler): () => void {
  let ws: WebSocket | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  function connect() {
    ws = new WebSocket(url);

    ws.onmessage = (msg) => {
      try {
        const event: RealtimeEvent = JSON.parse(msg.data);
        onEvent(event);
      } catch {
        console.warn('Failed to parse realtime event:', msg.data);
      }
    };

    ws.onclose = () => {
      reconnectTimer = setTimeout(connect, 3000);
    };

    ws.onerror = () => {
      ws?.close();
    };
  }

  connect();

  return () => {
    if (reconnectTimer) clearTimeout(reconnectTimer);
    ws?.close();
  };
}
