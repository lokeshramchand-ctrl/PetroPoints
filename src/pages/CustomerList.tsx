import React, { useState, useEffect } from 'react';
import DashboardSidebar from './Sidebar';
import { EditIcon, DeleteIcon, AddIcon } from '../assets/icons/CustomerListIcons';
import Snackbar, { type SnackbarType } from '../theme/Snackbar';

type Customer = {
  id: string;
  name: string;
  city: string;
  mobile: string;
  aadhaar: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://petropoints-backend.deploy.splsystems.in/api';

const CustomersList: React.FC = () => {
  // --- Data & Loading State ---
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{ message: string; type: SnackbarType } | null>(null);

  // --- Modal States ---
  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [targetCustomerId, setTargetCustomerId] = useState<number | null>(null);

  // --- Form State ---
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [mobile, setMobile] = useState('');
  const [aadhaar, setAadhaar] = useState('');

  const showSnackbar = (message: string, type: SnackbarType) => {
    setSnackbar({ message, type });
  };

  // --- Helper: Parse ID from #CUST-1234 to 1234 ---
  const parseId = (formattedId: string): number => {
    return parseInt(formattedId.replace(/\D/g, ''), 10);
  };

  // --- API: READ ---
  const fetchCustomers = async () => {
    setIsLoadingData(true);
    try {
      // Kept your proxy implementation for READ as requested
      const targetUrl = encodeURIComponent(`${API_BASE_URL}/read`);
      const proxyUrl = `https://corsproxy.io/?${targetUrl}`;

      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();

      const formattedData: Customer[] = data.map((item: any) => ({
        id: `#CUST-${item.CustomerID}`,
        name: item.CustomerName || '',
        city: item.CustomerCity || '',
        mobile: item.CustomerMobile ? item.CustomerMobile.toString() : '',
        aadhaar: item.CustomerAadhaar || '',
      }));

      setCustomers(formattedData);
    } catch (error) {
      console.error(error);
      showSnackbar('Failed to load customers from database.', 'error');
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // --- Modal Handlers ---
  const openAddModal = () => {
    setName('');
    setCity('');
    setMobile('');
    setAadhaar('');
    setModalMode('add');
  };

  const openEditModal = (customer: Customer) => {
    setTargetCustomerId(parseId(customer.id));
    setName(customer.name);
    setCity(customer.city);
    setMobile(customer.mobile.replace(/\D/g, '').slice(-10));
    setAadhaar(customer.aadhaar);
    setModalMode('edit');
  };

  const closeFormModal = () => {
    setModalMode(null);
    setTargetCustomerId(null);
  };

  const openDeleteModal = (id: string) => {
    setTargetCustomerId(parseId(id));
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTargetCustomerId(null);
  };

  // --- API: CREATE & UPDATE ---
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !city.trim() || mobile.length < 10 || aadhaar.length < 12) {
      showSnackbar('Please fill in all fields correctly.', 'warning');
      return;
    }

    setIsSubmitting(true);

    try {
      if (modalMode === 'add') {
        // Find the next available ID for the backend insertion
        const nextId = Math.max(
          ...customers.map((c) => parseId(c.id)).filter((v) => Number.isFinite(v)),
          7820
        ) + 1;

        const response = await fetch(`${API_BASE_URL}/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: nextId,
            name: name.trim(),
            mobile: Number(mobile), 
            aadhar: aadhaar,
            city: city.trim(),
          }),
        });

        if (!response.ok) throw new Error('Failed to create record in database');
        
        showSnackbar('Customer added successfully', 'success');

      } else if (modalMode === 'edit' && targetCustomerId) {
        
        const response = await fetch(`${API_BASE_URL}/update/${targetCustomerId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          // Note: Based on your backend code, only CustomerName is updated in the SQL query,
          // but we pass all fields so it's ready if you expand your backend query later.
          body: JSON.stringify({
            name: name.trim(),
            city: city.trim(),
            mobile: Number(mobile),
            aadhar: aadhaar,
          }),
        });

        if (!response.ok) throw new Error('Failed to update record in database');

        showSnackbar('Customer updated successfully', 'success');
      }

      closeFormModal();
      // Refetch from database to ensure UI is completely synchronized
      await fetchCustomers();

    } catch (error) {
      console.error(error);
      showSnackbar(`Unable to process request.`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- API: DELETE ---
  const handleDeleteConfirm = async () => {
    if (!targetCustomerId) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/delete/${targetCustomerId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete record from database');

      showSnackbar('Customer deleted successfully', 'success');
      closeDeleteModal();
      // Refetch to sync UI with database state
      await fetchCustomers();
      
    } catch (error) {
      console.error(error);
      showSnackbar('Unable to delete customer.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        :root {
          var(--space-xs): clamp(4px, 0.5vw, 8px);
          --space-sm: clamp(8px, 1vw, 12px);
          --space-md: clamp(12px, 2vw, 16px);
          --space-lg: clamp(16px, 3vw, 24px);
          --space-xl: clamp(24px, 4vw, 32px);
          --panel-pad-x: clamp(16px, 4vw, 24px);
          --panel-pad-y: clamp(20px, 4vw, 24px);
        }

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

        /* --- App Container --- */
        .app-container {
          display: flex;
          min-height: 100vh;
          padding: var(--space-lg);
          gap: var(--space-lg);
          align-items: flex-start;
          max-width: 1600px;
          margin: 0 auto;
        }

        /* --- Sidebar --- */
        .sidebar {
          flex: 0 0 clamp(220px, 20vw, 280px);
        }

        /* --- Main Content --- */
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          width: 100%;
        }

        /* --- Page Container --- */
        .page-container {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
        }

        /* --- Page Header --- */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-md);
        }

        .page-title {
          font-size: clamp(24px, 4vw, 32px);
          font-weight: 700;
          color: var(--text-main, #0f172a);
          margin: 0;
          letter-spacing: -0.04em;
        }

        /* --- Buttons --- */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-sm);
          padding: clamp(10px, 1.5vw, 12px) clamp(16px, 2vw, 24px);
          border-radius: 12px;
          font-size: clamp(13px, 2vw, 14px);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          border: none;
        }

        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-primary {
          background: var(--text-main, #0f172a);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
        }

        .btn-primary:hover:not(:disabled) {
          background: #1e293b;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(15, 23, 42, 0.2);
        }

        .btn-danger {
          background: #ef4444;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
        }

        .btn-danger:hover:not(:disabled) {
          background: #dc2626;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(239, 68, 68, 0.3);
        }

        .btn-secondary {
          background: #ffffff;
          color: #475569;
          border: 1px solid #cbd5e1;
        }

        .btn-secondary:hover:not(:disabled) {
          background: #f1f5f9;
          color: #0f172a;
        }

        /* --- Table Panel --- */
        .panel {
          background: var(--surface-main, #ffffff);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: clamp(16px, 2vw, 24px);
          box-shadow: 0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.02);
          padding: var(--panel-pad-y) var(--panel-pad-x);
          overflow: hidden;
        }

        .table-wrapper {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          margin: calc(-1 * var(--panel-pad-y)) calc(-1 * var(--panel-pad-x));
        }

        .customers-table {
          width: 100%;
          min-width: 900px;
          border-collapse: separate;
          border-spacing: 0;
          text-align: left;
        }

        .customers-table th {
          padding: clamp(12px, 2vw, 16px) var(--panel-pad-x);
          font-size: clamp(11px, 1.5vw, 12px);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-soft, #64748b);
          border-bottom: 1px solid var(--border-color, #e2e8f0);
          background: var(--bg-main, #f8fafc);
        }

        .customers-table td {
          padding: clamp(16px, 2.5vw, 20px) var(--panel-pad-x);
          font-size: clamp(13px, 2vw, 14px);
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
          font-size: clamp(12px, 1.5vw, 13px);
        }

        .cell-name {
          font-weight: 600;
          color: var(--text-main, #0f172a);
        }

        .empty-state {
          text-align: center;
          padding: 48px;
          color: #64748b;
          font-size: 14px;
        }

        /* --- Action Pills --- */
        .actions-cell {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }

        .btn-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 100px;
          font-size: clamp(12px, 1.5vw, 13px);
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

        /* --- Modals --- */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: var(--space-md);
          animation: fadeIn 0.2s ease-out forwards;
        }

        .modal-container {
          background: var(--surface-main, #1e293b);
          color: var(--text-main, #ffffff);
          width: 100%;
          border-radius: clamp(16px, 3vw, 24px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          max-height: 90vh;
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .modal-form { max-width: 520px; }
        .modal-alert { max-width: 400px; }

        .modal-header {
          padding: var(--space-lg) var(--space-xl) var(--space-md);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f1f5f9;
        }

        .modal-title {
          margin: 0;
          font-size: clamp(18px, 3vw, 20px);
          font-weight: 700;
          color: var(--text-main, #0f172a);
          letter-spacing: -0.02em;
        }

        .btn-close {
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 6px;
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
          padding: var(--space-lg) var(--space-xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          overflow-y: auto;
        }

        .alert-text {
          margin: 0;
          color: #475569;
          font-size: 15px;
          line-height: 1.5;
        }

        .form-row {
          display: flex;
          gap: var(--space-md);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
          flex: 1;
        }

        .form-label {
          font-size: clamp(12px, 1.5vw, 13px);
          font-weight: 600;
          color: var(--text-main, #ffffff);
        }

        .form-input {
          padding: clamp(10px, 1.5vw, 12px) clamp(14px, 2vw, 16px);
          border: 1px solid #475569;
          border-radius: 12px;
          font-size: clamp(14px, 2vw, 15px);
          color: var(--text-main, #ffffff);
          outline: none;
          transition: all 0.2s ease;
          background: #1e1e1e;
          width: 100%;
        }

        .form-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5);
        }

        .form-input:disabled {
          background: #f8fafc;
          color: #94a3b8;
          cursor: not-allowed;
        }

        .modal-footer {
          padding: var(--space-lg) var(--space-xl) var(--space-xl);
          display: flex;
          justify-content: flex-end;
          gap: var(--space-md);
          background: #1e1e1e;
          border-top: 1px solid #151515;
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

        /* --- Global Responsiveness --- */
        @media (max-width: 1024px) {
          .app-container {
            flex-direction: column;
            padding-top: 80px;
          }
        }

        @media (max-width: 640px) {
          .page-header {
            flex-direction: column;
            align-items: stretch;
          }
          
          .btn-primary.page-header-btn {
            width: 100%;
            justify-content: center;
            margin-top: 8px;
          }

          .form-row {
            flex-direction: column;
            gap: var(--space-lg);
          }
          
          .modal-footer {
            flex-direction: column-reverse;
          }
          
          .btn { width: 100%; }
        }
      `}</style>

      <div className="app-container">
        <DashboardSidebar />

        <main className="main-content">
          <div className="page-container">
            <header className="page-header">
              <h1 className="page-title">Customers</h1>

              <button className="btn btn-primary page-header-btn" onClick={openAddModal}>
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
                    {isLoadingData ? (
                      <tr>
                        <td colSpan={6} className="empty-state">Loading records from database...</td>
                      </tr>
                    ) : customers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="empty-state">No customers found. Add a customer to get started.</td>
                      </tr>
                    ) : (
                      customers.map((customer, index) => (
                        <tr key={index}>
                          <td className="cell-id">{customer.id}</td>
                          <td className="cell-name">{customer.name}</td>
                          <td>{customer.city}</td>
                          <td>{customer.mobile}</td>
                          <td className="cell-aadhaar">{customer.aadhaar}</td>
                          <td>
                            <div className="actions-cell">
                              <button
                                className="btn-action"
                                onClick={() => openEditModal(customer)}
                              >
                                <EditIcon width={14} height={14} />
                                Edit
                              </button>
                              <button
                                className="btn-action btn-delete"
                                onClick={() => openDeleteModal(customer.id)}
                              >
                                <DeleteIcon width={14} height={14} />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* --- FORM MODAL (ADD/EDIT) --- */}
      {modalMode !== null && (
        <div className="modal-overlay" onClick={closeFormModal}>
          <div className="modal-container modal-form" onClick={(e) => e.stopPropagation()}>

            <div className="modal-header">
              <h2 className="modal-title">
                {modalMode === 'add' ? 'Add New Customer' : 'Edit Customer'}
              </h2>
              <button className="btn-close" onClick={closeFormModal} aria-label="Close modal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className="modal-body">
                {modalMode === 'edit' && (
                  <div className="form-group">
                    <label className="form-label">Customer ID</label>
                    <input type="text" className="form-input" value={`#CUST-${targetCustomerId}`} disabled />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Jane Cooper"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                      onChange={(e) => setCity(e.target.value)}
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
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
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
                    onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
                    maxLength={12}
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeFormModal}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : (modalMode === 'add' ? 'Save Customer' : 'Update Customer')}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {isDeleteModalOpen && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <div className="modal-container modal-alert" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Delete Customer</h2>
              <button className="btn-close" onClick={closeDeleteModal} aria-label="Close modal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <p className="alert-text">
                Are you sure you want to delete customer <strong>#CUST-{targetCustomerId}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeDeleteModal} disabled={isSubmitting}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm} disabled={isSubmitting}>
                {isSubmitting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- SNACKBAR SYSTEM --- */}
      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}
    </>
  );
};

export default CustomersList;