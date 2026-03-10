import React, { useState } from 'react';

const LoginScreen: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', { userId, password });
    // Trigger your secure authentication flow here
  };

  const handleClear = () => {
    setUserId('');
    setPassword('');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        :root {
          --primary-dark: #175433; /* Matching the dashboard dark green */
          --primary-hover: #124026;
          --bg-main: #f4f6f8;
          --bg-input: #f9fafb;
          --text-main: #111827;
          --text-muted: #6b7280;
          --border-color: #eaedf1;
        }

        * {
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }

        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
          background-color: var(--bg-main);
        }

        .login-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          border-radius: 32px; /* Super curvy */
          padding: 48px 40px;
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.05), 0 10px 20px -5px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .icon-container {
          width: 56px;
          height: 56px;
          background: #f0fdf4; /* Light green tint */
          border-radius: 50%; /* Perfect circle */
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          color: var(--primary-dark);
        }

        .title {
          font-size: 26px;
          font-weight: 700;
          color: var(--text-main);
          margin: 0 0 10px 0;
          letter-spacing: -0.03em;
        }

        .subtitle {
          font-size: 15px;
          color: var(--text-muted);
          text-align: center;
          margin: 0 0 36px 0;
          line-height: 1.5;
        }

        .login-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          position: relative;
          width: 100%;
        }

        .input-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          width: 20px;
          height: 20px;
          pointer-events: none;
          transition: color 0.2s ease;
        }

        .input-field {
          width: 100%;
          padding: 16px 20px 16px 48px;
          border: 2px solid transparent;
          border-radius: 20px; /* Highly rounded inputs */
          background: var(--bg-input);
          font-size: 15px;
          color: var(--text-main);
          font-weight: 500;
          outline: none;
          transition: all 0.3s ease;
        }

        .input-field::placeholder {
          color: #9ca3af;
          font-weight: 400;
        }

        .input-field:focus {
          background: #ffffff;
          border-color: var(--primary-dark);
          box-shadow: 0 4px 12px rgba(23, 84, 51, 0.08);
        }

        .input-field:focus + .input-icon,
        .input-group:focus-within .input-icon {
          color: var(--primary-dark);
        }

        .button-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 12px;
        }

        .btn {
          width: 100%;
          padding: 16px;
          border-radius: 20px; /* Highly rounded buttons */
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          outline: none;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .btn-primary {
          background: var(--primary-dark);
          color: #ffffff;
          box-shadow: 0 8px 16px rgba(23, 84, 51, 0.15);
        }

        .btn-primary:hover {
          background: var(--primary-hover);
          transform: translateY(-1px);
          box-shadow: 0 10px 20px rgba(23, 84, 51, 0.2);
        }

        .btn-primary:active {
          transform: translateY(1px);
        }

        .btn-secondary {
          background: transparent;
          color: var(--text-muted);
        }

        .btn-secondary:hover {
          background: var(--bg-input);
          color: var(--text-main);
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 40px 24px;
            border-radius: 28px;
          }
        }
      `}</style>

      <div className="login-wrapper">
        <div className="login-card">
          <div className="icon-container">
            {/* Swapped to a slightly rounder, bolder icon */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>

          <h1 className="title">Welcome Back</h1>
          <p className="subtitle">Please enter your credentials to access the admin dashboard.</p>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="text"
                className="input-field"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>

            <div className="input-group">
              <input
                type="password"
                className="input-field"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            <div className="button-group">
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                Log In
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleClear}
              >
                Clear Fields
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;