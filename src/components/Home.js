import React from 'react';
import './HomePage.css'; // Import the CSS for styles

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to the Alumni Platform</h1>
          <p className="hero-subtitle">
            Connect, Learn, and Grow with Your Alumni Network
          </p>
          <button className="cta-btn">Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="features-title">Why Join Us?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Networking</h3>
            <p>Build strong connections with alumni from all industries.</p>
          </div>
          <div className="feature-card">
            <h3>Events</h3>
            <p>Stay updated on exciting alumni events and reunions.</p>
          </div>
          <div className="feature-card">
            <h3>Job Board</h3>
            <p>Find job opportunities posted by fellow alumni.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2 className="testimonials-title">What Our Alumni Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"The platform has helped me reconnect with old friends and grow my career. Highly recommend!"</p>
            <span>- John Doe, Class of 2015</span>
          </div>
          <div className="testimonial-card">
            <p>"I found amazing job opportunities through the alumni network. It's an invaluable resource!"</p>
            <span>- Jane Smith, Class of 2018</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
