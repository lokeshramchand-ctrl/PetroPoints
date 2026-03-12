import React, { useState } from 'react';
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

type SidebarProps = {
  className?: string;
};

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };
  return (
    <>
      <style>{`
        .sidebar-wrapper {
          position: relative;
        }

        .hamburger-btn {
          display: none;
          position: fixed;
          top: clamp(12px, 2vw, 16px);
          left: clamp(12px, 2vw, 16px);
          z-index: 1001;
          background: var(--surface-main, #ffffff);
          border: 1px solid var(--border-color, #eaedf1);
          border-radius: 8px;
          width: 44px;
          height: 44px;
          padding: 0;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          transition: all 0.2s ease;
        }

        .hamburger-btn:hover {
          background-color: var(--surface-soft, #f9fafb);
        }

        .hamburger-btn span {
          width: 20px;
          height: 2px;
          background-color: var(--text-main, #111827);
          border-radius: 1px;
          transition: all 0.3s ease;
        }

        .hamburger-btn.open span:nth-child(1) {
          transform: rotate(45deg) translate(7px, 7px);
        }

        .hamburger-btn.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger-btn.open span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -7px);
        }

        .sidebar-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        .sidebar-overlay.open {
          display: block;
        }

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
          .hamburger-btn {
            display: flex;
          }

          .sidebar-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            width: 280px;
            height: 100vh;
            background: var(--surface-main, #ffffff);
            box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            border-radius: 0;
          }

          .sidebar-wrapper.open {
            transform: translateX(0);
          }

          .sidebar {
            height: 100%;
          }

          .sidebar .brand {
            margin-bottom: 16px;
            padding: 0;
          }

          .sidebar .menu-label {
            display: none;
          }

          /* Transform the container into a vertical menu on mobile */
          .sidebar-nav-container {
            flex-direction: column;
            overflow-y: auto;
            padding-bottom: 20px;
          }

          .sidebar .menu-group {
            margin: 0 0 clamp(16px, 3vh, 24px) 0;
          }

          .sidebar .menu-group.general {
            margin-top: auto;
          }

          .sidebar .nav-menu {
            flex-direction: column;
            gap: 4px;
          }

          .sidebar .nav-item {
            padding: 12px 16px;
            font-size: 15px;
          }
        }
      `}</style>

      <button
        className={`hamburger-btn ${isOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={closeSidebar}></div>

      <div className={`sidebar-wrapper ${isOpen ? 'open' : ''}`}>
        <aside className={className ? `sidebar ${className}` : 'sidebar'}>
          <div className="brand">
            <ShieldUserIcon className="brand-icon" />
            <span className="brand-title">PetroPoints</span>
          </div>

          <div className="sidebar-nav-container">
            <div className="menu-group">
              <div className="menu-label">Menu</div>
              <nav className="nav-menu">
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  onClick={closeSidebar}
                >
                  <GridMenuIcon />
                  Dashboard
                </NavLink>

                <NavLink
                  to="/customers"
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  onClick={closeSidebar}
                >
                  <CustomersIcon />
                  Customers List
                </NavLink>

                <NavLink
                  to="/award-points"
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  onClick={closeSidebar}
                >
                  <AwardPointsIcon />
                  Award Points
                </NavLink>

                <NavLink
                  to="/redeem-points"
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  onClick={closeSidebar}
                >
                  <RedeemPointsIcon />
                  Redeem Points
                </NavLink>
              </nav>
            </div>

            <div className="menu-group general">
              <div className="menu-label">General</div>
              <nav className="nav-menu">
                <NavLink
                  to="/settings"
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  onClick={closeSidebar}
                >
                  <SettingsIcon />
                  Settings
                </NavLink>

                <NavLink
                  to="/login"
                  className="nav-item logout"
                  onClick={closeSidebar}
                >
                  <LogOutIcon />
                  Log out
                </NavLink>
              </nav>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;