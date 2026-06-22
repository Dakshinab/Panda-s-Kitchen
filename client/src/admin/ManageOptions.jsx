import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

const ManageOptions = () => {
    const { showToast } = useOutletContext();
    const [activeTab, setActiveTab] = useState('Sandwiches'); // Sandwiches, Submarines, Combo Deals
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        price: '',
        image: null,
        uberLink: '',
        pickMeLink: ''
    });
    const [isUploading, setIsUploading] = useState(false);

    const EXTRAS_API = 'http://localhost:5000/api/extras';
    const OFFERS_API = 'http://localhost:5000/api/offers';

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        try {
            if (activeTab === 'Combo Deals') {
                const res = await axios.get(OFFERS_API);
                setItems(res.data.filter(o => o.type === 'Special'));
            } else {
                const res = await axios.get(EXTRAS_API);
                setItems(res.data.filter(e => e.category === activeTab));
            }
        } catch (err) {
            console.error(err);
            setItems([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        const data = new FormData();
        data.append('title', formData.title);
        data.append('subtitle', formData.subtitle); // Subtitle maps to subtitle
        data.append('price', formData.price);
        data.append('uberLink', formData.uberLink);
        data.append('pickMeLink', formData.pickMeLink);

        if (formData.image) data.append('image', formData.image);

        if (activeTab === 'Combo Deals') {
            data.append('type', 'Special');
            // Ensure content is not null if schema requires it, strictly following user field request though
            data.append('content', formData.subtitle); // Fallback: use subtitle as content if needed or leave empty
        } else {
            data.append('category', activeTab);
        }

        const API = activeTab === 'Combo Deals' ? OFFERS_API : EXTRAS_API;

        try {
            if (editingItem) {
                await axios.put(`${API}/${editingItem._id}`, data);
            } else {
                await axios.post(API, data);
            }
            setIsModalOpen(false);
            setEditingItem(null);
            fetchData();
            showToast(`${activeTab} item saved!`, 'success');
        } catch (err) {
            console.error("Error saving option:", err);
            showToast('Failed to save item.', 'error');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            const API = activeTab === 'Combo Deals' ? OFFERS_API : EXTRAS_API;
            try {
                await axios.delete(`${API}/${id}`);
                fetchData();
                showToast('Item deleted.', 'success');
            } catch (err) {
                console.error(err);
                showToast('Failed to delete item.', 'error');
            }
        }
    };

    const openModal = (item = null) => {
        setEditingItem(item);
        if (item) {
            setFormData({
                title: item.title,
                subtitle: item.subtitle || '',
                price: item.price,
                image: null,
                uberLink: item.uberLink || '',
                pickMeLink: item.pickMeLink || ''
            });
        } else {
            setFormData({ title: '', subtitle: '', price: '', image: null, uberLink: '', pickMeLink: '' });
        }
        setIsModalOpen(true);
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Manage Options</h1>
                <button className="admin-btn admin-btn-primary" onClick={() => openModal()}>Add New {activeTab === 'Combo Deals' ? 'Deal' : activeTab.slice(0, -1)}</button>
            </div>

            <div className="admin-sub-nav">
                {['Sandwiches', 'Submarines', 'Combo Deals'].map(tab => (
                    <button
                        key={tab}
                        className={`admin-sub-btn ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Subtitle</th>
                            <th>Price (Rs.)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item._id}>
                                <td><img src={item.imageUrl} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} /></td>
                                <td>{item.title}</td>
                                <td>{item.subtitle}</td>
                                <td>{item.price}</td>
                                <td>
                                    <button className="admin-btn admin-btn-edit" onClick={() => openModal(item)} style={{ marginRight: '10px' }}>Edit</button>
                                    <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {items.length === 0 && <p style={{ textAlign: 'center', padding: '20px' }}>No items found in {activeTab}.</p>}
            </div>

            {isModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <h2>{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-form-group">
                                <label>Title</label>
                                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="admin-form-group">
                                <label>Subtitle</label>
                                <textarea required value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} />
                            </div>
                            <div className="admin-form-group">
                                <label>Price (LKR)</label>
                                <input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                            </div>
                            <div className="admin-form-group">
                                <label>Uber Eats Link</label>
                                <input type="text" value={formData.uberLink} onChange={(e) => setFormData({ ...formData, uberLink: e.target.value })} />
                            </div>
                            <div className="admin-form-group">
                                <label>PickMe Link</label>
                                <input type="text" value={formData.pickMeLink} onChange={(e) => setFormData({ ...formData, pickMeLink: e.target.value })} />
                            </div>
                            <div className="admin-form-group">
                                <label>Image</label>
                                <input type="file" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
                            </div>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                <button type="submit" className="admin-btn admin-btn-primary" disabled={isUploading}>
                                    {isUploading ? <><span className="spinner"></span> Uploading...</> : 'Save'}
                                </button>
                                <button type="button" className="admin-btn" onClick={() => setIsModalOpen(false)} disabled={isUploading}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageOptions;
