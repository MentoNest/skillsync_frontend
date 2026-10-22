/**
 * Sharing helpers for community discussions (#1016).
 *
 * Two transports are supported:
 *  - the Web Share API (`navigator.share`) on devices that expose it, and
 *  - the async clipboard (`navigator.clipboard.writeText`).
 *
 * Everything is feature-detected and guarded, so the helpers are safe to call
 * from the browser on any device and degrade to a manual-copy state when the
 * platform exposes neither API.
 */

export type ShareMethod = "native" | "clipboard" | "manual" | "cancelled";

export interface SharePayload {
  title: string;
  text?: string;
  url: string;
}

export interface ShareResult {
  method: ShareMethod;
  message: string;
}

/** Payload accepted by the Web Share API. */
interface NativeShareData {
  title?: string;
  text?: string;
  url?: string;
}

/**
 * Minimal shape of the navigator used here. Declared locally instead of
 * extending `Navigator` so these helpers compile against any `lib.dom` version.
 */
interface ShareCapableNavigator {
  share?: (data: NativeShareData) => Promise<void>;
}

function getNativeShare(): ((data: NativeShareData) => Promise<void>) | null {
  if (typeof navigator === "undefined") return null;
  const share = (navigator as unknown as ShareCapableNavigator).share;
  return typeof share === "function" ? share.bind(navigator) : null;
}

/** True when the device exposes the Web Share API. */
export function isNativeShareSupported(): boolean {
  return getNativeShare() !== null;
}

/**
 * Copy text to the clipboard.
 * Falls back to a hidden textarea + `document.execCommand("copy")` for
 * browsers without the async clipboard API (e.g. insecure contexts).
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Permission denied or insecure context: try the legacy path below.
    }
  }

  if (typeof document === "undefined") return false;

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);
    return copied;
  } catch {
    return false;
  }
}

/** Short, human-readable copy for each share outcome. */
function describeResult(method: ShareMethod): string {
  switch (method) {
    case "native":
      return "Shared";
    case "clipboard":
      return "Link copied to clipboard";
    case "manual":
      return "Copy this link to share the discussion";
    case "cancelled":
      return "Share cancelled";
  }
}

/**
 * Share a discussion using the best transport available.
 *
 * Order of preference: native share sheet, then clipboard copy, then a manual
 * result the UI can render as selectable text. A user dismissing the native
 * share sheet resolves as `cancelled` so no share is recorded.
 */
export async function shareDiscussion(
  payload: SharePayload
): Promise<ShareResult> {
  const nativeShare = getNativeShare();

  if (nativeShare) {
    try {
      await nativeShare({
        title: payload.title,
        ...(payload.text ? { text: payload.text } : {}),
        url: payload.url,
      });
      return { method: "native", message: describeResult("native") };
    } catch (error) {
      const name = error instanceof Error ? error.name : "";
      if (name === "AbortError") {
        return { method: "cancelled", message: describeResult("cancelled") };
      }
      // Any other failure falls through to the clipboard copy below.
    }
  }

  const copied = await copyToClipboard(payload.url);
  const method: ShareMethod = copied ? "clipboard" : "manual";
  return { method, message: describeResult(method) };
}
