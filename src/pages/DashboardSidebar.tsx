import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AwardPointsIcon,
  CustomersIcon,
  GridMenuIcon,
  LogOutIcon,
  RedeemPointsIcon,
  SettingsIcon,
  ShieldUserIcon,
} from '../assets/icons/DashboardIcons';

type DashboardSidebarProps = {
  className?: string;
};

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ className }) => {
  return (
    <>
      <style>{`
        .sidebar {
          padding: clamp(16px, 2.5vw, 24px) clamp(12px, 2vw, 20px);
          display: flex;
          flex-direction: column;
          min-height: 100%;
          justify-content: flex-start;
        }

        .sidebar .brand {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1vw, 12px);
          margin-bottom: clamp(24px, 4vh, 40px);
          padding: 0 clamp(4px, 0.5vw, 8px);
        }

        .sidebar .brand-icon {
          color: var(--primary-dark, #175433);
          width: clamp(24px, 2.5vw, 28px);
          height: clamp(24px, 2.5vw, 28px);
          flex-shrink: 0;
        }

        .sidebar .brand-title {
          font-size: clamp(16px, 1.5vw + 8px, 20px);
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        /* Container for all menus to manage vertical spacing */
        .sidebar-nav-container {
          display: flex;
          flex-direction: column;
          flex: 1; /* Takes up remaining vertical space */
          min-height: 0;
        }

        .sidebar .menu-group {
          display: flex;
          flex-direction: column;
          margin-bottom: clamp(16px, 3vh, 32px);
        }

        /* Pushes the General menu to the bottom on desktop */
        .sidebar .menu-group.general {
          margin-top: auto;
          margin-bottom: 0;
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
          gap: clamp(2px, 0.5vh, 4px);
        }

        .sidebar .nav-item {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1vw, 12px);
          padding: clamp(10px, 1.2vh, 12px) clamp(12px, 1.5vw, 16px);
          border-radius: 12px;
          color: var(--text-muted, #6b7280);
          text-decoration: none;
          font-size: clamp(13px, 1vw + 4px, 15px);
          font-weight: 500;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
          background: transparent;
          text-align: left;
        }

        .sidebar .nav-item svg {
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

        /* Specific styling for the logout button hover state */
        .sidebar .nav-item.logout:hover {
          background-color: #fef2f2; /* Light red tint */
          color: #dc2626; /* Red text */
        }
        .sidebar .nav-item.logout:hover svg {
          stroke: #dc2626;
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

          /* Transform the container into a horizontal scrolling area */
          .sidebar-nav-container {
            flex-direction: row;
            overflow-x: auto;
            gap: 8px;
            padding-bottom: 8px;
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE/Edge */
          }
          
          .sidebar-nav-container::-webkit-scrollbar {
            display: none; /* Chrome/Safari/Opera */
          }

          .sidebar .menu-group {
            margin: 0 !important; /* Overrides the bottom pushing */
            display: contents; /* Flattens DOM so both nav-menus flow together */
          }

          .sidebar .nav-menu {
            flex-direction: row;
            gap: 8px;
          }

          .sidebar .nav-item {
            white-space: nowrap;
            flex-shrink: 0;
            width: auto;
          }
        }
      `}</style>

      <aside className={className ? `sidebar ${className}` : 'sidebar'}>
        <div className="brand">
          <ShieldUserIcon className="brand-icon" />
          <span className="brand-title">PetroPoints</span>
        </div>

        <div className="sidebar-nav-container">
          <div className="menu-group">
            <div className="menu-label">Menu</div>
            <nav className="nav-menu">
              <NavLink to="/dashboard" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <GridMenuIcon />
                Dashboard
              </NavLink>

              <NavLink to="/customers" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <CustomersIcon />
                Customers List
              </NavLink>

              <NavLink to="/award-points" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <AwardPointsIcon />
                Award Points
              </NavLink>

              <NavLink to="/redeem-points" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <RedeemPointsIcon />
                Redeem Points
              </NavLink>
            </nav>
          </div>

          <div className="menu-group general">
            <div className="menu-label">General</div>
            <nav className="nav-menu">
              <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <SettingsIcon />
                Settings
              </NavLink>

              <NavLink to="/login" className="nav-item logout">
                <LogOutIcon />
                Log out
              </NavLink>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;