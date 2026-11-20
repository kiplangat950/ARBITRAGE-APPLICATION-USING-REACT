import React from 'react';

const ArbitrageCard = () => {
  return (
    <>
      <style>{`
        .arb-card {
          width: 100%;
          max-width: 448px;
          border-radius: 16px;
          background-color: #0e151a;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.65);
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #ffffff;
          box-sizing: border-box;
          margin: 0 auto;
        }
        .arb-card * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        .arb-header {
          padding: 24px 24px 20px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .arb-league {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 500;
          color: #9ca3af;
          margin-bottom: 4px;
        }
        .arb-icon-sm {
          width: 14px;
          height: 14px;
          color: #9ca3af;
        }
        .arb-player {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.025em;
          color: #ffffff;
        }
        .arb-subtitle {
          font-size: 12px;
          color: #9ca3af;
          margin-top: 2px;
        }
        .arb-badge {
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 600;
          background-color: rgba(16, 185, 129, 0.12);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.25);
        }
        .arb-split-info {
          padding: 20px 16px 8px 16px;
          text-align: center;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #9ca3af;
          text-transform: uppercase;
        }
        .arb-grid {
          padding: 16px 24px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          position: relative;
        }
        .arb-divider {
          position: absolute;
          left: 50%;
          top: 16px;
          bottom: 16px;
          width: 1px;
          background-color: rgba(255, 255, 255, 0.1);
          transform: translateX(-50%);
        }
        .arb-col {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .arb-outcome-label {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #d1d5db;
        }
        .arb-outcome-profit {
          font-size: 24px;
          font-weight: 700;
          margin-top: 2px;
          margin-bottom: 24px;
        }
        .arb-bars-container {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 16px;
          height: 144px;
          width: 100%;
        }
        .arb-bar-group {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .arb-bar-value {
          font-size: 11px;
          font-weight: 500;
          margin-bottom: 6px;
        }
        .text-green { color: #35b865; }
        .text-red { color: #49c022; }
        .arb-bar {
          width: 44px;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 10px;
        }
        .bar-green {
          background: linear-gradient (to top, rgba(106, 216, 37, 0.3), rgba(158, 199, 54, 0.8));
          border-top: 1px solid rgba(110, 231, 183, 0.4);
        }
        .bar-red {
          background: linear-gradient(to top, rgba(225, 29, 72, 0.3), rgba(251, 113, 133, 0.8));
          border-top: 1px solid rgba(253, 164, 175, 0.4);
        }
        .h-342 { height: 112px; }
        .h-300 { height: 96px; }
        .h-187 { height: 64px; }
        .h-231 { height: 80px; }
        .book-badge {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
        }
        .book-fd { background-color: #1493ff; }
        .book-fd svg { width: 14px; height: 14px; color: #ffffff; }
        .book-bet365 {
          background-color: #027b5b;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 6.5px;
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1;
        }
        .book-bet365 .bet-white { color: #ffffff; }
        .book-bet365 .bet-yellow { color: #ffdf1b; }
        .arb-odds {
          font-size: 12px;
          font-weight: 500;
          color: #d1d5db;
          margin-top: 8px;
        }
        .arb-footer {
          background-color: #0b1116;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 16px 24px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          text-align: center;
        }
        .arb-footer-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #9ca3af;
          text-transform: uppercase;
        }
        .arb-footer-val {
          font-size: 18px;
          font-weight: 700;
          margin-top: 2px;
        }
      `}</style>

      <div className="arb-card">
        
        <div className="arb-header">
          <div>
            <div className="arb-league">
              <svg className="arb-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="12 7 16.5 10.2 14.8 15.5 9.2 15.5 7.5 10.2 12 7" />
                <line x1="12" y1="2" x2="12" y2="7" />
                <line x1="21.5" y1="8.8" x2="16.5" y2="10.2" />
                <line x1="17.8" y1="19.8" x2="14.8" y2="15.5" />
                <line x1="6.2" y1="19.8" x2="9.2" y2="15.5" />
                <line x1="2.5" y1="8.8" x2="7.5" y2="10.2" />
              </svg>
              <span>AFCON</span>
            </div>
            <h2 className="arb-player">DRC Congo vs Egypt</h2>
            <p className="arb-subtitle">Over and Under 2.5 Line</p>
          </div>

          <span className="arb-badge">8.6% locked</span>
        </div>

        
        <div className="arb-split-info">
          $200 ON THE OVER, $300 ON THE UNDER
        </div>

        <div className="arb-grid">
          <div className="arb-divider" />

          {}
          <div className="arb-col">
            <div className="arb-outcome-label">
              <svg className="arb-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Over 2.5 wins</span>
            </div>
            <div className="arb-outcome-profit">+30$</div>

            <div className="arb-bars-container">
              <div className="arb-bar-group">
                <span className="arb-bar-value text-green">+$342</span>
                <div className="arb-bar bar-green h-342">
                  <div className="book-badge book-fd">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M4 4h16v16H4z" />
                      <path d="M4 12l16-8M4 20l16-8" />
                    </svg>
                  </div>
                </div>
                <span className="arb-odds">2.83-Over</span>
              </div>

              <div className="arb-bar-group">
                <span className="arb-bar-value text-red">-$300</span>
                <div className="arb-bar bar-red h-300">
                  <div className="book-badge book-bet365">
                    <span className="bet-white">bet</span>
                    <span className="bet-yellow">365</span>
                  </div>
                </div>
                <span className="arb-odds">1.77-Under</span>
              </div>
            </div>
          </div>

        
          <div className="arb-col">
            <div className="arb-outcome-label">
              <svg className="arb-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Under 2.5 wins</span>
            </div>
            <div className="arb-outcome-profit">+$66</div>

            <div className="arb-bars-container">
              <div className="arb-bar-group">
                <span className="arb-bar-value text-red">-$187</span>
                <div className="arb-bar bar-red h-187">
                  <div className="book-badge book-fd">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M4 4h16v16H4z" />
                      <path d="M4 12l16-8M4 20l16-8" />
                    </svg>
                  </div>
                </div>
                <span className="arb-odds">2.83</span>
              </div>

              <div className="arb-bar-group">
                <span className="arb-bar-value text-green">+$231</span>
                <div className="arb-bar bar-green h-231">
                  <div className="book-badge book-bet365">
                    <span className="bet-white">bet</span>
                    <span className="bet-yellow">365</span>
                  </div>
                </div>
                <span className="arb-odds">1.77-Under</span>
              </div>
            </div>
          </div>
        </div>

        
        <div className="arb-footer">
          <div>
            <div className="arb-footer-label">You wager</div>
            <div className="arb-footer-val">$500</div>
          </div>
          <div>
            <div className="arb-footer-label">You make</div>
            <div className="arb-footer-val">$30–$66</div>
          </div>
        </div>
      </div>

</>
);
};
export default ArbitrageCard;
