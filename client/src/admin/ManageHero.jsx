import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

const ManageHero = () => {
    const { showToast } = useOutletContext();
    const [slides, setSlides] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSlide, setEditingSlide] = useState(null);
    const [formData, setFormData] = useState({ order: 0, image: null });
    const [isUploading, setIsUploading] = useState(false);

    const API_URL = 'http://localhost:5000/api/hero';

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            const res = await axios.get(API_URL);
            setSlides(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        const data = new FormData();
        data.append('order', formData.order);
        if (formData.image) data.append('image', formData.image);
        if (formData.uberLink) data.append('uberLink', formData.uberLink);
        if (formData.pickMeLink) data.append('pickMeLink', formData.pickMeLink);

        try {
            if (editingSlide) {
                await axios.put(`${API_URL}/${editingSlide._id}`, data);
            } else {
                await axios.post(API_URL, data);
            }
            setIsModalOpen(false);
            setEditingSlide(null);
            setFormData({ order: 0, image: null });
            fetchSlides();
            showToast('Slide saved successfully!', 'success');
        } catch (err) {
            console.error("Error saving slide (Offline mode):", err);
            showToast('Failed to save slide. Try again.', 'error');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this slide?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchSlides();
                showToast('Slide deleted successfully', 'success');
            } catch (err) {
                console.error(err);
                showToast('Failed to delete slide', 'error');
            }
        }
    };

    const openEditModal = (slide) => {
        setEditingSlide(slide);
        setFormData({ order: slide.order, image: null, uberLink: slide.uberLink || '', pickMeLink: slide.pickMeLink || '' });
        setIsModalOpen(true);
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Manage Hero Slider</h1>
                <button className="admin-btn admin-btn-primary" onClick={() => { setEditingSlide(null); setIsModalOpen(true); }}>Add New Slide</button>
            </div>

            <div className="admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Order</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slides.map(slide => (
                            <tr key={slide._id}>
                                <td><img src={slide.imageUrl} alt="" style={{ width: '80px', borderRadius: '5px' }} /></td>
                                <td>{slide.order}</td>
                                <td>
                                    <button className="admin-btn admin-btn-edit" onClick={() => openEditModal(slide)} style={{ marginRight: '10px' }}>Edit</button>
                                    <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(slide._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <h2>{editingSlide ? 'Edit Slide' : 'Add New Slide'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-form-group">
                                <label>Display Order</label>
                                <input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: e.target.value })} />
                            </div>
                            <div className="admin-form-group">
                                <label>Image</label>
                                <input type="file" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
                            </div>
                            <div className="admin-form-group">
                                <label>Uber Eats Link (Optional)</label>
                                <input type="text" value={formData.uberLink || ''} onChange={(e) => setFormData({ ...formData, uberLink: e.target.value })} placeholder="https://..." />
                            </div>
                            <div className="admin-form-group">
                                <label>PickMe Food Link (Optional)</label>
                                <input type="text" value={formData.pickMeLink || ''} onChange={(e) => setFormData({ ...formData, pickMeLink: e.target.value })} placeholder="https://..." />
                            </div>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                <button type="submit" className="admin-btn admin-btn-primary" disabled={isUploading}>
                                    {isUploading ? <><span className="spinner"></span> Uploading...</> : (editingSlide ? 'Save Changes' : 'Add Slide')}
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

export default ManageHero;
