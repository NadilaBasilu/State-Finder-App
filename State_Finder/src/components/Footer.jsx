import React from 'react';
import '../styles/Footer.css';

/**
 * PropertyFinder-style Footer Component
 */
function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            {/* Main Footer Content */}
            <div className="footer-main">
                <div className="footer-container">
                    <div className="footer-grid">
                        {/* Brand Section */}
                        <div className="footer-column footer-brand">
                            <h2 className="footer-logo">
                                Property<span className="logo-highlight">Vision</span>
                            </h2>
                            <p className="footer-description">
                                Your reliable guide to discovering the ideal property.
                                Search with confidence, explore freely, and uncover your dream home effortlessly.
                            </p>
                            <div className="social-icons">
                                <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                                    <span className="icon-text">f</span>
                                </a>
                                <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                                    <span className="icon-text">𝕏</span>
                                </a>
                                <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                    <span className="icon-text">📷</span>
                                </a>
                                <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                                    <span className="icon-text">in</span>
                                </a>
                            </div>
                        </div>


                        {/* Quick Links */}
                        <div className="footer-column">
                            <h4>Quick Links</h4>
                            <ul className="footer-links">
                                <li><a href="/">Home</a></li>
                                <li><a href="/">Properties</a></li>
                                <li><a href="/">About Us</a></li>
                                <li><a href="/">Contact</a></li>
                                <li><a href="/">FAQ</a></li>
                            </ul>
                        </div>

                        {/* Property Types */}
                        <div className="footer-column">
                            <h4>Property Types</h4>
                            <ul className="footer-links">
                                <li><a href="/">Houses</a></li>
                                <li><a href="/">Flats</a></li>
                                <li><a href="/">Apartments</a></li>
                                <li><a href="/">Land</a></li>
                                <li><a href="/">New Builds</a></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="footer-column">
                            <h4>Contact Us</h4>
                            <ul className="footer-contact">
                                <li>
                                    <span className="contact-icon">📍</span>
                                    <div className="contact-text">
                                        <span>123 Property Street</span>
                                        <span>London, UK</span>
                                    </div>
                                </li>
                                <li>
                                    <span className="contact-icon">📞</span>
                                    <div className="contact-text">
                                        <span>+44 20 1234 5678</span>
                                    </div>
                                </li>
                                <li>
                                    <span className="contact-icon">✉️</span>
                                    <div className="contact-text">
                                        <span>info@propertyfinder.com</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="footer-container">
                    <div className="footer-bottom-content">
                        <p>&copy; {currentYear} PropertyFinder. All rights reserved.</p>
                        <div className="footer-legal">
                            <a href="/">Privacy Policy</a>
                            <span className="separator">•</span>
                            <a href="/">Terms of Service</a>
                            <span className="separator">•</span>
                            <a href="/">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
