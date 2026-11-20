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
import LiveOdds from './components/LiveOdds';

async function authAction({ request }) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  const endpoint = payload.intent === 'sign-in' ? 'users' : 'trials';

  try {
    const res = await fetch(`http://localhost:3001/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        loggedInAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      throw new Error(`POST failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log(`Successful POST to /${endpoint}:`, data);

    if (payload.intent === 'sign-in' && payload.email) {
      localStorage.setItem('rebel_user', JSON.stringify(data));
      window.dispatchEvent(new Event('auth-change'));
    }

    return data;
  } catch (err) {
    console.error('POST Error:', err.message);
    alert(`Request failed: ${err.message}. Check that json-server is running on port 3001.`);
    return { error: err.message };
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
      { path: 'scanner', element: <LiveOdds /> },
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
