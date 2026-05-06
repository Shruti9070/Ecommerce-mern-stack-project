import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>About Privon</h1>
          <p>Building the Future of E-Commerce</p>
        </div>
      </section>

      {/* Company Info */}
      <section className="about-section">
        <div className="section-content">
          <h2>Who We Are</h2>
          <p>
            Privon is a leading e-commerce platform dedicated to providing customers
            with a seamless shopping experience. Founded with a mission to revolutionize online
            retail, we bring together quality products, competitive prices, and exceptional
            customer service.
          </p>
          <p>
            Our platform connects millions of customers with their favorite products across
            various categories including electronics, fashion, home & garden, and much more.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-section mission-vision">
        <div className="mission-box">
          <div className="mission-icon">🎯</div>
          <h3>Our Mission</h3>
          <p>
            To make shopping convenient, affordable, and accessible to everyone by
            providing a wide variety of products with competitive prices and excellent
            customer support.
          </p>
        </div>
        <div className="vision-box">
          <div className="vision-icon">🚀</div>
          <h3>Our Vision</h3>
          <p>
            To become the most trusted and customer-centric e-commerce platform,
            driving innovation in the retail industry and empowering millions of
            customers worldwide.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="about-section why-choose">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h4>Wide Selection</h4>
            <p>Browse through thousands of products from trusted sellers</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h4>Best Prices</h4>
            <p>Competitive pricing with regular discounts and offers</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h4>Fast Delivery</h4>
            <p>Quick and reliable shipping to your doorstep</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h4>Secure Payment</h4>
            <p>Safe and encrypted transactions for your peace of mind</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h4>24/7 Support</h4>
            <p>Round-the-clock customer support for any assistance</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h4>Quality Assurance</h4>
            <p>Every product is carefully selected for quality</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-section stats-section">
        <h2>Our Impact</h2>
        <div className="stats-grid">
          <div className="stat">
            <h3>10M+</h3>
            <p>Active Users</p>
          </div>
          <div className="stat">
            <h3>500K+</h3>
            <p>Products</p>
          </div>
          <div className="stat">
            <h3>50M+</h3>
            <p>Orders Delivered</p>
          </div>
          <div className="stat">
            <h3>99.8%</h3>
            <p>Customer Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-section team-section">
        <h2>Our Team</h2>
        <p>
          We have a dedicated team of professionals working tirelessly to improve your
          shopping experience. From engineers and designers to customer support specialists,
          every member is committed to excellence.
        </p>
        <div className="team-values">
          <div className="value">
            <span className="value-icon">🤝</span>
            <h4>Collaboration</h4>
            <p>Working together to achieve common goals</p>
          </div>
          <div className="value">
            <span className="value-icon">💡</span>
            <h4>Innovation</h4>
            <p>Constantly evolving and improving our platform</p>
          </div>
          <div className="value">
            <span className="value-icon">📈</span>
            <h4>Growth</h4>
            <p>Expanding our services for customer benefit</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-section cta-section">
        <h2>Ready to Shop?</h2>
        <p>Explore our extensive collection and find your favorite products today!</p>
        <a href="/" className="cta-button">Start Shopping</a>
      </section>
    </div>
  );
}

export default AboutUs;
