import React, { useState } from "react";
import "./ContactUs.css";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.subject ||
      !formData.message
    ) {
      alert("Please fill all fields ❌");
      return;
    }

    setLoading(true);
    try {
      // Simulate sending email (in real app, you'd send to backend)
      console.log("Form submitted:", formData);
      alert("Message sent successfully! ✅ We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      alert("Error sending message ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-us-container">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with us today!</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-content">
          {/* Contact Info */}
          <div className="contact-info-box">
            <h2>Get In Touch</h2>
            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">📧</div>
                <h4>Email</h4>
                <p>sm9070355@gmail.com</p>
                <p className="small-text">Send us your enquiries anytime</p>
              </div>

              <div className="info-card">
                <div className="info-icon">📱</div>
                <h4>Phone</h4>
                <p>+91-7061605946</p>
                <p className="small-text">Available 24/7 for support</p>
              </div>

              <div className="info-card">
                <div className="info-icon">📍</div>
                <h4>Address</h4>
                <p>Noida, India</p>
                <p className="small-text">Visit us at our office</p>
              </div>

              <div className="info-card">
                <div className="info-icon">⏰</div>
                <h4>Working Hours</h4>
                <p>Mon - Sun: 24 Hours</p>
                <p className="small-text">Round the clock support</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="social-links">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon">f</a>
                <a href="https://x.com" target="_blank" rel="noreferrer" className="social-icon">𝕏</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon">📷</a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon">in</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-box">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91-XXXXX-XXXXX"
                  required
                />
              </div>

              <div className="form-group">
                <label>Subject *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Product Issue">Product Issue</option>
                  <option value="Delivery Problem">Delivery Problem</option>
                  <option value="Refund/Return">Refund/Return</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please describe your query or concern..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {submitted && (
                <div className="success-message">
                  ✅ Thank you! Your message has been sent successfully.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-content">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-card">
              <h4>How can I track my order?</h4>
              <p>
                You can track your order from your account dashboard under "My Orders".
                You'll receive updates via email and SMS as well.
              </p>
            </div>

            <div className="faq-card">
              <h4>What is your return policy?</h4>
              <p>
                We offer 7-day returns for most products. Items must be in original
                condition with all packaging and accessories.
              </p>
            </div>

            <div className="faq-card">
              <h4>How long does delivery take?</h4>
              <p>
                Delivery typically takes 3-7 business days depending on your location.
                Express delivery options are available in major cities.
              </p>
            </div>

            <div className="faq-card">
              <h4>Is my payment secure?</h4>
              <p>
                Yes, we use industry-standard encryption and secure payment gateways
                to protect your financial information.
              </p>
            </div>

            <div className="faq-card">
              <h4>Do you offer customer support?</h4>
              <p>
                Absolutely! Our support team is available 24/7 to assist you with
                any queries or concerns.
              </p>
            </div>

            <div className="faq-card">
              <h4>How can I cancel my order?</h4>
              <p>
                You can cancel orders within 24 hours of placement. Go to "My Orders"
                and select the cancel option for your order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <h2>Our Location</h2>
        <div className="map-container">
          <iframe
            title="Privon Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5896491944816!2d77.34856!3d28.58550!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sNoida%2C%20India!2s28.5855°N%2077.3485°E!5e0!3m2!1sen!2sin!4v1619876543210"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: "10px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
