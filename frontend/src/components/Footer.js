import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="mobile-app-section">
          <div className="mobile-app-text">
            <h2>Download Mobile App For Better Experience</h2>
            <div className="app-buttons">
              <button className="app-store-btn google-play">
                <span>GET IT ON</span>
                <span className="store-name">Google Play</span>
              </button>
              <button className="app-store-btn app-store">
                <span>Download on the</span>
                <span className="store-name">App Store</span>
              </button>
            </div>
          </div>
          <div className="mobile-app-image">
            <div className="placeholder-image">📱</div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>Copyright @GreatStack.dev | All right reserved.</p>
          <div className="social-icons">
            <button type="button" aria-label="Facebook" className="social-icon-btn">
              <FaFacebook />
            </button>
            <button type="button" aria-label="Twitter" className="social-icon-btn">
              <FaTwitter />
            </button>
            <button type="button" aria-label="Instagram" className="social-icon-btn">
              <FaInstagram />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

