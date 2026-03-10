import React from 'react'

type DashboardSidebarProps = {
  activeMenu: string
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeMenu, setActiveMenu }) => {
  return (
    <aside className="sidebar">
      <div className="brand">
        <svg
          className="brand-icon"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span className="brand-title">Admin Panel</span>
      </div>

      <div className="menu-label">Menu</div>
      <nav className="nav-menu">
        <button
          className={`nav-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveMenu('dashboard')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
          Dashboard
        </button>

        <button
          className={`nav-item ${activeMenu === 'customers' ? 'active' : ''}`}
          onClick={() => setActiveMenu('customers')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Customers List
        </button>

        <button
          className={`nav-item ${activeMenu === 'award' ? 'active' : ''}`}
          onClick={() => setActiveMenu('award')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="8" r="7" />
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
          </svg>
          Award Points
        </button>

        <button
          className={`nav-item ${activeMenu === 'redeem' ? 'active' : ''}`}
          onClick={() => setActiveMenu('redeem')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
          Redeem Points
        </button>
      </nav>
    </aside>
  )
}

export default DashboardSidebar
