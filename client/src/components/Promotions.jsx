import React from 'react';
import './Promotions.css';

const Promotions = () => {
    return (
        <section className="promotions-section" id="promotions">
            <div className="container">
                <h2 className="section-title">Special Offers</h2>
                <div className="promo-grid">
                    <div className="promo-card">
                        <div className="promo-content">
                            <h3>Weekend Feast</h3>
                            <p>Get 20% off on all Ultra Max Burgers this weekend!</p>
                            <button className="promo-btn">Order Now</button>
                        </div>
                        <div className="promo-badge">20% OFF</div>
                    </div>
                    <div className="promo-card highlight">
                        <div className="promo-content">
                            <h3>Family Combo</h3>
                            <p>4 Burgers + 4 Fries + 4 Drinks at a special price.</p>
                            <button className="promo-btn">Grab Deal</button>
                        </div>
                        <div className="promo-badge">HOT</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Promotions;
