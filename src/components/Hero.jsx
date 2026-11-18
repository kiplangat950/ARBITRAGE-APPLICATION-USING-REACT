import React from 'react';
import Form from './Form';
import PhoneMockup from './ArbitrageCard';

const liveFeeds = [
  { profit: '12.3%', event: `football: FC Bayern Munich — Hertha BSC
Both Score (BOTH TO SCORE
                          YES .Highest: tipico  2.10
                          NO.   Highest: 1xbet  2.4)`
 },
  { profit: '3.2%', event: 'MLB: Mets at Cardinals (Run Line)' },
  { profit: '2.9%', event: 'NBA: Heat at Nuggets (Total Points)' },
  { profit: '4.1%', event: 'EPL: Chelsea vs Arsenal (Moneyline)' },
];

const partners = [
  'Betfair',
  'CMD368',
  'PIWI247',
  'Polymarket',
  'Singbet (Only accessed via aggregated bookies)',
  'Kalshi',
  '://premiumtradings.com',
  'Bet-Football (Betting Broker)',
  'BetinAsia (Broker)',
  'Asian Odds - Aggregated bookie',
  'And more...',
];

export default function Hero() {
  return (
    <main className="hero-banner-section">
      <div className="container hero-grid">
        <div className="hero-content-block">
          <h1 className="hero-main-title">Find an easier way to bet...</h1>

          <p className="hero-subtext-description">
            We major on Arbitrage and +EV betting to ensure our clients safeguard their bankroll and rake in profits every week!
          </p>

          <Form placeholder="✉ Enter email" buttonText="Start free trial" />

          <div className="feed-container">
            {liveFeeds.map((feed, idx) => (
              <div key={idx} className="simple-feed-box">
                <p className="feed-title">● ARBITRAGE FEED</p>
                <div className="feed-content">
                  <span className="profit-highlight">{feed.profit}</span>
                  <span className="feed-text">{feed.event}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="trustpilot-rating-badge">
            <span className="trust-label">Great</span>
            <span className="stars-placeholder">★★★★★</span>
            <span className="brand-label">Trustpilot</span>
          </div>

          <div className="partner-statement-block">
            <p className="statement-intro-text">
              We work with betting companies and Exchanges that accept EV betting, Arbing, and provide high betting limits:
            </p>
            <ul className="partner-downward-list">
              {partners.map((partner, index) => (
                <li
                  key={index}
                  className={partner === 'And more...' ? 'list-more-highlight' : ''}
                >
                  ➔ {partner}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hero-media-showcase-block">
          <PhoneMockup />
        </div>
      </div>
    </main>
  );
}
