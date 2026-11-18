import React, { useState } from 'react';
import Form from './Form';

const liveFeeds = [
  {
    profit: '12.3%',
    event: `football: FC Bayern Munich — Hertha BSC
Both Score (BOTH TO SCORE
                          YES .Highest: tipico  2.10
                          NO.   Highest: 1xbet  2.4)`,
  },
  { profit: '3.2%', event: 'MLB: Mets at Cardinals (Run Line)' },
  { profit: '2.9%', event: 'NBA: Heat at Nuggets (Total Points)' },
  { profit: '4.1%', event: 'EPL: Chelsea vs Arsenal (Moneyline)' },
];

const calendarDays = [
  null, null, 15, 35, -26.7, 27, 35,
  33, 22, 46.1, 28, -11.2, 10, 18,
];

export default function StrategiesSection() {
  const [showLeadCard, setShowLeadCard] = useState(true);

  return (
    <section className="proven-strategies-section">
      <div className="container strategy-container">
        <div className="strategy-info-block">
          <h2 className="strategy-main-title">
            Proven strategies to win on{' '}
            <span className="text-highlight-blue">Kalshi</span>,{' '}
            <span className="text-highlight-blue">DraftKings</span> + more.
          </h2>

          <div className="strategy-cta-group">
            <a href="#trial" className="strategy-primary-btn">Start a free trial</a>
            <a href="#calculator" className="strategy-secondary-btn">See how much you can make</a>
          </div>

          <p className="strategy-footnote">7 days free. Cancel anytime.</p>

          {/* Moved the 4 Arbitrage Feed boxes directly below "Proven strategies to win on Kalshi..." */}
          <div className="feed-container" style={{ marginTop: '20px', marginBottom: '20px' }}>
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

          {showLeadCard && (
            <div className="inbox-lead-card">
              <div className="lead-header">
                <h4>Want free, profitable bets sent to your inbox?</h4>
                <button
                  type="button"
                  className="close-lead-btn"
                  onClick={() => setShowLeadCard(false)}
                >
                  ×
                </button>
              </div>

              <div className="lead-promo-badge">
                <span className="promo-percentage">5.99%</span>
                <span className="promo-details">Milwaukee Bucks vs Los Angeles Lakers</span>
              </div>

              <Form placeholder="Your email" buttonText="Send me the best bets" />
            </div>
          )}
        </div>

        <div className="strategy-dashboard-block">
          <div className="profit-tracker-card">
            <div className="tracker-header">
              <div className="user-profile-meta">
                <div className="avatar-placeholder">🐧</div>
                <div>
                  <span className="profile-username">
                    @dapenguinnnn <span className="verified-badge">✓</span>
                  </span>
                  <span className="profile-date">Sep 2026</span>
                </div>
              </div>

              <div className="net-profit-display">
                <small>NET PROFIT</small>
                <span className="profit-amount">+$2000</span>
              </div>
            </div>

            <div className="calendar-grid">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                <div key={idx} className="day-label">{day}</div>
              ))}

              {calendarDays.map((val, idx) => {
                if (val === null) {
                  return <div key={idx} className="calendar-cell empty" />;
                }
                const isProfit = val >= 0;
                return (
                  <div
                    key={idx}
                    className={`calendar-cell ${isProfit ? 'profit' : 'loss'}`}
                  >
                    {isProfit ? `+$${val}` : `-$${Math.abs(val)}`}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


