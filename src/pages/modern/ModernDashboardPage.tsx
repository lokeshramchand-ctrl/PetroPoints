import React, { useState } from 'react';

const Dashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // Mock data adapted for the new design
  const stats = [
    {
      id: 1,
      title: 'Total Customers',
      value: '12,480',
      trend: 'Increased from last month',
      trendValue: '+12%',
      isPrimary: true, // This will trigger the dark green styling
    },
    {
      id: 2,
      title: 'Total Vehicles',
      value: '8,234',
      trend: 'Increased from last month',
      trendValue: '+5%',
      isPrimary: false,
    },
    {
      id: 3,
      title: 'Total Points Awarded',
      value: '1.2M',
      trend: 'Increased from last month',
      trendValue: '+18%',
      isPrimary: false,
    },
    {
      id: 4,
      title: 'Today: Customers',
      value: '142',
      trend: 'Updated just now',
      trendValue: '',
      isPrimary: false,
    },
    {
      id: 5,
      title: 'Today: Points',
      value: '4,550',
      trend: 'Updated just now',
      trendValue: '',
      isPrimary: false,
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        :root {
          --primary-dark: #175433; /* Dark green from image */
          --primary-light: #207245;
          --bg-main: #f4f6f8;
          --text-main: #111827;
          --text-muted: #6b7280;
          --border-color: #eaedf1;
        }

        * {
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }

        body, html {
          margin: 0;
          padding: 0;
          background-color: var(--bg-main);
          color: var(--text-main);
        }

        /* --- Layout --- */
        .app-container {
          display: flex;
          min-height: 100vh;
          padding: 16px;
          gap: 16px;
        }

        /* --- Sidebar --- */
        .sidebar {
          width: 260px;
          background-color: #ffffff;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          padding: 24px 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          position: sticky;
          top: 16px;
          height: calc(100vh - 32px);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 40px;
          padding: 0 8px;
        }

        .brand-icon {
          color: var(--primary-dark);
        }

        .brand-title {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .menu-label {
          font-size: 12px;
          font-weight: 600;
          color: #9ca3af;
          margin-bottom: 12px;
          padding: 0 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 32px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          color: var(--text-muted);
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
          background: transparent;
          text-align: left;
        }

        .nav-item svg {
          width: 20px;
          height: 20px;
          stroke-width: 2;
        }

        .nav-item:hover {
          background-color: #f9fafb;
          color: var(--text-main);
        }

        .nav-item.active {
          color: var(--primary-dark);
          font-weight: 600;
          background-color: #f0fdf4;
        }

        .nav-item.active svg {
          stroke: var(--primary-dark);
        }

        /* --- Sidebar Promo Card --- */
        .promo-card {
          margin-top: auto;
          background: linear-gradient(145deg, #0f172a, #022c22);
          border-radius: 20px;
          padding: 24px 20px;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .promo-title {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 8px 0;
          position: relative;
          z-index: 2;
        }

        .promo-desc {
          font-size: 12px;
          color: #94a3b8;
          margin: 0 0 16px 0;
          position: relative;
          z-index: 2;
        }

        .promo-btn {
          width: 100%;
          padding: 10px;
          background: var(--primary-dark);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          z-index: 2;
        }

        /* --- Main Content --- */
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          background-color: #ffffff;
          border-radius: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          overflow-y: auto;
        }

        /* --- Top Navigation --- */
        .top-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 32px;
          border-bottom: 1px solid var(--border-color);
        }

        .search-bar {
          display: flex;
          align-items: center;
          background: var(--bg-main);
          padding: 10px 16px;
          border-radius: 12px;
          width: 320px;
        }

        .search-bar input {
          border: none;
          background: transparent;
          margin-left: 8px;
          outline: none;
          width: 100%;
          font-size: 14px;
        }

        .top-nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .icon-btn {
          background: transparent;
          border: 1px solid var(--border-color);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-main);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar {
          width: 40px;
          height: 40px;
          background: #e2e8f0;
          border-radius: 50%;
        }

        .user-info h4 {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
        }

        .user-info p {
          margin: 0;
          font-size: 12px;
          color: var(--text-muted);
        }

        /* --- Dashboard Body --- */
        .dashboard-body {
          padding: 32px;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 32px;
        }

        .header-title h1 {
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 8px 0;
          letter-spacing: -0.03em;
        }

        .header-title p {
          font-size: 15px;
          color: var(--text-muted);
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .btn {
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .btn-primary {
          background-color: var(--primary-dark);
          color: white;
          border: none;
        }

        .btn-outline {
          background-color: transparent;
          color: var(--text-main);
          border: 1px solid var(--border-color);
        }

        /* --- Stats Grid --- */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .stat-card {
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .stat-card.primary {
          background: linear-gradient(135deg, var(--primary-dark), var(--primary-light));
          border: none;
          color: white;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .card-title {
          font-size: 15px;
          font-weight: 500;
          margin: 0;
          color: var(--text-main);
        }

        .stat-card.primary .card-title {
          color: rgba(255, 255, 255, 0.9);
        }

        .arrow-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-main);
        }

        .stat-card.primary .arrow-icon {
          border-color: rgba(255, 255, 255, 0.3);
          background: white;
          color: var(--primary-dark);
        }

        .card-value {
          font-size: 40px;
          font-weight: 700;
          margin: 0 0 16px 0;
          letter-spacing: -0.04em;
        }

        .trend-container {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-muted);
        }

        .stat-card.primary .trend-container {
          color: rgba(255, 255, 255, 0.8);
        }

        .trend-badge {
          background: #f0fdf4;
          color: var(--primary-dark);
          padding: 4px 8px;
          border-radius: 6px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .stat-card.primary .trend-badge {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        @media (max-width: 1024px) {
          .app-container {
            flex-direction: column;
            padding: 0;
            gap: 0;
          }
          .sidebar {
            width: 100%;
            height: auto;
            position: relative;
            border-radius: 0;
            top: 0;
          }
          .main-content {
            border-radius: 0;
          }
        }
      `}</style>

      <div className="app-container">
        {/* --- Sidebar --- */}
        <aside className="sidebar">
          <div className="brand">
            <svg className="brand-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span className="brand-title">Admin Panel</span>
          </div>

          <div className="menu-label">Menu</div>
          <nav className="nav-menu">
            <button className={`nav-item ${activeMenu === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveMenu('dashboard')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>
              Dashboard
            </button>
            <button className={`nav-item ${activeMenu === 'customers' ? 'active' : ''}`} onClick={() => setActiveMenu('customers')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              Customers List
            </button>
            <button className={`nav-item ${activeMenu === 'award' ? 'active' : ''}`} onClick={() => setActiveMenu('award')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>
              Award Points
            </button>
            <button className={`nav-item ${activeMenu === 'redeem' ? 'active' : ''}`} onClick={() => setActiveMenu('redeem')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
              Redeem Points
            </button>
          </nav>

          <div className="promo-card">
            <h3 className="promo-title">Download our Mobile App</h3>
            <p className="promo-desc">Get easy access on the go.</p>
            <button className="promo-btn">Download</button>
          </div>
        </aside>

        {/* --- Main Content --- */}
        <main className="main-content">
          {/* Top Navigation */}
          <div className="top-nav">
            <div className="search-bar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="text" placeholder="Search tasks..." />
            </div>
            
            <div className="top-nav-right">
              <button className="icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </button>
              <button className="icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
              </button>
              <div className="user-profile">
                {/* Fallback avatar */}
                <div className="avatar"></div>
                <div className="user-info">
                  <h4>Lokesh Bazaru</h4>
                  <p>Admin</p>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-body">
            {/* Header */}
            <header className="dashboard-header">
              <div className="header-title">
                <h1>Dashboard</h1>
                <p>Plan, manage, and monitor your data with ease.</p>
              </div>
              <div className="header-actions">
                <button className="btn btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  Add Customer
                </button>
                <button className="btn btn-outline">
                  Import Data
                </button>
              </div>
            </header>

            {/* Stats Grid */}
            <div className="stats-grid">
              {stats.map((stat) => (
                <div key={stat.id} className={`stat-card ${stat.isPrimary ? 'primary' : ''}`}>
                  <div className="card-header">
                    <h3 className="card-title">{stat.title}</h3>
                    <div className="arrow-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                    </div>
                  </div>
                  
                  <h2 className="card-value">{stat.value}</h2>
                  
                  <div className="trend-container">
                    {stat.trendValue && (
                      <span className="trend-badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
                        {stat.trendValue}
                      </span>
                    )}
                    <span>{stat.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;