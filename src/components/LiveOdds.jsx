import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_KEY = 'e7eab6358e748386b75e5e077c24b709';

export default function LiveOdds() {
  const [matches, setMatches] = useState([]);
  const [stake, setStake] = useState(500);
  const [sport, setSport] = useState('upcoming');
  const [market, setMarket] = useState('totals');
  const [creditsLeft, setCreditsLeft] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFromOddsApi = async () => {
    setIsLoading(true);
    setError(null);

    try {
             const host = ['api', 'the-odds-api', 'com'].join('.');
      const url = `https://${host}/v4/sports/${sport}/odds?apiKey=${API_KEY}&regions=eu,uk&markets=${market}&oddsFormat=decimal`;

      const res = await fetch(url);

      const remaining = res.headers.get('x-requests-remaining');
      if (remaining) setCreditsLeft(remaining);

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `API Error: ${res.status}`);
      }

      const data = await res.json();
      setMatches(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFromOddsApi();
  }, [sport, market]);

  const calculateArb = (bookmakers, totalStake) => {
    const bestOdds = {};

    bookmakers.forEach((bookie) => {
      const selectedMarket = bookie.markets && bookie.markets[0];
      if (!selectedMarket || !selectedMarket.outcomes) return;

      selectedMarket.outcomes.forEach((outcome) => {
        const key = outcome.point !== undefined ? `${outcome.name} ${outcome.point}` : outcome.name;

        if (!bestOdds[key] || outcome.price > bestOdds[key].price) {
          bestOdds[key] = {
            name: outcome.name,
            point: outcome.point,
            price: outcome.price,
            bookie: bookie.title,
          };
        }
      });
    });

    if (market === 'totals') {
      const points = [...new Set(Object.values(bestOdds).map((o) => o.point).filter((p) => p !== undefined))];
      for (const pt of points) {
        const over = bestOdds[`Over ${pt}`];
        const under = bestOdds[`Under ${pt}`];
        if (over && under) {
          const probSum = 1 / over.price + 1 / under.price;
          if (probSum < 1) {
            return buildResult([over, under], probSum, totalStake);
          }
        }
      }
      return null;
    }

    const outcomes = Object.values(bestOdds);
    if (outcomes.length < 2) return null;

    const probSum = outcomes.reduce((sum, info) => sum + 1 / info.price, 0);
    if (probSum >= 1) return null;

    return buildResult(outcomes, probSum, totalStake);
  };

  const buildResult = (outcomes, probSum, totalStake) => {
    const profitPercent = ((1 / probSum - 1) * 100).toFixed(2);
    const guaranteedProfit = (totalStake / probSum - totalStake).toFixed(2);

    const splits = outcomes.map((info) => ({
      outcome: info.name,
      point: info.point,
      bookie: info.bookie,
      odds: info.price,
      stake: ((totalStake * (1 / info.price)) / probSum).toFixed(2),
    }));

    return { profitPercent, guaranteedProfit, splits };
  };

  const arbMatches = matches
    .map((match) => ({ ...match, arb: calculateArb(match.bookmakers, stake) }))
    .filter((match) => match.arb !== null);

  return (
    <div style={{ padding: '2rem', color: 'white', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>
          ← Back to Home
        </Link>
        {creditsLeft !== null && (
          <span style={{ fontSize: '12px', color: '#facc15', background: '#161b22', padding: '4px 10px', borderRadius: '6px', border: '1px solid #30363d' }}>
            Odds API Credits Left: {creditsLeft}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
        <div>
          <h2 style={{ margin: 0 }}>Live Odds API Arbitrage Scanner</h2>
          <p style={{ color: '#9ca3af', fontSize: '13px', margin: '4px 0 0' }}>
            Scanned {matches.length} live games • Found {arbMatches.length} guaranteed arbitrage(s)
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <select
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '6px', background: '#0d1117', color: 'white', border: '1px solid #30363d' }}
          >
            <option value="upcoming">All Upcoming Sports</option>
            <option value="soccer_epl">Soccer - EPL</option>
            <option value="soccer_uefa_champs_league">UEFA Champions League</option>
            <option value="basketball_nba">Basketball - NBA</option>
          </select>

          <select
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '6px', background: '#0d1117', color: 'white', border: '1px solid #30363d' }}
          >
            <option value="totals">Over / Under (Totals)</option>
            <option value="h2h">Match Winner (1X2 / H2H)</option>
          </select>

          <input
            type="number"
            value={stake}
            onChange={(e) => setStake(Number(e.target.value) || 0)}
            placeholder="Wager ($)"
            style={{ width: '85px', padding: '6px 10px', borderRadius: '6px', background: '#0d1117', color: 'white', border: '1px solid #30363d' }}
          />

          <button onClick={fetchFromOddsApi} className="btn-primary">
            Scan Live
          </button>
        </div>
      </div>

      {isLoading && <p style={{ marginTop: '1.5rem' }}>Fetching live bookmaker odds from The Odds API...</p>}
      {error && <p style={{ color: '#f87171', marginTop: '1.5rem' }}>Error: {error}</p>}

      {!isLoading && !error && arbMatches.length === 0 && (
        <div style={{ background: '#161b22', padding: '2rem', borderRadius: '10px', marginTop: '1.5rem', textAlign: 'center', border: '1px solid #30363d' }}>
          <p style={{ color: '#9ca3af', margin: 0 }}>
            Scanned <strong>{matches.length}</strong> live matches across EU/UK bookmakers, but 0 guaranteed arbitrage gaps are open right now. Try switching between <strong>Over / Under</strong> and <strong>Match Winner</strong>.
          </p>
        </div>
      )}

      {!isLoading &&
        arbMatches.map((match) => (
          <div
            key={match.id}
            style={{ background: '#161b22', padding: '1.25rem', borderRadius: '10px', marginTop: '1rem', border: '1px solid #' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#facc15', textTransform: 'uppercase' }}>
                  {match.sport_title}
                </span>
                <div style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '2px' }}>
                  {match.home_team} vs {match.away_team}
                </div>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '4px 0 0' }}>
                  {new Date(match.commence_time).toLocaleString()}
                </p>
              </div>

              <span style={{ padding: '5px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold', background: 'rgba(16, 185, 129, 0.15)', color: '#66b5c7' }}>
                ARBITRAGE: +{match.arb.profitPercent}% (+${match.arb.guaranteedProfit})
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginTop: '12px' }}>
              {match.arb.splits.map((s) => (
                <div key={s.outcome} style={{ background: '#0d1117', padding: '10px 14px', borderRadius: '8px', fontSize: '13px' }}>
                  <div style={{ color: '#9ca3af', fontSize: '11px', textTransform: 'uppercase' }}>{s.bookie}</div>
                  <div style={{ fontWeight: 'bold', margin: '4px 0' }}>
                    {s.outcome} {s.point ?? ''} @ <span style={{ color: '#facc15' }}>{s.odds}</span>
                  </div>
                  <div style={{ color: '#e9f0ed', fontWeight: '600' }}>Bet: ${s.stake}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
