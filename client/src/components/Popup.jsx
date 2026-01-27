import React, { useState, useEffect } from 'react';
import './Popup.css';

const Popup = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show popup after 1 second
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const closePopup = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-btn" onClick={closePopup}>&times;</button>
                <div className="popup-body">
                    <h2>🎉 3rd Anniversary Special! 🎉</h2>
                    <p className="countdown-text">In 5 Days</p>
                    <p>Get ready for exclusive offers and new menu items.</p>
                    <p><strong>Coming Soon to Panda's Kitchen</strong></p>
                </div>
            </div>
        </div>
    );
};

export default Popup;
