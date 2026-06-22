import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
    const [contact, setContact] = useState({ phone: '+94 77 123 4567', email: 'hello@pandaskitchen.lk', address: '123 Main Street, Colombo, Sri Lanka' });

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/settings/contact-details');
                if (res.data && res.data.value) {
                    setContact(res.data.value);
                }
            } catch (err) {
                console.error('Error fetching contact details:', err);
            }
        };
        fetchContact();
    }, []);

    return (
        <section className="contact-section bg-yellow" id="contact">
            <div className="container contact-container">
                <div className="contact-info">
                    <h2 className="section-title title-black">Get in Touch</h2>
                    <p className="contact-desc" style={{ color: '#000' }}>We'd love to hear from you!</p>

                    <div className="info-item">
                        <span className="icon">🕒</span>
                        <div>
                            <h4 style={{ color: '#000' }}>Opening Hours</h4>
                            <p style={{ color: '#333' }}>8:00 AM – 11:00 PM (Daily)</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <span className="icon">📞</span>
                        <div>
                            <h4 style={{ color: '#000' }}>Call Us</h4>
                            <p style={{ color: '#333' }}>{contact.phone}</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <span className="icon">✉️</span>
                        <div>
                            <h4 style={{ color: '#000' }}>Email</h4>
                            <p style={{ color: '#333' }}>{contact.email}</p>
                        </div>
                    </div>

                    <div className="order-actions">
                        <h3 style={{ color: '#000' }}>Order Now via</h3>
                        <div className="partners">
                            <button className="partner-btn uber" onClick={() => window.open('https://www.ubereats.com', '_blank')}>Uber Eats</button>
                            <button className="partner-btn pickme" onClick={() => window.open('https://pickme.lk/food', '_blank')}>PickMe Food</button>
                        </div>
                    </div>
                </div>
                <div className="contact-map" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                    {/* Placeholder Map Image */}
                    <img src="https://placehold.co/600x400/FFF8E1/333333?text=Find+Us+at+Panda's+Kitchen" alt="Location" />
                </div>
            </div>
        </section>
    );
};

export default Contact;
