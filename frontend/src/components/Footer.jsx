import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-top">
        <div className="footer-brand-section">
          <h2 className="footer-brand">
            <span className="brand-icon">🌿</span> <span className="glow-gold">S-Mart</span>
          </h2>
          <p className="footer-description">
            Your smart grocery store & order management system. We bring the freshest, most organic produce straight from the farms to your door.
          </p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Shop Products</Link></li>
              <li><Link to="/cart">Your Cart</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Customer Service</h3>
            <ul>
              <li><Link to="/returns">Returns Policy</Link></li>
              <li><Link to="/exchanges">Exchanges</Link></li>
              <li><Link to="/faq">Track Order</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Contact Us</h3>
            <ul className="contact-info">
              <li>📍 123 Green Avenue, Fresh City</li>
              <li>📞 +1 (800) 123-4567</li>
              <li>✉️ support@s-mart.com</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} S-Mart — <span className="footer-tagline">growing goodness, every day 🌱</span></p>
          <div className="payment-methods">
            <span>💳</span>
            <span>🏦</span>
            <span>💵</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
