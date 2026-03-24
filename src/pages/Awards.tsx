import { useState, useEffect } from 'react';
import DashboardSidebar from './Sidebar';
import Snackbar, { type SnackbarType } from '../theme/Snackbar';

// --- MOCK API DATA ---
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://petropoints-backend.deploy.splsystems.in/api';

export default function LoyaltyAdminDashboard() {
  // 1. STATE
  const [mobileNumber, setMobileNumber] = useState('');
  const [points, setPoints] = useState<number | ''>('');
  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  // Replaced inline error/success with the Snackbar system
  const [snackbar, setSnackbar] = useState<{ message: string; type: SnackbarType } | null>(null);

  const showSnackbar = (message: string, type: SnackbarType) => setSnackbar({ message, type });

  // 2. FETCH CUSTOMERS ONCE
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsFetching(true);
        const res = await fetch(`${API_BASE_URL}/read`);
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        showSnackbar('Failed to fetch customers', 'error');
      } finally {
        setIsFetching(false);
      }
    };

    fetchCustomers();
  }, []);

  // 3. FIND CUSTOMER BY MOBILE
  const customer = customers.find((c) => c.CustomerMobile === mobileNumber);
  const currentPoints = Number(customer?.CustomerPoints || 0);

  // 4. MAIN AWARD FUNCTION
  const handleAward = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      if (!mobileNumber || mobileNumber.length !== 10) {
        showSnackbar('Enter a valid 10-digit mobile number', 'warning');
        return;
      }

      if (!points || points <= 0) {
        showSnackbar('Enter a valid point amount', 'warning');
        return;
      }

      if (!customer) {
        showSnackbar('Customer not found', 'warning');
        return;
      }

      const newPoints = currentPoints + Number(points);

      // CALL BACKEND
      const res = await fetch(`${API_BASE_URL}/updatePoints/${customer.CustomerID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ points: newPoints }),
      });

      if (!res.ok) {
        throw new Error('Update failed');
      }

      // UPDATE UI INSTANTLY
      setCustomers((prev) =>
        prev.map((c) =>
          c.CustomerID === customer.CustomerID
            ? { ...c, CustomerPoints: newPoints }
            : c
        )
      );

      showSnackbar('Points awarded successfully', 'success');
      
      // Reset form
      setMobileNumber('');
      setPoints('');
    } catch (err) {
      showSnackbar('Something went wrong. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');

        :root {
          /* Ultra-Minimalist Palette (Matching Inspiration) */
          --bg-body: #FAFAFA;
          --surface: #FFFFFF;
          --text-main: #09090B;
          --text-soft: #71717A;
          --text-faint: #A1A1AA;
          --border-light: #F4F4F5;
          --border-strong: #E4E4E7;
          --accent-black: #09090B;
          --accent-hover: #27272A;
          --danger: #E11D48;
          --success: #10B981;
          --radius-sm: 8px;
          --radius-md: 12px;
          --radius-full: 99px;
        }

        * {
          box-sizing: border-box;
          font-family: 'Outfit', -apple-system, sans-serif;
        }

        body, html {
          margin: 0; padding: 0;
          background-color: var(--bg-body);
          color: var(--text-main);
          -webkit-font-smoothing: antialiased;
        }

        .app-container {
          display: flex;
          min-height: 100vh;
          padding: clamp(12px, 2vw, 24px);
          gap: clamp(12px, 2vw, 24px);
          align-items: flex-start;
          max-width: 1600px;
          margin: 0 auto;
        }

        .main-view {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 48px;
          min-width: 0;
        }

        /* --- Minimalist Header --- */
        .header-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
        }

        .header-titles h1 {
          font-size: 32px;
          font-weight: 500;
          letter-spacing: -0.04em;
          margin: 0 0 8px 0;
          color: var(--text-main);
        }

        .header-titles p {
          font-size: 15px;
          color: var(--text-soft);
          margin: 0;
          font-weight: 300;
        }

        /* --- Flat Data Panel (Form Container) --- */
        .data-panel {
          background: var(--surface);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-md);
          overflow: hidden;
          max-width: 560px;
          padding: 40px;
        }

        .form-flow { 
          display: flex; 
          flex-direction: column; 
          gap: 32px; 
        }

        .form-block { 
          display: flex; 
          flex-direction: column; 
          gap: 8px; 
          position: relative;
        }

        .form-block label { 
          font-size: 13px; 
          color: var(--text-soft); 
          font-weight: 400; 
        }
        
        .sleek-input {
          padding: 14px 0;
          border: none;
          border-bottom: 1px solid var(--border-strong);
          font-size: 16px;
          background: transparent;
          color: var(--text-main);
          transition: border-color 0.2s;
        }
        
        .sleek-input:focus { 
          outline: none; 
          border-bottom-color: var(--text-main); 
        }

        .sleek-input::placeholder { 
          color: var(--text-faint); 
          font-weight: 300; 
        }

        .sleek-input:disabled { 
          color: var(--text-faint); 
          border-bottom-style: dashed; 
          cursor: not-allowed;
        }

        /* Input Status Hints */
        .input-hint {
          font-size: 12px;
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .hint-loading { color: var(--text-faint); }
        .hint-error { color: var(--danger); }
        .hint-success { color: var(--success); }

        /* Sleek Button */
        .btn-sleek {
          background: var(--accent-black);
          color: var(--surface);
          border: none;
          padding: 16px 24px;
          border-radius: var(--radius-full);
          font-size: 15px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          margin-top: 8px;
        }

        .btn-sleek:hover:not(:disabled) {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }

        .btn-sleek:disabled {
          background: var(--border-strong);
          color: var(--text-soft);
          cursor: not-allowed;
          transform: none;
        }

        /* Customer Preview Box */
        .preview-box {
          background: var(--bg-body);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-sm);
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: fade 0.3s ease;
        }

        .preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-strong);
        }

        .preview-name {
          font-weight: 500;
          font-size: 15px;
          color: var(--text-main);
          margin: 0;
        }

        .preview-id {
          font-family: 'SFMono-Regular', monospace;
          font-size: 12px;
          color: var(--text-soft);
        }

        .preview-math {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
        }

        .math-calc { color: var(--text-soft); }
        .math-total { font-weight: 600; color: var(--text-main); }

        /* Animations */
        @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
        
        .spinner {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Responsive */
        @media (max-width: 768px) { 
          .app-container { flex-direction: column; } 
          .main-view { padding: 24px; } 
          .data-panel { max-width: 100%; padding: 24px; }
        }
      `}</style>

      <div className="app-container">
        <DashboardSidebar />

        <main className="main-view">
          <header className="header-section">
            <div className="header-titles">
              <h1>Grant Points</h1>
              <p>Search by mobile number to validate and apply rewards.</p>
            </div>
          </header>

          <div className="data-panel">
            <form className="form-flow" onSubmit={(e) => e.preventDefault()}>
              
              {/* Mobile Input Group */}
              <div className="form-block">
                <label>Customer Mobile Number</label>
                <input
                  className="sleek-input"
                  type="text"
                  placeholder="e.g. 9876543210"
                  value={mobileNumber}
                  disabled={isLoading || isFetching}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                />
                
                {/* Minimalist Inline Status Validation */}
                <div className="input-hint">
                  {isFetching ? (
                     <span className="hint-loading">Loading database...</span>
                  ) : mobileNumber.length > 0 && mobileNumber.length < 10 ? (
                    <span className="hint-loading">Requires 10 digits</span>
                  ) : mobileNumber.length === 10 ? (
                    customer ? (
                      <span className="hint-success">✓ Customer verified</span>
                    ) : (
                      <span className="hint-error">✕ Customer not found</span>
                    )
                  ) : null}
                </div>
              </div>

              {/* Points Input Group */}
              <div className="form-block">
                <label>Points to Award</label>
                <input
                  className="sleek-input"
                  type="number"
                  placeholder="0"
                  value={points}
                  disabled={!customer || isLoading}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') return setPoints('');
                    const num = Number(value);
                    if (num >= 0) setPoints(num);
                  }}
                />
              </div>

              {/* Customer Validation Preview Box */}
              {customer && (
                <div className="preview-box">
                  <div className="preview-header">
                    <h3 className="preview-name">{customer.CustomerName}</h3>
                    <span className="preview-id">#CUST-{customer.CustomerID}</span>
                  </div>
                  
                  {Number(points) > 0 ? (
                    <div className="preview-math">
                      <span className="math-calc">{currentPoints} + {Number(points)}</span>
                      <span className="math-total">New Balance: {(currentPoints + Number(points)).toLocaleString()}</span>
                    </div>
                  ) : (
                    <div className="preview-math">
                      <span className="math-calc">Current Balance</span>
                      <span className="math-total">{currentPoints.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Submit CTA */}
              <button
                className="btn-sleek"
                onClick={handleAward}
                disabled={!customer || !points || Number(points) <= 0 || isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Confirm & Award Points'
                )}
              </button>
            </form>
          </div>
        </main>
      </div>

      {/* Reused Snackbar component from the CustomersList architecture */}
      {snackbar && (
        <Snackbar 
          message={snackbar.message} 
          type={snackbar.type} 
          onClose={() => setSnackbar(null)} 
        />
      )}
    </>
  );
}