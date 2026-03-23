import React, { useEffect } from 'react';

export type SnackbarType = 'success' | 'error' | 'warning' | 'info';

export interface SnackbarProps {
  message: string;
  type: SnackbarType;
  onClose: () => void;
  duration?: number;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, type, onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Instead of changing the whole background, we only tint the icon for a premium feel
  const getIconTheme = (type: SnackbarType) => {
    switch (type) {
      case 'success':
        return { color: '#34D399' }; // Soft Emerald
      case 'error':
        return { color: '#FB7185' }; // Soft Rose
      case 'warning':
        return { color: '#FBBF24' }; // Soft Amber
      case 'info':
        return { color: '#60A5FA' }; // Soft Blue
      default:
        return { color: '#FAFAFA' }; // White
    }
  };

  const getIcon = (type: SnackbarType, color: string) => {
    switch (type) {
      case 'success':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        );
      case 'error':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        );
      case 'warning':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      case 'info':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
    }
  };

  const theme = getIconTheme(type);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500&display=swap');

        @keyframes sleekSlideUp {
          0% {
            transform: translate(-50%, 20px) scale(0.96);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, 0) scale(1);
            opacity: 1;
          }
        }

        .snackbar-wrapper {
          position: fixed;
          bottom: 40px;
          left: 50%;
          z-index: 9999;
          display: flex;
          justify-content: center;
          pointer-events: none;
          animation: sleekSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }

        .snackbar-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px 12px 14px;
          background: #09090B; /* Deepest carbon black */
          border: 1px solid #27272A; /* Subtle gray border */
          border-radius: 12px;
          box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.25);
          pointer-events: auto;
          min-width: 320px;
          max-width: 90vw;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .snackbar-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .snackbar-text {
          font-family: 'Outfit', -apple-system, sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #FAFAFA;
          letter-spacing: 0.02em;
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .snackbar-close {
          background: transparent;
          border: none;
          color: #71717A;
          cursor: pointer;
          padding: 4px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
          margin-right: -4px;
        }

        .snackbar-close:hover {
          color: #FAFAFA;
          background: rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 640px) {
          .snackbar-wrapper {
            bottom: 24px;
            width: 100%;
            padding: 0 24px;
          }
          
          .snackbar-card {
            width: 100%;
            min-width: auto;
          }
        }
      `}</style>

      <div className="snackbar-wrapper">
        <div className="snackbar-card" role="alert">
          <div className="snackbar-icon-box">
            {getIcon(type, theme.color)}
          </div>
          <span className="snackbar-text">
            {message}
          </span>
          <button
            className="snackbar-close"
            onClick={onClose}
            aria-label="Close notification"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Snackbar;