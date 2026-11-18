import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import StrategiesSection from './components/StrategiesSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="app-wrapper">
      <NavBar />
      <Hero />
      <StrategiesSection />
      <Footer />
    </div>
  );
}


