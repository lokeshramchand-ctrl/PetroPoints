import React, { useState } from 'react';

    const Dashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // Mock data for the dashboard cards
  const stats = [
    {
      id: 1,
      title: 'Total Customers',
      value: '12,480',
      trend: '+12% from last month',
      trendUp: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Total Vehicles',
      value: '8,234',
      trend: '+5% from last month',
      trendUp: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="10" width="18" height="8" rx="2" ry="2"></rect>
          <path d="M5 10L6.5 5h11L19 10"></path>
          <circle cx="7" cy="18" r="2"></circle>
          <circle cx="17" cy="18" r="2"></circle>
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Total Points Awarded',
      value: '1.2M',
      trend: '+18% from last month',
      trendUp: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Today: Customers Visited',
      value: '142',
      trend: 'Updated just now',
      trendUp: null,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      ),
    },
    {
      id: 5,
      title: 'Today: Points Awarded',
      value: '4,550',
      trend: 'Updated just now',
      trendUp: null,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      ),
    },
  ];

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
          background-color: var(--bg-main);
          color: var(--text-main);
        }

        /* --- Layout Container --- */
        .app-container {
          display: flex;
          min-height: 100vh;
        }

        /* --- Sidebar Styles --- */
        .sidebar {
          width: 260px;
          background-color: var(--surface-main);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
        }

        .sidebar-header {
          height: 80px;
          display: flex;
          align-items: center;
          padding: 0 24px;
          border-bottom: 1px solid var(--surface-soft);
        }

        .brand-logo {
          width: 32px;
          height: 32px;
          background-color: var(--primary-dark);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
        }

        .brand-title {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .nav-menu {
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 10px;
          color: var(--text-muted);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
        }

        .nav-item svg {
          width: 20px;
          height: 20px;
          stroke-width: 2;
        }

        .nav-item:hover {
          background-color: var(--surface-soft);
          color: var(--text-main);
        }

        .nav-item.active {
          background-color: var(--primary-dark);
          color: var(--surface-main);
        }

        .nav-item.active svg {
          stroke: var(--surface-main);
        }

        /* --- Main Content Styles --- */
        .main-content {
          flex: 1;
          overflow-y: auto;
        }

        .dashboard-layout {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 32px;
        }

        .dashboard-header {
          margin-bottom: 32px;
        }

        .dashboard-title {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 8px 0;
          letter-spacing: -0.03em;
        }

        .dashboard-subtitle {
          font-size: 15px;
          color: var(--text-muted);
          margin: 0;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .stat-card {
          background: var(--surface-main);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -2px rgba(0, 0, 0, 0.02);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.02);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .card-title {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-muted);
          margin: 0;
        }

        .icon-wrapper {
          width: 40px;
          height: 40px;
          background: var(--surface-soft);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-main);
        }

        .icon-wrapper svg {
          width: 20px;
          height: 20px;
        }

        .card-value {
          font-size: 32px;
          font-weight: 700;
          color: var(--text-main);
          margin: 0 0 8px 0;
          letter-spacing: -0.03em;
        }

        .card-trend {
          font-size: 13px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .trend-positive { color: var(--success-main); }
        .trend-neutral { color: var(--text-soft); }

        /* Responsive Design */
        @media (max-width: 768px) {
          .app-container {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            height: auto;
            position: relative;
            border-right: none;
            border-bottom: 1px solid var(--border-color);
          }
          .nav-menu {
            flex-direction: row;
            overflow-x: auto;
            padding: 16px;
          }
          .nav-item {
            white-space: nowrap;
            width: auto;
          }
          .dashboard-layout {
            padding: 24px 16px;
          }
        }
      `}</style>

      <div className="app-container">
        {/* --- Sidebar --- */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="brand-logo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </div>
            <span className="brand-title">Admin Panel</span>
          </div>

          <nav className="nav-menu">
            <button 
              className={`nav-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveMenu('dashboard')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              Dashboard
            </button>

            <button 
              className={`nav-item ${activeMenu === 'customers' ? 'active' : ''}`}
              onClick={() => setActiveMenu('customers')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Customers List
            </button>

            <button 
              className={`nav-item ${activeMenu === 'award' ? 'active' : ''}`}
              onClick={() => setActiveMenu('award')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              Award Points
            </button>

            <button 
              className={`nav-item ${activeMenu === 'redeem' ? 'active' : ''}`}
              onClick={() => setActiveMenu('redeem')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
              Redeem Points
            </button>
          </nav>
        </aside>

        {/* --- Main Content --- */}
        <main className="main-content">
          <div className="dashboard-layout">
            <header className="dashboard-header">
              <h1 className="dashboard-title">Overview</h1>
              <p className="dashboard-subtitle">Monitor your key metrics and daily activity.</p>
            </header>

            <div className="dashboard-grid">
              {stats.map((stat) => (
                <div key={stat.id} className="stat-card">
                  <div className="card-header">
                    <h3 className="card-title">{stat.title}</h3>
                    <div className="icon-wrapper">
                      {stat.icon}
                    </div>
                  </div>
                  <h2 className="card-value">{stat.value}</h2>
                  
                  <div className={`card-trend ${stat.trendUp === true ? 'trend-positive' : 'trend-neutral'}`}>
                    {stat.trendUp && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </svg>
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