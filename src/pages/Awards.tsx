import { useState, useEffect, type FormEvent } from 'react';
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
  const [mobileNumber, setMobileNumber] = useState('');
  const [availableVehicles, setAvailableVehicles] = useState<{ id: string; name: string; plate: string }[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [points, setPoints] = useState<number | ''>('');
  const [isLoading, setIsLoading] = useState(false);

  // Simulating fetching vehicles when a 10-digit mobile number is entered
  useEffect(() => {
    if (mobileNumber.length >= 10) {
      setIsLoading(true);
      // Simulate network latency
      const timer = setTimeout(() => {
        const vehicles = mockVehicleDatabase[mobileNumber] || [];
        setAvailableVehicles(vehicles);
        if (vehicles.length === 1) {
          setSelectedVehicle(vehicles[0].id); // Auto-select if only one vehicle exists
        } else {
          setSelectedVehicle('');
        }
        setIsLoading(false);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setAvailableVehicles([]);
      setSelectedVehicle('');
    }
  }, [mobileNumber]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!mobileNumber || !selectedVehicle || !points) {
      alert('Please fill out all fields.');
      return;
    }
    alert(`Successfully awarded ${points} points to vehicle ${selectedVehicle} (User: ${mobileNumber})`);
    // Reset form after submission
    setMobileNumber('');
    setPoints('');
    setSelectedVehicle('');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }

        body, html {
          margin: 0;
          padding: 0;
          background-color: var(--bg-main, #f4f6f8);
          color: var(--text-main, #111827);
        }

        .app-container {
          display: flex;
          min-height: 100vh;
          padding: clamp(8px, 2vw, 16px);
          gap: clamp(8px, 2vw, 16px);
          align-items: stretch;
        }

        .sidebar {
          flex: 0 0 clamp(200px, 20vw, 280px);
          background-color: var(--surface-main, #ffffff);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          padding: 24px clamp(12px, 1.5vw, 20px);
          box-shadow: var(--shadow-soft, 0 4px 20px rgba(0,0,0,0.02));
          position: sticky;
          top: clamp(8px, 2vw, 16px);
          align-self: stretch;
          min-height: calc(100vh - clamp(16px, 4vw, 32px));
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: var(--surface-main, #ffffff);
          border-radius: 24px;
          box-shadow: var(--shadow-soft, 0 4px 20px rgba(0,0,0,0.02));
          min-width: 0;
        }

        .page-container {
          padding: clamp(20px, 3vw, 32px);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .page-title {
          font-size: clamp(24px, 3vw, 28px);
          font-weight: 700;
          color: var(--text-main, #111827);
          margin: 0;
          letter-spacing: -0.03em;
        }

        .form-wrapper {
          background: var(--surface-main, #ffffff);
          border-radius: 20px;
          border: 1px solid var(--border-color, #eaedf1);
          box-shadow: var(--shadow-soft, 0 4px 20px rgba(0,0,0,0.02));
          padding: clamp(20px, 3vw, 32px);
          max-width: 620px;
        }

        .form-header {
          margin-bottom: 24px;
        }

        .form-title {
          margin: 0 0 8px;
          font-size: clamp(22px, 2.5vw, 26px);
          font-weight: 700;
          color: var(--text-main, #111827);
          letter-spacing: -0.02em;
        }

        .form-subtitle {
          margin: 0;
          font-size: 14px;
          color: var(--text-muted, #6b7280);
        }

        .form-grid {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-muted, #6b7280);
          letter-spacing: 0.01em;
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid var(--border-color, #eaedf1);
          border-radius: 12px;
          background: var(--surface-soft, #f9fafb);
          color: var(--text-main, #111827);
          font-size: 14px;
          transition: all 0.2s ease;
          appearance: none;
        }

        .form-select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          background-size: 16px;
          padding-right: 40px;
        }

        .form-input::placeholder {
          color: var(--text-soft, #9ca3af);
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: var(--primary-dark, #2f3437);
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(47, 52, 55, 0.14);
        }

        .form-select:disabled {
          cursor: not-allowed;
          color: var(--text-soft, #9ca3af);
          background-color: var(--surface-soft, #f3f4f6);
        }

        .page-footer {
          display: flex;
          justify-content: flex-start;
          margin-top: 4px;
        }

        .btn-award {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: var(--primary-dark, #2f3437);
          color: #ffffff;
          border: none;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(15, 15, 15, 0.12);
        }

        .btn-award:hover {
          background: var(--primary-light, #454b50);
          transform: translateY(-1px);
        }

        .btn-award:active {
          transform: translateY(0);
        }

        @media (max-width: 64rem) {
          .app-container {
            flex-direction: column;
            padding: 0;
            gap: 0;
          }

          .sidebar {
            width: 100%;
            flex: none;
            min-height: auto;
            position: relative;
            top: 0;
            border-radius: 0;
            box-shadow: none;
            border-bottom: 1px solid var(--border-color, #eaedf1);
          }

          .main-content {
            border-radius: 0;
            box-shadow: none;
          }

          .form-wrapper {
            max-width: 100%;
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

            <section className="form-wrapper">
              <div className="form-header">
                <h2 className="form-title">Award Loyalty Points</h2>
                <p className="form-subtitle">Select a registered vehicle to grant customer rewards.</p>
              </div>

              <form onSubmit={handleSubmit} className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="mobile">Customer Mobile Number</label>
                <input
                  id="mobile"
                  className="form-input"
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  maxLength={10}
                  required
                />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="vehicle">Registered Vehicle</label>
                  <select
                    id="vehicle"
                    className="form-select"
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    disabled={availableVehicles.length === 0 || isLoading}
                    required
                  >
                    {isLoading ? (
                      <option value="">Searching registry...</option>
                    ) : availableVehicles.length === 0 ? (
                      <option value="">
                        {mobileNumber.length < 10 ? 'Enter full mobile number first' : 'No vehicles found for this number'}
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

                <div className="form-group">
                  <label className="form-label" htmlFor="points">Points to Award</label>
                  <input
                    id="points"
                    className="form-input"
                    type="number"
                    placeholder="0"
                    min="1"
                    value={points}
                    onChange={(e) => setPoints(e.target.value ? Number(e.target.value) : '')}
                    required
                  />
                </div>

                <footer className="page-footer">
                  <button type="submit" className="btn-award">
                    Award Points
                  </button>
                </footer>
              </form>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}