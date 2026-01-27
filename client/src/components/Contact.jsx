import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <section className="contact-section" id="contact">
            <div className="container contact-container">
                <div className="contact-info">
                    <h2 className="section-title">Get in Touch</h2>
                    <p className="contact-desc">We'd love to hear from you!</p>

                    <div className="info-item">
                        <span className="icon">🕒</span>
                        <div>
                            <h4>Opening Hours</h4>
                            <p>8:00 AM – 11:00 PM (Daily)</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <span className="icon">📞</span>
                        <div>
                            <h4>Call Us</h4>
                            <p>+94 77 123 4567</p>
                        </div>
                    </div>

                    <div className="order-actions">
                        <h3>Order Now via</h3>
                        <div className="partners">
                            <button className="partner-btn uber" onClick={() => window.open('https://www.ubereats.com', '_blank')}>Uber Eats</button>
                            <button className="partner-btn pickme" onClick={() => window.open('https://pickme.lk/food', '_blank')}>PickMe Food</button>
                        </div>
                    </div>
                </div>
                <div className="contact-map">
                    {/* Placeholder Map Image */}
                    <img src="https://placehold.co/600x400/f5f5f5/cccccc?text=Map+Location" alt="Location" />
                </div>
            </div>
        </section>
    );
};

export default Contact;
