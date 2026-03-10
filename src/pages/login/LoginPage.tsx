import React, { useState } from 'react';

const LoginScreen: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', { userId, password });
    // Add your authentication logic here
  };

  const handleClear = () => {
    setUserId('');
    setPassword('');
  };

  return (
    <>
      <style>{`
        /* Import Google Font */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

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
          padding: 20px;
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          background: var(--surface-main);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 40px 32px;
          box-shadow: var(--shadow-card);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .icon-container {
          width: 48px;
          height: 48px;
          background: var(--surface-soft);
          color: var(--text-main);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .title {
          font-size: 22px;
          font-weight: 600;
          color: var(--text-main);
          margin: 0 0 8px 0;
          letter-spacing: -0.02em;
        }

        .subtitle {
          font-size: 14px;
          color: var(--text-muted);
          text-align: center;
          margin: 0 0 32px 0;
          line-height: 1.5;
        }

        .login-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .input-group {
          position: relative;
          width: 100%;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-soft);
          width: 18px;
          height: 18px;
          pointer-events: none;
        }

        .input-field {
          width: 100%;
          padding: 12px 16px 12px 42px;
          border: 1px solid var(--border-strong);
          border-radius: 10px;
          background: var(--surface-main);
          font-size: 14px;
          color: var(--text-main);
          outline: none;
          transition: all 0.2s ease;
        }

        .input-field::placeholder {
          color: var(--text-soft);
        }

        .input-field:focus {
          border-color: var(--focus-ring);
          box-shadow: 0 0 0 1px var(--focus-ring);
        }

        .button-group {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .btn {
          flex: 1;
          padding: 12px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
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
          color: var(--surface-main);
        }

        .btn-primary:hover {
          background: var(--primary-hover);
        }

        .btn-secondary {
          background: var(--surface-main);
          color: var(--text-muted);
          border: 1px solid var(--border-strong);
        }

        .btn-secondary:hover {
          background: var(--surface-soft);
          border-color: var(--text-soft);
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 32px 20px;
          }
        }
      `}</style>

      <div className="login-wrapper">
        <div className="login-card">
          <div className="icon-container">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </div>

          <h1 className="title">Welcome Back</h1>
          <p className="subtitle">Please enter your User ID and password to access your account.</p>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                type="text"
                className="input-field"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type="password"
                className="input-field"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="button-group">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleClear}
              >
                Clear
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;