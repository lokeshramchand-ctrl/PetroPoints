import React, { useState, useEffect } from 'react';
import DashboardSidebar from './Sidebar';
import Snackbar, { type SnackbarType } from '../theme/Snackbar';

type Customer = {
  id: string;
  name: string;
  city: string;
  mobile: string;
  aadhaar: string;
  points: number;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://petropoints-backend.deploy.splsystems.in/api';

export default function CustomersList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{ message: string; type: SnackbarType } | null>(null);

  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [targetCustomerId, setTargetCustomerId] = useState<number | null>(null);

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [mobile, setMobile] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [search, setSearch] = useState('');

  const showSnackbar = (message: string, type: SnackbarType) => setSnackbar({ message, type });
  const parseId = (formattedId: string): number => parseInt(formattedId.replace(/\D/g, ''), 10);

  const fetchCustomers = async () => {
    setIsLoadingData(true);
    try {
      const response = await fetch(`${API_BASE_URL}/read`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();

      const formattedData: Customer[] = data.map((item: any) => ({
        id: `#CUST-${item.CustomerID}`,
        name: item.CustomerName || '',
        city: item.CustomerCity || '',
        mobile: item.CustomerMobile?.toString().padStart(10, '0') || '',
        aadhaar: item.CustomerAadhaar || '',
        points: Number(item.CustomerPoints || 0),
      }));
      setCustomers(formattedData);
    } catch (error) {
      showSnackbar('Failed to load customers.', 'error');
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => { fetchCustomers(); }, []);

  const openAddModal = () => {
    setName(''); setCity(''); setMobile(''); setAadhaar(''); setModalMode('add');
  };

  const closeFormModal = () => { setModalMode(null); setTargetCustomerId(null); };
  const closeDeleteModal = () => { setIsDeleteModalOpen(false); setTargetCustomerId(null); };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) return showSnackbar('Name is required', 'warning');
    if (!city.trim()) return showSnackbar('City is required', 'warning');
    if (!isValidMobile(mobile)) return showSnackbar('Enter valid 10-digit mobile number', 'warning');
    if (!isValidAadhaar(aadhaar)) return showSnackbar('Enter valid 12-digit Aadhaar', 'warning');

    if (customers.some((c) => c.mobile === mobile) && modalMode === 'add') {
      return showSnackbar('Mobile number already exists', 'warning');
    }

    setIsSubmitting(true);
    try {
      if (modalMode === 'add') {
        const nextId = Math.max(...customers.map((c) => parseId(c.id)).filter((v) => Number.isFinite(v)), 7820) + 1;
        const response = await fetch(`${API_BASE_URL}/create`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: nextId, name: name.trim(), mobile, aadhar: aadhaar, city: city.trim() }),
        });
        if (!response.ok) throw new Error('Failed');
        setCustomers((prev) => [...prev, { id: `#CUST-${nextId}`, name: name.trim(), city: city.trim(), mobile, aadhaar, points: 0 }]);
        showSnackbar('Customer added', 'success');
      } else if (modalMode === 'edit' && targetCustomerId) {
        const response = await fetch(`${API_BASE_URL}/update/${targetCustomerId}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name.trim(), city: city.trim(), mobile, aadhar: aadhaar }),
        });
        if (!response.ok) throw new Error('Failed');
        setCustomers((prev) => prev.map((c) => (c.id === `#CUST-${targetCustomerId}` ? { ...c, name: name.trim(), city: city.trim(), mobile, aadhaar } : c)));
        showSnackbar('Customer updated', 'success');
      }
      closeFormModal();
    } catch (error) {
      showSnackbar('Request failed.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!targetCustomerId) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${targetCustomerId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed');
      showSnackbar('Customer deleted', 'success');
      closeDeleteModal();
      await fetchCustomers();
    } catch (error) {
      showSnackbar('Delete failed.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidMobile = (mobile: string) => /^[6-9]\d{9}$/.test(mobile);
  const isValidAadhaar = (aadhaar: string) => /^\d{12}$/.test(aadhaar);
  const maskAadhaar = (aadhaar: string) => aadhaar.replace(/\d(?=\d{4})/g, '•').replace(/•/g, '• ');

  const filteredCustomers = customers.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.mobile.includes(search)
  );

  const sortedCustomers = [...filteredCustomers].sort((a, b) => b.points - a.points);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        :root {
          /* Modern SaaS Palette */
          --bg-body: #F8FAFC;
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
          --danger-hover: #DC2626;
          --danger-bg: #FEF2F2;
          --success-text: #166534;
          --success-bg: #DCFCE7;
          
          --radius-sm: 6px;
          --radius-md: 12px;
          --radius-lg: 16px;
          --radius-full: 9999px;
          
          --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
          --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05);
          --shadow-focus: 0 0 0 3px rgba(79, 70, 229, 0.2);
        }

        * {
          box-sizing: border-box;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        body, html {
          margin: 0; padding: 0;
          background-color: var(--bg-body);
          color: var(--text-main);
          -webkit-font-smoothing: antialiased;
        }

        .app-container {
          display: flex;
          min-height: 100vh;
          max-width: 1600px;
          margin: 0 auto;
        }

        .main-view {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 40px 48px;
          min-width: 0;
        }

        /* --- SaaS Header --- */
        .header-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .header-titles h1 {
          font-size: 28px;
          font-weight: 600;
          letter-spacing: -0.02em;
          margin: 0 0 4px 0;
          color: var(--text-main);
        }

        .header-titles p {
          font-size: 14px;
          color: var(--text-muted);
          margin: 0;
        }

        .header-controls {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        /* Search Input */
        .search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .search-icon {
          position: absolute;
          left: 14px;
          color: var(--text-faint);
          width: 18px;
          height: 18px;
        }

        .search-input {
          background: var(--surface);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-md);
          padding: 10px 16px 10px 40px;
          width: 300px;
          font-size: 14px;
          color: var(--text-main);
          transition: all 0.2s ease;
          box-shadow: var(--shadow-sm);
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: var(--shadow-focus);
        }

        .search-input::placeholder { color: var(--text-faint); }

        /* Primary Button */
        .btn-primary {
          background: var(--primary);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: var(--radius-md);
          font-size: 14px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: var(--shadow-sm);
        }

        .btn-primary:hover:not(:disabled) {
          background: var(--primary-hover);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        /* --- Premium Data Table --- */
        .data-panel {
          background: var(--surface);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          overflow: hidden;
        }

        .table-container {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          white-space: nowrap;
        }

        .data-table th {
          padding: 16px 24px;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--border-strong);
          background: #F8FAFC;
        }

        .data-table td {
          padding: 16px 24px;
          font-size: 14px;
          color: var(--text-main);
          border-bottom: 1px solid var(--border-light);
          vertical-align: middle;
        }

        .data-table tr:last-child td { border-bottom: none; }
        
        .data-table tbody tr { transition: background 0.15s ease; }
        .data-table tbody tr:hover { background: var(--bg-body); }

        /* Typography & Badges */
        .cell-id { font-family: 'SFMono-Regular', Consolas, monospace; font-size: 13px; color: var(--text-muted); background: var(--border-light); padding: 4px 8px; border-radius: var(--radius-sm); }
        .cell-name { font-weight: 500; color: var(--text-main); }
        .cell-sub { color: var(--text-muted); font-size: 13px; }

        .points-badge {
          display: inline-flex;
          align-items: center;
          background: var(--border-light);
          color: var(--text-main);
          font-weight: 600;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 13px;
        }

        .top-badge {
          background: var(--success-bg);
          color: var(--success-text);
          font-size: 12px;
          font-weight: 500;
          padding: 2px 8px;
          border-radius: var(--radius-full);
          margin-left: 8px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        /* Action Buttons in Table */
        .actions-cell {
          text-align: right;
        }

        .action-links {
          display: inline-flex;
          gap: 8px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .data-table tr:hover .action-links { opacity: 1; }

        .icon-btn {
          background: transparent;
          border: none;
          padding: 8px;
          border-radius: var(--radius-sm);
          color: var(--text-faint);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        
        .icon-btn:hover { background: var(--border-light); color: var(--text-main); }
        .icon-btn.edit:hover { color: var(--primary); background: var(--primary-light); }
        .icon-btn.delete:hover { color: var(--danger); background: var(--danger-bg); }

        /* --- Glassmorphism Modals --- */
        .overlay {
          position: fixed; inset: 0;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease;
        }

        .modal-sheet {
          background: var(--surface);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 500px;
          box-shadow: var(--shadow-lg);
          padding: 32px;
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sheet-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 24px;
        }

        .sheet-header h2 { margin: 0; font-size: 20px; font-weight: 600; color: var(--text-main); }
        
        .close-btn {
          background: var(--border-light); border: none; color: var(--text-muted);
          cursor: pointer; padding: 6px; border-radius: var(--radius-full); transition: 0.2s;
          display: flex; align-items: center; justify-content: center;
        }
        .close-btn:hover { background: var(--border-strong); color: var(--text-main); }

        .form-flow { display: flex; flex-direction: column; gap: 20px; }
        .form-row { display: flex; gap: 16px; }
        .form-block { flex: 1; display: flex; flex-direction: column; gap: 6px; }

        .form-block label { font-size: 13px; color: var(--text-muted); font-weight: 500; }
        
        .saas-input {
          padding: 10px 14px;
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-md);
          font-size: 14px;
          background: var(--surface);
          color: var(--text-main);
          transition: all 0.2s;
          box-shadow: var(--shadow-sm);
        }
        
        .saas-input:focus { outline: none; border-color: var(--primary); box-shadow: var(--shadow-focus); }
        .saas-input::placeholder { color: var(--text-faint); }
        .saas-input:disabled { background: var(--border-light); color: var(--text-muted); cursor: not-allowed; }

        .sheet-actions {
          display: flex; justify-content: flex-end; gap: 12px;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--border-light);
        }

        .btn-ghost {
          background: transparent; border: 1px solid var(--border-strong); color: var(--text-main);
          font-size: 14px; font-weight: 500; padding: 10px 20px; border-radius: var(--radius-md); cursor: pointer;
          transition: 0.2s; box-shadow: var(--shadow-sm);
        }
        .btn-ghost:hover { background: var(--border-light); }
        
        .btn-danger {
          background: var(--danger); color: white; border: none;
          font-size: 14px; font-weight: 500; padding: 10px 20px; border-radius: var(--radius-md); cursor: pointer;
          transition: 0.2s; box-shadow: var(--shadow-sm);
        }
        .btn-danger:hover { background: var(--danger-hover); box-shadow: var(--shadow-md); }

        /* Skeletons & Empty State */
        .skel-row { height: 20px; border-radius: 4px; background: linear-gradient(90deg, #F1F5F9 25%, #F8FAFC 50%, #F1F5F9 75%); background-size: 200% 100%; animation: pulse 1.5s infinite; }
        
        .empty-view { padding: 80px 0; text-align: center; color: var(--text-muted); }
        .empty-icon { width: 48px; height: 48px; color: var(--border-strong); margin-bottom: 16px; }
        .empty-view p { font-size: 15px; margin: 0; }

        /* Animations */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes pulse { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        /* Responsive */
        @media (max-width: 1024px) { 
          .header-section { flex-direction: column; align-items: flex-start; gap: 20px; } 
          .search-wrapper, .search-input { width: 100%; } 
          .header-controls { width: 100%; flex-direction: column; align-items: stretch; }
          .btn-primary { justify-content: center; }
        }
        @media (max-width: 768px) { 
          .main-view { padding: 24px; } 
          .form-row { flex-direction: column; gap: 20px; } 
          .data-table tr:hover .action-links { opacity: 1; } 
          .action-links { opacity: 1; }
        }
      `}</style>

      <div className="app-container">
        <DashboardSidebar />

        <main className="main-view">
          <header className="header-section">
            <div className="header-titles">
              <h1>Customers</h1>
              <p>Manage your client directory and records</p>
            </div>

            <div className="header-controls">
              <div className="search-wrapper">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input className="search-input" placeholder="Search by name or mobile..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <button className="btn-primary" onClick={openAddModal}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add Customer
              </button>
            </div>
          </header>

          <div className="data-panel">
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Customer ID</th>
                    <th>Full Name</th>
                    <th>City</th>
                    <th>Mobile</th>
                    <th>Aadhaar</th>
                    <th>Points</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingData ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i}>
                        <td colSpan={7}><div className="skel-row" /></td>
                      </tr>
                    ))
                  ) : filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={7}>
                        <div className="empty-view">
                          <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                          <p>No customer records found.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    sortedCustomers.map((customer) => (
                      <tr key={customer.id}>
                        <td><span className="cell-id">{customer.id}</span></td>
                        <td className="cell-name">{customer.name}</td>
                        <td className="cell-sub">{customer.city}</td>
                        <td className="cell-sub">{customer.mobile}</td>
                        <td className="cell-sub">{maskAadhaar(customer.aadhaar)}</td>
                        <td>
                          <span className="points-badge">{customer.points}</span>
                          {customer.points > 100 && (
                            <span className="top-badge">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                              Top
                            </span>
                          )}
                        </td>
                        <td className="actions-cell">
                          <div className="action-links">
                            <button 
                              className="icon-btn edit" 
                              title="Edit Customer"
                              onClick={() => {
                                setTargetCustomerId(parseId(customer.id));
                                setName(customer.name);
                                setCity(customer.city);
                                setMobile(customer.mobile);
                                setAadhaar(customer.aadhaar);
                                setModalMode('edit');
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            </button>
                            <button 
                              className="icon-btn delete" 
                              title="Delete Customer"
                              onClick={() => {
                                setTargetCustomerId(parseId(customer.id));
                                setIsDeleteModalOpen(true);
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* --- ADD/EDIT MODAL --- */}
      {modalMode !== null && (
        <div className="overlay" onClick={closeFormModal}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-header">
              <h2>{modalMode === 'add' ? 'Add New Customer' : 'Edit Customer Details'}</h2>
              <button className="close-btn" onClick={closeFormModal}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="form-flow">
              {modalMode === 'edit' && (
                <div className="form-block">
                  <label>System Identifier</label>
                  <input className="saas-input" value={`#CUST-${targetCustomerId}`} disabled />
                </div>
              )}

              <div className="form-block">
                <label>Full Legal Name</label>
                <input className="saas-input" placeholder="e.g. Jane Doe" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="form-row">
                <div className="form-block">
                  <label>City / Location</label>
                  <input className="saas-input" placeholder="e.g. Hyderabad" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>
                <div className="form-block">
                  <label>Mobile Number</label>
                  <input className="saas-input" placeholder="10-digit number" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))} maxLength={10} required />
                </div>
              </div>

              <div className="form-block">
                <label>Aadhaar Identity</label>
                <input className="saas-input" placeholder="12-digit number" value={aadhaar} onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))} maxLength={12} required />
              </div>

              <div className="sheet-actions">
                <button type="button" className="btn-ghost" onClick={closeFormModal}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {isDeleteModalOpen && (
        <div className="overlay" onClick={closeDeleteModal}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-header" style={{ marginBottom: 16 }}>
              <h2>Delete Customer</h2>
              <button className="close-btn" onClick={closeDeleteModal}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              Are you sure you want to permanently delete customer <strong>#CUST-{targetCustomerId}</strong>? All associated data will be removed. This action cannot be undone.
            </p>
            <div className="sheet-actions">
              <button type="button" className="btn-ghost" onClick={closeDeleteModal}>Cancel</button>
              <button type="button" className="btn-danger" onClick={handleDeleteConfirm} disabled={isSubmitting}>
                {isSubmitting ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}

      {snackbar && <Snackbar message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar(null)} />}
    </>
  );
}