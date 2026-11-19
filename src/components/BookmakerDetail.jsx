import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBetting } from '../context/BettingContext';

export default function BookmakerDetail() {
  const { bookmakerId } = useParams();
  const { bookmakers, sendPost, response } = useBetting();
  const bookie = bookmakers.find((b) => b.id === bookmakerId);

  if (!bookie) return <p>Not found</p>;

  return (
    <div>
      <Link to="/">← Back</Link>
      <h1>{bookie.name} (Limit: {bookie.limit})</h1>
      <button onClick={() => sendPost('/simulate', { bookmakerId })}>
        Simulate Wager (POST)
      </button>
      {response && <pre>{JSON.stringify(response)}</pre>}
    </div>
  );
}
