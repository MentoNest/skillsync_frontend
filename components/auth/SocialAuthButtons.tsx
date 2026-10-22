"use client";

export type SocialProvider = "google" | "facebook";

export interface SocialAuthButtonsProps {
  /**
   * Called when a provider button is activated. Left optional because the
   * buttons are UI-ready before the OAuth flow exists: with no handler they
   * are no-ops, and wiring them up later is a one-argument change here.
   */
  onProviderClick?: (provider: SocialProvider) => void;
  className?: string;
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0012 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 010-4.2V7.06H2.18a11 11 0 000 9.88l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 002.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.026 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.965h-1.513c-1.49 0-1.955.93-1.955 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
      />
    </svg>
  );
}

/**
 * Google and Facebook sign-in buttons with an "or" divider (#1170).
 *
 * The provider buttons are real `<button type="button">` elements with visible
 * text, so they are keyboard-focusable and announced by name. The brand marks
 * are `aria-hidden` because the button label already names the provider.
 *
 * No OAuth handoff exists yet: `onProviderClick` is optional and defaults to a
 * no-op, so the UI can ship now and be wired to the real flow without a markup
 * change. A click is still tracked so the handler is easy to find.
 */
export default function SocialAuthButtons({
  onProviderClick,
  className,
}: SocialAuthButtonsProps) {
  const buttonClass =
    "inline-flex w-full items-center justify-center gap-3 rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]";

  return (
    <div className={className}>
      <div className="flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-[var(--border)]" />
        <span className="text-sm text-[var(--muted)]">or</span>
        <span className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onProviderClick?.("google")}
          className={buttonClass}
        >
          <GoogleIcon />
          Continue with Google
        </button>
        <button
          type="button"
          onClick={() => onProviderClick?.("facebook")}
          className={buttonClass}
        >
          <FacebookIcon />
          Continue with Facebook
        </button>
      </div>
    </div>
  );
}
