import React, { useState, useEffect } from 'react';

export default function PetrolPumpLogin() {
  const [mounted, setMounted] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Signing in as: ${userId}`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Baloo+2:wght@500;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body, html { font-family: 'Nunito', sans-serif; min-height: 100vh; }

        .outer {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #e0f7fa 0%, #e8eaf6 30%, #fce4ec 60%, #fff8e1 100%);
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.45;
          pointer-events: none;
        }
        .blob-1 { width: 480px; height: 480px; top: -120px; left: -100px; background: radial-gradient(circle, #4dd0e1, #0288d1); animation: drift 10s ease-in-out infinite alternate; }
        .blob-2 { width: 380px; height: 380px; bottom: -80px; right: -80px; background: radial-gradient(circle, #f06292, #e91e63); animation: drift 12s ease-in-out infinite alternate-reverse; }
        .blob-3 { width: 300px; height: 300px; top: 40%; left: 35%; background: radial-gradient(circle, #ffb74d, #ff7043); animation: drift 9s ease-in-out infinite alternate; opacity: 0.28; }
        .blob-4 { width: 260px; height: 260px; top: 10%; right: 20%; background: radial-gradient(circle, #a5d6a7, #43a047); animation: drift 11s ease-in-out infinite alternate-reverse; opacity: 0.3; }

        @keyframes drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(40px, -40px) scale(1.12); }
        }

        .outer::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(0,0,0,0.06) 1.2px, transparent 1.2px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        .card {
          position: relative;
          z-index: 2;
          display: flex;
          width: 100%;
          max-width: 960px;
          min-height: 540px;
          border-radius: 1.8rem;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(2,136,209,0.18), 0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6);
          opacity: 0;
          transform: translateY(32px) scale(0.97);
          transition: opacity 0.85s ease 0.1s, transform 0.85s ease 0.1s;
        }
        .card.show { opacity: 1; transform: translateY(0) scale(1); }

        /* LEFT */
        .left {
          flex: 0 0 46%;
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #01579b;
        }
        .pump-photo {
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
        }
        .left-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, rgba(1,87,155,0.83) 0%, rgba(0,131,143,0.72) 45%, rgba(1,60,100,0.9) 100%);
        }
        .left-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 2rem 2rem 1.5rem;
        }

        .brand-row { display: flex; align-items: center; gap: 12px; margin-bottom: 1.8rem; }
        .brand-logo {
          width: 52px; height: 52px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          border: 2px solid rgba(255,255,255,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; flex-shrink: 0;
        }
        .brand-name {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800; font-size: 0.92rem;
          color: #fff; line-height: 1.2;
          text-transform: uppercase; letter-spacing: 0.04em;
        }
        .brand-tagline { font-size: 0.7rem; color: rgba(255,255,255,0.65); font-style: italic; }

        .left-title {
          font-family: 'Baloo 2', sans-serif;
          font-size: 1.6rem; font-weight: 800;
          color: #fff; line-height: 1.2;
          margin-bottom: 0.4rem;
          text-shadow: 0 2px 12px rgba(0,0,0,0.3);
        }
        .left-sub { font-size: 0.8rem; color: rgba(255,255,255,0.7); margin-bottom: 1.4rem; line-height: 1.5; }

        .info-tiles { display: flex; flex-direction: column; gap: 0.55rem; margin-bottom: auto; }
        .info-tile {
          display: flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 0.65rem;
          padding: 0.5rem 0.85rem;
          backdrop-filter: blur(6px);
        }
        .tile-icon { font-size: 1.05rem; }
        .tile-text { font-size: 0.75rem; color: rgba(255,255,255,0.82); line-height: 1.4; }
        .tile-text strong { color: #fff; display: block; font-size: 0.78rem; }

        .left-note {
          background: rgba(0,0,0,0.22);
          border-left: 3px solid #4dd0e1;
          border-radius: 0.5rem;
          padding: 0.6rem 0.85rem;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.72);
          line-height: 1.55;
          margin-top: 1.1rem;
        }
        .left-note strong { color: #fff; }

        /* RIGHT */
        .right {
          flex: 1;
          background: #fff;
          display: flex;
          flex-direction: column;
          padding: 2rem 2.2rem 1.6rem;
          overflow-y: auto;
        }

        .right-logo-row { display: flex; align-items: center; gap: 10px; margin-bottom: 0.8rem; }
        .right-logo-icon {
          width: 40px; height: 40px;
          background: linear-gradient(135deg, #0288d1, #00acc1);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem;
          box-shadow: 0 4px 12px rgba(2,136,209,0.35);
        }
        .right-logo-name { font-family: 'Baloo 2', sans-serif; font-size: 0.98rem; font-weight: 700; color: #0d47a1; }
        .right-logo-sub { font-size: 0.68rem; color: #78909c; }

        .right-title { font-family: 'Baloo 2', sans-serif; font-size: 1.4rem; font-weight: 800; color: #0d47a1; margin-bottom: 0.15rem; }
        .right-subtitle { font-size: 0.78rem; color: #90a4ae; }

        .h-divider { height: 1px; background: linear-gradient(90deg, #e3f2fd, #b3e5fc, #e3f2fd); margin: 0.85rem 0 1.2rem; }

        .points-badge {
          display: flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, #e0f7fa, #e8f5e9);
          border: 1.5px solid #b2ebf2;
          border-radius: 0.7rem;
          padding: 0.65rem 0.9rem;
          margin-bottom: 1.2rem;
        }
        .pb-icon { font-size: 1.2rem; }
        .pb-text { font-size: 0.76rem; color: #00796b; line-height: 1.4; }
        .pb-text strong { color: #006064; font-size: 0.8rem; }

        .field { margin-bottom: 1rem; }
        .field-label { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; }
        .label-text { font-size: 0.75rem; font-weight: 700; color: #455a64; text-transform: uppercase; letter-spacing: 0.05em; }
        .forgot-link { font-size: 0.73rem; font-weight: 700; color: #0288d1; text-decoration: none; transition: color 0.2s; }
        .forgot-link:hover { color: #01579b; text-decoration: underline; }

        .input-wrap { position: relative; }
        .input-prefix {
          position: absolute; left: 0.9rem; top: 50%; transform: translateY(-50%);
          color: #90a4ae; font-size: 0.95rem; pointer-events: none;
        }
        .input-suffix {
          position: absolute; right: 0.85rem; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: #90a4ae; font-size: 0.95rem; padding: 4px; transition: color 0.2s;
        }
        .input-suffix:hover { color: #0288d1; }

        .text-input {
          width: 100%;
          border: 1.5px solid #cfd8dc;
          border-radius: 0.6rem;
          padding: 0.72rem 2.7rem;
          font-family: 'Nunito', sans-serif;
          font-size: 0.9rem;
          color: #263238;
          background: #f8fbff;
          outline: none;
          transition: all 0.22s;
        }
        .text-input::placeholder { color: #b0bec5; }
        .text-input:focus {
          border-color: #0288d1;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(2,136,209,0.12);
        }

        .btn-submit {
          width: 100%; border: none; border-radius: 0.72rem;
          padding: 0.88rem;
          font-family: 'Baloo 2', sans-serif; font-size: 1rem; font-weight: 700;
          color: #fff;
          background: linear-gradient(90deg, #0277bd 0%, #0288d1 40%, #00acc1 100%);
          background-size: 200% auto;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 18px rgba(2,136,209,0.38);
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-top: 0.5rem; letter-spacing: 0.03em;
        }
        .btn-submit:hover { background-position: right center; box-shadow: 0 10px 28px rgba(2,136,209,0.5); transform: translateY(-2px); }
        .btn-submit:active { transform: translateY(0); }
        .btn-arrow { transition: transform 0.25s; }
        .btn-submit:hover .btn-arrow { transform: translateX(4px); }

        .right-footer {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid #eceff1;
        }
        .footer-row { display: flex; align-items: center; gap: 6px; font-size: 0.72rem; color: #90a4ae; margin-bottom: 2px; }
        .footer-label { font-weight: 700; color: #546e7a; }
        .footer-val { color: #37474f; }
        .footer-new { font-size: 0.74rem; color: #78909c; text-align: center; padding-top: 0.55rem; }
        .footer-new a { color: #0288d1; font-weight: 700; text-decoration: none; }
        .footer-new a:hover { text-decoration: underline; }

        @media (max-width: 700px) {
          .left { display: none; }
          .card { max-width: 420px; }
          .right { padding: 2rem 1.5rem; border-radius: 1.8rem; }
        }
      `}</style>

      <div className="outer">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />

        <div className={`card ${mounted ? 'show' : ''}`}>

          {/* LEFT */}
          <div className="left">
            <div className="pump-photo" />
            <div className="left-overlay" />
            <div className="left-content">
              <div className="brand-row">
                <div className="brand-logo">⛽</div>
                <div>
                  <div className="brand-name">FuelRewards Portal</div>
                  <div className="brand-tagline">Loyalty Points Management System</div>
                </div>
              </div>

              <div className="left-title">Fuel Up.<br />Earn Points.<br />Save More.</div>
              <div className="left-sub">Add loyalty points to customers after every petrol purchase — instantly and securely.</div>

              <div className="info-tiles">
                <div className="info-tile">
                  <span className="tile-icon">⭐</span>
                  <div className="tile-text">
                    <strong>Earn on Every Fill</strong>
                    1 point per ₹10 purchased
                  </div>
                </div>
                <div className="info-tile">
                  <span className="tile-icon">🎁</span>
                  <div className="tile-text">
                    <strong>Redeem Anytime</strong>
                    Points convert to fuel discounts
                  </div>
                </div>
                <div className="info-tile">
                  <span className="tile-icon">🔒</span>
                  <div className="tile-text">
                    <strong>Secure & Real-Time</strong>
                    Instant credit after each purchase
                  </div>
                </div>
              </div>

              <div className="left-note">
                <strong>Need Help?</strong><br />
                Email: support@fuelrewards.in &nbsp;|&nbsp; +91-7045-444-000<br />
                (Mon – Sat, 8:00 AM – 6:00 PM)
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="right">
            <div className="right-logo-row">
              <div className="right-logo-icon">⛽</div>
              <div>
                <div className="right-logo-name">FuelRewards Portal</div>
                <div className="right-logo-sub">Committed to Customer Loyalty</div>
              </div>
            </div>

            <div className="right-title">Welcome Back</div>
            <div className="right-subtitle">Sign in to manage loyalty points &amp; customer accounts</div>

            <div className="h-divider" />

            <div className="points-badge">
              <span className="pb-icon">🏅</span>
              <div className="pb-text">
                <strong>Staff &amp; Admin Portal</strong>
                Add purchase points, view history &amp; manage customer accounts
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="field">
                <div className="field-label">
                  <span className="label-text">User ID</span>
                </div>
                <div className="input-wrap">
                  <span className="input-prefix">👤</span>
                  <input
                    type="text"
                    className="text-input"
                    placeholder="Enter your User ID"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <div className="field-label">
                  <span className="label-text">PIN / Password</span>
                  <a href="#" className="forgot-link">Forgot Password?</a>
                </div>
                <div className="input-wrap">
                  <span className="input-prefix">🔒</span>
                  <input
                    type={showPass ? 'text' : 'password'}
                    className="text-input"
                    placeholder="Enter your PIN or Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="input-suffix" onClick={() => setShowPass(s => !s)}>
                    {showPass ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-submit">
                <span>Sign In</span>
                <span className="btn-arrow">→</span>
              </button>
            </form>

            <div className="right-footer">
              <div className="footer-row">
                <span className="footer-label">Email:</span>
                <span className="footer-val">support@fuelrewards.in</span>
              </div>
              <div className="footer-row">
                <span className="footer-label">Contact:</span>
                <span className="footer-val">+91-7045-444-000 (8:00 AM – 6:00 PM)</span>
              </div>
              <div className="footer-new">
                New user? <a href="#">Register your account →</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
