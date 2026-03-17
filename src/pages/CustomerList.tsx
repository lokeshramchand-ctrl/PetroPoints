import React, { useState } from 'react';
import DashboardSidebar from './Sidebar';
import { EditIcon, DeleteIcon, AddIcon } from '../assets/icons/CustomerListIcons';

type Customer = {
  id: string;
  name: string;
  city: string;
  mobile: string;
  aadhaar: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://10.10.10.1:3024/api';

const initialCustomers: Customer[] = [
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

const CustomersList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [mobile, setMobile] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextCustomerIdNumber = Math.max(
    ...customers
      .map((customer) => Number(customer.id.replace(/[^0-9]/g, '')))
      .filter((value) => Number.isFinite(value)),
    7821,
  ) + 1;

  const resetForm = () => {
    setName('');
    setCity('');
    setMobile('');
    setAadhaar('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleAddCustomer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !city.trim() || mobile.length < 10 || aadhaar.length < 12) {
      window.alert('Please enter valid customer details.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: nextCustomerIdNumber,
          name: name.trim(),
          city: city.trim(),
          mobile,
          aadhar: aadhaar,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create customer');
      }

      const createdCustomer: Customer = {
        id: `#CUST-${nextCustomerIdNumber}`,
        name: name.trim(),
        city: city.trim(),
        mobile: `+91 ${mobile}`,
        aadhaar,
      };

      setCustomers((previous) => [createdCustomer, ...previous]);
      closeModal();
    } catch (error) {
      console.error(error);
      window.alert('Unable to save customer. Please check backend API and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
          box-sizing: border-box;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        body, html {
          margin: 0;
          padding: 0;
          background-color: var(--bg-main, #f8fafc);
          color: var(--text-main, #0f172a);
          -webkit-font-smoothing: antialiased;
        }

        /* --- Layout --- */
        .app-container {
          display: flex;
          min-height: 100vh;
          padding: clamp(12px, 2vw, 24px);
          gap: clamp(12px, 2vw, 24px);
          align-items: flex-start;
          max-width: 1600px;
          margin: 0 auto;
        }

        .sidebar {
          flex: 0 0 clamp(220px, 20vw, 280px);
          background-color: var(--surface-main, #ffffff);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          padding: 24px;
          border: 1px solid var(--border-color, #e2e8f0);
          box-shadow: 0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.02);
          position: sticky;
          top: clamp(12px, 2vw, 24px);
          height: calc(100vh - clamp(24px, 4vw, 48px));
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .page-container {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* --- Header --- */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .page-title {
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 700;
          color: var(--text-main, #0f172a);
          margin: 0;
          letter-spacing: -0.04em;
        }

        .btn-primary {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: var(--text-main, #0f172a);
          color: #ffffff;
          border: none;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
        }

        .btn-primary:hover {
          background: #1e293b;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(15, 23, 42, 0.2);
        }

        /* --- Table Panel --- */
        .panel {
          background: var(--surface-main, #ffffff);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.02);
          padding: 24px;
          overflow: hidden;
        }

        .table-wrapper {
          overflow-x: auto;
          margin: -24px; /* Bleed edges */
        }

        .customers-table {
          width: 100%;
          min-width: 900px;
          border-collapse: separate;
          border-spacing: 0;
          text-align: left;
        }

        .customers-table th {
          padding: 16px 24px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-soft, #64748b);
          border-bottom: 1px solid var(--border-color, #e2e8f0);
          background: var(--bg-main, #f8fafc);
        }

        .customers-table td {
          padding: 20px 24px;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-main, #334155);
          border-bottom: 1px solid var(--border-color, #f1f5f9);
          transition: background 0.15s ease;
        }

        .customers-table tbody tr:last-child td {
          border-bottom: none;
        }

        .customers-table tbody tr:hover td {
          background: var(--bg-main, #f8fafc);
        }

        .cell-id, .cell-aadhaar {
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
          color: var(--text-soft, #64748b);
          font-size: 13px;
        }

        .cell-name {
          font-weight: 600;
          color: var(--text-main, #0f172a);
        }

        /* --- Action Pills --- */
        .actions-cell {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid var(--border-color, #e2e8f0);
          background: var(--surface-main, #ffffff);
          color: var(--text-main, #334155);
          transition: all 0.2s ease;
        }

        .btn-action:hover {
          background: var(--bg-main, #f8fafc);
          border-color: #cbd5e1;
        }

        .btn-delete:hover {
          color: #dc2626;
          border-color: #fca5a5;
          background: #fef2f2;
        }

        /* --- SaaS Modal (Window) --- */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.3);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 20px;
          animation: fadeIn 0.2s ease-out forwards;
        }

        .modal-container {
          background: #ffffff;
          width: 100%;
          max-width: 520px;
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .modal-header {
          padding: 24px 32px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f1f5f9;
        }

        .modal-title {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.02em;
        }

        .btn-close {
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 4px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .btn-close:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        .modal-body {
          padding: 24px 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: flex;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .form-label {
          font-size: 13px;
          font-weight: 600;
          color: #475569;
        }

        .form-input {
          padding: 12px 16px;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          font-size: 14px;
          color: #0f172a;
          outline: none;
          transition: all 0.2s ease;
          background: #ffffff;
        }

        .form-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .form-input:disabled {
          background: #f8fafc;
          color: #94a3b8;
          cursor: not-allowed;
        }

        .modal-footer {
          padding: 16px 32px 24px;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          background: #f8fafc;
          border-top: 1px solid #f1f5f9;
        }

        .btn-secondary {
          padding: 10px 20px;
          background: #ffffff;
          color: #475569;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-secondary:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        /* --- Animations --- */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* --- Responsiveness --- */
        @media (max-width: 1024px) {
          .app-container {
            flex-direction: column;
            padding: 16px;
          }

          .sidebar {
            width: 100%;
            flex: none;
            height: auto;
            position: relative;
            top: 0;
          }
        }

        @media (max-width: 640px) {
          .form-row {
            flex-direction: column;
            gap: 20px;
          }
          
          .modal-container {
            border-radius: 20px;
          }
          
          .modal-body, .modal-header, .modal-footer {
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      `}</style>

      <div className="app-container">
        <DashboardSidebar />

        <main className="main-content">
          <div className="page-container">
            <header className="page-header">
              <h1 className="page-title">Customers</h1>
              
              {/* Moved Add Customer button to top right */}
              <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                <AddIcon width={18} height={18} />
                Add Customer
              </button>
            </header>

            <section className="panel">
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
                        <td className="cell-name">{customer.name}</td>
                        <td>{customer.city}</td>
                        <td>{customer.mobile}</td>
                        <td className="cell-aadhaar">{customer.aadhaar}</td>
                        <td>
                          <div className="actions-cell">
                            <button className="btn-action">
                              <EditIcon width={14} height={14} />
                              Edit
                            </button>
                            <button className="btn-action btn-delete">
                              <DeleteIcon width={14} height={14} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Modern SaaS Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
              <h2 className="modal-title">Add New Customer</h2>
              <button className="btn-close" onClick={closeModal}>
                {/* Inline Close Icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddCustomer}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Customer ID</label>
                  <input type="text" className="form-input" value={`#CUST-${nextCustomerIdNumber}`} disabled />
                </div>

                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Jane Cooper"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">City / Village</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Hyderabad"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mobile Number</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="10-digit mobile number"
                      value={mobile}
                      onChange={(event) => setMobile(event.target.value.replace(/\D/g, '').slice(0, 10))}
                      maxLength={10}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Aadhaar Number</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="12-digit Aadhaar"
                    value={aadhaar}
                    onChange={(event) => setAadhaar(event.target.value.replace(/\D/g, '').slice(0, 12))}
                    maxLength={12}
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Customer'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
};

export default CustomersList;