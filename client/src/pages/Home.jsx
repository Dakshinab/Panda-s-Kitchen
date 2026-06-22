import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Extras from '../components/Extras';
import Popup from '../components/Popup';
import { sectionsData, MenuCategory } from '../components/MenuSections';
import SpecialOffer from '../components/SpecialOffer';
import About from '../components/About';
import Promotions from '../components/Promotions';
import Feedback from '../components/Feedback';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import OptionsSection from '../components/OptionsSection';

const Home = () => {
    // Helper to get data by ID
    const getSectionData = (id) => sectionsData.find(s => s.id === id);

    return (
        <div className="home-page">
            <Popup />
            <Navbar />
            <Hero />

            {/* 1. Extras (Sides & Evening Specials) - Keep separate as requested */}
            <div className="bg-white">
                <Extras
                    id="extras"
                    title="Extras"
                    categories={['Sides', 'New Evening Specials']}
                    showFilterButtons={true}
                />
            </div>

            {/* 2. Picked For You - background: yellow, Title: black */}
            <div className="bg-yellow">
                <MenuCategory data={getSectionData('picked-for-you')} titleClass="title-black" />
            </div>

            {/* 3. Appetizers - background: white, Title: amber */}
            <div className="bg-white">
                <MenuCategory data={getSectionData('appetizers')} titleClass="title-amber" />
            </div>

            {/* 3.1 - 3.3 Burgers */}
            <div className="bg-yellow">
                <MenuCategory data={getSectionData('breakfast-burgers')} titleClass="title-black" />
            </div>
            <div className="bg-white">
                <MenuCategory data={getSectionData('regular-burgers')} titleClass="title-amber" />
            </div>
            <div className="bg-yellow">
                <MenuCategory data={getSectionData('ultra-max-burgers')} titleClass="title-black" />
            </div>

            {/* NEW: Options Section (Sandwiches, Submarines, Combo Deals) */}
            <div className="bg-white">
                <OptionsSection />
            </div>

            {/* 4. Limited Time Offer - background: yellow, Title: black */}
            <div className="bg-yellow">
                <SpecialOffer />
            </div>

            {/* 5. Happy Customers - background: white, Title: amber */}
            <div className="bg-white">
                <Feedback />
            </div>

            {/* 6. Our Story - background: yellow, Title: black */}
            <div className="bg-yellow">
                <About />
            </div>

            {/* 7. Special Offers (Promotions) - Keeping at bottom or removing?
                User said remove "Sandwiches" and "Submarines" sections.
                User did NOT say remove "Special Offers" section. 
                However, "Combo Deals" in Options likely mirrors this.
                I will allow it to exist as a bottom "Promotions" section as well (maybe for visibility).
                But it might be better to remove it if "Combo Deals" is the same.
                I'll keep it for now as "Special Offers" might be distinct in user's mind from "Options".
                Actually, the user named the button "Combo Deals". The component is "Promotions".
                I'll leave this here as per "Restrictions: Do NOT add new sections... Do NOT remove..." (User said remove Sandwiches/Submarines).
                So I keep this.
            */}
            <div className="bg-white">
                <Promotions />
            </div>

            {/* 8. Get in Touch - background: yellow, Title: black */}
            <div className="bg-yellow">
                <Contact />
            </div>

            <Footer />
        </div>
    );
};

export default Home;
