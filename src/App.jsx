import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css';
import { BettingProvider } from './Context/BettingContext';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import StrategiesSection from './components/StrategiesSection';
import Footer from './components/Footer';
import BookmakerDetail from './components/BookmakerDetail';
import GuideDetail from './components/GuideDetail';
import StrategyDetail from './components/StrategyDetail';

async function authAction({ request }) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  
  if (payload.intent === 'sign-in' && payload.email) {
    localStorage.setItem('rebel_user', JSON.stringify({ email: payload.email }));
    window.dispatchEvent(new Event('auth-change'));
  }

  try {
    const res = await fetch('http://localhost:3001/${endpoint}', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    alert(`Success (${payload.intent})! Logged in as ${payload.email || 'Trial User'}`);
    return data;
  } catch (err) {
    alert(`Signed in locally (${payload.intent})`);
    return { status: 'offline-ok', ...payload };
  }
}

function Layout() {
  return (
    <div className="app-wrapper">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    action: authAction,
    children: [
      { index: true, element: <><Hero /><StrategiesSection /></> },
      { path: 'bookmakers/:bookmakerId', element: <BookmakerDetail /> },
      { path: 'learning/:topicSlug', element: <GuideDetail /> },
      { path: 'strategies/:strategySlug', element: <StrategyDetail /> },
    ],
  },
]);

export default function App() {
  return (
    <BettingProvider>
      <RouterProvider router={router} />
    </BettingProvider>
  );
}

