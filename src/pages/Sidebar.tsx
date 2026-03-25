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
          --danger-text: #991B1B;
          --danger-bg: #FEE2E2;
          
          --radius-none: 0px; /* Brutalist sharp edges */
          
          --shadow-hard: 4px 4px 0px 0px rgba(15, 23, 42, 1);
          --shadow-hard-sm: 2px 2px 0px 0px rgba(15, 23, 42, 1);
        }

        /* --- Mobile Hamburger Button --- */
        .hamburger-btn {
          display: none;
          position: fixed;
          top: 16px;
          left: 16px;
          z-index: 1001;
          background: var(--surface);
          border: 2px solid var(--border-strong);
          border-radius: var(--radius-none);
          width: 44px;
          height: 44px;
          padding: 0;
          cursor: pointer;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: var(--shadow-hard-sm);
        }

        .hamburger-btn:active {
          transform: translate(2px, 2px);
          box-shadow: none;
        }

        .hamburger-btn span {
          width: 20px;
          height: 2px;
          background-color: var(--text-main);
          border-radius: 0;
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
          background: rgba(15, 23, 42, 0.6);
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
          flex: 0 0 280px;
          background-color: var(--surface);
          border-radius: var(--radius-none);
          display: flex;
          flex-direction: column;
          border: 2px solid var(--border-strong);
          box-shadow: var(--shadow-hard);
          position: sticky;
          top: 48px;
          height: calc(100vh - 96px);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          overflow: hidden;
        }

        /* --- Brand Header --- */
        .brand {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
          border-bottom: 2px solid var(--border-strong);
          background-color: var(--bg-body);
        }

        .brand-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--primary);
          color: var(--text-main);
          width: 40px;
          height: 40px;
          border: 2px solid var(--border-strong);
          box-shadow: var(--shadow-hard-sm);
        }

        .brand-icon {
          width: 24px;
          height: 24px;
        }

        .brand-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--text-main);
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }

        /* --- Navigation Layout --- */
        .sidebar-nav-container {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 24px 16px;
          overflow-y: auto;
          background-color: var(--surface);
        }

        .sidebar-nav-container::-webkit-scrollbar { display: none; }
        .sidebar-nav-container { -ms-overflow-style: none; scrollbar-width: none; }

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
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 12px;
          padding: 0 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        /* --- Navigation Items --- */
        .nav-item {
          font-family: 'Inter', sans-serif;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: var(--radius-none);
          color: var(--text-muted);
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          border: 2px solid transparent;
          background: transparent;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .nav-item svg {
          width: 20px;
          height: 20px;
          stroke-width: 2;
          flex-shrink: 0;
          color: var(--text-muted);
          transition: color 0.15s ease;
        }

        /* Hover State */
        .nav-item:hover {
          background-color: var(--bg-body);
          color: var(--text-main);
          border: 2px solid var(--border-strong);
          transform: translate(-2px, -2px);
          box-shadow: var(--shadow-hard-sm);
        }

        .nav-item:hover svg {
          color: var(--text-main);
        }

        /* Active State */
        .nav-item.active {
          color: var(--primary-hover);
          background-color: var(--primary-light);
          border: 2px solid var(--border-strong);
          box-shadow: var(--shadow-hard-sm);
        }

        .nav-item.active svg {
          color: var(--primary-hover);
        }

        /* Distinct Logout/Danger Styling */
        .nav-item.logout {
          margin-top: 16px;
          color: var(--text-main);
        }

        .nav-item.logout:hover {
          background-color: var(--danger-bg);
          color: var(--danger-text);
          border-color: var(--border-strong);
        }
        
        .nav-item.logout:hover svg {
          color: var(--danger-text);
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
            border: none;
            border-right: 2px solid var(--border-strong);
            transform: translateX(-100%);
            box-shadow: none;
            z-index: 1000;
          }

          .sidebar-drawer.open {
            transform: translateX(0);
            box-shadow: var(--shadow-hard);
          }
          
          .brand {
             padding-top: 72px; /* Extra space for the floating hamburger */
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
          <div className="brand-icon-wrapper">
            <ShieldUserIcon className="brand-icon" />
          </div>
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
                LogIn
              </NavLink>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;