import React from 'react';

const Dashboard: React.FC = () => {
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
          background-color: #f9fafb; /* Matches the login screen background */
          color: #111827;
        }

        .dashboard-layout {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px;
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
          color: #6b7280;
          margin: 0;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        /* Make the "Today" cards span differently or just flow naturally */
        .stat-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
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
          color: #6b7280;
          margin: 0;
        }

        .icon-wrapper {
          width: 40px;
          height: 40px;
          background: #f3f4f6;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #374151;
        }

        .icon-wrapper svg {
          width: 20px;
          height: 20px;
        }

        .card-value {
          font-size: 32px;
          font-weight: 700;
          color: #111827;
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

        .trend-positive {
          color: #059669; /* Elegant dark green */
        }

        .trend-neutral {
          color: #9ca3af;
        }

        @media (max-width: 768px) {
          .dashboard-layout {
            padding: 24px 16px;
          }
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

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
    </>
  );
};

export default Dashboard;