import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';
import pandaLogo from '../assets/panda.jpeg';

// SVG Icons
const Icons = {
    dashboard: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
    hero:      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    extras:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/><path d="M12 8v4l3 3"/></svg>,
    menu:      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>,
    options:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>,
    offer:     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5" fill="currentColor"/></svg>,
    feedback:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    special:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    settings:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    logout:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    search:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
};

const pageTitles = {
    '/admin': 'Dashboard',
    '/admin/hero': 'Manage Hero Slider',
    '/admin/extras': 'Manage Extras',
    '/admin/beverages': 'Manage Beverages',
    '/admin/menu': 'Manage Menu Sections',
    '/admin/options': 'Manage Options',
    '/admin/limited-offer': 'Manage Limited Time Offer',
    '/admin/feedback': 'Manage Happy Customers',
    '/admin/special-offers': 'Manage Special Offers',
    '/admin/settings': 'Settings',
};

// Dashboard Component
const Dashboard = ({ showToast }) => {
    const [stats, setStats] = useState({ products: 0, extras: 0, feedback: 0, offers: 0 });
    const [recentProducts, setRecentProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [products, extras, feedback, offers] = await Promise.all([
                    axios.get('http://localhost:5000/api/products'),
                    axios.get('http://localhost:5000/api/extras'),
                    axios.get('http://localhost:5000/api/feedback'),
                    axios.get('http://localhost:5000/api/offers'),
                ]);
                setStats({
                    products: products.data.length,
                    extras: extras.data.length,
                    feedback: feedback.data.length,
                    offers: offers.data.length,
                });
                setRecentProducts(products.data.slice(0, 6));
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const now = new Date();
    const hour = now.getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

    const StatIcons = {
        menu: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>,
        extras: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
        review: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
        offer: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
    };
    const statCards = [
        { label: 'Menu Items', value: stats.products, icon: StatIcons.menu, color: 'yellow' },
        { label: 'Extras & Sides', value: stats.extras, icon: StatIcons.extras, color: 'blue' },
        { label: 'Customer Reviews', value: stats.feedback, icon: StatIcons.review, color: 'green' },
        { label: 'Active Offers', value: stats.offers, icon: StatIcons.offer, color: 'red' },
    ];

    const QIcons = {
        add: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
        hero: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
        star: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
        tag: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
        list: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
        gear: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    };
    const quickActions = [
        { label: 'Add Menu Item', icon: QIcons.add, path: '/admin/menu' },
        { label: 'Manage Hero', icon: QIcons.hero, path: '/admin/hero' },
        { label: 'View Feedback', icon: QIcons.star, path: '/admin/feedback' },
        { label: 'Add Offer', icon: QIcons.tag, path: '/admin/limited-offer' },
        { label: 'Manage Extras', icon: QIcons.list, path: '/admin/extras' },
        { label: 'Manage Beverages', icon: QIcons.list, path: '/admin/beverages' },
        { label: 'Manage Options', icon: QIcons.list, path: '/admin/options' },
        { label: 'Special Offers', icon: QIcons.tag, path: '/admin/special-offers' },
        { label: 'Settings', icon: QIcons.gear, path: '/admin/settings' },
    ];

    return (
        <div className="admin-dashboard">
            <div className="admin-dashboard-greeting">
                <h1>{greeting}, Admin</h1>
                <p>Here's what's happening at Panda's Kitchen today.</p>
            </div>

            <div className="admin-stat-grid">
                {statCards.map((s, i) => (
                    <div key={i} className="admin-stat-card">
                        <div className={`admin-stat-icon ${s.color}`}>{s.icon}</div>
                        <div>
                            <div className="admin-stat-num">{s.value}</div>
                            <div className="admin-stat-label">{s.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <div className="admin-section-header">
                    <span className="admin-section-title">Quick Actions</span>
                </div>
                <div className="admin-quick-grid">
                    {quickActions.map((q, i) => (
                        <div key={i} className="admin-quick-btn" onClick={() => navigate(q.path)}>
                            <div className="admin-quick-icon">{q.icon}</div>
                            <span className="admin-quick-label">{q.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {recentProducts.length > 0 && (
                <div>
                    <div className="admin-section-header">
                        <span className="admin-section-title">Recent Menu Items</span>
                        <span className="admin-section-link" onClick={() => navigate('/admin/menu')}>View All →</span>
                    </div>
                    <div className="admin-mini-grid">
                        {recentProducts.map(p => (
                            <div key={p._id} className="admin-mini-card">
                                <img src={p.imageUrl} alt={p.title} className="admin-mini-img" />
                                <div className="admin-mini-body">
                                    <div className="admin-mini-title">{p.title}</div>
                                    <div className="admin-mini-cat">{p.category}</div>
                                    <div className="admin-mini-price">LKR {Number(p.price).toLocaleString()}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const AdminLayout = () => {
    const [status, setStatus] = useState({ mongodb: 'Checking...', cloud: 'Checking...' });
    const [toast, setToast] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/system/status');
                setStatus(res.data);
            } catch {
                setStatus({ mongodb: 'Disconnected', cloud: 'Not Configured' });
            }
        };
        checkStatus();
        const interval = setInterval(checkStatus, 10000);
        return () => clearInterval(interval);
    }, []);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const dbDot = status.mongodb.toLowerCase();
    const cloudDot = status.cloud.replace(' ', '').toLowerCase();
    const pageTitle = pageTitles[location.pathname] || 'Admin Panel';

    const navLinks = [
        { to: '/admin', label: 'Dashboard', icon: Icons.dashboard, end: true },
        { to: '/admin/hero', label: 'Hero Slider', icon: Icons.hero },
        { to: '/admin/extras', label: 'Extras', icon: Icons.extras },
    { to: '/admin/beverages', label: 'Beverages', icon: Icons.extras },
        { to: '/admin/menu', label: 'Menu Sections', icon: Icons.menu },
        { to: '/admin/options', label: 'Options', icon: Icons.options },
        { to: '/admin/limited-offer', label: 'Limited Offer', icon: Icons.offer },
        { to: '/admin/feedback', label: 'Happy Customers', icon: Icons.feedback },
        { to: '/admin/special-offers', label: 'Special Offers', icon: Icons.special },
        { to: '/admin/settings', label: 'Settings', icon: Icons.settings },
    ];

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <div className="admin-sidebar-brand">
                        <img src={pandaLogo} alt="Logo" className="admin-sidebar-logo" />
                        <div className="admin-sidebar-brand-text">
                            <h3>Panda's Kitchen</h3>
                            <span>Admin Panel</span>
                        </div>
                    </div>
                    <div className="admin-status-box">
                        <div className="admin-status-row">
                            <div className={`status-dot ${dbDot}`} />
                            <span>Database: <span className={`status-${dbDot}`}>{status.mongodb}</span></span>
                        </div>
                        <div className="admin-status-row">
                            <div className={`status-dot ${cloudDot}`} />
                            <span>Cloud: <span className={`status-${cloudDot}`}>{status.cloud}</span></span>
                        </div>
                    </div>
                </div>

                <nav className="admin-nav">
                    <div className="admin-nav-section">Main</div>
                    {navLinks.slice(0, 1).map(link => (
                        <NavLink key={link.to} to={link.to} end={link.end}
                            className={({ isActive }) => `admin-link ${isActive ? 'active' : ''}`}>
                            <span className="admin-link-icon">{link.icon}</span>
                            {link.label}
                        </NavLink>
                    ))}
                    <div className="admin-nav-section">Content</div>
                    {navLinks.slice(1, 8).map(link => (
                        <NavLink key={link.to} to={link.to}
                            className={({ isActive }) => `admin-link ${isActive ? 'active' : ''}`}>
                            <span className="admin-link-icon">{link.icon}</span>
                            {link.label}
                        </NavLink>
                    ))}
                    <div className="admin-nav-section">System</div>
                    {navLinks.slice(8).map(link => (
                        <NavLink key={link.to} to={link.to}
                            className={({ isActive }) => `admin-link ${isActive ? 'active' : ''}`}>
                            <span className="admin-link-icon">{link.icon}</span>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <a href="/" className="admin-logout-btn">
                    {Icons.logout}
                    Back to Website
                </a>
                <div className="admin-logout-btn" style={{ marginTop: '4px', color: '#94A3B8', borderColor: 'rgba(148,163,184,0.2)', background: 'rgba(148,163,184,0.05)' }}
                    onClick={() => { if(window.confirm('Log out?')) navigate('/'); }}>
                    {Icons.logout}
                    Logout
                </div>
            </aside>

            {/* Main */}
            <div className="admin-main">
                {/* Topbar */}
                <header className="admin-topbar">
                    <div className="admin-topbar-left">
                        <span className="admin-topbar-title">{pageTitle}</span>
                    </div>
                    <div className="admin-search">
                        {Icons.search}
                        <input
                            type="text"
                            placeholder="Search anything..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="admin-topbar-right">
                        <div className="admin-topbar-status">
                            <div className={`status-dot ${dbDot}`} style={{ width: 8, height: 8, borderRadius: '50%', background: dbDot === 'connected' ? '#10B981' : '#EF4444' }} />
                            System {dbDot === 'connected' ? 'Online' : 'Offline'}
                        </div>
                        <div className="admin-profile">
                            <div className="admin-avatar">A</div>
                            <div className="admin-profile-info">
                                <div className="admin-profile-name">Admin</div>
                                <div className="admin-profile-role">Super Admin</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="admin-content">
                    <Outlet context={{ showToast }} />
                </div>
            </div>

            {/* Toast */}
            {toast && (
                <div className="admin-toast-container">
                    <div className={`admin-toast ${toast.type}`}>
                        <span>{toast.message}</span>
                        <button onClick={() => setToast(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#94A3B8' }}>&times;</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLayout;