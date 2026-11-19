import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { BettingProvider } from './Context/BettingContext';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import StrategiesSection from './components/StrategiesSection';
import Footer from './components/Footer';
import BookmakerDetail from './components/BookmakerDetail';
import GuideDetail from './components/GuideDetail';

export default function App() {
  return (
    <BettingProvider>
      <BrowserRouter>
        <div className="app-wrapper">
          <NavBar />
          <Routes>
            <Route path="/" element={<><Hero /><StrategiesSection /></>} />
            <Route path="/bookmakers/:bookmakerId" element={<BookmakerDetail />} />
            <Route path="/learning/:topicSlug" element={<GuideDetail />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </BettingProvider>
  );
}




