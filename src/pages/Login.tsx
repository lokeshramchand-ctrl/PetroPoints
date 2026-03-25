import React, { useState, useEffect } from 'react';

export default function UberLandingPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your form submission logic here
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        :root {
          --bg-main: #f8fafc;
          --surface-main: #ffffff;
          --text-main: #0f172a;
          --text-muted: #64748b;
          --text-placeholder: #94a3b8;
          --border-color: #e2e8f0;
          --border-focus: #cbd5e1;
          --accent: #2563eb;
          --accent-hover: #1d4ed8;
          --accent-ring: rgba(37, 99, 235, 0.15);
          --error: #ef4444;
          --error-bg: #fef2f2;
          --success: #10b981;
          --success-bg: #ecfdf5;
          --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --shadow-card: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
        }

        [data-theme='dark'] {
          --bg-main: #0f172a;
          --surface-main: #1e293b;
          --text-main: #f8fafc;
          --text-muted: #94a3b8;
          --text-placeholder: #64748b;
          --border-color: #334155;
          --border-focus: #475569;
          --accent: #3b82f6;
          --accent-hover: #60a5fa;
          --accent-ring: rgba(59, 130, 246, 0.15);
          --error: #f87171;
          --error-bg: #fef2f2;
          --success: #34d399;
          --success-bg: #ecfdf5;
          --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.1);
          --shadow-card: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        }

        * {
          box-sizing: border-box;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        body, html {
          margin: 0;
          padding: 0;
          background-color: var(--bg-main);
          color: var(--text-main);
          -webkit-font-smoothing: antialiased;
        }

        /* Layout */
        .page-wrapper {
          min-height: 100vh;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          overflow: hidden;
        }
        @media (min-width: 1024px) {
          .page-wrapper {
            flex-direction: row;
          }
        }

        /* Left Side */
        .left-section {
          flex: 1;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 3rem 1.5rem;
        }
        @media (min-width: 768px) {
          .left-section { padding: 0 4rem; }
        }
        @media (min-width: 1280px) {
          .left-section { padding: 0 6rem; }
        }

        .logo {
          position: absolute;
          top: 1rem;
          left: 1.5rem;
          font-size: 1.5rem;
          font-weight: 500;
          letter-spacing: -0.025em;
        }
        @media (min-width: 768px) {
          .logo { left: 4rem; }
        }
        @media (min-width: 1280px) {
          .logo { left: 6rem; }
        }

        /* Animations */
        .anim-fade-up {
          opacity: 0;
          transform: translateY(3rem);
          transition: opacity 1s ease-out, transform 1s ease-out;
        }
        .anim-fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .anim-slide-right {
          opacity: 0;
          transform: translateX(2rem) scale(0.95);
          transition: opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s;
        }
        .anim-slide-right.visible {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        .anim-delay-card {
          opacity: 0;
          transform: translateY(3rem);
          transition: opacity 1s ease-out 0.7s, transform 1s ease-out 0.7s, box-shadow 0.3s ease;
        }
        .anim-delay-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Typography & Content */
        .headline {
          font-size: 3.5rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        @media (min-width: 768px) {
          .headline { font-size: 4.5rem; }
        }
        .text-black { color: #000; display: block; }
        .text-gray { color: #828282; display: block; }
        
        .subheadline {
          color: #374151;
          font-weight: 500;
          margin-bottom: 2rem;
          font-size: 15px;
        }

        /* Form Elements */
        .form-container {
          max-width: 28rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .input-group {
          position: relative;
        }
        
        .input-icon-left {
          position: absolute;
          top: 0; bottom: 0; left: 1rem;
          display: flex;
          align-items: center;
          color: #9CA3AF;
          pointer-events: none;
          transition: color 0.2s;
        }
        .input-group:focus-within .input-icon-left {
          color: #000;
        }

        .input-icon-right {
          position: absolute;
          top: 0; bottom: 0; right: 1rem;
          display: flex;
          align-items: center;
          color: #9CA3AF;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
        }
        .input-icon-right:hover { color: #000; }

        .custom-input {
          width: 100%;
          background: #fff;
          border: 1px solid #E5E7EB;
          border-radius: 0.5rem;
          padding: 1rem 3rem;
          font-size: 1rem;
          outline: none;
          transition: all 0.2s;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .custom-input:focus {
          border-color: #000;
          box-shadow: 0 0 0 2px #000;
        }

        .btn-primary {
          width: 100%;
          background: #1A1A1A;
          color: #fff;
          border: none;
          border-radius: 0.5rem;
          padding: 1rem;
          margin-top: 0.5rem;
          font-size: 1rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .btn-primary:hover {
          background: #000;
          transform: scale(1.02);
        }
        .btn-primary:active {
          transform: scale(0.98);
        }
        .btn-primary svg {
          transition: transform 0.2s;
        }
        .btn-primary:hover svg {
          transform: translateX(4px);
        }

        /* Right Side (Visuals) */
        .right-section {
          flex: 1;
          position: relative;
          border-radius: 2.5rem;
          overflow: hidden;
          background-color: #2D5A3C;
          display: none;
        }

        @media (min-width: 768px) {
          .right-section {
            display: flex;
            flex: 0 0 50%; /* Half of the page */
          }
        }

        .bg-graphic {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          mix-blend-mode: overlay;
          opacity: 0.8;
        }

        .bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(45, 90, 60, 0.4), transparent, rgba(45, 90, 60, 0.9));
        }

        .form-container {
          max-width: 28rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .custom-input {
          width: 100%;
          background: #fff;
          border: 1px solid #E5E7EB;
          border-radius: 0.5rem;
          padding: 1rem 3rem;
          font-size: 1rem;
          outline: none;
          transition: all 0.2s;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }

        .custom-input:focus {
          border-color: #000;
          box-shadow: 0 0 0 2px #000;
        }

        .btn-primary {
          width: 100%;
          background: #1A1A1A;
          color: #fff;
          border: none;
          border-radius: 0.5rem;
          padding: 1rem;
          margin-top: 0.5rem;
          font-size: 1rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .btn-primary:hover {
          background: #000;
          transform: scale(1.02);
        }

        .btn-primary:active {
          transform: scale(0.98);
        }
      `}</style>

      <div className="page-wrapper">
        
        {/* ================= LEFT SIDE: Content & Form ================= */}
        <div className="left-section">
          
          <div className="logo">PetroPoints</div>

          <div className={`anim-fade-up ${isMounted ? 'visible' : ''}`}>
            {/* <h1 className="headline">
              <span className="text-black">Go Anywhere</span>
              <span className="text-gray">With Uber</span>
            </h1> */}
{/*             
            <p className="subheadline">
              Request A Ride, Hop In, And Go.
            </p> */}

            <form className="form-container" onSubmit={handleSubmit}>
              <div className="input-group">
                <div className="input-icon-left">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-8-4.5-8-11a8 8 0 1116 0c0 6.5-8 11-8 11z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Login" 
                  className="custom-input"
                />
                <button type="button" className="input-icon-right">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" style={{transform: 'rotate(-45deg)'}}>
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>

              {/* Destination Input */}
              <div className="input-group">
                <div className="input-icon-left">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-8-4.5-8-11a8 8 0 1116 0c0 6.5-8 11-8 11z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="custom-input"
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn-primary">
                <span>Login</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* ================= RIGHT SIDE: Visuals & Nav ================= */}
        <div className={`right-section anim-slide-right ${isMounted ? 'visible' : ''}`}>
          
          <div 
            className="bg-graphic"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2000&auto=format&fit=crop')" }}
          />
          
        </div>
      </div>
    </>
  );
}