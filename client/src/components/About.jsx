import React from 'react';
import './About.css';

const About = () => {
    return (
        <section className="about-section container" id="about">
            <div className="about-content">
                <h2 className="section-title">Our Story</h2>
                <div className="about-text">
                    <p>
                        It all started in 2023, right from a humble home kitchen.
                        <strong> Panda's Kitchen</strong> began with a simple belief: food should be
                        honest, fresh, and made with love.
                    </p>
                    <p>
                        What began as a small experiment to serve the best homemade burgers to family and friends
                        quickly grew into something bigger. We realized that people crave the
                        <em> homemade fresh goodness</em> that is often missing in fast food today.
                    </p>
                    <p>
                        Every burger patty is hand-pressed, every sauce is crafted in-house, and we ensure
                        zero artificial flavors. Today, we've expanded our menu, but our promise remains the same:
                        <strong>Home-style preparation, always.</strong>
                    </p>
                </div>
            </div>
            <div className="about-image">
                <img src="https://placehold.co/600x600/FFF8E1/FFC107?text=Our+Kitchen" alt="Our Story" />
            </div>
        </section>
    );
};

export default About;
