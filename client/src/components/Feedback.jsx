import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import './Feedback.css';

const Feedback = () => {
    const [reviews, setReviews] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "cubic-bezier(0.87, 0.03, 0.41, 0.9)",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/feedback');
                setReviews(res.data);
            } catch (err) {
                console.error('Error fetching feedback:', err);
            }
        };
        fetchFeedback();
    }, []);

    const defaultReviews = [
        { _id: '1', customerName: "Sarah L.", feedbackText: "The best homemade burger I've ever had! The freshness is real.", rating: 5 },
        { _id: '2', customerName: "Jason M.", feedbackText: "Love the Ultra Max. It's huge and full of flavor.", rating: 5 }
    ];

    const displayReviews = reviews.length > 0 ? reviews : [];

    return (
        <section className="feedback-section bg-white" id="feedback">
            <div className="container">
                <h2 className="section-title title-amber">Happy Customers</h2>
                <div className="feedback-slider">
                    <Slider {...settings}>
                        {displayReviews.map(review => (
                            <div key={review._id} className="feedback-card-wrapper">
                                <div className="feedback-card" style={{ textAlign: 'center' }}>
                                    <div className="stars">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <span key={i} className="star">★</span>
                                        ))}
                                    </div>
                                    <p className="feedback-text" style={{ fontSize: '1.1rem', fontStyle: 'italic' }}>"{review.comment}"</p>
                                    <h4 className="customer-name" style={{ marginTop: '10px', color: '#ffc107' }}>- {review.customerName}</h4>
                                </div>
                            </div>
                        ))}
                    </Slider>
                    {displayReviews.length === 0 && <p style={{ textAlign: 'center', padding: '20px' }}>No reviews yet.</p>}
                </div>
            </div>
        </section>
    );
};

export default Feedback;
