import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLayout from './admin/AdminLayout';
import ManageHero from './admin/ManageHero';
import ManageMenu from './admin/ManageMenu';
import ManageExtras from './admin/ManageExtras';
import ManageBeverages from './admin/ManageBeverages';
import ManageOffers from './admin/ManageOffers';
import ManageFeedback from './admin/ManageFeedback';
import ManageOptions from './admin/ManageOptions';
import ManageSettings from './admin/ManageSettings';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<div />} />
          <Route path="hero" element={<ManageHero />} />
          <Route path="extras" element={<ManageExtras />} />
          <Route path="beverages" element={<ManageBeverages />} />
          <Route path="menu" element={<ManageMenu />} />
          <Route path="options" element={<ManageOptions />} />
          <Route path="limited-offer" element={<ManageOffers type="Limited Time" />} />
          <Route path="feedback" element={<ManageFeedback />} />
          <Route path="special-offers" element={<ManageOffers type="Special" />} />
          <Route path="settings" element={<ManageSettings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;