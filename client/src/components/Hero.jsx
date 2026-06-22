import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Hero.css';

// Fallback slides in case DB is empty
const DEFAULT_SLIDES = [
    {
        _id: 'default1',
        imageUrl: '/assets/slide1.jpg'
    },
    {
        _id: 'default2',
        imageUrl: '/assets/slide2.jpg'
    }
];

const Hero = () => {
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/hero');
                if (res.data && res.data.length > 0) {
                    setSlides(res.data);
                } else {
                    setSlides(DEFAULT_SLIDES);
                }
            } catch (err) {
                console.error('Error fetching hero slides:', err);
                setSlides(DEFAULT_SLIDES);
            }
        };
        fetchSlides();
    }, []);

    // Auto-slide every 3 seconds
    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [slides.length]);

    // Get the position class for each slide
    const getSlideClass = (index) => {
        if (slides.length === 1) return 'carousel-slide active';
        const diff = (index - currentIndex + slides.length) % slides.length;

        if (diff === 0) return 'carousel-slide active';
        if (diff === 1) return 'carousel-slide right';
        if (diff === slides.length - 1) return 'carousel-slide left';
        return 'carousel-slide hidden';
    };

    const handleOrder = () => {
        window.open('https://www.ubereats.com', '_blank');
    };

    return (
        <div className="hero-section">
            <div className="carousel-container">
                {slides.map((slide, index) => (
                    <div
                        key={slide._id}
                        className={getSlideClass(index)}
                    >
                        <div
                            className="carousel-image"
                            style={{ backgroundImage: `url(${slide.imageUrl})` }}
                        >
                            <div className="hero-overlay"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Hero Content - Only Buttons */}
            <div className="hero-content-wrapper">
                <div className="hero-content container">
                    <div className="hero-buttons">
                        <button className="btn-uber" onClick={handleOrder}>
                            Order with Uber
                        </button>
                        <button
                            className="btn-pickme"
                            onClick={() => window.open('https://pickme.lk/food', '_blank')}
                        >
                            Order with PickMe
                        </button>
                    </div>
                </div>
            </div>

            {/* Carousel Indicators */}
            {slides.length > 1 && (
                <div className="carousel-indicators">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Hero;
