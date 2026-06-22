import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

const ManageExtras = () => {
    const { showToast } = useOutletContext();
    const [extras, setExtras] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Sides');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({ title: '', subtitle: '', price: '', category: 'Sides', image: null, uberLink: '', pickMeLink: '' });
    const [isUploading, setIsUploading] = useState(false);

    const API_URL = 'http://localhost:5000/api/extras';
    const CATEGORIES = ['Sides', 'New Evening Specials'];

    useEffect(() => {
        fetchExtras();
    }, []);

    const fetchExtras = async () => {
        try {
            const res = await axios.get(API_URL);
            setExtras(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        const data = new FormData();
        data.append('title', formData.title);
        data.append('subtitle', formData.subtitle);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('uberLink', formData.uberLink);
        data.append('pickMeLink', formData.pickMeLink);
        if (formData.image) data.append('image', formData.image);

        try {
            if (editingItem) {
                await axios.put(`${API_URL}/${editingItem._id}`, data);
            } else {
                await axios.post(API_URL, data);
            }
            setIsModalOpen(false);
            setEditingItem(null);
            fetchExtras();
            showToast('Item saved successfully!', 'success');
        } catch (err) {
            console.error("Error saving extra (Offline mode):", err);
            showToast('Failed to save item.', 'error');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchExtras();
                showToast('Item deleted.', 'success');
            } catch (err) {
                console.error(err);
                showToast('Failed to delete item.', 'error');
            }
        }
    };

    const filteredExtras = extras.filter(item => item.category === activeCategory);

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Manage Extras Section</h1>
                <button className="admin-btn admin-btn-primary" onClick={() => {
                    setEditingItem(null);
                    setFormData({ title: '', subtitle: '', price: '', category: activeCategory, image: null, uberLink: '', pickMeLink: '' });
                    setIsModalOpen(true);
                }}>Add New Item</button>
            </div>

            <div className="admin-sub-nav">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        className={`admin-sub-btn ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
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
                        {filteredExtras.map(item => (
                            <tr key={item._id}>
                                <td><img src={item.imageUrl} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} /></td>
                                <td>{item.title}</td>
                                <td>{item.subtitle}</td>
                                <td>{item.price}</td>
                                <td>
                                    <button className="admin-btn admin-btn-edit" onClick={() => {
                                        setEditingItem(item);
                                        setFormData({ ...item, image: null });
                                        setIsModalOpen(true);
                                    }} style={{ marginRight: '10px' }}>Edit</button>
                                    <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredExtras.length === 0 && <p style={{ textAlign: 'center', padding: '20px' }}>No items found in {activeCategory}.</p>}
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
                                <input type="text" value={formData.uberLink || ''} onChange={(e) => setFormData({ ...formData, uberLink: e.target.value })} />
                            </div>
                            <div className="admin-form-group">
                                <label>PickMe Link</label>
                                <input type="text" value={formData.pickMeLink || ''} onChange={(e) => setFormData({ ...formData, pickMeLink: e.target.value })} />
                            </div>
                            <div className="admin-form-group">
                                <label>Image</label>
                                <input type="file" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
                            </div>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                <button type="submit" className="admin-btn admin-btn-primary" disabled={isUploading}>
                                    {isUploading ? <><span className="spinner"></span> Uploading...</> : (editingItem ? 'Save Item' : 'Add Item')}
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

export default ManageExtras;
