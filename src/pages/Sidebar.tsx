import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  // Auto-close sidebar on mobile when navigating
  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen && window.innerWidth <= 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <style>{`
        /* --- Mobile Hamburger Button --- */
        .hamburger-btn {
          display: none;
          position: fixed;
          top: 16px;
          left: 16px;
          z-index: 1001;
          background: var(--surface-main);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          width: 44px;
          height: 44px;
          padding: 0;
          cursor: pointer;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          transition: all 0.2s ease;
          box-shadow: var(--shadow-soft);
        }

        .hamburger-btn:hover {
          background-color: var(--surface-soft);
        }

        .hamburger-btn span {
          width: 20px;
          height: 2px;
          background-color: var(--text-main);
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hamburger-btn.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger-btn.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger-btn.open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        /* --- Mobile Overlay --- */
        .sidebar-overlay {
          display: none;
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 999;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .sidebar-overlay.open {
          display: block;
          opacity: 1;
        }

        /* --- Sidebar Container (Desktop) --- */
        .sidebar-drawer {
          flex: 0 0 clamp(220px, 20vw, 280px);
          background-color: var(--surface-main);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          padding: 24px 20px;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-soft);
          position: sticky;
          top: clamp(12px, 2vw, 24px);
          height: calc(100vh - clamp(24px, 4vw, 48px));
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          overflow-y: auto;
        }

        /* Hide scrollbar for clean aesthetic */
        .sidebar-drawer::-webkit-scrollbar {
          display: none;
        }
        .sidebar-drawer {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* --- Brand Header --- */
        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 40px;
          padding: 0 8px;
        }

        .brand-icon {
          color: var(--text-main);
          width: 28px;
          height: 28px;
          flex-shrink: 0;
        }

        .brand-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-main);
          letter-spacing: -0.03em;
        }

        /* --- Navigation Layout --- */
        .sidebar-nav-container {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .menu-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 32px;
        }

        .menu-group.general {
          margin-top: auto;
          margin-bottom: 0;
        }

        .menu-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-soft);
          margin-bottom: 12px;
          padding: 0 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        /* --- Navigation Items --- */
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 12px;
          color: var(--text-muted);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
          border: none;
          background: transparent;
          cursor: pointer;
        }

        .nav-item svg {
          width: 20px;
          height: 20px;
          stroke-width: 2;
          flex-shrink: 0;
          transition: color 0.2s ease;
        }

        .nav-item:hover {
          background-color: var(--surface-soft);
          color: var(--text-main);
        }

        .nav-item.active {
          color: var(--text-main);
          font-weight: 600;
          background-color: var(--surface-muted);
        }

        .nav-item.active svg {
          color: var(--text-main);
        }

        /* Distinct Logout Styling */
        .nav-item.logout {
          margin-top: 8px;
          color: color-mix(in srgb, #dc2626 50%, var(--text-main));
          background-color: transparent;
          border: 1px solid transparent;
        }

        .nav-item.logout:hover {
          background-color: color-mix(in srgb, #dc2626 10%, var(--surface-soft));
          color: #dc2626;
        }
        .nav-item.logout:hover svg {
          color: #dc2626;
        }

        /* --- Mobile Responsiveness --- */
        @media (max-width: 1024px) {
          .hamburger-btn {
            display: flex;
          }

          .sidebar-drawer {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 280px;
            border-radius: 0;
            border: none;
            border-right: 1px solid var(--border-color);
            transform: translateX(-100%);
            padding-top: 80px; /* Space for hamburger */
          }

          .sidebar-drawer.open {
            transform: translateX(0);
            box-shadow: 4px 0 24px rgba(0, 0, 0, 0.1);
          }
          
          .brand {
            padding-left: 12px;
          }
        }
      `}</style>

      {/* Mobile Hamburger Trigger */}
      <button
        className={`hamburger-btn ${isOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Backdrop Overlay */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`} 
        onClick={closeSidebar} 
        aria-hidden="true" 
      />

      {/* Main Sidebar Wrapper */}
      <aside className={`sidebar-drawer ${isOpen ? 'open' : ''} ${className}`}>
        <div className="brand">
          <ShieldUserIcon className="brand-icon" />
          <span className="brand-title">PetroPoints</span>
        </div>

        <div className="sidebar-nav-container">
          <div className="menu-group">
            <div className="menu-label">Overview</div>
            <nav className="nav-menu">
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <GridMenuIcon />
                Dashboard
              </NavLink>

              <NavLink
                to="/customers"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <CustomersIcon />
                Customers List
              </NavLink>

              <NavLink
                to="/awards"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <AwardPointsIcon />
                Award Points
              </NavLink>

              <NavLink
                to="/redeem-points"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <RedeemPointsIcon />
                Redeem Points
              </NavLink>
            </nav>
          </div>

          <div className="menu-group general">
            <div className="menu-label">System</div>
            <nav className="nav-menu">
              <NavLink
                to="/settings"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <SettingsIcon />
                Settings
              </NavLink>

              <NavLink
                to="/login"
                className="nav-item logout"
              >
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

export default Sidebar;