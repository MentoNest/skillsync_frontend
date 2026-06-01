// src/components/auth/SocialAuthButtons.tsx
// UI-only social authentication buttons with Google and Facebook

import React from "react";

interface SocialAuthButtonsProps {
  mode?: "login" | "register";
}

export function SocialAuthButtons({ mode = "login" }: SocialAuthButtonsProps) {
  const label = mode === "login" ? "Continue" : "Sign up";

  return (
    <div className="social-auth-container">

      {/* Divider */}
      <div className="divider">
        <span className="divider-line" />
        <span className="divider-text">or</span>
        <span className="divider-line" />
      </div>

      {/* Google Button */}
      <button
        type="button"
        className="social-btn google-btn"
        aria-label="Continue with Google"
        onClick={() => console.log("Google auth - not yet implemented")}
      >
        {/* Google SVG Icon */}
        <svg
          className="social-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="20"
          height="20"
          aria-hidden="true"
        >
          <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3L37.4 9.6C34.2 6.7 29.3 5 24 5 12.9 5 4 13.9 4 25s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19.1 13 24 13c3.1 0 5.8 1.1 7.9 3L37.4 9.6C34.2 6.7 29.3 5 24 5c-7.7 0-14.4 4.3-18.1 9.7z"/>
          <path fill="#4CAF50" d="M24 45c5.2 0 9.9-1.9 13.5-5.1l-6.2-5.3C29.4 36.2 26.8 37 24 37c-5.2 0-9.6-3.2-11.3-7.8l-6.5 5C9.5 40.6 16.2 45 24 45z"/>
          <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l6.2 5.3C41.2 35.3 44 30.6 44 25c0-1.3-.1-2.6-.4-3.9z"/>
        </svg>
        <span>{label} with Google</span>
      </button>

      {/* Facebook Button */}
      <button
        type="button"
        className="social-btn facebook-btn"
        aria-label="Continue with Facebook"
        onClick={() => console.log("Facebook auth - not yet implemented")}
      >
        {/* Facebook SVG Icon */}
        <svg
          className="social-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          aria-hidden="true"
        >
          <path
            fill="#1877F2"
            d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
          />
        </svg>
        <span>{label} with Facebook</span>
      </button>

    </div>
  );
}
