import React, { useState, useEffect } from 'react';
import { useSubmit } from 'react-router-dom';

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
  const [signInOpen, setSignInOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('rebel_user');
    return saved ? JSON.parse(saved) : null;
  });

  const submit = useSubmit();

  useEffect(() => {
    const syncUser = () => {
      const saved = localStorage.getItem('rebel_user');
      setUser(saved ? JSON.parse(saved) : null);
    };

    window.addEventListener('auth-change', syncUser);
    return () => window.removeEventListener('auth-change', syncUser);
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    submit({ email, password, intent: 'sign-in' }, { method: 'post', action: '/' });
    setEmail('');
    setPassword('');
    setSignInOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('rebel_user');
    window.dispatchEvent(new Event('auth-change'));
  };

  const handleTrial = () => {
    submit({ intent: 'navbar-free-trial' }, { method: 'post', action: '/' });
  };

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

        <div className="user-actions-area" style={{ position: 'relative' }}>
          <button type="button" className="btn-outline">🌐 <span>▼</span></button>

          {user ? (
            <>
              <span style={{ color: '#34d399', fontSize: '13px', fontWeight: '600' }}>
                {user.email}
              </span>
              <button type="button" className="btn-ghost" onClick={handleLogout}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn-ghost" onClick={() => setSignInOpen(!signInOpen)}>
                Sign in <span>▼</span>
              </button>
              <button type="button" className="btn-primary" onClick={handleTrial}>
                Start free trial
              </button>
            </>
          )}

          {signInOpen && !user && (
            <form
              onSubmit={handleSignIn}
              className="tools-dropdown-menu"
              style={{ right: 0, left: 'auto', minWidth: '220px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="btn-primary">Log In</button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}
