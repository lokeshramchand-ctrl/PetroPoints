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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        :root {
          /* SaaS Palette */
          --surface: #FFFFFF;
          --primary: #4F46E5;
          --primary-hover: #4338CA;
          --primary-light: #EEF2FF;
          --text-main: #0F172A;
          --text-muted: #64748B;
          --text-faint: #94A3B8;
          --border-light: #F1F5F9;
          --border-strong: #E2E8F0;
          --danger: #EF4444;
          --danger-light: #FEF2F2;
          
          --radius-md: 12px;
          --radius-lg: 16px;
          
          --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
          --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05);
        }

        /* --- Mobile Hamburger Button --- */
        .hamburger-btn {
          display: none;
          position: fixed;
          top: 16px;
          left: 16px;
          z-index: 1001;
          background: var(--surface);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-md);
          width: 44px;
          height: 44px;
          padding: 0;
          cursor: pointer;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          transition: all 0.2s ease;
          box-shadow: var(--shadow-sm);
        }

        .hamburger-btn:hover {
          background-color: var(--border-light);
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
          flex: 0 0 280px;
          background-color: var(--surface);
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-strong);
          box-shadow: var(--shadow-md);
          position: sticky;
          top: 24px;
          height: calc(100vh - 48px);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          overflow: hidden; /* Hide main scroll, allow inner scroll */
        }

        /* --- Brand Header --- */
        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 28px 24px;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 16px;
        }

        .brand-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--primary);
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }

        .brand-icon {
          width: 20px;
          height: 20px;
        }

        .brand-title {
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--text-main);
          letter-spacing: -0.02em;
        }

        /* --- Navigation Layout --- */
        .sidebar-nav-container {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 0 16px 24px 16px;
          overflow-y: auto;
        }

        /* Hide scrollbar */
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
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-faint);
          margin-bottom: 8px;
          padding: 0 12px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        /* --- Navigation Items --- */
        .nav-item {
          font-family: 'Inter', sans-serif;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 10px;
          color: var(--text-muted);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
          border: none;
          background: transparent;
          cursor: pointer;
          position: relative;
        }

        .nav-item svg {
          width: 20px;
          height: 20px;
          stroke-width: 2;
          flex-shrink: 0;
          transition: color 0.2s ease;
          color: var(--text-faint);
        }

        .nav-item:hover {
          background-color: var(--border-light);
          color: var(--text-main);
        }

        .nav-item:hover svg {
          color: var(--text-muted);
        }

        /* Active State */
        .nav-item.active {
          color: var(--primary);
          font-weight: 600;
          background-color: var(--primary-light);
        }

        .nav-item.active svg {
          color: var(--primary);
        }

        /* Distinct Logout/Danger Styling */
        .nav-item.logout {
          margin-top: 8px;
          color: var(--text-main);
          background-color: transparent;
        }

        .nav-item.logout:hover {
          background-color: var(--danger-light);
          color: var(--danger);
        }
        
        .nav-item.logout:hover svg {
          color: var(--danger);
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
            border-right: 1px solid var(--border-strong);
            transform: translateX(-100%);
            padding-top: 64px; /* Space for hamburger */
            box-shadow: none;
          }

          .sidebar-drawer.open {
            transform: translateX(0);
            box-shadow: var(--shadow-lg);
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