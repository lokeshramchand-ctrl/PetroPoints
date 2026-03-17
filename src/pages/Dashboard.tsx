import React from 'react';
import DashboardSidebar from './Sidebar';
import { TrendUpIcon } from '../assets/icons/DashboardIcons';
import { ThemeToggle } from '../theme/ThemeToggle';

const Dashboard: React.FC = () => {
  const stats = [
    {
      id: 1,
      title: 'Total Customers',
      value: '12,480',
      trend: '+12% this month',
      isPositive: true,
    },
    {
      id: 2,
      title: 'Total Vehicles',
      value: '8,234',
      trend: '+5% this month',
      isPositive: true,
    },
    {
      id: 3,
      title: 'Total Points Awarded',
      value: '1.2M',
      trend: '+18% this month',
      isPositive: true,
    },
    {
      id: 4,
      title: 'Today Customers',
      value: '142',
      trend: 'Updated just now',
      isPositive: null,
    },
    {
      id: 5,
      title: 'Today Points',
      value: '4,550',
      trend: 'Updated just now',
      isPositive: null,
    },
  ];

  const activity = [
    {
      id: 1,
      action: 'Awarded Points',
      customer: 'Jane Cooper',
      vehicle: 'TS 09 EU 1234',
      points: '+120',
      time: '2 min ago',
    },
    {
      id: 2,
      action: 'Redeemed Points',
      customer: 'Guy Hawkins',
      vehicle: 'MH 01 ZA 5555',
      points: '-80',
      time: '14 min ago',
    },
    {
      id: 3,
      action: 'New Customer Added',
      customer: 'Laura Kinney',
      vehicle: 'TS 10 AQ 7281',
      points: '--',
      time: '36 min ago',
    },
    {
      id: 4,
      action: 'Awarded Points',
      customer: 'Robert Fox',
      vehicle: 'AP 16 DK 9932',
      points: '+60',
      time: '1 hr ago',
    },
  ];

  // Helper function to style point badges dynamically
  const getPointsClass = (points: string) => {
    if (points.startsWith('+')) return 'badge-positive';
    if (points.startsWith('-')) return 'badge-negative';
    return 'badge-neutral';
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        :root {
          /* Fluid Spacing Variables */
          --space-sm: clamp(8px, 1vw, 12px);
          --space-md: clamp(12px, 2vw, 16px);
          --space-lg: clamp(16px, 3vw, 24px);
          --space-xl: clamp(24px, 4vw, 32px);
          
          /* Panel specific fluid padding for perfect edge bleeding */
          --panel-pad-x: clamp(16px, 4vw, 24px);
          --panel-pad-y: clamp(20px, 4vw, 24px);
        }

        * {
          box-sizing: border-box;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        body, html {
          margin: 0;
          padding: 0;
          background-color: var(--bg-main, #f8fafc);
          color: var(--text-main, #0f172a);
          -webkit-font-smoothing: antialiased;
        }

        /* --- Layout --- */
        .app-container {
          display: flex;
          min-height: 100vh;
          padding: var(--space-lg);
          gap: var(--space-lg);
          align-items: flex-start;
          max-width: 1600px;
          margin: 0 auto;
        }

        /* Sidebar container styles handled by the imported Sidebar component's CSS, 
           but we ensure the flex-basis is fluid here */
        .sidebar {
          flex: 0 0 clamp(220px, 20vw, 280px);
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0; /* Prevents flex children from blowing out container width */
          width: 100%;
        }

        .page-container {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
        }

        /* --- Header --- */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: var(--space-md);
        }

        .page-title {
          font-size: clamp(24px, 4vw, 32px);
          font-weight: 700;
          color: var(--text-main, #0f172a);
          margin: 0;
          letter-spacing: -0.04em;
        }

        .page-subtitle {
          margin: clamp(4px, 1vw, 8px) 0 0;
          font-size: clamp(13px, 2vw, 15px);
          color: var(--text-muted, #64748b);
          font-weight: 400;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          background: var(--surface-main, #ffffff);
          padding: var(--space-sm) var(--space-md);
          border-radius: 100px;
          border: 1px solid var(--border-color, #e2e8f0);
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        /* --- Stats Grid --- */
        .stats-grid {
          display: grid;
          /* min(100%, 220px) ensures cards don't break on ultra-small screens < 220px */
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
          gap: var(--space-lg);
        }

        .stat-card {
          background: var(--surface-main, #ffffff);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: clamp(16px, 2vw, 20px);
          padding: var(--panel-pad-x);
          box-shadow: 0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.02);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.02), 0 10px 24px rgba(0,0,0,0.04);
        }

        .stat-label {
          margin: 0;
          font-size: clamp(12px, 1.5vw, 13px);
          font-weight: 600;
          color: var(--text-soft, #64748b);
        }

        .stat-value {
          margin: clamp(12px, 2vw, 16px) 0;
          font-size: clamp(28px, 5vw, 36px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.04em;
          color: var(--text-main, #0f172a);
        }

        .stat-trend {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: clamp(11px, 1.5vw, 13px);
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 100px;
          background: var(--surface-soft, #f1f5f9);
          color: var(--text-muted, #475569);
          width: fit-content;
        }

        .trend-positive {
          background: #ecfdf5;
          color: #059669;
        }

        /* --- Table Panel --- */
        .panel {
          background: var(--surface-main, #ffffff);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: clamp(16px, 2vw, 24px);
          box-shadow: 0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.02);
          padding: var(--panel-pad-y) var(--panel-pad-x);
          overflow: hidden;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-lg);
        }

        .panel-title {
          margin: 0;
          font-size: clamp(18px, 3vw, 20px);
          font-weight: 700;
          color: var(--text-main, #0f172a);
          letter-spacing: -0.03em;
        }

        .activity-table-wrapper {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch; /* Smooth scroll on iOS */
          /* Dynamically bleed edges based on the fluid padding variables */
          margin: 0 calc(-1 * var(--panel-pad-x)) calc(-1 * var(--panel-pad-y)) calc(-1 * var(--panel-pad-x));
        }

        .activity-table {
          width: 100%;
          min-width: 650px; /* Forces scroll on mobile to protect layout */
          border-collapse: separate;
          border-spacing: 0;
          text-align: left;
        }

        .activity-table th {
          padding: clamp(12px, 2vw, 16px) var(--panel-pad-x);
          font-size: clamp(11px, 1.5vw, 12px);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-soft, #64748b);
          border-bottom: 1px solid var(--border-color, #e2e8f0);
          background: var(--bg-main, #f8fafc);
        }

        .activity-table td {
          padding: clamp(16px, 2.5vw, 20px) var(--panel-pad-x);
          font-size: clamp(13px, 2vw, 14px);
          font-weight: 500;
          color: var(--text-main, #334155);
          border-bottom: 1px solid var(--border-color, #f1f5f9);
          transition: background 0.15s ease;
        }

        .activity-table tbody tr:last-child td {
          border-bottom: none;
        }

        .activity-table tbody tr:hover td {
          background: var(--bg-main, #f8fafc);
        }

        /* --- Badges --- */
        .badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 4px 12px;
          border-radius: 100px;
          font-size: clamp(11px, 1.5vw, 13px);
          font-weight: 600;
        }
        
        .badge-positive {
          background-color: rgba(16, 185, 129, 0.1);
          color: #059669;
        }
        
        .badge-negative {
          background-color: rgba(239, 68, 68, 0.1);
          color: #dc2626;
        }

        .badge-neutral {
          background-color: var(--surface-soft, #f1f5f9);
          color: var(--text-muted, #64748b);
        }

        .customer-name {
          font-weight: 600;
          color: var(--text-main, #0f172a);
        }

        .time-text {
          color: var(--text-soft, #94a3b8);
          font-size: clamp(12px, 1.5vw, 13px);
        }

        /* --- Global Responsiveness --- */
        @media (max-width: 1024px) {
          .app-container {
            flex-direction: column;
            /* Account for fixed mobile header from Sidebar */
            padding-top: 80px; 
          }
        }

        @media (max-width: 640px) {
          .page-header {
            flex-direction: column;
            align-items: stretch;
          }
          
          .header-actions {
            justify-content: space-between;
          }
        }

        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
      `}</style>

      <div className="app-container">
        <DashboardSidebar />

        <main className="main-content">
          <div className="page-container">
            {/* Header section */}
            <header className="page-header">
              <div>
                <h1 className="page-title">Dashboard</h1>
                <p className="page-subtitle">Plan, monitor, and track customer loyalty activity.</p>
              </div>
              <div className="header-actions">
                <span style={{ fontSize: 'clamp(13px, 2vw, 14px)', fontWeight: 500 }}>Theme</span>
                <ThemeToggle variant="inline" />
              </div>
            </header>

            {/* Stats Grid */}
            <div className="stats-grid">
              {stats.map((stat) => (
                <article key={stat.id} className="stat-card">
                  <p className="stat-label">{stat.title}</p>
                  <h2 className="stat-value">{stat.value}</h2>
                  <div className={`stat-trend ${stat.isPositive ? 'trend-positive' : ''}`}>
                    {stat.isPositive && <TrendUpIcon width="14" height="14" aria-hidden="true" />}
                    <span>{stat.trend}</span>
                  </div>
                </article>
              ))}
            </div>

            {/* Recent Activity Table */}
            <section className="panel" aria-labelledby="recent-activity-title">
              <div className="panel-header">
                <h2 id="recent-activity-title" className="panel-title">Recent Activity</h2>
              </div>

              <div className="activity-table-wrapper">
                <table className="activity-table">
                  <caption className="visually-hidden">Latest dashboard activities</caption>
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Customer</th>
                      <th>Vehicle</th>
                      <th>Points</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activity.map((entry) => (
                      <tr key={entry.id}>
                        <td style={{ fontWeight: 600 }}>{entry.action}</td>
                        <td className="customer-name">{entry.customer}</td>
                        <td style={{ fontFamily: 'monospace', fontSize: 'clamp(12px, 1.5vw, 13px)' }}>{entry.vehicle}</td>
                        <td>
                          <span className={`badge ${getPointsClass(entry.points)}`}>
                            {entry.points}
                          </span>
                        </td>
                        <td className="time-text">{entry.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;