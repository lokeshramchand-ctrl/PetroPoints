import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import { PlusIcon, SearchIcon, TrendUpIcon, UpRightIcon } from '../assets/icons/DashboardIcons';
import { ThemeToggle } from '../theme/ThemeToggle';

const Dashboard: React.FC = () => {
  // Mock data adapted for the new design
  const stats = [
    {
      id: 1,
      title: 'Total Customers',
      value: '12,480',
      trend: 'Increased from last month',
      trendValue: '+12%',
      isPrimary: true,
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
          /* Added standard variables in case they aren't globally defined */
          --primary-dark: #175433;
          --primary-light: #207245;
          --bg-main: #f4f6f8;
          --surface-main: #ffffff;
          --surface-soft: #f9fafb;
          --surface-muted: #f0fdf4;
          --text-main: #111827;
          --text-muted: #6b7280;
          --text-soft: #9ca3af;
          --border-color: #eaedf1;
          --shadow-soft: 0 4px 20px rgba(0,0,0,0.02);
          --promo-gradient: linear-gradient(145deg, #0f172a, #022c22);
          --avatar-bg: #e2e8f0;
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
          padding: clamp(8px, 2vw, 16px);
          gap: clamp(8px, 2vw, 16px);
          flex-direction: row;
          align-items: stretch;
        }

        /* --- Sidebar (Assuming DashboardSidebar uses these classes) --- */
        .sidebar {
          /* Fluid width: starts at 200px, scales with 20% of viewport, caps at 280px */
          flex: 0 0 clamp(200px, 20vw, 280px);
          background-color: var(--surface-main);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          padding: 24px clamp(12px, 1.5vw, 20px);
          box-shadow: var(--shadow-soft);
          position: sticky;
          top: clamp(8px, 2vw, 16px);
          align-self: stretch;
          min-height: calc(100vh - clamp(16px, 4vw, 32px));
        }

        /* ... [Sidebar interior classes remain the same] ... */

        /* --- Main Content --- */
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          background-color: var(--surface-main);
          border-radius: 24px;
          box-shadow: var(--shadow-soft);
          overflow-y: auto;
          /* Prevents content from forcing main flex item to expand beyond screen */
          min-width: 0; 
        }

        /* --- Top Navigation --- */
        .top-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap; /* Allows wrapping on tight screens */
          gap: 16px;
          padding: clamp(16px, 2.5vw, 20px) clamp(20px, 3vw, 32px);
          border-bottom: 1px solid var(--border-color);
        }

        .search-bar {
          display: flex;
          align-items: center;
          background: var(--bg-main);
          padding: 10px 16px;
          border-radius: 12px;
          flex: 1;
          /* Fluid width instead of hardcoded 320px */
          min-width: 200px;
          max-width: 400px; 
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
          gap: clamp(12px, 2vw, 20px);
          flex-wrap: wrap;
          margin-left: auto;
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
          flex-shrink: 0;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
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
          padding: clamp(20px, 3vw, 32px);
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap; /* Allows stacking on smaller screens */
          gap: 20px;
          margin-bottom: clamp(24px, 3vw, 32px);
        }

        .header-title h1 {
          font-size: clamp(24px, 3vw, 32px); /* Fluid typography */
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
          flex-wrap: wrap;
          gap: 12px;
        }
.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  padding: 0 0.5rem;
}

.brand-icon {
  color: var(--primary-dark);
}

.brand-title {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.menu-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-soft);
  margin-bottom: 0.75rem;
  padding: 0 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 2rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  background: transparent;
  text-align: left;
}

.nav-item svg {
  width: 1.25rem;
  height: 1.25rem;
  stroke-width: 2;
  flex-shrink: 0;
}

.nav-item:hover {
  background-color: var(--surface-soft);
  color: var(--text-main);
}

.nav-item.active {
  color: var(--primary-dark);
  font-weight: 600;
  background-color: var(--surface-muted);
}

@media (max-width: 64rem) {
  .sidebar .brand {
    margin-bottom: 1rem;
    padding: 0;
  }

  .sidebar .menu-label {
    display: none;
  }

  .sidebar .nav-menu {
    flex-direction: row;
    overflow-x: auto;
    margin-bottom: 0;
    padding-bottom: 0.5rem;
    gap: 0.5rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .sidebar .nav-menu::-webkit-scrollbar {
    display: none;
  }

  .sidebar .nav-item {
    white-space: nowrap;
    flex-shrink: 0;
    width: auto;
  }
}
        .btn {
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
          flex: 1 1 auto; /* Allows buttons to grow to fill space if wrapped */
          text-align: center;
          white-space: nowrap;
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
          /* The min() function ensures that if the screen is narrower than 220px, the card scales down instead of overflowing */
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
          gap: clamp(16px, 2vw, 20px);
        }

        .stat-card {
          background: var(--surface-main);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: clamp(16px, 2vw, 24px);
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
          flex-shrink: 0;
        }

        .stat-card.primary .arrow-icon {
          border-color: rgba(255, 255, 255, 0.3);
          background: white;
          color: var(--primary-dark);
        }

        .card-value {
          font-size: clamp(32px, 4vw, 40px); /* Fluid typography */
          font-weight: 700;
          margin: 0 0 16px 0;
          letter-spacing: -0.04em;
        }

        .trend-container {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 12px;
          color: var(--text-muted);
        }

        .stat-card.primary .trend-container {
          color: rgba(255, 255, 255, 0.8);
        }

        .trend-badge {
          background: var(--surface-muted);
          color: var(--primary-dark);
          padding: 4px 8px;
          border-radius: 6px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }

        .stat-card.primary .trend-badge {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        /* --- Responsive Breakpoints --- */
        @media (max-width: 1024px) {
          .app-container {
            flex-direction: column;
            padding: 0;
            gap: 0;
          }
          
          /* Target sidebar styles directly for tablet/mobile */
          .sidebar {
            width: 100%;
            min-height: auto;
            flex: none; /* Removes flex-basis constraint */
            position: relative;
            border-radius: 0;
            top: 0;
            box-shadow: none;
            border-bottom: 1px solid var(--border-color);
          }
          
          .main-content {
            border-radius: 0;
            box-shadow: none;
          }
        }
        
        @media (max-width: 600px) {
          .top-nav {
            flex-direction: column;
            align-items: stretch;
          }
          
          .search-bar {
            max-width: 100%; /* Take full width on mobile */
          }
          
          .top-nav-right {
            justify-content: space-between;
          }
        }
      `}</style>

      <div className="app-container">
        <DashboardSidebar />

        <main className="main-content">
          <div className="top-nav">
            <div className="search-bar">
              <SearchIcon width="18" height="18" style={{ color: 'var(--text-soft)' }} />
              <input type="text" placeholder="Search tasks..." />
            </div>

            <div className="top-nav-right">
              <ThemeToggle variant="inline" />
            </div>
          </div>

          <div className="dashboard-body">
            <header className="dashboard-header">
              <div className="header-title">
                <h1>Dashboard</h1>
                <p>Plan, manage, and monitor your data with ease.</p>
              </div>
              <div className="header-actions">
                <button className="btn btn-primary">
                  <PlusIcon width="16" height="16" />
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
                      <UpRightIcon width="14" height="14" />
                    </div>
                  </div>

                  <h2 className="card-value">{stat.value}</h2>

                  <div className="trend-container">
                    {stat.trendValue && (
                      <span className="trend-badge">
                        <TrendUpIcon width="12" height="12" />
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