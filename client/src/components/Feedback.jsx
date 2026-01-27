import React from 'react';
import Slider from 'react-slick';
import './Feedback.css';

const Feedback = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000
    };

    const reviews = [
        { id: 1, name: "Sarah L.", text: "The best homemade burger I've ever had! The freshness is real.", rating: 5 },
        { id: 2, name: "Jason M.", text: "Love the Ultra Max. It's huge and full of flavor.", rating: 5 },
        { id: 3, name: "Emily R.", text: "My kids love the nuggets. Tastes just like home.", rating: 4 }
    ];

    return (
        <section className="feedback-section container" id="feedback">
            <h2 className="section-title">Happy Customers</h2>
            <div className="feedback-slider">
                <Slider {...settings}>
                    {reviews.map(review => (
                        <div key={review.id} className="feedback-card">
                            <div className="stars">{"⭐".repeat(review.rating)}</div>
                            <p className="feedback-text">"{review.text}"</p>
                            <h4 className="customer-name">- {review.name}</h4>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default Feedback;
