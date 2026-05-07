import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Privon</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/press">Press</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Policies</h4>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Use</a></li>
            <li><a href="/returns">Return Policy</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Social</h4>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="https://x.com" target="_blank" rel="noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li><a href="/contact">Get In Touch</a></li>
            <li>📧 sm9070355@gmail.com</li>
            <li>📱 +91-7061605946</li>
            <li>📍 Noida, India</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Privon. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
