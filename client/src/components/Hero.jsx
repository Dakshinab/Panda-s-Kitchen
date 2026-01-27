import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Hero.css';

const Hero = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        fade: true,
        cssEase: 'linear'
    };

    const slides = [
        {
            id: 1,
            title: "Homemade Fresh Goodness",
            subtitle: "Taste the difference of pure, home-style cooking.",
            image: "https://placehold.co/1920x800/FFC107/FFFFFF?text=Classic+Burger", // Placeholder
            color: "#FFC107"
        },
        {
            id: 2,
            title: "Juicy, Cheesy, Irresistible",
            subtitle: "Our Ultra Max Burgers are packed with flavor.",
            image: "https://placehold.co/1920x800/FF9800/FFFFFF?text=Ultra+Max+Burger",
            color: "#FF9800"
        },
        {
            id: 3,
            title: "Freshly Made Every Day",
            subtitle: "No artificial flavors, just real food.",
            image: "https://placehold.co/1920x800/4CAF50/FFFFFF?text=Fresh+Ingredients",
            color: "#4CAF50"
        },
        {
            id: 4,
            title: "Start Your Day Right",
            subtitle: "Delicious Breakfast Burgers served until 11 AM.",
            image: "https://placehold.co/1920x800/2196F3/FFFFFF?text=Breakfast+Burger",
            color: "#2196F3"
        },
        {
            id: 5,
            title: "Perfect Sides",
            subtitle: "Crispy fries and more to complete your meal.",
            image: "https://placehold.co/1920x800/9C27B0/FFFFFF?text=Crispy+Fries",
            color: "#9C27B0"
        }
    ];

    const handleOrder = () => {
        // Simple logic to choose random provider or verify user intent, 
        // here we can just open a modal or window.
        window.open('https://www.ubereats.com', '_blank');
    };

    return (
        <div className="hero-section">
            <Slider {...settings}>
                {slides.map(slide => (
                    <div key={slide.id} className="hero-slide">
                        <div className="hero-image" style={{ backgroundImage: `url(${slide.image})` }}>
                            <div className="hero-overlay"></div>
                            <div className="hero-content container">
                                <h1 className="hero-title">{slide.title}</h1>
                                <p className="hero-subtitle">{slide.subtitle}</p>
                                <div className="hero-buttons">
                                    <button className="btn-primary" onClick={handleOrder}>Order Now (Uber Eats)</button>
                                    <button className="btn-secondary" onClick={() => window.open('https://pickme.lk/food', '_blank')}>PickMe Food</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Hero;
