import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  Gift,
  Repeat,
  Settings,
  Search,
} from "lucide-react";

const Sidebar = () => {
  return (
    <>
      <style>{`
        .sidebar {
          width: 250px;
          height: 100vh;
          background: #f9fafb;
          border-right: 1px solid #e5e7eb;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          font-family: "Inter", system-ui, sans-serif;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          font-size: 18px;
          color: #111827;
          margin-bottom: 20px;
        }

        .brand-logo {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #22c55e;
        }

        .search {
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 8px 10px;
          background: white;
          margin-bottom: 28px;
        }

        .search input {
          border: none;
          outline: none;
          background: transparent;
          font-size: 14px;
          width: 100%;
          font-family: inherit;
        }

        .menu-section {
          margin-bottom: 26px;
        }

        .menu-title {
          font-size: 11px;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 10px;
        }

        .menu {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .menu a {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 14px;
          color: #4b5563;
          text-decoration: none;
          transition: background 0.15s ease;
        }

        .menu a svg {
          width: 18px;
          height: 18px;
        }

        .menu a:hover {
          background: #f3f4f6;
          color: #111827;
        }

        .menu a.active {
          background: #e5e7eb;
          color: #111827;
          font-weight: 500;
        }
      `}</style>

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-logo"></div>
          PetroPoints
        </div>

        <div className="search">
          <Search size={16} strokeWidth={2} />
          <input placeholder="Search" />
        </div>

        <div className="menu-section">
          <div className="menu-title">Main Menu</div>

          <div className="menu">
            <NavLink to="/dashboard">
              <LayoutGrid strokeWidth={2} />
              Dashboard
            </NavLink>

            <NavLink to="/customers">
              <Users strokeWidth={2} />
              Customers
            </NavLink>

            <NavLink to="/awards">
              <Gift strokeWidth={2} />
              Award Points
            </NavLink>

            <NavLink to="/redeem-points">
              <Repeat strokeWidth={2} />
              Redeem Points
            </NavLink>
          </div>
        </div>

        <div className="menu-section">
          <div className="menu-title">Others</div>

          <div className="menu">
            <NavLink to="/settings">
              <Settings strokeWidth={2} />
              Settings
            </NavLink>
          </div>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;