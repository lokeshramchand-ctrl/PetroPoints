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
    },
    {
      id: 2,
      title: 'Total Vehicles',
      value: '8,234',
      trend: '+5% this month',
    },
    {
      id: 3,
      title: 'Total Points Awarded',
      value: '1.2M',
      trend: '+18% this month',
    },
    {
      id: 4,
      title: 'Today Customers',
      value: '142',
      trend: 'Updated just now',
    },
    {
      id: 5,
      title: 'Today Points',
      value: '4,550',
      trend: 'Updated just now',
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

        .page-subtitle {
          margin: 6px 0 0;
          font-size: 14px;
          color: var(--text-muted, #6b7280);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
          gap: clamp(14px, 2vw, 18px);
        }

        .stat-card {
          background: var(--surface-main, #ffffff);
          border: 1px solid var(--border-color, #eaedf1);
          border-radius: 16px;
          padding: 18px;
          box-shadow: var(--shadow-soft, 0 4px 20px rgba(0,0,0,0.02));
        }

        .stat-label {
          margin: 0;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-soft, #9ca3af);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stat-value {
          margin: 10px 0;
          font-size: clamp(24px, 3vw, 32px);
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: var(--text-main, #111827);
        }

        .stat-trend {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-muted, #6b7280);
          font-size: 13px;
          font-weight: 500;
        }

        .panel {
          background: var(--surface-main, #ffffff);
          border: 1px solid var(--border-color, #eaedf1);
          border-radius: 20px;
          box-shadow: var(--shadow-soft, 0 4px 20px rgba(0,0,0,0.02));
          padding: clamp(16px, 2.2vw, 24px);
        }

        .panel-title {
          margin: 0 0 16px;
          font-size: 18px;
          font-weight: 700;
          color: var(--text-main, #111827);
          letter-spacing: -0.02em;
        }

        .activity-table-wrapper {
          overflow-x: auto;
          border-radius: 14px;
          border: 1px solid var(--border-color, #eaedf1);
        }

        .activity-table {
          width: 100%;
          min-width: 720px;
          border-collapse: collapse;
          text-align: left;
          background: var(--surface-main, #ffffff);
        }

        .activity-table th {
          padding: 14px 16px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-soft, #9ca3af);
          border-bottom: 1px solid var(--border-color, #eaedf1);
          background: var(--surface-soft, #f9fafb);
        }

        .activity-table td {
          padding: 14px 16px;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-main, #111827);
          border-bottom: 1px solid var(--border-color, #eaedf1);
        }

        .activity-table tbody tr:last-child td {
          border-bottom: none;
        }

        .activity-table tbody tr:hover td {
          background: var(--surface-soft, #f9fafb);
        }

        .points {
          color: var(--text-muted, #6b7280);
          font-weight: 600;
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

          .panel {
            border-radius: 16px;
          }
        }

        @media (max-width: 640px) {
          .header-actions {
            width: 100%;
            justify-content: flex-start;
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
            <header className="page-header">
              <div>
                <h1 className="page-title">Dashboard</h1>
                <p className="page-subtitle">Plan, monitor, and track customer loyalty activity.</p>
              </div>
              <div className="header-actions">
                <ThemeToggle variant="inline" />
              </div>
            </header>

            <div className="stats-grid">
              {stats.map((stat) => (
                <article key={stat.id} className="stat-card">
                  <p className="stat-label">{stat.title}</p>
                  <h2 className="stat-value">{stat.value}</h2>
                  <div className="stat-trend">
                    <TrendUpIcon width="14" height="14" aria-hidden="true" />
                    <span>{stat.trend}</span>
                  </div>
                </article>
              ))}
            </div>

            <section className="panel" aria-labelledby="recent-activity-title">
              <h2 id="recent-activity-title" className="panel-title">Recent Activity</h2>

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
                        <td>{entry.action}</td>
                        <td>{entry.customer}</td>
                        <td>{entry.vehicle}</td>
                        <td className="points">{entry.points}</td>
                        <td>{entry.time}</td>
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