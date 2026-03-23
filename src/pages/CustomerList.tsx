import React, { useState, useEffect } from 'react';
import DashboardSidebar from './Sidebar';
import Snackbar, { type SnackbarType } from '../theme/Snackbar';

type Customer = {
  id: string;
  name: string;
  city: string;
  mobile: string;
  aadhaar: string;
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
        mobile: item.CustomerMobile ? item.CustomerMobile.toString() : '',
        aadhaar: item.CustomerAadhaar || '',
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

  const openEditModal = (customer: Customer) => {
    setTargetCustomerId(parseId(customer.id));
    setName(customer.name); setCity(customer.city); setMobile(customer.mobile.replace(/\D/g, '').slice(-10)); setAadhaar(customer.aadhaar);
    setModalMode('edit');
  };

  const closeFormModal = () => { setModalMode(null); setTargetCustomerId(null); };
  const openDeleteModal = (id: string) => { setTargetCustomerId(parseId(id)); setIsDeleteModalOpen(true); };
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
        setCustomers((prev) => [...prev, { id: `#CUST-${nextId}`, name: name.trim(), city: city.trim(), mobile, aadhaar }]);
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');

        :root {
          /* Ultra-Minimalist Palette */
          --bg-body: #FAFAFA;
          --surface: #FFFFFF;
          --text-main: #09090B;
          --text-soft: #71717A;
          --text-faint: #A1A1AA;
          --border-light: #F4F4F5;
          --border-strong: #E4E4E7;
          --accent-black: #09090B;
          --accent-hover: #27272A;
          --danger: #E11D48;
          --radius-sm: 8px;
          --radius-md: 12px;
          --radius-full: 99px;
        }

        * {
          box-sizing: border-box;
          font-family: 'Outfit', -apple-system, sans-serif;
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
          padding: clamp(12px, 2vw, 24px);
          gap: clamp(12px, 2vw, 24px);
          align-items: flex-start;
          max-width: 1600px;
          margin: 0 auto;
        }

        .main-view {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 48px;
          min-width: 0;
        }

        /* --- Minimalist Header --- */
        .header-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
        }

        .header-titles h1 {
          font-size: 32px;
          font-weight: 500;
          letter-spacing: -0.04em;
          margin: 0 0 8px 0;
          color: var(--text-main);
        }

        .header-titles p {
          font-size: 15px;
          color: var(--text-soft);
          margin: 0;
          font-weight: 300;
        }

        .header-controls {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        /* Borderless Search Pill */
        .search-pill {
          display: flex;
          align-items: center;
          background: var(--surface);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-full);
          padding: 8px 16px;
          width: 280px;
          transition: all 0.3s ease;
        }

        .search-pill:focus-within {
          border-color: var(--text-main);
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }

        .search-pill input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 14px;
          width: 100%;
          margin-left: 10px;
          color: var(--text-main);
        }

        .search-pill input::placeholder { color: var(--text-faint); }

        /* Sleek Buttons */
        .btn-sleek {
          background: var(--accent-black);
          color: var(--surface);
          border: none;
          padding: 12px 24px;
          border-radius: var(--radius-full);
          font-size: 14px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-sleek:hover:not(:disabled) {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }

        /* --- Flat Data Table --- */
        .data-panel {
          background: var(--surface);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .data-table th {
          padding: 20px 24px;
          font-size: 12px;
          font-weight: 500;
          color: var(--text-soft);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border-bottom: 1px solid var(--border-light);
          background: #FCFCFC;
        }

        .data-table td {
          padding: 24px;
          font-size: 14px;
          color: var(--text-main);
          border-bottom: 1px solid var(--border-light);
          vertical-align: middle;
        }

        .data-table tr:last-child td { border-bottom: none; }
        
        .data-table tbody tr {
          transition: background 0.2s ease;
        }
        
        .data-table tbody tr:hover {
          background: #FAFAFA;
        }

        /* Typography Treatments in Table */
        .cell-id { font-family: 'SFMono-Regular', monospace; font-size: 13px; color: var(--text-soft); }
        .cell-name { font-weight: 500; font-size: 15px; }
        .cell-secondary { color: var(--text-soft); }

        .action-links {
          display: flex;
          gap: 16px;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .data-table tr:hover .action-links { opacity: 1; }

        .link-btn {
          background: none; border: none; padding: 0;
          color: var(--text-soft); cursor: pointer;
          display: flex; align-items: center;
          transition: 0.2s;
        }
        .link-btn:hover { color: var(--text-main); }
        .link-btn.danger:hover { color: var(--danger); }

        /* --- Minimalist Modals --- */
        .overlay {
          position: fixed; inset: 0;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000;
          animation: fade 0.3s ease;
        }

        .modal-sheet {
          background: var(--surface);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-md);
          width: 100%;
          max-width: 480px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.06);
          padding: 32px;
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sheet-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 32px;
        }

        .sheet-header h2 { margin: 0; font-size: 20px; font-weight: 500; }
        
        .close-btn {
          background: none; border: none; color: var(--text-faint);
          cursor: pointer; padding: 4px; transition: 0.2s;
        }
        .close-btn:hover { color: var(--text-main); }

        .form-flow { display: flex; flex-direction: column; gap: 24px; }
        .form-row { display: flex; gap: 16px; }
        .form-block { flex: 1; display: flex; flex-direction: column; gap: 8px; }

        .form-block label { font-size: 13px; color: var(--text-soft); font-weight: 400; }
        
        .sleek-input {
          padding: 14px 0;
          border: none;
          border-bottom: 1px solid var(--border-strong);
          font-size: 15px;
          background: transparent;
          color: var(--text-main);
          transition: border-color 0.2s;
        }
        
        .sleek-input:focus { outline: none; border-bottom-color: var(--text-main); }
        .sleek-input::placeholder { color: var(--text-faint); font-weight: 300; }
        .sleek-input:disabled { color: var(--text-faint); border-bottom-style: dashed; }

        .sheet-actions {
          display: flex; justify-content: flex-end; gap: 12px;
          margin-top: 40px;
        }

        .btn-text {
          background: none; border: none; color: var(--text-soft);
          font-size: 14px; font-weight: 500; padding: 10px 16px; cursor: pointer;
        }
        .btn-text:hover { color: var(--text-main); }

        /* Skeletons & Empty State */
        .skel-row { height: 72px; border-bottom: 1px solid var(--border-light); background: linear-gradient(90deg, #F4F4F5 25%, #FAFAFA 50%, #F4F4F5 75%); background-size: 200% 100%; animation: pulse 1.5s infinite; }
        
        .empty-view { padding: 80px 0; text-align: center; color: var(--text-soft); }
        .empty-view svg { stroke-width: 1; color: var(--text-faint); margin-bottom: 16px; }

        /* Animations */
        @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        /* Responsive */
        @media (max-width: 1024px) { .header-section { flex-direction: column; align-items: flex-start; gap: 24px; } .search-pill { width: 100%; } }
        @media (max-width: 768px) { .app-layout { flex-direction: column; } .main-view { padding: 24px; } .form-row { flex-direction: column; gap: 24px; } .data-table tr:hover .action-links { opacity: 1; } }
      `}</style>

      <div className="app-container">
        <DashboardSidebar />

        <main className="main-view">
          <header className="header-section">
            <div className="header-titles">
              <h1>Customers</h1>
              <p>Manage directory and client records</p>
            </div>

            <div className="header-controls">
              <div className="search-pill">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input placeholder="Search records..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <button className="btn-sleek" onClick={openAddModal}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                New Client
              </button>
            </div>
          </header>

          <div className="data-panel">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Full Name</th>
                  <th>Location</th>
                  <th>Mobile</th>
                  <th>Aadhaar</th>
                  <th style={{ width: '100px' }}></th>
                </tr>
              </thead>
              <tbody>
                {isLoadingData ? (
                  Array.from({ length: 5 }).map((_, i) => <tr key={i}><td colSpan={6} style={{ padding: 0 }}><div className="skel-row" /></td></tr>)
                ) : filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <div className="empty-view">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        <p>No customer records found.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="cell-id">{customer.id}</td>
                      <td className="cell-name">{customer.name}</td>
                      <td className="cell-secondary">{customer.city}</td>
                      <td className="cell-secondary">+91 {customer.mobile}</td>
                      <td className="cell-secondary">{maskAadhaar(customer.aadhaar)}</td>
                      <td>
                        <div className="action-links">
                          <button className="link-btn" onClick={() => openEditModal(customer)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                          </button>
                          <button className="link-btn danger" onClick={() => openDeleteModal(customer.id)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* --- ADD/EDIT SHEET --- */}
      {modalMode !== null && (
        <div className="overlay" onClick={closeFormModal}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-header">
              <h2>{modalMode === 'add' ? 'New Customer' : 'Edit Customer'}</h2>
              <button className="close-btn" onClick={closeFormModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="form-flow">
              {modalMode === 'edit' && (
                <div className="form-block">
                  <label>System Identifier</label>
                  <input className="sleek-input" value={`#CUST-${targetCustomerId}`} disabled />
                </div>
              )}

              <div className="form-block">
                <label>Full Legal Name</label>
                <input className="sleek-input" placeholder="e.g. Jane Doe" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="form-row">
                <div className="form-block">
                  <label>City / Location</label>
                  <input className="sleek-input" placeholder="e.g. Hyderabad" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>
                <div className="form-block">
                  <label>Mobile Number</label>
                  <input className="sleek-input" placeholder="10 digits" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))} maxLength={10} required />
                </div>
              </div>

              <div className="form-block">
                <label>Aadhaar Identity</label>
                <input className="sleek-input" placeholder="12 digits" value={aadhaar} onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))} maxLength={12} required />
              </div>

              <div className="sheet-actions">
                <button type="button" className="btn-text" onClick={closeFormModal}>Cancel</button>
                <button type="submit" className="btn-sleek" disabled={isSubmitting}>
                  {isSubmitting ? 'Processing...' : 'Save Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DELETE SHEET --- */}
      {isDeleteModalOpen && (
        <div className="overlay" onClick={closeDeleteModal}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-header" style={{ marginBottom: 16 }}>
              <h2>Delete Record</h2>
            </div>
            <p style={{ color: 'var(--text-soft)', lineHeight: 1.5, margin: 0 }}>
              This will permanently remove <strong>#CUST-{targetCustomerId}</strong> from the database. This action cannot be undone.
            </p>
            <div className="sheet-actions">
              <button type="button" className="btn-text" onClick={closeDeleteModal}>Cancel</button>
              <button type="button" className="btn-sleek" style={{ background: 'var(--danger)' }} onClick={handleDeleteConfirm} disabled={isSubmitting}>
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