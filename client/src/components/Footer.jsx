import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-logo">
                    <h2>Panda's Kitchen</h2>
                    <p>Homemade Fresh Goodness</p>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#menu">Menu</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#promotions">Offers</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-subscribe">
                    <h3>Stay Updated</h3>
                    <div className="subscribe-box">
                        <input type="email" placeholder="Enter your email" />
                        <button>Subscribe</button>
                    </div>
                </div>

                <div className="footer-social">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <span>FB</span>
                        <span>IG</span>
                        <span>TW</span>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 Panda's Kitchen. All Rights Reserved. | Made with ❤️</p>
            </div>
        </footer>
    );
};

export default Footer;
