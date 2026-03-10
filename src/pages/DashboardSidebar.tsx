import React from 'react';
import {
  AwardPointsIcon,
  CustomersIcon,
  GridMenuIcon,
  RedeemPointsIcon,
  ShieldUserIcon,
} from '../assets/icons/DashboardIcons';

type DashboardSidebarProps = {
  activeMenu: string;
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
};

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeMenu, setActiveMenu }) => {
  return (
    <>
      <style>{`
        .sidebar {
          /* Padding scales fluidly between mobile and desktop sizes */
          padding: clamp(16px, 2.5vw, 24px) clamp(12px, 2vw, 20px);
          display: flex;
          flex-direction: column;
        }

        .sidebar .brand {
          display: flex;
          align-items: center;
          /* Fluid gap between icon and title */
          gap: clamp(8px, 1vw, 12px);
          /* Fluid margin-bottom relative to viewport height */
          margin-bottom: clamp(24px, 4vh, 40px);
          padding: 0 clamp(4px, 0.5vw, 8px);
        }

        .sidebar .brand-icon {
          color: var(--primary-dark, #175433);
          /* Fluid icon sizing */
          width: clamp(24px, 2.5vw, 28px);
          height: clamp(24px, 2.5vw, 28px);
          flex-shrink: 0;
        }

        .sidebar .brand-title {
          /* Fluid typography: starts at 16px, scales with screen width, caps at 20px */
          font-size: clamp(16px, 1.5vw + 8px, 20px);
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .sidebar .menu-label {
          font-size: clamp(10px, 1vw + 2px, 12px);
          font-weight: 600;
          color: var(--text-soft, #9ca3af);
          margin-bottom: clamp(8px, 1.5vh, 12px);
          padding: 0 clamp(4px, 0.5vw, 8px);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .sidebar .nav-menu {
          display: flex;
          flex-direction: column;
          /* Fluid spacing between menu items */
          gap: clamp(2px, 0.5vh, 4px);
          margin-bottom: clamp(16px, 3vh, 32px);
        }

        .sidebar .nav-item {
          display: flex;
          align-items: center;
          /* Fluid gap between icon and text */
          gap: clamp(8px, 1vw, 12px);
          /* Fluid padding inside buttons */
          padding: clamp(10px, 1.2vh, 12px) clamp(12px, 1.5vw, 16px);
          border-radius: 12px;
          color: var(--text-muted, #6b7280);
          text-decoration: none;
          /* Fluid typography for menu items */
          font-size: clamp(13px, 1vw + 4px, 15px);
          font-weight: 500;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
          background: transparent;
          text-align: left;
        }

        .sidebar .nav-item svg {
          /* Fluid icon sizing for menu items */
          width: clamp(18px, 1.5vw, 20px);
          height: clamp(18px, 1.5vw, 20px);
          stroke-width: 2;
          flex-shrink: 0;
        }

        .sidebar .nav-item:hover {
          background-color: var(--surface-soft, #f9fafb);
          color: var(--text-main, #111827);
        }

        .sidebar .nav-item.active {
          color: var(--primary-dark, #175433);
          font-weight: 600;
          background-color: var(--surface-muted, #f0fdf4);
        }

        .sidebar .nav-item.active svg {
          stroke: var(--primary-dark, #175433);
        }

        /* Structural Axis Flip for Tablets/Mobile */
        @media (max-width: 1024px) {
          .sidebar .brand {
            margin-bottom: 16px;
            padding: 0;
          }

          .sidebar .menu-label {
            display: none;
          }

          .sidebar .nav-menu {
            flex-direction: row;
            overflow-x: auto;
            margin-bottom: 0;
            padding-bottom: 8px;
            gap: 8px;
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE/Edge */
          }
          
          .sidebar .nav-menu::-webkit-scrollbar {
            display: none; /* Chrome/Safari/Opera */
          }

          .sidebar .nav-item {
            white-space: nowrap;
            flex-shrink: 0;
            width: auto;
          }
        }
      `}</style>

      <aside className="sidebar">
        <div className="brand">
          <ShieldUserIcon className="brand-icon" />
          <span className="brand-title">Admin Panel</span>
        </div>

        <div className="menu-label">Menu</div>

        <nav className="nav-menu">
          <button
            className={`nav-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveMenu('dashboard')}
          >
            <GridMenuIcon />
            Dashboard
          </button>

          <button
            className={`nav-item ${activeMenu === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveMenu('customers')}
          >
            <CustomersIcon />
            Customers List
          </button>

          <button
            className={`nav-item ${activeMenu === 'award' ? 'active' : ''}`}
            onClick={() => setActiveMenu('award')}
          >
            <AwardPointsIcon />
            Award Points
          </button>

          <button
            className={`nav-item ${activeMenu === 'redeem' ? 'active' : ''}`}
            onClick={() => setActiveMenu('redeem')}
          >
            <RedeemPointsIcon />
            Redeem Points
          </button>
        </nav>
      </aside>
    </>
  );
};

export default DashboardSidebar;