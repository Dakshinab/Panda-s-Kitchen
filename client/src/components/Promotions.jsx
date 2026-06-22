import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Promotions.css';

const Promotions = ({ isSimple }) => {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/offers');
                const specialOffers = res.data.filter(o => o.type === 'Special');
                setOffers(specialOffers);
            } catch (err) {
                console.error('Error fetching promotions:', err);
            }
        };
        fetchOffers();
    }, []);

    const handleOrder = (url) => {
        window.open(url || 'https://www.ubereats.com', '_blank');
    };

    const displayOffers = offers.length > 0 ? offers : [];

    const Content = (
        <div className="promo-grid">
            {displayOffers.map((offer) => (
                <div key={offer._id} className={`promo-card`}>
                    <div
                        className="promo-image"
                        style={{ backgroundImage: `url(${offer.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    ></div>
                    <div className="promo-text">
                        <h3>{offer.title}</h3>
                        <p className="promo-sub">{offer.subtitle}</p>
                        <p className="promo-desc">{offer.content}</p>
                        <p className="promo-price">{offer.price} LKR</p>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '10px 0', color: '#e67300' }}>Rs. {offer.price}</div>
                        <div className="promo-buttons" style={{ display: 'flex', gap: '10px' }}>
                            <button className="promo-btn uber" onClick={() => handleOrder(offer.uberLink)} style={{ background: '#06C167', color: 'white' }}>Uber Eats</button>
                            <button className="promo-btn pickme" onClick={() => handleOrder(offer.pickMeLink)} style={{ background: '#FFC107', color: 'black' }}>PickMe Food</button>
                        </div>
                    </div>
                </div>
            ))}
            {displayOffers.length === 0 && <p style={{ textAlign: 'center', padding: '20px' }}>Currently no special offers available.</p>}
        </div>
    );

    if (isSimple) {
        return Content;
    }

    return (
        <section className="promotions-section bg-white" id="combo-deals">
            <div className="container">
                <h2 className="section-title title-amber">Special Offers</h2>
                {Content}
            </div>
        </section>
    );
};

export default Promotions;
