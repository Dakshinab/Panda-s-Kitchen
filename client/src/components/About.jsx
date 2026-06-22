import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './About.css';

const About = () => {
    const [story, setStory] = useState('');

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/settings/our-story');
                setStory(res.data.value);
            } catch (err) {
                console.error('Error fetching story:', err);
                setStory("Panda's Kitchen began with a simple belief: food should be honest, fresh, and made with love. Every burger patty is hand-pressed, every sauce is crafted in-house, and we ensure zero artificial flavors.");
            }
        };
        fetchStory();
    }, []);

    return (
        <section className="about-section bg-yellow" id="about">
            <div className="container" style={{ display: 'flex', gap: '40px', alignItems: 'center', padding: '80px 0' }}>
                <div className="about-content">
                    <h2 className="section-title title-black">Our Story</h2>
                    <div className="about-text" style={{ color: '#000' }}>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{story}</p>
                    </div>
                </div>
                <div className="about-image">
                    <img src="https://placehold.co/600x600/FFF8E1/000000?text=Our+Kitchen" alt="Our Story" style={{ borderRadius: '15px' }} />
                </div>
            </div>
        </section>
    );
};

export default About;
