import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Extras.css';

const Extras = ({ id, title = 'Extras', categories = [], showFilterButtons = true }) => {
    const [activeCategory, setActiveCategory] = useState(categories.length > 0 ? categories[0] : 'Sides');
    const [extras, setExtras] = useState([]);

    useEffect(() => {
        if (categories.length > 0 && !categories.includes(activeCategory)) {
            setActiveCategory(categories[0]);
        }
    }, [categories]);

    useEffect(() => {
        const fetchExtras = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/extras');
                setExtras(res.data);
            } catch (err) {
                console.error('Error fetching extras:', err);
            }
        };
        fetchExtras();
    }, []);

    const handleOrder = (url) => {
        if (url) {
            window.open(url, '_blank');
        } else {
            window.open('https://www.ubereats.com', '_blank');
        }
    };

    // Default categories if none provided (legacy support)
    const allCategories = [
        { id: 'Sides', label: 'Sides' },
        { id: 'New Evening Specials', label: 'New Evening Specials' },
        { id: 'Sandwiches', label: 'Sandwiches' },
        { id: 'Submarines', label: 'Submarines' }
    ];

    // Filter categories to show based on props
    const validCategories = categories.length > 0
        ? allCategories.filter(c => categories.includes(c.id))
        : allCategories;

    const filteredItems = extras.filter(item => {
        if (categories.length > 0) {
            return categories.includes(item.category) && item.category === activeCategory;
        }
        return item.category === activeCategory;
    });

    // If showFilterButtons is false, we probably want to show ALL items in the allowed categories?
    // Or still respect activeCategory?
    // For "Sandwiches" section, we just want sandwiches. activeCategory="Sandwiches". 
    // And showFilterButtons=false.
    // The logic above works.

    if (showFilterButtons === false && categories.length === 1 && id !== 'extras') {
        // Special case for generic single category usage if needed, but 'noWrapper' is explicit.
    }

    const content = (
        <>
            {!showFilterButtons && title && <h2 className={`extras-title title-amber`}>{title}</h2>}
            {/* If nested, we might want the title inside or handled by parent. User said "Options Section Title" is separate. 
                But the subtitles/cards need to show. The user said "Remove standalone sections titled Sandwiches".
                So the "Sandwiches" title inside this might be redundant if the button says "Sandwiches".
                User said "Clicking Sandwiches shows ONLY Sandwiches content".
                Usually that implies the grid of items.
                Let's hide the title if noWrapper is true.
            */}

            {showFilterButtons && (
                <div className="extras-buttons-container">
                    {validCategories.map((category) => (
                        <button
                            key={category.id}
                            className={`extras-category-btn ${activeCategory === category.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            {category.label}
                            {category.id === 'New Evening Specials' && <span className="btn-subtext">(6:00 PM – 11:00 PM)</span>}
                        </button>
                    ))}
                </div>
            )}

            {(showFilterButtons || !categories.length) && !title && <h2 className="extras-title title-amber">Extras</h2>}
            {/* Logic for title display is getting complex. Let's simplify.
                If inside options, we just want the grid.
            */}

            <div className={`extras-content-grid fade-in`}>
                {filteredItems.map((item) => (
                    <div key={item._id} className="extras-card">
                        <div
                            className="extras-card-image"
                            style={{ backgroundImage: `url(${item.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        ></div>
                        <div className="extras-card-body">
                            <h3 className="card-title">{item.title}</h3>
                            <p className="card-description">{item.subtitle}</p>
                            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Rs. {item.price}</div>
                            <div className="extras-buttons">
                                <button className="order-btn uber" onClick={() => handleOrder(item.uberLink)}>
                                    Order with Uber
                                </button>
                                <button className="order-btn pickme" onClick={() => handleOrder(item.pickMeLink)}>
                                    Order with PickMe
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {filteredItems.length === 0 && <p style={{ textAlign: 'center', width: '100%', gridColumn: '1/-1' }}>No items available in this category.</p>}
            </div>
        </>
    );

    if (id === 'sandwiches' || id === 'submarines' || window.location.hash.includes(id)) {
        // This is a hacky check. Rely on prop.
    }

    // New prop: simpleMode (or noWrapper)
    // I will read the prop from arguments first.

    // RETURNING TO ORIGINAL PLAN: Replace the component return.
    // I need to update the function signature first.
    return (
        <div className={showFilterButtons ? "container" : "extras-inner"}>
            {/* If showFilterButtons is true (default extras), keep standard layout. 
                 If false (options tabs), just return content? 
                 Actually, reusing the container class is fine if we strip the section padding.
             */}
            {showFilterButtons ? (
                <section className="extras-section" id={id}>
                    <div className="container">
                        <h2 className={`extras-title title-amber`}>{title}</h2>
                        {/* Buttons */}
                        <div className="extras-buttons-container">
                            {validCategories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`extras-category-btn ${activeCategory === category.id ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(category.id)}
                                >
                                    {category.label}
                                    {category.id === 'New Evening Specials' && <span className="btn-subtext">(6:00 PM – 11:00 PM)</span>}
                                </button>
                            ))}
                        </div>
                        {/* Grid */}
                        <div className={`extras-content-grid fade-in`}>
                            {/* ... items ... */}
                            {filteredItems.map((item) => (
                                <div key={item._id} className="extras-card">
                                    <div
                                        className="extras-card-image"
                                        style={{ backgroundImage: `url(${item.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                    ></div>
                                    <div className="extras-card-body">
                                        <h3 className="card-title">{item.title}</h3>
                                        <p className="card-description">{item.subtitle}</p>
                                        <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Rs. {item.price}</div>
                                        <div className="extras-buttons">
                                            <button className="order-btn uber" onClick={() => handleOrder(item.uberLink)}>
                                                Order with Uber
                                            </button>
                                            <button className="order-btn pickme" onClick={() => handleOrder(item.pickMeLink)}>
                                                Order with PickMe
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {filteredItems.length === 0 && <p style={{ textAlign: 'center', width: '100%', gridColumn: '1/-1' }}>No items available in this category.</p>}
                        </div>
                    </div>
                </section>
            ) : (
                <div className={`extras-content-grid fade-in`}>
                    {filteredItems.map((item) => (
                        <div key={item._id} className="extras-card">
                            <div
                                className="extras-card-image"
                                style={{ backgroundImage: `url(${item.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                            ></div>
                            <div className="extras-card-body">
                                <h3 className="card-title">{item.title}</h3>
                                <p className="card-description">{item.subtitle}</p>
                                <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Rs. {item.price}</div>
                                <div className="extras-buttons">
                                    <button className="order-btn uber" onClick={() => handleOrder(item.uberLink)}>
                                        Order with Uber
                                    </button>
                                    <button className="order-btn pickme" onClick={() => handleOrder(item.pickMeLink)}>
                                        Order with PickMe
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredItems.length === 0 && <p style={{ textAlign: 'center', width: '100%', gridColumn: '1/-1' }}>No items available in this category.</p>}
                </div>
            )}
        </div>
    );
};

export default Extras;
