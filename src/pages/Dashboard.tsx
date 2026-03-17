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
          padding: clamp(12px, 2vw, 24px);
          gap: clamp(12px, 2vw, 24px);
          align-items: flex-start;
          max-width: 1600px;
          margin: 0 auto;
        }

        .sidebar {
          flex: 0 0 clamp(220px, 20vw, 280px);
          background-color: var(--surface-main, #ffffff);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          padding: 24px;
          border: 1px solid var(--border-color, #e2e8f0);
          box-shadow: 0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.02);
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
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 16px;
        }

        .page-title {
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 700;
          color: var(--text-main, #0f172a);
          margin: 0;
          letter-spacing: -0.04em;
        }

        .page-subtitle {
          margin: 8px 0 0;
          font-size: 15px;
          color: var(--text-muted, #64748b);
          font-weight: 400;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--surface-main, #ffffff);
          padding: 8px 16px;
          border-radius: 100px;
          border: 1px solid var(--border-color, #e2e8f0);
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        /* --- Stats Grid --- */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }

        .stat-card {
          background: var(--surface-main, #ffffff);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 20px;
          padding: 24px;
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
          font-size: 13px;
          font-weight: 600;
          color: var(--text-soft, #64748b);
        }

        .stat-value {
          margin: 16px 0;
          font-size: clamp(28px, 4vw, 36px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.04em;
          color: var(--text-main, #0f172a);
        }

        .stat-trend {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
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
          border-radius: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.02);
          padding: 24px;
          overflow: hidden;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .panel-title {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          color: var(--text-main, #0f172a);
          letter-spacing: -0.03em;
        }

        .activity-table-wrapper {
          overflow-x: auto;
          margin: 0 -24px -24px -24px; /* Bleed edges */
        }

        .activity-table {
          width: 100%;
          min-width: 700px;
          border-collapse: separate;
          border-spacing: 0;
          text-align: left;
        }

        .activity-table th {
          padding: 16px 24px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-soft, #64748b);
          border-bottom: 1px solid var(--border-color, #e2e8f0);
          background: var(--bg-main, #f8fafc);
        }

        .activity-table td {
          padding: 20px 24px;
          font-size: 14px;
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
          font-size: 13px;
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
          font-size: 13px;
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
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .page-header {
            flex-direction: column;
          }
          
          .header-actions {
            width: 100%;
            justify-content: space-between;
          }
          
          .panel {
            padding: 20px;
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
                <span style={{ fontSize: '14px', fontWeight: 500 }}>Theme</span>
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
                        <td style={{ fontFamily: 'monospace', fontSize: '13px' }}>{entry.vehicle}</td>
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