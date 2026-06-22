import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

const ManageOffers = ({ type }) => {
    const { showToast } = useOutletContext();
    const [offers, setOffers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOffer, setEditingOffer] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        content: '',
        price: '',
        type: type,
        image: null,
        uberLink: '',
        pickMeLink: ''
    });
    const [isUploading, setIsUploading] = useState(false);

    // New state for image preview URL
    const [previewUrl, setPreviewUrl] = useState(null);

    const API_URL = 'http://localhost:5000/api/offers';

    // Default text content for Auto-fill
    const DEFAULTS = {
        subtitle: "Limited Time Offer",
        title: "Fresh Homemade Burgers Weekly!",
        content: "Stay tuned for our upcoming limited time specials. Pure, home-style goodness coming your way."
    };

    const isLimited = type === 'Limited Time';

    useEffect(() => {
        fetchOffers();
    }, [type]);

    // When offers change (fetched), if Limited, populate form for inline editing
    useEffect(() => {
        if (isLimited && offers.length > 0) {
            const current = offers[0];
            setFormData({
                title: current.title || DEFAULTS.title,
                subtitle: current.subtitle || DEFAULTS.subtitle,
                content: current.content || DEFAULTS.content,
                price: current.price || '',
                type: type,
                image: null, // Reset file input
                uberLink: current.uberLink || '',
                pickMeLink: ''
            });
            setPreviewUrl(current.imageUrl);
        } else if (isLimited) {
            // No offer exists, set Defaults
            setFormData({
                title: DEFAULTS.title,
                subtitle: DEFAULTS.subtitle,
                content: DEFAULTS.content,
                price: '',
                type: type,
                image: null,
                uberLink: '',
                pickMeLink: ''
            });
            setPreviewUrl(null);
        }
    }, [offers, isLimited]);

    const fetchOffers = async () => {
        try {
            const res = await axios.get(API_URL);
            const filtered = res.data.filter(offer => offer.type === type);
            setOffers(filtered);
        } catch (err) {
            console.error(err);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        const data = new FormData();
        data.append('title', formData.title);
        data.append('subtitle', formData.subtitle); // Small Heading
        data.append('content', formData.content);
        data.append('price', formData.price);
        data.append('type', formData.type);
        data.append('uberLink', formData.uberLink); // Single Redirect Link
        data.append('pickMeLink', ''); // Clear PickMe link
        if (formData.image) data.append('image', formData.image);

        try {
            if (isLimited && offers.length > 0) {
                // Inline update for Limited
                const current = offers[0];
                await axios.put(`${API_URL}/${current._id}`, data);
            } else if (editingOffer) {
                // Modal update for others
                await axios.put(`${API_URL}/${editingOffer._id}`, data);
            } else {
                // Create new
                await axios.post(API_URL, data);
            }

            setIsModalOpen(false);
            setEditingOffer(null);
            fetchOffers(); // This will trigger the useEffect to re-populate form/preview
            showToast('Offer saved successfully.', 'success');
        } catch (err) {
            console.error("Error saving offer:", err);
            showToast('Failed to save offer.', 'error');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this offer?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchOffers();
                showToast('Offer deleted.', 'success');
            } catch (err) {
                console.error(err);
                showToast('Failed to delete offer.', 'error');
            }
        }
    };

    const openModal = (offer = null) => {
        setEditingOffer(offer);
        // ... (populate formData same as before for modal) ...
        if (offer) {
            setFormData({
                title: offer.title || DEFAULTS.title,
                subtitle: offer.subtitle || DEFAULTS.subtitle,
                content: offer.content || DEFAULTS.content,
                price: offer.price || '',
                type: type,
                image: null,
                uberLink: offer.uberLink || '',
                pickMeLink: offer.pickMeLink || ''
            });
        } else {
            setFormData({
                title: DEFAULTS.title,
                subtitle: DEFAULTS.subtitle,
                content: DEFAULTS.content,
                price: '',
                type: type,
                image: null,
                uberLink: '',
                pickMeLink: ''
            });
        }
        setIsModalOpen(true);
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Manage {type === 'Limited Time' ? 'Limited Time Offer' : type}</h1>
                {/* For non-Limited, or if Limited needs explicit create (though inline handles it) */}
                {!isLimited && (
                    <button className="admin-btn admin-btn-primary" onClick={() => openModal()}>
                        Add New Offer
                    </button>
                )}
            </div>

            {isLimited ? (
                // Limited Time INLINE View
                <div className="admin-card">
                    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap' }}>

                        {/* LEFT SIDE: Inputs */}
                        <div style={{ flex: 1, minWidth: '300px' }}>
                            <div className="admin-form-group">
                                <label style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8rem' }}>Small Heading</label>
                                <input
                                    type="text"
                                    value={formData.subtitle}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                    placeholder={DEFAULTS.subtitle}
                                    style={{ width: '100%', padding: '10px' }}
                                />
                            </div>

                            <div className="admin-form-group">
                                <label style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8rem' }}>Main Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder={DEFAULTS.title}
                                    style={{ width: '100%', padding: '10px', fontWeight: 'bold', fontSize: '1.2rem' }}
                                />
                            </div>

                            <div className="admin-form-group">
                                <label style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8rem' }}>Description</label>
                                <textarea
                                    required
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder={DEFAULTS.content}
                                    style={{ width: '100%', height: '100px', padding: '10px' }}
                                />
                            </div>

                            <div className="admin-form-group">
                                <label style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8rem' }}>Redirect Link (Order Now)</label>
                                <input
                                    type="text"
                                    value={formData.uberLink}
                                    onChange={(e) => setFormData({ ...formData, uberLink: e.target.value })}
                                    placeholder="https://..."
                                    style={{ width: '100%', padding: '10px' }}
                                />
                            </div>

                            <div className="admin-form-group">
                                <label style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8rem' }}>Offer Image (Upload to see Preview)</label>
                                <input type="file" onChange={handleFileChange} />
                            </div>

                            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                                <button type="submit" className="admin-btn admin-btn-primary" disabled={isUploading}>
                                    {isUploading ? <><span className="spinner"></span> Saving...</> : 'Save All Changes'}
                                </button>
                                {offers.length > 0 && (
                                    <button type="button" className="admin-btn admin-btn-danger" onClick={() => handleDelete(offers[0]._id)}>
                                        Delete Offer
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* RIGHT SIDE: Image Preview - Fixed Size & Rotation */}
                        <div style={{
                            width: '420px',
                            height: '260px',
                            flexShrink: 0,
                            position: 'relative',
                            margin: '20px'
                        }}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                transform: 'rotate(6deg)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                                border: '4px solid white',
                                background: '#f5f5f5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <span style={{ color: '#aaa' }}>Image Preview</span>
                                )}
                            </div>
                        </div>

                    </form>
                </div>
            ) : (
                // Standard List View for other types
                <div className="admin-card">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Subtitle</th>
                                <th>Content</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {offers.map(offer => (
                                <tr key={offer._id}>
                                    <td><img src={offer.imageUrl} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} /></td>
                                    <td>{offer.title}</td>
                                    <td>{offer.subtitle}</td>
                                    <td>{offer.content}</td>
                                    <td>{offer.price}</td>
                                    <td>
                                        <button className="admin-btn admin-btn-edit" onClick={() => openModal(offer)} style={{ marginRight: '10px' }}>Edit</button>
                                        <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(offer._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {offers.length === 0 && <p style={{ textAlign: 'center', padding: '20px' }}>No items found.</p>}
                </div>
            )}

            {isModalOpen && !isLimited && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <h2>{editingOffer ? 'Edit Offer' : 'Add New Offer'}</h2>
                        <form onSubmit={handleSubmit}>
                            {/* Other Types Form Fields */}
                            <>
                                <div className="admin-form-group">
                                    <label>Offer Type</label>
                                    <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                                        <option value="Weekend Feast">Weekend Feast</option>
                                        <option value="Family Combo">Family Combo</option>
                                    </select>
                                </div>
                                <div className="admin-form-group">
                                    <label>Title</label>
                                    <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                                </div>
                                <div className="admin-form-group">
                                    <label>Subtitle</label>
                                    <input type="text" value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} />
                                </div>
                                <div className="admin-form-group">
                                    <label>Price</label>
                                    <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                                </div>
                                <div className="admin-form-group">
                                    <label>Content</label>
                                    <textarea required value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
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
                            </>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                <button type="submit" className="admin-btn admin-btn-primary" disabled={isUploading}>
                                    {isUploading ? <><span className="spinner"></span> Uploading...</> : 'Save Offer'}
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

export default ManageOffers;
