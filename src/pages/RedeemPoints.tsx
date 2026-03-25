import  { useState, useEffect } from 'react';
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
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');

        :root {
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
      `}</style>

      <div className="app-container">
        <DashboardSidebar />

        <main className="main-view">
          <header className="header-section">
            <div className="header-titles">
              <h1>Redeem Points</h1>
              <p>Search by mobile number to validate and redeem points.</p>
            </div>
          </header>

          <div className="data-panel">
            <form className="form-flow" onSubmit={(e) => e.preventDefault()}>
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
              </div>

              <div className="form-block">
                <label>Points to Redeem</label>
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

              <button
                className="btn-sleek"
                onClick={handleRedeem}
                disabled={!customer || !points || Number(points) <= 0 || isLoading}
              >
                {isLoading ? 'Processing...' : 'Confirm & Redeem Points'}
              </button>
            </form>
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