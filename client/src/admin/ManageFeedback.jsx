import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

const ManageFeedback = () => {
    const { showToast } = useOutletContext();
    const [feedbacks, setFeedbacks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFeedback, setEditingFeedback] = useState(null);
    const [formData, setFormData] = useState({ customerName: '', comment: '', rating: 5 });

    const API_URL = 'http://localhost:5000/api/feedback';

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const res = await axios.get(API_URL);
            setFeedbacks(res.data);
        } catch (err) {
            console.error("Error fetching feedback (Offline mode):", err);
            // Silent fail - stay empty
            setFeedbacks([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingFeedback) {
                await axios.put(`${API_URL}/${editingFeedback._id}`, formData);
            } else {
                await axios.post(API_URL, formData);
            }
            setIsModalOpen(false);
            setEditingFeedback(null);
            setFormData({ customerName: '', comment: '', rating: 5 });
            fetchFeedbacks();
            showToast('Feedback saved successfully!', 'success');
        } catch (err) {
            console.error("Error saving feedback (Offline mode):", err);
            showToast('Failed to save feedback.', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchFeedbacks();
                showToast('Feedback deleted.', 'success');
            } catch (err) {
                console.error("Error deleting feedback:", err);
                showToast('Failed to delete feedback.', 'error');
            }
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Manage Happy Customers</h1>
                <button className="admin-btn admin-btn-primary" onClick={() => {
                    setEditingFeedback(null);
                    setFormData({ customerName: '', comment: '', rating: 5 });
                    setIsModalOpen(true);
                }}>Add New Feedback</button>
            </div>

            <div className="admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map(fb => (
                            <tr key={fb._id}>
                                <td>{fb.customerName}</td>
                                <td>{fb.rating} Stars</td>
                                <td style={{ maxWidth: '400px' }}>{fb.comment}</td>
                                <td>
                                    <button className="admin-btn admin-btn-edit" onClick={() => {
                                        setEditingFeedback(fb);
                                        setFormData({ customerName: fb.customerName, comment: fb.comment, rating: fb.rating });
                                        setIsModalOpen(true);
                                    }} style={{ marginRight: '10px' }}>Edit</button>
                                    <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(fb._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {feedbacks.length === 0 && <p style={{ textAlign: 'center', padding: '20px' }}>No feedback found.</p>}
            </div>

            {isModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <h2>{editingFeedback ? 'Edit Feedback' : 'Add New Feedback'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-form-group">
                                <label>Customer Name</label>
                                <input type="text" required value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} />
                            </div>
                            <div className="admin-form-group">
                                <label>Feedback Comment</label>
                                <textarea required value={formData.comment} onChange={(e) => setFormData({ ...formData, comment: e.target.value })} />
                            </div>
                            <div className="admin-form-group">
                                <label>Rating (1-5)</label>
                                <input type="number" min="1" max="5" required value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} />
                            </div>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                <button type="submit" className="admin-btn admin-btn-primary">Save Feedback</button>
                                <button type="button" className="admin-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageFeedback;
