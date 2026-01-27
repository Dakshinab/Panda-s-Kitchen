import React, { useState } from 'react';
import './Menu.css';

const categories = [
    { id: 'breakfast', name: 'Breakfast Burgers', time: 'Until 11:00 AM' },
    { id: 'regular', name: 'All Day Burgers', time: 'All Day' },
    { id: 'ultramax', name: 'Ultra Max Burgers', time: 'All Day' },
    { id: 'sides', name: 'Sides', time: 'All Day' },
    { id: 'evening', name: 'Evening Specials', time: '6:00 PM - 11:00 PM' },
];

const menuItems = {
    breakfast: [
        { id: 1, name: "Morning Bliss", desc: "Sunny-side up egg with cheese & sausage.", price: "Rs. 800" },
        { id: 2, name: "Hashbrown Delight", desc: "Crispy hashbrown inside a soft bun.", price: "Rs. 750" }
    ],
    regular: [
        { id: 3, name: "Classic Chicken", desc: "Our signature homemade chicken patty.", price: "Rs. 950" },
        { id: 4, name: "Spicy Paneer", desc: "For the veggie lovers.", price: "Rs. 900" },
        { id: 5, name: "Cheesy Beef", desc: "Juicy beef patty with melted cheese.", price: "Rs. 1200" }
    ],
    ultramax: [
        { id: 6, name: "The Behemoth", desc: "Double patty, double cheese, double joy.", price: "Rs. 1800" },
        { id: 7, name: "Volcano Burst", desc: "Super spicy sauce with crispy onion rings.", price: "Rs. 1750" }
    ],
    sides: [
        { id: 8, name: "Golden Fries", desc: "Perfectly salted crispy fries.", price: "Rs. 450" },
        { id: 9, name: "Chicken Nuggets", desc: "6 pcs of homemade nuggets.", price: "Rs. 600" }
    ],
    evening: [
        { id: 10, name: "Midnight Snack", desc: "Light but filling for late nights.", price: "Rs. 850" }
    ]
};

const Menu = () => {
    const [activeCategory, setActiveCategory] = useState('regular');

    return (
        <section className="menu-section container" id="menu">
            <h2 className="section-title">Our Menu</h2>
            <p className="section-subtitle">Homemade Fresh Goodness in Every Bite</p>

            <div className="category-tabs">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat.id)}
                    >
                        {cat.name}
                        <span className="category-time">{cat.time}</span>
                    </button>
                ))}
            </div>

            <div className="menu-grid">
                {menuItems[activeCategory].map(item => (
                    <div key={item.id} className="menu-card">
                        <div className="menu-card-img-placeholder">
                            <span>{item.name}</span>
                        </div>
                        <div className="menu-details">
                            <h3>{item.name}</h3>
                            <p>{item.desc}</p>
                            <span className="price">{item.price}</span>
                            <button className="order-btn" onClick={() => window.open('https://www.ubereats.com', '_blank')}>
                                Order on Uber Eats
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Menu;
