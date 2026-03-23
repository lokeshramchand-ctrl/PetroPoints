import { useState, type FormEvent } from 'react';
import DashboardSidebar from './Sidebar';

// --- MOCK API DATA ---
// Simulates a database of vehicles registered to specific mobile numbers
const mockVehicleDatabase: Record<string, { id: string; name: string; plate: string }[]> = {
  '9876543210': [
    { id: 'v1', name: 'Toyota Camry', plate: 'TS 09 EU 1234' },
    { id: 'v2', name: 'Honda Civic', plate: 'TS 09 AB 9876' },
  ],
  '1234567890': [
    { id: 'v3', name: 'Ford Mustang', plate: 'MH 01 ZA 5555' },
  ],
};

export default function LoyaltyAdminDashboard() {
  // 1. STATE
  const [mobileNumber, setMobileNumber] = useState('');
  const [availableVehicles, setAvailableVehicles] = useState<{ id: string; name: string; plate: string }[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [points, setPoints] = useState<number | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidUser, setIsValidUser] = useState(false);
  const [error, setError] = useState('');

  // 2. HANDLERS
  const handleValidateUser = () => {
    if (mobileNumber.length !== 10) {
      setError('Enter valid 10-digit mobile number');
      return;
    }

    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const vehicles = mockVehicleDatabase[mobileNumber] || [];

      if (vehicles.length === 0) {
        setError('No customer found');
        setIsValidUser(false);
      } else {
        setAvailableVehicles(vehicles);
        setIsValidUser(true);
      }

      setIsLoading(false);
    }, 400);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    if (!isValidUser) {
      setError('Please validate customer first');
      return;
    }

    if (!selectedVehicle) {
      setError('Select a vehicle');
      return;
    }

    if (!points || points <= 0) {
      setError('Enter valid points');
      return;
    }

    setError('');
    alert(`Successfully awarded ${points} points to vehicle ${selectedVehicle} (User: ${mobileNumber})`);
    resetForm();
  };

  const resetForm = () => {
    setMobileNumber('');
    setPoints('');
    setSelectedVehicle('');
    setAvailableVehicles([]);
    setIsValidUser(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

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

        /* --- Layout --- */
        .app-container {
          display: flex;
          min-height: 100vh;
          padding: clamp(12px, 2vw, 24px);
          gap: clamp(12px, 2vw, 24px);
          align-items: flex-start;
          max-width: 1600px;
          margin: 0 auto;
        }

        .sidebar {
          flex: 0 0 clamp(220px, 20vw, 280px);
          background-color: var(--surface-main);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          padding: 24px;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-soft);
          position: sticky;
          top: clamp(12px, 2vw, 24px);
          height: calc(100vh - clamp(24px, 4vw, 48px));
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .page-container {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* --- Header --- */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .page-title {
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 700;
          color: var(--text-main);
          margin: 0;
          letter-spacing: -0.04em;
        }

        /* --- Form Panel --- */
        .form-panel {
          background: var(--surface-main);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          box-shadow: var(--shadow-soft);
          padding: clamp(24px, 4vw, 40px);
          max-width: 640px;
        }

        .form-header {
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border-color);
        }

        .form-title {
          margin: 0 0 8px;
          font-size: 20px;
          font-weight: 700;
          color: var(--text-main);
          letter-spacing: -0.02em;
        }

        .form-subtitle {
          margin: 0;
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .form-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-muted);
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          font-size: 14px;
          color: var(--text-main);
          background: var(--bg-input);
          transition: all 0.2s ease;
        }

        .form-select {
          cursor: pointer;
        }

        .form-input::placeholder {
          color: var(--text-soft);
        }

        .form-input:focus,
        .form-select:focus {
          outline: 2px solid var(--focus-ring);
          outline-offset: 1px;
          border-color: var(--border-strong);
          box-shadow: none;
          background: var(--surface-main);
        }

        .form-select:disabled,
        .form-input:disabled {
          cursor: not-allowed;
          color: var(--text-soft);
          background-color: var(--surface-soft);
          border-color: var(--border-color);
        }

        .form-footer {
          margin-top: 16px;
          display: flex;
          justify-content: flex-start;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: var(--primary-dark);
          color: var(--surface-main);
          border: none;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: var(--shadow-soft);
        }

        .btn-primary:hover {
          background: var(--primary-hover);
          transform: translateY(-1px);
          box-shadow: var(--shadow-card);
        }

        .btn-primary:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.1);
        }

        /* --- Responsiveness --- */
        @media (max-width: 1024px) {
          .app-container {
            flex-direction: column;
            padding: 16px;
          }

          .sidebar {
            width: 100%;
            flex: none;
            height: auto;
            position: relative;
            top: 0;
          }
        }

        @media (max-width: 640px) {
          .form-panel {
            padding: 24px;
            border-radius: 20px;
          }
          
          .btn-primary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="app-container">
        <DashboardSidebar />

        <main className="main-content">
          <div className="page-container">
            <header className="page-header">
              <h1 className="page-title">Awards</h1>
            </header>

            <section className="form-panel">
              <div className="form-header">
                <h2 className="form-title">Grant Loyalty Points</h2>
                <p className="form-subtitle">Search for a customer by mobile number and select their registered vehicle to apply reward points.</p>
              </div>

              {error && (
                <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>
              )}

              <form onSubmit={handleSubmit} className="form-grid">
                {/* Mobile Number Input */}
                <div className="form-group">
                  <label className="form-label" htmlFor="mobile">Customer Mobile Number</label>
                  <input
                    id="mobile"
                    className="form-input"
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={mobileNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setMobileNumber(value);
                      setIsValidUser(false);
                      setAvailableVehicles([]);
                      setSelectedVehicle('');
                    }}
                    maxLength={10}
                    required
                  />
                </div>

                <button type="button" onClick={handleValidateUser} className="btn-primary">
                  Validate Customer
                </button>

                {isValidUser && (
                  <div className="form-group">
                    <p style={{ fontSize: '13px', color: 'green' }}>
                      Customer found. Select vehicle and proceed.
                    </p>
                  </div>
                )}

                {/* Vehicle Selection Dropdown */}
                <div className="form-group">
                  <label className="form-label" htmlFor="vehicle">Registered Vehicle</label>
                  <select
                    id="vehicle"
                    className="form-select"
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    disabled={!isValidUser || isLoading}
                    required
                  >
                    {isLoading ? (
                      <option value="">Searching registry...</option>
                    ) : availableVehicles.length === 0 ? (
                      <option value="">
                        {mobileNumber.length < 10
                          ? 'Enter 10-digit mobile number first'
                          : 'No vehicles found for this number'}
                      </option>
                    ) : (
                      <>
                        <option value="" disabled>Select a vehicle</option>
                        {availableVehicles.map((vehicle) => (
                          <option key={vehicle.id} value={vehicle.id}>
                            {vehicle.name} — {vehicle.plate}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </div>

                {/* Points Input */}
                <div className="form-group">
                  <label className="form-label" htmlFor="points">Points to Award</label>
                  <input
                    id="points"
                    className="form-input"
                    type="number"
                    placeholder="e.g. 150"
                    min="1"
                    value={points}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value >= 0) setPoints(value);
                    }}
                    required
                  />
                </div>

                {/* Submit Action */}
                <div className="form-footer">
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={!isValidUser || !points || isLoading}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Award Points
                  </button>
                </div>
              </form>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}