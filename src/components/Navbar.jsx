import React, { useState } from 'react';

const bookmakers = [
  { name: 'SBOBET', desc: 'Asian Handicap, Totals & Sports Betting Markets', href: '#sbobet' },
  { name: 'Pinnacle', desc: 'High Limits & Lowest Margins', href: '#Pinnacle' },
  { name: 'Matchbook', desc: 'Low Commission Betting Exchange', href: '#Matchbook' },
  { name: 'YouWager', desc: 'Fast Payouts & Competitive Odds', href: '#YouWager' },
  { name: 'Betting Exchanges', desc: 'High Limits & Lowest Margins', href: '#Betting-Exchanges' },
  { name: 'and more...', desc: 'Explore MORE supported sportsbooks', href: '#more' },
];

export default function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="brand-logo-area">
          <a href="#">
            Rebel<span className="logo-highlight">Gambling</span>
          </a>
        </div>

        <div className="menu-links-area">
          <div
            className="betting-tools-wrapper"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              type="button"
              className="tools-trigger"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Bookmakers <span>▼</span>
            </button>

            {dropdownOpen && (
              <div className="tools-dropdown-menu">
                {bookmakers.map((item) => (
                  <a key={item.name} href={item.href} className="dropdown-item">
                    <strong>{item.name}</strong>
                    {item.desc && <small>{item.desc}</small>}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a href="#community">Community <span>▼</span></a>
          <a href="#learning">Learning Hub</a>
          <a href="#pricing">Pricing</a>
          <a href="#blog">Blog</a>
        </div>

        <div className="user-actions-area">
          <button type="button" className="btn-outline">🌐 <span>▼</span></button>
          <button type="button" className="btn-ghost">Sign in <span>▼</span></button>
          <button type="button" className="btn-primary">Start free trial</button>
        </div>
      </div>
    </nav>
  );
}
