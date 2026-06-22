import React, { useState, useEffect } from 'react';
import './Navbar.css';
import pandaLogo from '../assets/panda.jpeg';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        const handleClickOutside = (event) => {
            if (!event.target.closest('.options-dropdown')) {
                document.getElementById('options-menu')?.classList.remove('show');
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleClickOutside);
        }
    }, []);

    // Scroll Spy Logic
    useEffect(() => {
        const sections = [
            'picked-for-you',
            'appetizers',
            'breakfast-burgers',
            'regular-burgers',
            'ultra-max-burgers',
            'options-section' // Add options section to spy
        ];

        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Active when element is in middle of viewport
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id) => {
        setIsMobileMenuOpen(false); // Close menu on click

        // Handle Options Sub-navigation
        if (['sandwiches', 'submarines', 'combo-deals'].includes(id)) {
            window.dispatchEvent(new CustomEvent('switchOption', { detail: id }));
            // No return, we still want to scroll to the section if it wasn't already handled by the event listener?
            // Actually, the event listener in OptionsSection scrolls. 
            // But we should also close the dropdown if open.
            return;
        }

        const element = document.getElementById(id);
        if (element) {
            // Offset for fixed navbar
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Search Functionality
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Keyword Mapping
    const searchMap = [
        { keywords: ['burger', 'regular', 'classic', 'beef', 'chicken'], title: 'Regular Burgers', id: 'regular-burgers' },
        { keywords: ['breakfast', 'morning', 'egg', 'cheese'], title: 'Breakfast Burgers', id: 'breakfast-burgers' },
        { keywords: ['ultra', 'max', 'titan', 'double', 'big'], title: 'Ultra Max Burgers', id: 'ultra-max-burgers' },
        { keywords: ['appetizer', 'starter', 'calamari', 'fries'], title: 'Appetizers', id: 'appetizers' },
        { keywords: ['picked', 'special', 'chef', 'recommend'], title: 'Picked for You', id: 'picked-for-you' },
        { keywords: ['side', 'fries', 'dip', 'sauce'], title: 'Sides', id: 'sandwiches' }, // Sides are in Extras, assuming default active or near options
        { keywords: ['sandwich', 'toast', 'club'], title: 'Sandwiches', id: 'sandwiches', tab: 'sandwiches' },
        { keywords: ['submarine', 'sub', 'hoagie'], title: 'Submarines', id: 'submarines', tab: 'submarines' },
        { keywords: ['combo', 'deal', 'family', 'feast', 'offer'], title: 'Combo Deals', id: 'combo-deals', tab: 'combo-deals' },
        { keywords: ['limit', 'time', 'offer', 'now'], title: 'Limited Time Offer', id: 'limited-offer' },
        { keywords: ['evening', 'dinner', 'night', 'special'], title: 'Evening Specials', id: 'sandwiches' }, // Assuming these load in extras
        { keywords: ['contact', 'about', 'location', 'phone', 'email'], title: 'Contact Us', id: 'contact' },
        { keywords: ['feedback', 'review', 'rating', 'star'], title: 'Customer Feedback', id: 'feedback' }
    ];

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim().length > 0) {
            const results = searchMap.filter(item =>
                item.title.toLowerCase().includes(value.toLowerCase()) ||
                item.keywords.some(k => k.toLowerCase().includes(value.toLowerCase()))
            );
            setSearchResults(results);
            setShowResults(true);
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    };

    const handleSearchSelect = (item) => {
        setSearchTerm('');
        setShowResults(false);
        setIsSearchOpen(false);

        // Handle Tab Switching if needed (for Options section)
        if (item.tab) {
            const event = new CustomEvent('switchOption', { detail: item.tab });
            window.dispatchEvent(event);
        }

        const element = document.getElementById(item.id);
        if (element) {
            // Navbar offset calculation
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchResults.length > 0) {
            handleSearchSelect(searchResults[0]);
        }
    };

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Logo - Extreme Left */}
                <div className="navbar-logo" onClick={scrollToTop}>
                    <img src={pandaLogo} alt="Panda's Kitchen" />
                </div>


                {/* Mobile Menu Toggle (Hamburger) */}
                <div className="mobile-toggle" onClick={toggleMenu}>
                    {isMobileMenuOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    )}
                </div>

                {/* Right Side Content (Desktop) */}
                <div className={`navbar-right ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
                    {/* Mobile Search Icon */}
                    <div className="mobile-search-icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                    </div>
                    {/* Mobile Close Button */}
                    <div className="mobile-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>

                    {/* Navigation Sections */}
                    <ul className="nav-menu">
                        <li className={`nav-item ${activeSection === 'picked-for-you' ? 'active' : ''}`} onClick={() => scrollToSection('picked-for-you')}>Picked for You</li>
                        <li className={`nav-item ${activeSection === 'appetizers' ? 'active' : ''}`} onClick={() => scrollToSection('appetizers')}>Appetizers</li>
                        <li className={`nav-item ${activeSection === 'breakfast-burgers' ? 'active' : ''}`} onClick={() => scrollToSection('breakfast-burgers')}>Breakfast Burgers</li>
                        <li className={`nav-item ${activeSection === 'regular-burgers' ? 'active' : ''}`} onClick={() => scrollToSection('regular-burgers')}>Regular Burgers</li>
                        <li className={`nav-item ${activeSection === 'ultra-max-burgers' ? 'active' : ''}`} onClick={() => scrollToSection('ultra-max-burgers')}>Ultra Max Burgers</li>

                        {/* Options Dropdown */}
                        <li className={`nav-item options-dropdown ${activeSection === 'options-section' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); document.getElementById('options-menu').classList.toggle('show'); }}>
                            Options
                            <ul id="options-menu" className="dropdown-menu">
                                <li onClick={(e) => { e.stopPropagation(); scrollToSection('sandwiches'); document.getElementById('options-menu').classList.remove('show'); }}>Sandwiches</li>
                                <li onClick={(e) => { e.stopPropagation(); scrollToSection('submarines'); document.getElementById('options-menu').classList.remove('show'); }}>Submarines</li>
                                <li onClick={(e) => { e.stopPropagation(); scrollToSection('combo-deals'); document.getElementById('options-menu').classList.remove('show'); }}>Combo Deals</li>
                            </ul>
                        </li>
                    </ul>

                    {/* Search Bar - Functional */}
                    <div className={`search-bar ${isSearchOpen ? 'active' : ''}`}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setIsSearchOpen(true)}
                        />
                        <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>

                        {/* Search Results Dropdown */}
                        {showResults && (
                            <div className="search-dropdown">
                                {searchResults.map((result, index) => (
                                    <div
                                        key={index}
                                        className="search-result-item"
                                        onClick={() => handleSearchSelect(result)}
                                    >
                                        <span style={{ fontWeight: 'bold' }}>{result.title}</span>
                                    </div>
                                ))}
                                {searchResults.length === 0 && (
                                    <div className="search-result-item no-results">No results found</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Overlay for mobile menu */}
                {isMobileMenuOpen && <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}
            </div>
        </nav>
    );
};

export default Navbar;
