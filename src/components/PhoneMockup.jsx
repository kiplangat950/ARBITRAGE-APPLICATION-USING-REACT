import React from 'react';

export default function PhoneMockup() {
  return (
    <div className="phone-frame">
      <div className="phone-notch" />

      <div className="phone-live-bar">
        <span className="live-pill">● LIVE ARB</span>
        <span className="roi-pill">+15.0% ROI</span>
      </div>

      <div className="phone-match-card">
        <h3>Leeds vs Hull city</h3>
        <p className="market">over/under</p>

        <div className="odds-row">
          <span>over: <strong>Novibet</strong></span>
          <span id="price-blue">2.00*100$=-200$</span>
        </div>

        <div className="odds-row">
          <span>under: <strong>Bet365</strong></span>
          <span id="price-green">2.30*100$=+230$</span>
        </div>

        <p className="win-notice">
          <em>You win either way!</em>
        </p>
      </div>
    </div>
  );
}
