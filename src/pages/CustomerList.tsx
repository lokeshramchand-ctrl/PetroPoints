import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import { EditIcon, DeleteIcon, AddIcon } from '../assets/icons/CustomerListIcons';

const CustomersList: React.FC = () => {
  // Mock data utilizing the exact fields you requested
  const customers = [
    {
      id: '#CUST-7821',
      name: 'Jane Cooper',
      city: 'Hyderabad',
      mobile: '+91 98765 43210',
      aadhaar: 'XXXX XXXX 8291',
    },
    {
      id: '#CUST-7820',
      name: 'Guy Hawkins',
      city: 'Warangal',
      mobile: '+91 87654 32109',
      aadhaar: 'XXXX XXXX 4028',
    },
    {
      id: '#CUST-7819',
      name: 'Robert Fox',
      city: 'Vijayawada',
      mobile: '+91 76543 21098',
      aadhaar: 'XXXX XXXX 9182',
    },
    {
      id: '#CUST-7818',
      name: 'Laura Kinney',
      city: 'Guntur',
      mobile: '+91 65432 10987',
      aadhaar: 'XXXX XXXX 3341',
    },
    {
      id: '#CUST-7817',
      name: 'Jenny Wilson',
      city: 'Hyderabad',
      mobile: '+91 54321 09876',
      aadhaar: 'XXXX XXXX 7712',
    },
    {
      id: '#CUST-7816',
      name: 'Ralph Edwards',
      city: 'Kurnool',
      mobile: '+91 43210 98765',
      aadhaar: 'XXXX XXXX 5564',
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }

        body, html {
          margin: 0;
          padding: 0;
          background-color: var(--bg-main, #f4f6f8);
          color: var(--text-main, #111827);
        }

        .app-container {
          display: flex;
          min-height: 100vh;
          padding: clamp(8px, 2vw, 16px);
          gap: clamp(8px, 2vw, 16px);
          align-items: stretch;
        }

        .sidebar {
          flex: 0 0 clamp(200px, 20vw, 280px);
          background-color: var(--surface-main, #ffffff);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          padding: 24px clamp(12px, 1.5vw, 20px);
          box-shadow: var(--shadow-soft, 0 4px 20px rgba(0,0,0,0.02));
          position: sticky;
          top: clamp(8px, 2vw, 16px);
          align-self: stretch;
          min-height: calc(100vh - clamp(16px, 4vw, 32px));
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: var(--surface-main, #ffffff);
          border-radius: 24px;
          box-shadow: var(--shadow-soft, 0 4px 20px rgba(0,0,0,0.02));
          min-width: 0;
        }

        .page-container {
          padding: clamp(20px, 3vw, 32px);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* --- Header & Buttons --- */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .page-title {
          font-size: clamp(24px, 3vw, 28px);
          font-weight: 700;
          color: var(--text-main, #111827);
          margin: 0;
          letter-spacing: -0.03em;
        }

        .btn-add {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: var(--primary-dark, #175433);
          color: #ffffff;
          border: none;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(23, 84, 51, 0.15);
        }

        .btn-add:hover {
          background: var(--primary-light, #207245);
          transform: translateY(-1px);
        }

        .page-footer {
          display: flex;
          justify-content: flex-start;
          margin-top: 8px;
        }

        /* --- Table Layout --- */
        .table-wrapper {
          background: var(--surface-main, #ffffff);
          border-radius: 20px;
          border: 1px solid var(--border-color, #eaedf1);
          overflow-x: auto; /* Enables horizontal scroll on mobile */
          box-shadow: var(--shadow-soft, 0 4px 20px rgba(0,0,0,0.02));
        }

        .customers-table {
          width: 100%;
          min-width: 800px; /* Prevents columns from crushing on small screens */
          border-collapse: collapse;
          text-align: left;
        }

        .customers-table th {
          padding: 20px 24px;
          color: var(--text-soft, #9ca3af);
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--border-color, #eaedf1);
          background: var(--surface-main, #ffffff);
        }

        .customers-table td {
          padding: 18px 24px;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-main, #111827);
          border-bottom: 1px solid var(--border-color, #eaedf1);
          transition: background-color 0.2s ease;
        }

        .customers-table tbody tr:last-child td {
          border-bottom: none;
        }

        .customers-table tbody tr:hover td {
          background-color: var(--surface-soft, #f9fafb);
        }

        .cell-id {
          color: var(--text-muted, #6b7280) !important;
          font-weight: 600 !important;
        }

        /* --- Action Buttons (Pills) --- */
        .actions-cell {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.01em;
          cursor: pointer;
          border: 1px solid transparent;
          transition: transform 0.2s ease, box-shadow 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          will-change: transform;
        }

        .action-btn svg {
          transition: transform 0.2s ease;
        }

        .btn-edit {
          background: linear-gradient(135deg, rgba(20, 184, 166, 0.16), rgba(45, 212, 191, 0.08));
          color: #0f766e;
          border-color: rgba(20, 184, 166, 0.3);
          box-shadow: 0 6px 18px rgba(20, 184, 166, 0.15);
        }

        .btn-edit:hover {
          background: linear-gradient(135deg, rgba(20, 184, 166, 0.24), rgba(45, 212, 191, 0.14));
          transform: translateY(-1px);
          box-shadow: 0 10px 22px rgba(20, 184, 166, 0.24);
        }

        .btn-edit:hover svg {
          transform: rotate(-8deg) scale(1.05);
        }

        .btn-delete {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.14), rgba(248, 113, 113, 0.08));
          color: #b91c1c;
          border-color: rgba(239, 68, 68, 0.28);
          box-shadow: 0 6px 18px rgba(239, 68, 68, 0.14);
        }

        .btn-delete:hover {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.24), rgba(248, 113, 113, 0.14));
          transform: translateY(-1px);
          box-shadow: 0 10px 22px rgba(239, 68, 68, 0.22);
        }

        .btn-delete:hover svg {
          transform: scale(1.08);
        }

        .action-btn:active {
          transform: translateY(0);
          box-shadow: none;
        }

        @media (max-width: 64rem) {
          .app-container {
            flex-direction: column;
            padding: 0;
            gap: 0;
          }

          .sidebar {
            width: 100%;
            flex: none;
            min-height: auto;
            position: relative;
            top: 0;
            border-radius: 0;
            box-shadow: none;
            border-bottom: 1px solid var(--border-color, #eaedf1);
          }

          .main-content {
            border-radius: 0;
            box-shadow: none;
          }
        }
      `}</style>

      <div className="app-container">
        <DashboardSidebar />

        <main className="main-content">
          <div className="page-container">
            <header className="page-header">
              <h1 className="page-title">Customers</h1>
        
            </header>

            <div className="table-wrapper">
              <table className="customers-table">
                <thead>
                  <tr>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>City / Village</th>
                    <th>Mobile Number</th>
                    <th>Aadhaar No.</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => (
                    <tr key={index}>
                      <td className="cell-id">{customer.id}</td>
                      <td>{customer.name}</td>
                      <td>{customer.city}</td>
                      <td>{customer.mobile}</td>
                      <td>{customer.aadhaar}</td>
                      <td>
                        <div className="actions-cell">
                          <button className="action-btn btn-edit">
                            <EditIcon width={12} height={12} />
                            Edit
                          </button>

                          <button className="action-btn btn-delete">
                            <DeleteIcon width={12} height={12} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <footer className="page-footer">
              <button className="btn-add">
                <AddIcon width={18} height={18} />
                Add Customer
              </button>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
};

export default CustomersList;