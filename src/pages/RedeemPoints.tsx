import { useState, useEffect, type FormEvent } from 'react';
import DashboardSidebar from './Sidebar';

// --- MOCK API DATA ---
const mockVehicleDatabase: Record<string, { id: string; name: string; plate: string }[]> = {
  '9876543210': [
    { id: 'v1', name: 'Toyota Camry', plate: 'TS 09 EU 1234' },
    { id: 'v2', name: 'Honda Civic', plate: 'TS 09 AB 9876' },
  ],
  '1234567890': [
    { id: 'v3', name: 'Ford Mustang', plate: 'MH 01 ZA 5555' },
  ],
};

export default function RedeemPoints() {
  // 1. STATE
  const [mobileNumber, setMobileNumber] = useState('');
  const [availableVehicles, setAvailableVehicles] = useState<{ id: string; name: string; plate: string }[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [pointsToRedeem, setPointsToRedeem] = useState<number | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidUser, setIsValidUser] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [customerPoints, setCustomerPoints] = useState<number | null>(null);

  // 2. DEBOUNCED AUTO-VALIDATION
  useEffect(() => {
    setSuccessMessage('');
    
    if (mobileNumber.length === 0) {
      setIsValidUser(false);
      setAvailableVehicles([]);
      setCustomerPoints(null);
      setError('');
      return;
    }

    if (mobileNumber.length > 0 && mobileNumber.length !== 10) {
      setIsValidUser(false);
      setAvailableVehicles([]);
      setCustomerPoints(null);
      setError('Please enter a valid 10-digit number');
      return;
    }

    setIsLoading(true);
    setError('');

    const timer = setTimeout(() => {
      const vehicles = mockVehicleDatabase[mobileNumber] || [];

      if (vehicles.length === 0) {
        setError('No customer found in the registry');
        setIsValidUser(false);
        setCustomerPoints(null);
      } else {
        setAvailableVehicles(vehicles);
        setIsValidUser(true);

        // Mock fetching their current balance
        const mockPoints = Math.floor(Math.random() * 200) + 50; 
        setCustomerPoints(mockPoints);

        // Auto-select vehicle if only one
        if (vehicles.length === 1) {
          setSelectedVehicle(vehicles[0].id);
        }
      }

      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [mobileNumber]);

  const resetForm = () => {
    setMobileNumber('');
    setPointsToRedeem('');
    setSelectedVehicle('');
    setAvailableVehicles([]);
    setIsValidUser(false);
    setCustomerPoints(null);
  };

  // 3. HANDLERS
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    if (!isValidUser) {
      setError('Please validate customer first');
      return;
    }

    if (!selectedVehicle) {
      setError('Please select a registered vehicle');
      return;
    }

    if (!pointsToRedeem || pointsToRedeem <= 0) {
      setError('Please enter a valid points amount');
      return;
    }

    if (customerPoints !== null && pointsToRedeem > customerPoints) {
      setError(`Insufficient points. Customer only has ${customerPoints} points.`);
      return;
    }

    setError('');
    setSuccessMessage(`Successfully redeemed ${pointsToRedeem} points from customer account!`);
    
    // Reset form after a short delay
    setTimeout(() => {
      resetForm();
      setSuccessMessage('');
    }, 3000);
  };

  // Check if current input exceeds balance
  const isOverBalance = customerPoints !== null && pointsToRedeem !== '' && pointsToRedeem > customerPoints;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        :root {
          /* Modern Minimalist Palette */
          --bg-main: #f8fafc;
          --surface-main: #ffffff;
          --text-main: #0f172a;
          --text-muted: #64748b;
          --text-placeholder: #94a3b8;
          --border-color: #e2e8f0;
          --border-focus: #cbd5e1;
          
          /* Single Accent Color */
          --accent: #2563eb;
          --accent-hover: #1d4ed8;
          --accent-ring: rgba(37, 99, 235, 0.15);
          
          /* Semantic Colors */
          --error: #ef4444;
          --error-bg: #fef2f2;
          --success: #10b981;
          --success-bg: #ecfdf5;
          --info-bg: #eff6ff;
          --info-border: #bfdbfe;
          --info-text: #1e40af;

          /* Shadows */
          --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --shadow-card: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
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

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        /* --- Header --- */
        .page-header {
          margin-bottom: 32px;
        }

        .page-title {
          font-size: 28px;
          font-weight: 700;
          color: var(--text-main);
          margin: 0;
          letter-spacing: -0.03em;
        }

        /* --- Form Panel (The Card) --- */
        .form-panel {
          background: var(--surface-main);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          box-shadow: var(--shadow-card);
          padding: clamp(32px, 5vw, 48px);
          max-width: 580px;
        }

        .form-header {
          margin-bottom: 32px;
        }

        .form-title {
          margin: 0 0 8px;
          font-size: 20px;
          font-weight: 600;
          color: var(--text-main);
          letter-spacing: -0.02em;
        }

        .form-subtitle {
          margin: 0;
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.6;
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
          position: relative;
        }

        .form-label {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-main);
          display: flex;
          justify-content: space-between;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          color: var(--text-placeholder);
          display: flex;
          align-items: center;
          pointer-events: none;
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 12px 16px 12px 44px;
          border: 1px solid var(--border-color);
          border-radius: 10px;
          font-size: 14px;
          color: var(--text-main);
          background: var(--surface-main);
          transition: all 0.2s ease;
          box-shadow: var(--shadow-sm);
          appearance: none;
        }

        .form-select {
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%2364748B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          padding-right: 40px;
        }

        .form-input::placeholder {
          color: var(--text-placeholder);
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 4px var(--accent-ring);
        }

        /* State Classes */
        .input-error {
          border-color: var(--error) !important;
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1) !important;
        }

        .input-success {
          border-color: var(--success) !important;
        }

        .form-select:disabled,
        .form-input:disabled {
          cursor: not-allowed;
          color: var(--text-muted);
          background-color: var(--bg-main);
          border-color: var(--border-color);
          box-shadow: none;
        }

        /* Contextual Feedback */
        .feedback-text {
          font-size: 12px;
          font-weight: 500;
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .feedback-error { color: var(--error); }
        .feedback-success { color: var(--success); }

        .status-indicator {
          position: absolute;
          right: 14px;
          display: flex;
          align-items: center;
        }

        /* Global Alert */
        .alert {
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          animation: slideIn 0.3s ease;
        }

        .alert-success {
          background-color: var(--success-bg);
          color: #065f46;
          border: 1px solid #a7f3d0;
        }

        .alert-info {
          background-color: var(--info-bg);
          color: var(--info-text);
          border: 1px solid var(--info-border);
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Button */
        .btn-primary {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 24px;
          background: var(--accent);
          color: #ffffff;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 8px;
        }

        .btn-primary:hover:not(:disabled) {
          background: var(--accent-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
        }

        .btn-primary:disabled {
          background: var(--border-color);
          color: var(--text-placeholder);
          cursor: not-allowed;
        }

        /* Spinner Animation */
        .spinner {
          animation: spin 1s linear infinite;
          color: var(--accent);
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .app-container { flex-direction: column; }
        }
        @media (max-width: 640px) {
          .form-panel { padding: 24px; }
        }
      `}</style>

      <div className="app-container">
        <DashboardSidebar />

        <main className="main-content">
          <header className="page-header">
            <h1 className="page-title">Redeem Points</h1>
          </header>

          <section className="form-panel">
            <div className="form-header">
              <h2 className="form-title">Redeem Loyalty Points</h2>
              <p className="form-subtitle">Search by mobile number to validate the customer and redeem points from their account.</p>
            </div>

            {/* Success Banner */}
            {successMessage && (
              <div className="alert alert-success">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                {successMessage}
              </div>
            )}

            {/* Customer Balance Banner */}
            {isValidUser && customerPoints !== null && !successMessage && (
              <div className="alert alert-info">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                Customer has <strong>{customerPoints} pts</strong> available to redeem.
              </div>
            )}

            <form onSubmit={handleSubmit} className="form-grid">
              
              {/* --- Mobile Number Input --- */}
              <div className="form-group">
                <label className="form-label" htmlFor="mobile">
                  Customer Mobile Number
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  
                  <input
                    id="mobile"
                    className={`form-input ${error && mobileNumber.length === 10 ? 'input-error' : ''} ${isValidUser ? 'input-success' : ''}`}
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

                  {/* Inline Status Indicators */}
                  <div className="status-indicator">
                    {isLoading && (
                      <svg className="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
                    )}
                    {isValidUser && !isLoading && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    )}
                  </div>
                </div>
                {error && mobileNumber.length > 0 && (
                  <span className="feedback-text feedback-error">{error}</span>
                )}
              </div>

              {/* --- Vehicle Dropdown --- */}
              <div className="form-group">
                <label className="form-label" htmlFor="vehicle">Target Vehicle</label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"></rect><path d="M12 8v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><path d="M3 12v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6"></path><circle cx="7" cy="16" r="2"></circle><circle cx="17" cy="16" r="2"></circle></svg>
                  </div>
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
                        {mobileNumber.length < 10 ? 'Awaiting mobile number...' : 'No vehicles found'}
                      </option>
                    ) : (
                      <>
                        <option value="" disabled>Select a vehicle</option>
                        {availableVehicles.map((vehicle) => (
                          <option key={vehicle.id} value={vehicle.id}>
                            {vehicle.name} • {vehicle.plate}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* --- Points Input --- */}
              <div className="form-group">
                <label className="form-label" htmlFor="points">Points to Redeem</label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  </div>
                  <input
                    id="points"
                    className={`form-input ${isOverBalance ? 'input-error' : ''}`}
                    type="number"
                    placeholder="e.g. 150"
                    min="1"
                    value={pointsToRedeem}
                    disabled={!isValidUser || isLoading}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value >= 0) setPointsToRedeem(value);
                    }}
                    required
                  />
                </div>
                {/* Real-time over-balance feedback */}
                {isOverBalance && (
                  <span className="feedback-text feedback-error">
                    Amount exceeds available balance ({customerPoints} pts)
                  </span>
                )}
              </div>

              {/* --- Submit Action --- */}
              <button
                type="submit"
                className="btn-primary"
                disabled={!isValidUser || !pointsToRedeem || isLoading || !selectedVehicle || isOverBalance}
              >
                Redeem Points
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>

            </form>
          </section>
        </main>
      </div>
    </>
  );
}