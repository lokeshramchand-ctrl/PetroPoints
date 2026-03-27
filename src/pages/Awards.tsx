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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');

        :root {
          /* Industrial SaaS Palette */
          --bg-body: #F1F5F9;
          --surface: #FFFFFF;
          --primary: #F97316;
          --primary-hover: #EA580C;
          --primary-light: #FFEDD5;
          --text-main: #0F172A;
          --text-muted: #475569;
          --text-faint: #94A3B8;
          --border-light: #E2E8F0;
          --border-strong: #0F172A;
          --danger: #DC2626;
          --danger-hover: #B91C1C;
          --success: #16A34A;
          --success-text: #14532D;
          --success-bg: #DCFCE7;
          
          --radius-sm: 0px;
          --radius-md: 0px;
          --radius-lg: 0px;
          
          --shadow-sm: none;
          --shadow-hard: 4px 4px 0px 0px rgba(15, 23, 42, 1);
          --shadow-hard-hover: 6px 6px 0px 0px rgba(15, 23, 42, 1);
          --shadow-focus: 0 0 0 3px rgba(249, 115, 22, 0.4);
        }

        * {
          box-sizing: border-box;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
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
          max-width: 1600px;
          margin: 0 auto;
        }

        .main-view {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 48px;
          min-width: 0;
          gap: 48px;
        }

        /* --- SaaS Header --- */
        .header-section {
          border-bottom: 3px solid var(--border-strong);
          padding-bottom: 24px;
        }

        .header-titles h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 40px;
          font-weight: 700;
          letter-spacing: -0.03em;
          margin: 0 0 8px 0;
          color: var(--text-main);
          text-transform: uppercase;
        }

        .header-titles p {
          font-size: 16px;
          color: var(--text-muted);
          margin: 0;
        }

        /* --- Panel & Form --- */
        .content-grid {
          display: grid;
          grid-template-columns: 1fr;
          max-width: 540px;
        }

        .data-panel {
          background: var(--surface);
          border: 2px solid var(--border-strong);
          box-shadow: var(--shadow-hard);
          padding: 32px;
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
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px; 
          color: var(--text-main); 
          font-weight: 700; 
          text-transform: uppercase;
        }
        
        .saas-input {
          padding: 12px 16px;
          border: 2px solid var(--border-strong);
          font-size: 15px;
          background: var(--surface);
          color: var(--text-main);
          transition: all 0.2s;
          box-shadow: 2px 2px 0px 0px rgba(15, 23, 42, 1);
        }
        
        .saas-input:focus { 
          outline: none; 
          border-color: var(--primary); 
          box-shadow: 4px 4px 0px 0px rgba(249, 115, 22, 1); 
        }

        .saas-input::placeholder { 
          color: var(--text-faint); 
        }

        .saas-input:disabled { 
          background: var(--border-light); 
          color: var(--text-muted); 
          cursor: not-allowed; 
        }

        /* Input Status Hints */
        .input-hint {
          font-size: 13px;
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
        }
        .hint-loading { color: var(--text-muted); }
        .hint-error { color: var(--danger); }
        .hint-success { color: var(--success); }

        /* Customer Preview Box */
        .customer-info-box {
          background: var(--bg-body);
          border: 2px solid var(--border-strong);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation: slideDown 0.3s ease;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .info-row.divider {
          border-bottom: 2px solid var(--border-strong);
          padding-bottom: 16px;
          margin-bottom: 8px;
        }

        .info-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 700;
          text-transform: uppercase;
        }

        .info-value {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-main);
        }

        .points-badge {
          background: var(--surface);
          border: 2px solid var(--border-strong);
          color: var(--text-main);
          padding: 6px 12px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 700;
          box-shadow: 2px 2px 0px 0px rgba(15, 23, 42, 1);
        }

        .points-addition {
          color: var(--primary-hover);
          background: var(--primary-light);
          border: 2px solid var(--primary);
          padding: 6px 12px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 700;
          box-shadow: 2px 2px 0px 0px rgba(249, 115, 22, 1);
          margin-left: 12px;
        }

        .points-total {
          color: var(--surface);
          background: var(--text-main);
          border: 2px solid var(--text-main);
          padding: 8px 16px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        /* Primary Button */
        .btn-primary {
          background: var(--primary);
          color: white;
          border: 2px solid var(--border-strong);
          padding: 16px 24px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 700;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: var(--shadow-hard);
          width: 100%;
          margin-top: 16px;
        }

        .btn-primary:hover:not(:disabled) {
          background: var(--primary-hover);
          transform: translate(-2px, -2px);
          box-shadow: var(--shadow-hard-hover);
        }

        .btn-primary:disabled {
          background: var(--border-light);
          border-color: var(--border-light);
          color: var(--text-muted);
          cursor: not-allowed;
          box-shadow: none;
        }

        /* Animations */
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .spinner {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Responsive */
        @media (max-width: 1024px) { 
          .main-view { padding: 32px 24px; gap: 32px; } 
        }

        @media (max-width: 768px) { 
          .data-panel { padding: 24px; }
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

          <div className="content-grid">
            <div className="data-panel">
              <form className="form-flow" onSubmit={(e) => e.preventDefault()}>
                
                {/* Mobile Input Group */}
                <div className="form-block">
                  <label>Customer Mobile Number</label>
                  <input
                    className="saas-input"
                    type="text"
                    placeholder="e.g. 9876543210"
                    value={mobileNumber}
                    disabled={isLoading || isFetching}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  />
                  
                  {/* Modern Validation Hint */}
                  <div className="input-hint">
                    {isFetching ? (
                       <span className="hint-loading">Loading database...</span>
                    ) : mobileNumber.length > 0 && mobileNumber.length < 10 ? (
                      <span className="hint-loading">Requires 10 digits</span>
                    ) : mobileNumber.length === 10 ? (
                      customer ? (
                        <span className="hint-success">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 4, verticalAlign: 'middle'}}><polyline points="20 6 9 17 4 12"></polyline></svg>
                          Customer verified
                        </span>
                      ) : (
                        <span className="hint-error">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 4, verticalAlign: 'middle'}}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          Customer not found
                        </span>
                      )
                    ) : null}
                  </div>
                </div>

                {/* Points Input Group */}
                <div className="form-block">
                  <label>Points to Award</label>
                  <input
                    className="saas-input"
                    type="number"
                    placeholder="Enter amount (e.g. 50)"
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

                {/* Customer Validation & Math Preview Box */}
                {customer && (
                  <div className="customer-info-box">
                    <div className="info-row divider">
                      <span className="info-label">{customer.CustomerName}</span>
                      <span className="info-value" style={{fontFamily: 'monospace', color: 'var(--text-muted)'}}>
                        #CUST-{customer.CustomerID}
                      </span>
                    </div>
                    
                    {Number(points) > 0 ? (
                      <>
                        <div className="info-row">
                          <span className="info-label">Calculation</span>
                          <div>
                            <span className="points-badge">{currentPoints} pts</span>
                            <span className="points-addition">+ {Number(points)} pts</span>
                          </div>
                        </div>
                        <div className="info-row">
                          <span className="info-label">New Balance</span>
                          <span className="points-total">{(currentPoints + Number(points)).toLocaleString()} pts</span>
                        </div>
                      </>
                    ) : (
                      <div className="info-row">
                        <span className="info-label">Current Balance</span>
                        <span className="points-badge">{currentPoints.toLocaleString()} pts</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Submit CTA */}
                <button
                  className="btn-primary"
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
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      Confirm & Award Points
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>

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