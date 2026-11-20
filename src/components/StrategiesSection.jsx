import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FEED_ITEMS = [
  { profit: '12.3%', label: 'football: FC Bayern Munich...', to: '/scanner' },
  { profit: '3.2%', label: 'MLB: Mets at Cardinals...', to: '/scanner' },
  { profit: '2.9%', label: 'NBA: Heat at Nuggets...', to: '/scanner' },
  { profit: '4.1%', label: 'EPL: Chelsea vs Arsenal...', to: '/scanner' },
];

const ARBITRAGE_OPPORTUNITIES = [
  { match: 'FC Bayern vs Arsenal', books: 'Pinnacle × Betfair Exchange', badge: '+12.3% Arb', to: '/scanner' },
  { match: 'Chelsea vs Arsenal', books: 'SBOBET × Matchbook', badge: '+4.1% Arb', to: '/scanner' },
];

const EV_OPPORTUNITIES = [
  { match: 'Heat at Nuggets (Total Over)', books: 'Kalshi vs Sharp Closing Line', badge: '+6.4% EV', to: '/strategies/positive-ev' },
  { match: 'Mets at Cardinals (Run Line)', books: 'Polymarket Mispriced Odds', badge: '+3.8% EV', to: '/strategies/positive-ev' },
];

const styles = {
  section: { padding: '4rem 2rem', background: 'transparent', color: 'white' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' },
  heading: { fontSize: '2.2rem', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '1rem' },
  ctaRow: { display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' },
  subtext: { fontSize: '13px', color: '#9ca3af', marginBottom: '1.5rem' },
  feedGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' },
  feedPill: { background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '10px 12px', textDecoration: 'none', color: 'white', fontSize: '12px' },
  feedTag: { color: '#facc15', fontSize: '10px', fontWeight: 'bold', marginBottom: '4px' },
  cardWrapper: { background: '#161b22', border: '1px solid #30363d', borderRadius: '14px', padding: '1.5rem', maxWidth: '460px', width: '100%', margin: '0 auto' },
  tabBar: { display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#0d1117', padding: '4px', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #21262d' },
  listStack: { display: 'flex', flexDirection: 'column', gap: '10px' },
  itemCard: { background: '#0d1117', border: '1px solid #21262d', borderRadius: '8px', padding: '12px', textDecoration: 'none', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  footerLink: { marginTop: '4px', textAlign: 'center', fontSize: '13px', color: '#facc15', textDecoration: 'none', fontWeight: '600' },
};

export default function StrategiesSection() {
  const [activeTab, setActiveTab] = useState('arbitrage');

  const getTabButtonStyle = (tabName) => ({
    padding: '10px 12px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '13px',
    background: activeTab === tabName ? '#facc15' : 'transparent',
    color: activeTab === tabName ? '#000' : '#9ca3af',
    transition: '0.2s',
  });

  return (
    <section style={styles.section}>
      <div className="container" style={styles.grid}>
        {/* Left Column */}
        <div>
          <h2 style={styles.heading}>
            Proven strategies to win on <span style={{ color: '#38bdf8' }}>Kalshi, DraftKings + more.</span>
          </h2>

          <div style={styles.ctaRow}>
            <Link to="/scanner" className="btn-primary" style={{ textDecoration: 'none' }}>
              Start a free trial
            </Link>
            <Link to="/strategies/positive-ev" className="btn-outline" style={{ textDecoration: 'none' }}>
              See how much you can make
            </Link>
          </div>

          <p style={styles.subtext}>7 days free. Cancel anytime.</p>

          <div style={styles.feedGrid}>
            {FEED_ITEMS.map((item, idx) => (
              <Link key={idx} to={item.to} style={styles.feedPill}>
                <div style={styles.feedTag}>● ARBITRAGE FEED</div>
                <span style={{ color: '#34d399', fontWeight: 'bold' }}>{item.profit}</span> {item.label}
              </Link>
            ))}
          </div>
        </div>

        {}
        <div style={styles.cardWrapper}>
          <div style={styles.tabBar}>
            <button type="button" onClick={() => setActiveTab('arbitrage')} style={getTabButtonStyle('arbitrage')}>
              Arbitrage
            </button>
            <button type="button" onClick={() => setActiveTab('ev')} style={getTabButtonStyle('ev')}>
              EV Trading
            </button>
          </div>

          {activeTab === 'arbitrage' ? (
            <div style={styles.listStack}>
              {ARBITRAGE_OPPORTUNITIES.map((item, idx) => (
                <Link key={idx} to={item.to} style={styles.itemCard}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600' }}>{item.match}</div>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>{item.books}</div>
                  </div>
                  <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                    {item.badge}
                  </span>
                </Link>
              ))}
              <Link to="/scanner" style={styles.footerLink}>
                Open Live Multi-Sport Arb Scanner →
              </Link>
            </div>
          ) : (
            <div style={styles.listStack}>
              {EV_OPPORTUNITIES.map((item, idx) => (
                <Link key={idx} to={item.to} style={styles.itemCard}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600' }}>{item.match}</div>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>{item.books}</div>
                  </div>
                  <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                    {item.badge}
                  </span>
                </Link>
              ))}
              <Link to="/strategies/positive-ev" style={styles.footerLink}>
                Explore +EV Trading Strategy →
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
