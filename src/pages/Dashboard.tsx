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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        :root {
          /* Modern SaaS Palette */
          --bg-body: #F8FAFC;
          --surface: #FFFFFF;
          --primary: #4F46E5;
          --primary-hover: #4338CA;
          --primary-light: #EEF2FF;
          --text-main: #0F172A;
          --text-muted: #64748B;
          --text-faint: #94A3B8;
          --border-light: #F1F5F9;
          --border-strong: #E2E8F0;
          
          /* Status Colors */
          --success-text: #166534;
          --success-bg: #DCFCE7;
          --danger-text: #991B1B;
          --danger-bg: #FEE2E2;
          --neutral-text: #475569;
          --neutral-bg: #F1F5F9;
          
          --radius-sm: 6px;
          --radius-md: 12px;
          --radius-lg: 16px;
          --radius-full: 9999px;
          
          --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
        }

        * {
          box-sizing: border-box;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        body, html {
          margin: 0; padding: 0;
          background-color: var(--bg-body);
          color: var(--text-main);
          -webkit-font-smoothing: antialiased;
        }

        .app-container {
          display: flex;
          min-height: 100vh;
          max-width: 1600px;
          margin: 0 auto;
        }

        .main-view {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 40px 48px;
          min-width: 0;
          gap: 32px;
        }

        /* --- SaaS Header --- */
        .header-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 16px;
        }

        .header-titles h1 {
          font-size: 28px;
          font-weight: 600;
          letter-spacing: -0.02em;
          margin: 0 0 4px 0;
          color: var(--text-main);
        }

        .header-titles p {
          font-size: 14px;
          color: var(--text-muted);
          margin: 0;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--surface);
          padding: 8px 16px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-strong);
          box-shadow: var(--shadow-sm);
        }

        .header-actions span {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-muted);
        }

        /* --- Stats Grid --- */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }

        .stat-card {
          background: var(--surface);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-sm);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .stat-label {
          margin: 0;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stat-value {
          margin: 0;
          font-size: 32px;
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.03em;
          color: var(--text-main);
        }

        .stat-trend {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          background: var(--neutral-bg);
          color: var(--neutral-text);
          width: fit-content;
        }

        .trend-positive {
          background: var(--success-bg);
          color: var(--success-text);
        }

        /* --- Table Panel --- */
        .data-panel {
          background: var(--surface);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          overflow: hidden;
        }

        .panel-header {
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-strong);
        }

        .panel-title {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: var(--text-main);
        }

        .table-container {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          white-space: nowrap;
        }

        .data-table th {
          padding: 16px 24px;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--border-strong);
          background: #F8FAFC;
        }

        .data-table td {
          padding: 16px 24px;
          font-size: 14px;
          color: var(--text-main);
          border-bottom: 1px solid var(--border-light);
          vertical-align: middle;
        }

        .data-table tr:last-child td { border-bottom: none; }
        
        .data-table tbody tr { transition: background 0.15s ease; }
        .data-table tbody tr:hover { background: var(--bg-body); }

        /* Typography & Badges */
        .cell-action { font-weight: 500; color: var(--text-main); }
        .cell-sub { color: var(--text-muted); }
        .cell-mono { font-family: 'SFMono-Regular', Consolas, monospace; font-size: 13px; color: var(--text-muted); background: var(--border-light); padding: 4px 8px; border-radius: var(--radius-sm); }

        .badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 13px;
          font-weight: 600;
        }
        
        .badge-positive {
          background-color: var(--success-bg);
          color: var(--success-text);
        }
        
        .badge-negative {
          background-color: var(--danger-bg);
          color: var(--danger-text);
        }

        .badge-neutral {
          background-color: var(--neutral-bg);
          color: var(--neutral-text);
        }

        /* --- Global Responsiveness --- */
        @media (max-width: 1024px) {
          .main-view { padding: 32px 24px; }
        }

        @media (max-width: 768px) {
          .header-section { flex-direction: column; align-items: stretch; }
          .header-actions { justify-content: space-between; }
        }
      `}</style>

      <div className="app-container">
        <DashboardSidebar />

        <main className="main-view">
          
          {/* Header section */}
          <header className="header-section">
            <div className="header-titles">
              <h1>Dashboard</h1>
              <p>Plan, monitor, and track customer loyalty activity.</p>
            </div>
            <div className="header-actions">
              <span>Theme</span>
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
          <section className="data-panel" aria-labelledby="recent-activity-title">
            <div className="panel-header">
              <h2 id="recent-activity-title" className="panel-title">Recent Activity</h2>
            </div>

            <div className="table-container">
              <table className="data-table">
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
                      <td className="cell-action">{entry.action}</td>
                      <td>{entry.customer}</td>
                      <td><span className="cell-mono">{entry.vehicle}</span></td>
                      <td>
                        <span className={`badge ${getPointsClass(entry.points)}`}>
                          {entry.points}
                        </span>
                      </td>
                      <td className="cell-sub">{entry.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </main>
      </div>
    </>
  );
};

export default Dashboard;