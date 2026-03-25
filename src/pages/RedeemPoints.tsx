import { useState, useEffect } from 'react';
import DashboardSidebar from './Sidebar';
import Snackbar, { type SnackbarType } from '../theme/Snackbar';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://petropoints-backend.deploy.splsystems.in/api';

export default function RedeemPoints() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [points, setPoints] = useState<number | ''>('');
  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [snackbar, setSnackbar] = useState<{ message: string; type: SnackbarType } | null>(null);

  const showSnackbar = (message: string, type: SnackbarType) => setSnackbar({ message, type });

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

  const customer = customers.find((c) => c.CustomerMobile === mobileNumber);
  const currentPoints = Number(customer?.CustomerPoints || 0);

  const handleRedeem = async () => {
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

      if (currentPoints < points) {
        showSnackbar('Insufficient points to redeem', 'warning');
        return;
      }

      const newPoints = currentPoints - Number(points);

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

      setCustomers((prev) =>
        prev.map((c) =>
          c.CustomerID === customer.CustomerID
            ? { ...c, CustomerPoints: newPoints }
            : c
        )
      );

      showSnackbar('Points redeemed successfully', 'success');

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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        :root {
          /* Modern SaaS Palette */
          --bg-body: #F8FAFC;
          --surface: #FFFFFF;
          --primary: #4F46E5;
          --primary-hover: #4338CA;
          --primary-light: #EEF2FF;
          --text-main: #0F172A;
          --text-muted: #64748B;
          --text-faint: #94A3B8;
          --border-light: #F1F5F9;
          --border-strong: #E2E8F0;
          --danger: #EF4444;
          --success-text: #166534;
          --success-bg: #DCFCE7;
          --warning-bg: #FEF9C3;
          --warning-text: #854D0E;
          
          --radius-sm: 6px;
          --radius-md: 12px;
          --radius-lg: 16px;
          
          --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
          --shadow-focus: 0 0 0 3px rgba(79, 70, 229, 0.2);
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
          padding: 40px 48px;
          min-width: 0;
        }

        /* --- SaaS Header --- */
        .header-section {
          margin-bottom: 32px;
        }

        .header-titles h1 {
          font-size: 28px;
          font-weight: 600;
          letter-spacing: -0.02em;
          margin: 0 0 4px 0;
          color: var(--text-main);
        }

        .header-titles p {
          font-size: 14px;
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
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          padding: 32px;
        }

        .form-flow { 
          display: flex; 
          flex-direction: column; 
          gap: 24px; 
        }

        .form-block { 
          display: flex; 
          flex-direction: column; 
          gap: 8px; 
        }

        .form-block label { 
          font-size: 13px; 
          color: var(--text-muted); 
          font-weight: 500; 
        }
        
        .saas-input {
          padding: 12px 16px;
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-md);
          font-size: 15px;
          background: var(--surface);
          color: var(--text-main);
          transition: all 0.2s;
          box-shadow: var(--shadow-sm);
        }
        
        .saas-input:focus { 
          outline: none; 
          border-color: var(--primary); 
          box-shadow: var(--shadow-focus); 
        }

        .saas-input::placeholder { 
          color: var(--text-faint); 
        }

        .saas-input:disabled { 
          background: var(--border-light); 
          color: var(--text-muted); 
          cursor: not-allowed; 
        }

        /* Customer Info Card */
        .customer-info-box {
          background: #F8FAFC;
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-md);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: slideDown 0.3s ease;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .info-label {
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 500;
        }

        .info-value {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-main);
        }

        .points-badge {
          background: var(--primary-light);
          color: var(--primary);
          padding: 4px 10px;
          border-radius: 99px;
          font-size: 13px;
        }

        .insufficient-badge {
          background: var(--warning-bg);
          color: var(--warning-text);
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 6px;
          margin-top: 4px;
          display: inline-block;
        }

        /* Primary Button */
        .btn-primary {
          background: var(--primary);
          color: white;
          border: none;
          padding: 14px 24px;
          border-radius: var(--radius-md);
          font-size: 15px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: var(--shadow-sm);
          width: 100%;
          margin-top: 8px;
        }

        .btn-primary:hover:not(:disabled) {
          background: var(--primary-hover);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        .btn-primary:disabled {
          background: var(--border-strong);
          color: var(--text-muted);
          cursor: not-allowed;
          box-shadow: none;
        }

        /* Animations */
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 768px) { 
          .main-view { padding: 24px; } 
          .data-panel { padding: 24px; }
        }
      `}</style>

      <div className="app-container">
        <DashboardSidebar />

        <main className="main-view">
          <header className="header-section">
            <div className="header-titles">
              <h1>Redeem Points</h1>
              <p>Process customer rewards and deduct points seamlessly.</p>
            </div>
          </header>

          <div className="content-grid">
            <div className="data-panel">
              <form className="form-flow" onSubmit={(e) => e.preventDefault()}>
                
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
                </div>

                {customer && (
                  <div className="customer-info-box">
                    <div className="info-row">
                      <span className="info-label">Customer Name</span>
                      <span className="info-value">{customer.CustomerName || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Available Balance</span>
                      <span className="info-value points-badge">{currentPoints} pts</span>
                    </div>
                  </div>
                )}

                <div className="form-block">
                  <label>Points to Redeem</label>
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
                  {customer && Number(points) > currentPoints && (
                    <span className="insufficient-badge">
                      Insufficient balance for this transaction.
                    </span>
                  )}
                </div>

                <button
                  className="btn-primary"
                  onClick={handleRedeem}
                  disabled={
                    !customer || 
                    !points || 
                    Number(points) <= 0 || 
                    Number(points) > currentPoints || 
                    isLoading
                  }
                >
                  {isLoading ? (
                    'Processing Transaction...'
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Confirm & Redeem Points
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