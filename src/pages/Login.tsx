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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');

        :root {
          /* Industrial SaaS Palette */
          --bg-main: #F1F5F9;
          --surface-main: #FFFFFF;
          --text-main: #0F172A;
          --text-muted: #475569;
          --border-color: #0F172A;
          --border-focus: #F97316;
          --accent: #F97316;
          --accent-hover: #EA580C;
          --shadow-hard: 4px 4px 0px 0px rgba(15, 23, 42, 1);
          --shadow-hard-hover: 6px 6px 0px 0px rgba(15, 23, 42, 1);
        }

        [data-theme='dark'] {
          --bg-main: #0F172A;
          --surface-main: #1E293B;
          --text-main: #F1F5F9;
          --text-muted: #94A3B8;
          --border-color: #F8FAFC;
          --border-focus: #F97316;
          --shadow-hard: 4px 4px 0px 0px rgba(248, 250, 252, 1);
          --shadow-hard-hover: 6px 6px 0px 0px rgba(248, 250, 252, 1);
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
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          overflow: hidden;
          background: linear-gradient(135deg, var(--bg-main) 0%, var(--surface-main) 100%);
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
          padding: 32px 16px;
        }
        @media (min-width: 768px) {
          .left-section { padding: 0 64px; }
        }
        @media (min-width: 1280px) {
          .left-section { padding: 0 128px; }
        }

        .logo {
          position: absolute;
          top: 0;
          left: 16px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 24px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-main);
        }
        @media (min-width: 768px) {
          .logo { left: 64px; }
        }
        @media (min-width: 1280px) {
          .logo { left: 128px; }
        }

        /* Animations */
        .anim-fade-up {
          opacity: 0;
          transform: translateY(3rem);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .anim-fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .anim-slide-right {
          opacity: 0;
          transform: translateX(2rem) scale(0.95);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
        }
        .anim-slide-right.visible {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        /* Typography & Content */
        .headline {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 56px;
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.1;
          margin-bottom: 48px;
          text-transform: uppercase;
        }
        @media (min-width: 768px) {
          .headline { font-size: 72px; }
        }
        .text-black { color: var(--text-main); display: block; }
        .text-gray { color: var(--accent); display: block; }

        /* Form Elements */
        .form-container {
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          background: var(--surface-main);
          padding: 32px;
          border: 3px solid var(--border-color);
          box-shadow: var(--shadow-hard);
        }

        .input-group {
          position: relative;
        }
        
        .input-icon-left {
          position: absolute;
          top: 0; bottom: 0; left: 16px;
          display: flex;
          align-items: center;
          color: var(--text-muted);
          pointer-events: none;
          transition: color 0.2s;
        }
        .input-group:focus-within .input-icon-left {
          color: var(--accent);
        }

        .input-icon-right {
          position: absolute;
          top: 0; bottom: 0; right: 16px;
          display: flex;
          align-items: center;
          color: var(--text-muted);
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
        }
        .input-icon-right:hover { color: var(--text-main); }

        .custom-input {
          width: 100%;
          background: var(--bg-main);
          border: 2px solid var(--border-color);
          padding: 16px 48px;
          font-size: 16px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          color: var(--text-main);
          outline: none;
          transition: all 0.2s;
        }
        .custom-input:focus {
          border-color: var(--accent);
          box-shadow: 4px 4px 0px 0px var(--accent);
        }

        .btn-primary {
          width: 100%;
          background: var(--text-main);
          color: var(--bg-main);
          border: 2px solid var(--text-main);
          padding: 16px;
          margin-top: 8px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px;
          font-weight: 700;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: var(--shadow-hard);
        }
        .btn-primary:hover {
          background: var(--accent);
          border-color: var(--accent);
          transform: translate(-2px, -2px);
          box-shadow: var(--shadow-hard-hover);
        }
        .btn-primary:active {
          transform: translate(0px, 0px);
          box-shadow: none;
        }
        .btn-primary svg {
          transition: transform 0.2s;
        }
        .btn-primary:hover svg {
          transform: translateX(6px);
        }

        /* Right Side (Visuals) */
        .right-section {
          flex: 1;
          position: relative;
          border: 4px solid var(--border-color);
          box-shadow: var(--shadow-hard);
          overflow: hidden;
          background-color: var(--text-main);
          display: none;
        }

        @media (min-width: 768px) {
          .right-section {
            display: flex;
            flex: 0 0 50%;
          }
        }

        .bg-graphic {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          mix-blend-mode: luminosity;
          opacity: 0.6;
          filter: contrast(1.2) sepia(1) hue-rotate(345deg) saturate(3);
        }

        .bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.9));
        }

        .accent-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 12px;
          background: var(--accent);
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