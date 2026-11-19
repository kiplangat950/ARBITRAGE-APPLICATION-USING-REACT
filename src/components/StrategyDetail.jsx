import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBetting } from '../Context/BettingContext';

export default function StrategyDetail() {
  const { strategySlug } = useParams();
  const { strategies, sendPost, response } = useBetting();
  const strategy = strategies.find((s) => s.slug === strategySlug);

  if (!strategy) return <p>Not found</p>;

  return (
    <div>
      <Link to="/">← Back</Link>
      <h1>{strategy.title}</h1>
      <p>{strategy.text}</p>
      <button onClick={() => sendPost('/activate-strategy', { strategySlug })}>
        Activate Strategy (POST)
      </button>
      {response && <pre>{JSON.stringify(response)}</pre>}
    </div>
  );
}
