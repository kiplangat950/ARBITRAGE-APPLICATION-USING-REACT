import React from 'react';
import Form from './Form';
import ArbitrageCard from './ArbitrageCard';

const partners = [
  'Betfair',
  'CMD368',
  'PIWI247',
  'Polymarket',
  'Singbet (Only accessed via aggregated bookies)',
  'Kalshi',
  'https://premiumtradings.com',
  'Bet-Football (Betting Broker)',
  'BetinAsia (Broker)',
  'Asian Odds - Aggregated bookie',
  'And more...',
];

export default function Hero() {
  return (
    <>
      <style>{`
        .hero-banner-section {
          position: relative;
          overflow: hidden;
        }
        .hero-grid {
          align-items:right !important;
        }
        /* Top Live Pill Badge */
        .hero-eyebrow-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 9999px;
          background-color: rgba(142, 161, 1, 0.1);
          border: 1px solid rgba(159, 15, 157, 0.25);
          color: #d6f414;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #2288e8;
          box-shadow: 0 0 8px #1c5dcd;
        }
        /* Bookmakers Card below Trustpilot */
        .partner-statement-block {
          margin-top: 24px !important;
          padding: 18px 20px !important;
          background-color: rgba(14, 21, 26, 0.85) !important;
          border: 1px solid rgba(14, 76, 189, 0.1) !important;
          border-radius: 12px !important;
          max-width: 600px !important;
          width: 100% !important;
        }
        .statement-intro-text {
          font-size: 14px !important;
          font-weight: 500 !important;
          line-height: 1.5 !important;
          color: #e5e7eb !important;
          margin: 0 0 14px 0 !important;
        }
        .partner-downward-list {
          list-style: none !important;
          padding: 0 !important;
          margin: 0 !important;
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          gap: 10px 24px !important;
        }
        .partner-downward-list li {
          font-size: 13px !important;
          color: #9ca3af !important;
          line-height: 1.4 !important;
          display: flex !important;
          align-items: flex-start !important;
          gap: 6px !important;
          margin: 0 !important;
        }
        .partner-downward-list li.list-more-highlight {
          color: #75807c !important;
          font-weight: 600 !important;
        }
        /* Right Column Glow Behind Arbitrage Card */
        .hero-media-showcase-block {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hero-card-glow {
          position: absolute;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(20, 147, 255, 0.08) 45%, transparent 70%);
          filter: blur(32px);
          pointer-events: none;
          z-index: 0;
        }
        .hero-card-foreground {
          position: relative;
          z-index: 1;
          width: 100%;
        }
        @media (max-width: 640px) {
          .partner-downward-list {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <main className="hero-banner-section">
        <div className="container hero-grid">
          <div className="hero-content-block">
            <div className="hero-eyebrow-badge">
              <span className="eyebrow-dot" />
              <span>Live +EV & Arbitrage Scanner</span>
            </div>

            <h1 className="hero-main-title">Find an easier way to bet...</h1>

            <p className="hero-subtext-description">
              We major on Arbitrage and +EV betting to ensure our clients safeguard their bankroll and rake in profits every week!
            </p>

            <Form placeholder="✉ Enter email" buttonText="Start free trial" />

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
            <div className="hero-card-glow" />
            <div className="hero-card-foreground">
              <ArbitrageCard />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

