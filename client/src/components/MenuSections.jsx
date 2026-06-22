import React from 'react';
import axios from 'axios';
import './MenuSections.css';

export const handleOrder = (platform) => {
    if (platform === 'uber') {
        window.open('https://www.ubereats.com', '_blank');
    } else {
        window.open('https://pickme.lk/food', '_blank');
    }
};

export const sectionsData = [
    {
        id: 'picked-for-you',
        title: 'Picked for You',
        subtitle: 'Our chef\'s special recommendations',
        itemTitle: 'Chef\'s Special Combo',
        description: 'A curated selection of our best sellers just for you.'
    },
    {
        id: 'appetizers',
        title: 'Appetizers',
        subtitle: 'Start your meal right',
        itemTitle: 'Crispy Calamari Rings',
        description: 'Golden fried calamari served with tartare sauce.'
    },
    {
        id: 'breakfast-burgers',
        title: 'Breakfast Burgers',
        subtitle: 'Available until 11:00 AM daily',
        itemTitle: 'Morning Glory Burger',
        description: 'A perfect start to your day with egg, cheese, and our signature patty.'
    },
    {
        id: 'regular-burgers',
        title: 'All Day Burgers',
        subtitle: null,
        itemTitle: 'Classic Panda Burger',
        description: 'The burger that started it all. Fresh, juicy, and irresistible.'
    },
    {
        id: 'ultra-max-burgers',
        title: 'Ultra Max Burgers',
        subtitle: null,
        itemTitle: 'The Titan Stack',
        description: 'Double patty, double cheese, double the flavor. For the hungry ones.'
    }
];

export const MenuCategory = ({ data, titleClass }) => {
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                const productsArray = Array.isArray(res.data) ? res.data : [];
                const filtered = productsArray.filter(p => p.category === data.title);
                setProducts(filtered);
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };
        fetchProducts();
    }, [data.title]);

    const handleItemOrder = (url) => {
        if (url) {
            window.open(url, '_blank');
        } else {
            window.open('https://www.ubereats.com', '_blank');
        }
    };

    return (
        <section className="menu-section" id={data.id}>
            <div className="container">
                <div className="section-header">
                    <h2 className={`section-title ${titleClass}`}>{data.title}</h2>
                    {data.subtitle && <p className="section-subtitle">{data.subtitle}</p>}
                </div>

                <div className="menu-grid">
                    {products.map((item) => (
                        <div key={item._id} className="menu-card">
                            <div
                                className="card-image-placeholder"
                                style={{ backgroundImage: `url(${item.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                            ></div>
                            <div className="card-content">
                                <h3 className="card-title">{item.title}</h3>
                                <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Rs. {item.price}</div>
                                <p className="card-description">{item.subtitle}</p>
                                <div className="card-buttons">
                                    <button className="order-btn uber" onClick={() => handleItemOrder(item.uberLink)}>
                                        Order with Uber
                                    </button>
                                    <button className="order-btn pickme" onClick={() => handleItemOrder(item.pickMeLink)}>
                                        Order with PickMe
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {products.length === 0 && (
                        <p style={{ textAlign: 'center', width: '100%', gridColumn: '1/-1' }}>
                            Currently no items in this category.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

const MenuSections = () => {
    return (
        <div className="menu-sections-wrapper">
            {sectionsData.map((section) => (
                <MenuCategory key={section.id} data={section} />
            ))}
        </div>
    );
};

export default MenuSections;
