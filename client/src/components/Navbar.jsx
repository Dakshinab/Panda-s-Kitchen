import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container container">
                <Link to="/" className="navbar-logo">
                    Panda's Kitchen
                </Link>

                <ul className="nav-menu">
                    <li className="nav-item" onClick={() => scrollToSection('picked-for-you')}>Picked for You</li>
                    <li className="nav-item" onClick={() => scrollToSection('appetizers')}>Appetizers</li>
                    <li className="nav-item" onClick={() => scrollToSection('breakfast-burgers')}>Breakfast Burgers</li>
                    <li className="nav-item" onClick={() => scrollToSection('regular-burgers')}>Regular Burgers</li>
                    <li className="nav-item" onClick={() => scrollToSection('ultra-max-burgers')}>Ultra Max Burgers</li>
                </ul>

                <div className="nav-actions">
                    <div className="search-bar">
                        <input type="text" placeholder="Search..." />
                        <span className="search-icon">🔍</span>
                    </div>
                    <div className="auth-action">
                        Login / Signup
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
