import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Popup from '../components/Popup';
import Menu from '../components/Menu';
import About from '../components/About';
import Promotions from '../components/Promotions';
import Feedback from '../components/Feedback';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="home-page">
            <Popup />
            <Navbar />
            <Hero />
            <Menu />
            <About />
            <Promotions />
            <Feedback />
            <Contact />
            <Footer />
        </div>
    );
};

export default Home;
