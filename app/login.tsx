"use client";

import { useState } from "react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Sora:wght@600;700&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #f9f8ff;
          min-height: 100vh;
        }

        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 28px 24px;
          max-width: 480px;
          margin: 0 auto;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 48px;
        }

        .logo-icon {
          width: 34px;
          height: 34px;
          background: #7c3aed;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          color: white;
          font-size: 15px;
        }

        .logo-text {
          font-family: 'Sora', sans-serif;
          font-size: 17px;
          font-weight: 600;
          color: #7c3aed;
        }

        .heading {
          font-family: 'Sora', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #0f0a1e;
          line-height: 1.25;
          margin-bottom: 36px;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .input-wrapper {
          position: relative;
        }

        .input {
          width: 100%;
          padding: 15px 16px;
          border: 1.5px solid #d4c8f5;
          border-radius: 10px;
          background: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: #0f0a1e;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          appearance: none;
        }

        .input::placeholder {
          color: #a89cc8;
        }

        .input:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.12);
        }

        .input-password {
          padding-right: 48px;
        }

        .eye-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #a89cc8;
          display: flex;
          align-items: center;
          padding: 4px;
          transition: color 0.2s;
        }

        .eye-btn:hover {
          color: #7c3aed;
        }

        .btn-primary {
          width: 100%;
          padding: 16px;
          background: #7c3aed;
          color: white;
          border: none;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 6px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 14px rgba(124, 58, 237, 0.35);
        }

        .btn-primary:hover {
          background: #6d28d9;
          box-shadow: 0 6px 18px rgba(124, 58, 237, 0.45);
          transform: translateY(-1px);
        }

        .btn-primary:active {
          transform: translateY(0);
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0 20px;
          color: #a89cc8;
          font-size: 13px;
        }

        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e2d9f3;
        }

        /* New full-width stacked social buttons */
        .social-buttons-stacked {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .btn-social-full {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 14px 16px;
          border: 1.5px solid #d4c8f5;
          border-radius: 10px;
          background: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #3d3360;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }

        .btn-social-full:hover {
          border-color: #7c3aed;
          background: #faf8ff;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.08);
        }

        .login-link {
          text-align: center;
          margin-top: 28px;
          font-size: 14px;
          color: #7a6e99;
        }

        .login-link a {
          color: #7c3aed;
          font-weight: 600;
          text-decoration: none;
        }

        .login-link a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="page">
        {/* Logo */}
        <div className="logo">
          <div className="logo-icon">S</div>
          <span className="logo-text">killSync</span>
        </div>

        {/* Heading */}
        <h1 className="heading">Welcome to SkillSync</h1>

        {/* Form */}
        <div className="form">
          <div className="input-wrapper">
            <input
              className="input"
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-wrapper">
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email address eg. jamie234@gmail.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-wrapper">
            <input
              className="input input-password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <button
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          <button className="btn-primary" onClick={handleSubmit}>
            Create account
          </button>
        </div>

        {/* Divider */}
        <div className="divider">or sign up with</div>

        {/* Full-width stacked social buttons */}
        <div className="social-buttons-stacked">
          <button className="btn-social-full">
            {/* Google "G" icon */}
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <button className="btn-social-full">
            {/* Facebook "f" icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
            Continue with Facebook
          </button>
        </div>

        <p className="login-link">
          Already have an account? <a href="#">Log in</a>
        </p>
      </div>
    </>
  );
}