import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const AdminLayout = () => {
    const [status, setStatus] = React.useState({ mongodb: 'Checking...', cloud: 'Checking...' });

    React.useEffect(() => {
        const checkStatus = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/system/status');
                setStatus(res.data);
            } catch (err) {
                // If checking status fails, assume offline/disconnected
                setStatus({ mongodb: 'Disconnected', cloud: 'Not Configured' });
            }
        };
        checkStatus();
        const interval = setInterval(checkStatus, 10000);
        return () => clearInterval(interval);
    }, []);

    const [toast, setToast] = React.useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <div className="admin-logo">
                    <h2>Admin Panel</h2>
                    <div className="admin-status-box">
                        <p className={`status-${status.mongodb.toLowerCase()}`}>DB: {status.mongodb}</p>
                        <p className={`status-${status.cloud.replace(' ', '').toLowerCase()}`}>Cloud: {status.cloud}</p>
                    </div>
                </div>
                <nav className="admin-nav">
                    <Link to="/admin/hero" className="admin-link">Manage Hero Slider</Link>
                    <Link to="/admin/extras" className="admin-link">Manage Extras</Link>
                    <Link to="/admin/menu" className="admin-link">Manage Menu Sections</Link>
                    <Link to="/admin/options" className="admin-link">Manage Options</Link>
                    <Link to="/admin/limited-offer" className="admin-link">Manage Limited Time Offer</Link>
                    <Link to="/admin/feedback" className="admin-link">Manage Happy Customers</Link>
                    <Link to="/admin/special-offers" className="admin-link">Manage Special Offers</Link>
                    <Link to="/" className="admin-link back-link">Back to Website</Link>
                </nav>
            </aside>
            <main className="admin-main">
                <Outlet context={{ showToast }} />
            </main>
            {toast && (
                <div className="admin-toast-container">
                    <div className={`admin-toast ${toast.type}`}>
                        <span>{toast.message}</span>
                        <button onClick={() => setToast(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>&times;</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLayout;
