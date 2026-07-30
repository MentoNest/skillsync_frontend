'use client';

/**
 * SocialAuthButtons
 *
 * Renders "Continue with Google" and "Continue with Facebook" buttons
 * plus an "or" divider below them.
 *
 * UI-only: no backend integration. All click handlers are no-ops for now.
 */

interface SocialAuthButtonsProps {
  /** Text shown in the divider below the buttons. Defaults to "or continue with email". */
  dividerLabel?: string;
}

function GoogleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 18 18"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="#1877F2"
    >
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.513c-1.491 0-1.956.93-1.956 1.883v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
    </svg>
  );
}

const socialButtonClass =
  'w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800';

export default function SocialAuthButtons({
  dividerLabel = 'or continue with email',
}: SocialAuthButtonsProps) {
  return (
    <>
      {/* Social buttons */}
      <div className="space-y-3 mb-6" role="group" aria-label="Social sign-in options">
        <button
          id="btn-continue-with-google"
          type="button"
          aria-label="Continue with Google"
          className={socialButtonClass}
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <button
          id="btn-continue-with-facebook"
          type="button"
          aria-label="Continue with Facebook"
          className={socialButtonClass}
        >
          <FacebookIcon />
          Continue with Facebook
        </button>
      </div>

      {/* Divider */}
      <div className="relative my-6" role="separator" aria-label={dividerLabel}>
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white dark:bg-gray-800 text-gray-400 font-medium select-none">
            {dividerLabel}
          </span>
        </div>
      </div>
    </>
  );
}
