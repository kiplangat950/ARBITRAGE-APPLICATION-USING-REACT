import React, { createContext, useContext, useState } from 'react';

const BettingContext = createContext();

export function BettingProvider({ children }) {
  const [response, setResponse] = useState(null);

  const bookmakers = [
    { id: 'betfair', name: 'Betfair', limit: 'Very High' },
    { id: 'polymarket', name: 'Polymarket', limit: 'High' },
  ];

  const guides = [
    { slug: 'arbitrage-101', title: 'Arbitrage Betting 101', text: 'Cover all outcomes for guaranteed profit.' },
  ];

  const strategies = [
    { slug: 'positive-ev', title: '+EV Betting', text: 'Beat the closing line using sharp market odds.' },
  ];

  const sendPost = async (actionType, payload) => {
    const res = await fetch('http://localhost:3001/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: actionType, ...payload }),
    });
    const data = await res.json();
    setResponse(data);
  };

  return (
    <BettingContext.Provider value={{ bookmakers, guides, strategies, sendPost, response }}>
      {children}
    </BettingContext.Provider>
  );
}

export const useBetting = () => useContext(BettingContext);
