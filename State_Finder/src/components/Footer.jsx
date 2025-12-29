import React from 'react';
import '../styles/Footer.css';

/**
 * Simple Footer Component
 */
function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            {/* Main Footer Content */}
            <div className="footer-main">
                <div className="footer-container">
                    <div className="footer-grid">
                        {/* About Section */}
                        <div className="footer-column">
                            <h4>Property Search</h4>
                            <p className="footer-description">
                                Your trusted partner in finding the perfect property.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="footer-column">
                            <h4>Quick Links</h4>
                            <ul className="footer-links">
                                <li><a href="/">Home</a></li>
                                <li><a href="/">Search</a></li>
                                <li><a href="/">Featured</a></li>
                                <li><a href="/">Contact</a></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="footer-column">
                            <h4>Contact</h4>
                            <ul className="footer-contact">
                                <li>📍 123 Property Street, London</li>
                                <li>📞 +44 20 1234 5678</li>
                                <li>✉️ info@propertysearch.com</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="footer-container">
                    <p>&copy; {currentYear} Property Search. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
