import { useState, useEffect } from 'react';

// --- MOCK API DATA ---
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://petropoints-backend.deploy.splsystems.in/api';

export default function LoyaltyAdminDashboard() {
  // 1. STATE
  const [mobileNumber, setMobileNumber] = useState('');
  const [points, setPoints] = useState<number | ''>('');
  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 2. FETCH CUSTOMERS ONCE
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/read`);
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        setError('Failed to fetch customers');
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
      setError('');

      if (!mobileNumber || mobileNumber.length !== 10) {
        setError('Enter valid mobile number');
        return;
      }

      if (!points || points <= 0) {
        setError('Enter valid points');
        return;
      }

      if (!customer) {
        setError('Customer not found');
        return;
      }

      const newPoints = currentPoints + points;

      // CALL BACKEND
      await fetch(`${API_BASE_URL}/updatePoints/${customer.CustomerID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ points: newPoints }),
      });

      // UPDATE UI INSTANTLY
      setCustomers((prev) =>
        prev.map((c) =>
          c.CustomerID === customer.CustomerID
            ? { ...c, CustomerPoints: newPoints }
            : c
        )
      );

      // Reset form
      setMobileNumber('');
      setPoints('');
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="app-container">
        <main className="main-content">
          <header className="page-header">
            <h1 className="page-title">Loyalty Awards</h1>
          </header>

          <section className="form-panel">
            <div className="form-header">
              <h2 className="form-title">Grant Points</h2>
              <p className="form-subtitle">Search by mobile number to validate the customer and apply rewards to their vehicle.</p>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
              {/* Mobile Input */}
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input
                  type="text"
                  className="form-input"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter 10-digit mobile number"
                />
              </div>

              {/* Points Input */}
              <div className="form-group">
                <label className="form-label">Points</label>
                <input
                  type="number"
                  className="form-input"
                  value={points}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0) setPoints(value);
                  }}
                  placeholder="Enter points to award"
                />
              </div>

              {/* Customer Details */}
              {customer && (
                <div>
                  <p>Name: {customer.CustomerName}</p>
                  <p>Current Points: {currentPoints}</p>
                  {Number(points) > 0 && <p>After Award: {currentPoints + Number(points)}</p>}
                </div>
              )}

              {/* Submit Button */}
              <button
                className="btn-primary"
                onClick={handleAward}
                disabled={!customer || !points || isLoading}
              >
                {isLoading ? 'Processing...' : 'Award Points'}
              </button>
            </form>
          </section>
        </main>
      </div>
    </>
  );
}