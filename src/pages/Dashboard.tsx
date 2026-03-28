import React, { useState, useEffect } from 'react';
import DashboardSidebar from './Sidebar';
import { TrendUpIcon } from '../assets/icons/DashboardIcons';
import { ThemeToggle } from '../theme/ThemeToggle';

const Dashboard: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://petropoints-backend.deploy.splsystems.in/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_BASE_URL}/read`);
        const data = await res.json();

        setCustomers(data);
      } catch (err) {
        console.error("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalCustomers = customers.length;
  const totalPoints = customers.reduce(
    (sum, c) => sum + Number(c.CustomerPoints || 0),
    0
  );
  const activeCustomers = customers.filter(
    (c) => Number(c.CustomerPoints || 0) > 0
  ).length;
  const zeroCustomers = customers.filter(
    (c) => Number(c.CustomerPoints || 0) === 0
  ).length;

  const stats = [
    {
      id: 1,
      title: 'Total Customers',
      value: totalCustomers.toLocaleString(),
      trend: 'Live data',
      isPositive: true,
    },
    {
      id: 2,
      title: 'Active Customers',
      value: activeCustomers,
      trend: 'Have points',
      isPositive: true,
    },
    {
      id: 3,
      title: 'Total Points',
      value: totalPoints.toLocaleString(),
      trend: 'Accumulated',
      isPositive: true,
    },
    {
      id: 4,
      title: 'Zero Points',
      value: zeroCustomers,
      trend: 'No activity',
      isPositive: null,
    },
  ];

  const dynamicActivity = customers.slice(0, 5).map((c) => ({
    id: c.CustomerID,
    action: Number(c.CustomerPoints || 0) > 0
      ? 'Points Updated'
      : 'New Customer Added',
    customer: c.CustomerName,
    vehicle: '--',
    points: Number(c.CustomerPoints || 0) > 0
      ? `+${c.CustomerPoints}`
      : '--',
    time: 'Recently',
  }));

  if (loading) {
    return <p style={{ padding: "40px" }}>Loading dashboard...</p>;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');

        :root {
          /* Industrial SaaS Palette */
          --bg-body: #F1F5F9;
          --surface: #FFFFFF;
          --primary: #F97316; /* Action Orange */
          --primary-hover: #EA580C;
          --primary-light: #FFEDD5;
          --text-main: #0F172A; /* Petrol Navy */
          --text-muted: #475569;
          --text-faint: #94A3B8;
          --border-light: #E2E8F0;
          --border-strong: #0F172A; /* High contrast */
          
          /* Status Colors */
          --success-text: #166534;
          --success-bg: #DCFCE7;
          --danger-text: #991B1B;
          --danger-bg: #FEE2E2;
          --neutral-text: #475569;
          --neutral-bg: #E2E8F0;
          
          --radius-sm: 0px; /* Brutalist sharp edges */
          --radius-md: 0px;
          --radius-lg: 0px;
          --radius-full: 9999px;
          
          --shadow-sm: none;
          --shadow-hard: 4px 4px 0px 0px rgba(15, 23, 42, 1);
          --shadow-hard-hover: 6px 6px 0px 0px rgba(15, 23, 42, 1);
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
          padding: 48px;
          min-width: 0;
          gap: 48px; /* Generous separation between sections */
        }

        /* --- SaaS Header --- */
        .header-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 16px;
          border-bottom: 3px solid var(--border-strong);
          padding-bottom: 24px;
        }

        .header-titles h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 40px;
          font-weight: 700;
          letter-spacing: -0.03em;
          margin: 0 0 8px 0;
          color: var(--text-main);
          text-transform: uppercase;
        }

        .header-titles p {
          font-size: 16px;
          color: var(--text-muted);
          margin: 0;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--surface);
          padding: 8px 16px;
          border: 2px solid var(--border-strong);
          box-shadow: 2px 2px 0px 0px rgba(15, 23, 42, 1);
        }

        .header-actions span {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-main);
          font-family: 'Space Grotesk', sans-serif;
          text-transform: uppercase;
        }

        /* --- Stats Grid --- */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .stat-card {
          background: var(--surface);
          border: 2px solid var(--border-strong);
          padding: 24px;
          box-shadow: var(--shadow-hard);
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .stat-card:hover {
          transform: translate(-2px, -2px);
          box-shadow: var(--shadow-hard-hover);
        }

        .stat-label {
          margin: 0;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .stat-value {
          margin: 0;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 48px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.04em;
          color: var(--text-main);
        }

        .stat-trend {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 600;
          padding: 6px 12px;
          background: var(--neutral-bg);
          color: var(--text-main);
          width: fit-content;
          border: 1px solid var(--border-strong);
          text-transform: uppercase;
        }

        .trend-positive {
          background: var(--primary-light);
          color: var(--primary-hover);
          border-color: var(--primary);
        }

        /* --- Table Panel --- */
        .data-panel {
          background: var(--surface);
          border: 2px solid var(--border-strong);
          box-shadow: var(--shadow-hard);
          overflow: hidden;
        }

        .panel-header {
          padding: 24px;
          border-bottom: 2px solid var(--border-strong);
          background: var(--bg-body);
        }

        .panel-title {
          margin: 0;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--text-main);
          text-transform: uppercase;
          letter-spacing: 0.02em;
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
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: var(--text-main);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 2px solid var(--border-strong);
          background: #FFFFFF;
        }

        .data-table td {
          padding: 16px 24px;
          font-size: 15px;
          color: var(--text-main);
          border-bottom: 1px solid var(--border-light);
          vertical-align: middle;
        }

        .data-table tr:last-child td { border-bottom: none; }
        
        .data-table tbody tr { transition: background 0.15s ease; }
        .data-table tbody tr:hover { background: var(--bg-body); }

        /* Typography & Badges */
        .cell-action { font-weight: 600; color: var(--text-main); }
        .cell-sub { color: var(--text-muted); font-size: 14px; }
        .cell-mono { font-family: 'JetBrains Mono', 'SFMono-Regular', Consolas, monospace; font-size: 13px; font-weight: 600; color: var(--text-main); background: var(--bg-body); padding: 4px 8px; border: 1px solid var(--border-light); }

        .badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 4px 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 700;
          border: 1px solid var(--border-strong);
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
          color: var(--text-main);
        }

        /* --- Global Responsiveness --- */
        @media (max-width: 1024px) {
          .main-view { padding: 32px 24px; gap: 32px; }
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
                  {dynamicActivity.map((entry) => (
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

// Helper function to style point badges dynamically
const getPointsClass = (points: string) => {
  if (points.startsWith('+')) return 'badge-positive';
  if (points.startsWith('-')) return 'badge-negative';
  return 'badge-neutral';
};

export default Dashboard;