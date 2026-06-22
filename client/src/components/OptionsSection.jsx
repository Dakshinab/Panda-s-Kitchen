import React, { useState, useEffect } from 'react';
import Extras from './Extras';
import Promotions from './Promotions';
import './Extras.css'; // Re-use styles

const OptionsSection = () => {
    const [activeTab, setActiveTab] = useState('sandwiches');

    // Listen for external navigation events (from Navbar)
    useEffect(() => {
        const handleSwitch = (e) => {
            if (e.detail && ['sandwiches', 'submarines', 'combo-deals'].includes(e.detail)) {
                setActiveTab(e.detail);
                document.getElementById('options-section')?.scrollIntoView({ behavior: 'smooth' });
            }
        };
        window.addEventListener('switchOption', handleSwitch);
        return () => window.removeEventListener('switchOption', handleSwitch);
    }, []);

    const tabs = [
        { id: 'sandwiches', label: 'Sandwiches' },
        { id: 'submarines', label: 'Submarines' },
        { id: 'combo-deals', label: 'Combo Deals' }
    ];

    return (
        <section id="options-section" className="extras-section" style={{ minHeight: '600px', overflowX: 'hidden' }}>
            <div className="container">
                <h2 className="extras-title title-amber">More To Explore</h2>

                {/* Tab Buttons */}
                <div className="extras-buttons-container">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`extras-category-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area - Sliding Animation Container */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>

                    {/* Sandwiches */}
                    <div
                        style={{
                            display: activeTab === 'sandwiches' ? 'block' : 'none',
                            animation: 'slideInRight 0.5s ease-out'
                        }}
                    >
                        <Extras categories={['Sandwiches']} showFilterButtons={false} />
                    </div>

                    {/* Submarines */}
                    <div
                        style={{
                            display: activeTab === 'submarines' ? 'block' : 'none',
                            animation: 'slideInRight 0.5s ease-out'
                        }}
                    >
                        <Extras categories={['Submarines']} showFilterButtons={false} />
                    </div>

                    {/* Combo Deals */}
                    <div
                        style={{
                            display: activeTab === 'combo-deals' ? 'block' : 'none',
                            animation: 'slideInRight 0.5s ease-out'
                        }}
                    >
                        <Promotions isSimple={true} />
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slideInRight {
                    from { transform: translateX(20px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </section>
    );
};

export default OptionsSection;
