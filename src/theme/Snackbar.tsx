import React, { useEffect } from 'react';

export type SnackbarType = 'success' | 'error' | 'warning' | 'info';

export interface SnackbarProps {
  message: string;
  type: SnackbarType;
  onClose: () => void;
  duration?: number;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getTypeStyles = (type: SnackbarType) => {
    switch (type) {
      case 'success':
        return {
          bg: '#059669',
          border: '#047857',
        };
      case 'error':
        return {
          bg: '#dc2626',
          border: '#b91c1c',
        };
      case 'warning':
        return {
          bg: '#d97706',
          border: '#b45309',
        };
      case 'info':
        return {
          bg: '#2563eb',
          border: '#1d4ed8',
        };
      default:
        return {
          bg: '#0f172a',
          border: '#020617',
        };
    }
  };

  const getIcon = (type: SnackbarType) => {
    switch (type) {
      case 'success':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        );
      case 'error':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        );
      case 'warning':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      case 'info':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
    }
  };

  const styles = getTypeStyles(type);

  return (
    <>
      <style>{`
        @keyframes slideUpFade {
          0% {
            transform: translate(-50%, 100%) scale(0.95);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, 0) scale(1);
            opacity: 1;
          }
        }

        .snackbar-overlay {
          position: fixed;
          bottom: clamp(16px, 4vw, 32px);
          left: 50%;
          z-index: 9999;
          display: flex;
          justify-content: center;
          pointer-events: none;
          animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }

        .snackbar-pill {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 100px;
          color: #ffffff;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          pointer-events: auto;
          min-width: 280px;
          max-width: 90vw;
        }

        .snackbar-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .snackbar-message {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.01em;
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .snackbar-close-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          padding: 4px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
          margin-right: -4px;
        }

        .snackbar-close-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.15);
        }

        @media (max-width: 640px) {
          .snackbar-overlay {
            bottom: 24px;
            width: 100%;
            padding: 0 24px;
          }
          
          .snackbar-pill {
            width: 100%;
            min-width: auto;
          }
        }
      `}</style>

      <div className="snackbar-overlay">
        <div 
          className="snackbar-pill" 
          style={{ 
            backgroundColor: styles.bg,
            border: `1px solid ${styles.border}`
          }}
          role="alert"
        >
          <div className="snackbar-icon">
            {getIcon(type)}
          </div>
          <span className="snackbar-message">
            {message}
          </span>
          <button 
            className="snackbar-close-btn" 
            onClick={onClose}
            aria-label="Close notification"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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