import React from 'react';

const footerLinks = [
  'About us',
  'FAQ',
  'Terms & Conditions',
  'Privacy Policy',
  'Gamble Responsibly',
  'Player Complaints Policy',
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-links-row">
          {footerLinks.map((link) => (
            <a key={link} href="#">{link}</a>
          ))}
        </div>

        <div className="footer-disclaimer-text">
          <p>
            Rebel Gambling is operated by BROKER B.V., victor kiplangat, NAKURU, Kenya..holder of a valid Certificate of Operation under license number OGL/2024/1230/1069.BROKER B.V. is a legal company (number 148161) incorporated under the laws of Kenya. This Certificate of Operation is in compliance with the National Ordinance on Offshore Gameing of Kenya ( P.B. 2026, no. 206) and is active. Registration no. HE 392733.
          </p>
        </div>

        <div className="footer-copyright-bar">
          <p>Copyrights © 2026 REBEL BET. © All rights reserved VICTOR KIPLANGAT</p>
        </div>
      </div>
    </footer>
  );
}
