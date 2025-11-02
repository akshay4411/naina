import React, { useState } from 'react';
import { Calendar, Instagram, MapPin, Phone, Mail, Star, Clock, Award, Sparkles, ChevronRight, Send } from 'lucide-react';
import './naina-react.css';

export default function NainaSalonWebsite() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    details: ''
  });

  const services = [
    {
      id: 1,
      name: "Bridal Makeup",
      price: "₹25,000+",
      duration: "3-4 hours",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
      description: "Complete bridal transformation with premium products"
    },
    {
      id: 2,
      name: "Party Makeup",
      price: "₹8,000+",
      duration: "1-2 hours",
      image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop",
      description: "Glamorous looks for any special occasion"
    },
    {
      id: 3,
      name: "Pre-Wedding Shoot",
      price: "₹15,000+",
      duration: "2-3 hours",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
      description: "Picture-perfect makeup for your special photoshoot"
    },
    {
      id: 4,
      name: "Hair Styling",
      price: "₹3,000+",
      duration: "1 hour",
      image: "https://plus.unsplash.com/premium_photo-1669675935372-d76b0b8808df?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
      description: "Professional hairstyling for any occasion"
    }
  ];

  const beforeAfter = [
    { before: "https://i.postimg.cc/8ck5yPXM/Screenshot-500.png", after: "https://i.postimg.cc/T12wkYNJ/Screenshot-501.png" },
    { before: "https://i.postimg.cc/nrKWLnHp/Screenshot-504.png", after: "https://i.postimg.cc/mrc6HYby/Screenshot-505.png" },
    { before: "https://i.postimg.cc/Gt3FkRkV/Screenshot-515.png", after: "https://i.postimg.cc/sx2WMcrb/Screenshot-512.png" }
  ];

  const reviews = [
    { name: "Priya Sharma", rating: 5, text: "Naina made me look absolutely stunning on my wedding day! Her attention to detail is incredible.", date: "2 weeks ago" },
    { name: "Anjali Verma", rating: 5, text: "Best makeup artist in Faridabad! Professional, talented, and so sweet. Highly recommend!", date: "1 month ago" },
    { name: "Simran Kaur", rating: 5, text: "My bridal makeup was flawless and lasted the entire day. Thank you Naina!", date: "3 weeks ago" }
  ];

  const packages = [
    {
      name: "BRIDAL PACKAGE",
      price: "₹45,000",
      features: ["Bridal Makeup", "Hair Styling", "Draping", "Pre-Wedding Trial", "Touch-up Kit", "Reception Look"],
      popular: true
    },
    {
      name: "ENGAGEMENT SPECIAL",
      price: "₹18,000",
      features: ["HD Makeup", "Hair Styling", "Draping", "One Trial Session", "Touch-ups"],
      popular: false
    },
    {
      name: "PARTY GLAM",
      price: "₹10,000",
      features: ["Party Makeup", "Hair Styling", "Accessories Styling", "Touch-ups"],
      popular: false
    }
  ];

const handleInputChange = (e) => {
  setBookingData({ ...bookingData, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
  e.preventDefault();
  alert('Thank you! We will contact you shortly to confirm your appointment.');
  setBookingData({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    details: '',
  });
};


  return (
    <div className="salon-website">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-content">
            <div className="logo-section">
              <Sparkles className="logo-icon" />
              <div className="logo-text">
                <h1>NAINA ARORA</h1>
                <p>Makeup Artist & Hair Stylist</p>
              </div>
            </div>
            <div className="nav-links">
              {['Home', 'Services', 'Gallery', 'Reviews', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className={`nav-button ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <a href="tel:+919876543210" className="book-now-btn">
              Book Now
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="verified-badge">
                <Award className="badge-icon" />
                <span>Verified Artist • JAI GURU JI</span>
              </div>
              <h1 className="hero-title">
                Transform Your
                <span className="gradient-text"> Special Moments</span>
              </h1>
              <p className="hero-description">
                Expert bridal & party makeup with 1,867+ stunning transformations. Located in Sector 3, Faridabad.
              </p>
              <div className="hero-buttons">
                <button className="primary-btn">
                  <Calendar className="btn-icon" />
                  <span>Book Appointment</span>
                </button>
                <button className="secondary-btn">
                  <Instagram className="btn-icon" />
                  <span>View Portfolio</span>
                </button>
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <p className="stat-number">70.8K+</p>
                  <p className="stat-label">Instagram Followers</p>
                </div>
                <div className="stat-item">
                  <p className="stat-number">1,867</p>
                  <p className="stat-label">Happy Clients</p>
                </div>
                <div className="stat-item">
                  <p className="stat-number">5.0</p>
                  <p className="stat-label">Star Rating</p>
                </div>
              </div>
            </div>
            <div className="hero-image-wrapper">
              <div className="hero-image-bg"></div>
              <img
                src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=1000&fit=crop"
                alt="Bridal Makeup"
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">Professional makeup & styling for every occasion</p>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <div
                key={service.id}
                className="service-card"
                onClick={() => setSelectedService(service)}
              >
                <div className="service-image-wrapper">
                  <img src={service.image} alt={service.name} className="service-image" />
                  <div className="service-overlay">
                    <h3 className="service-name">{service.name}</h3>
                    <p className="service-duration">{service.duration}</p>
                  </div>
                </div>
                <div className="service-info">
                  <p className="service-description">{service.description}</p>
                  <div className="service-footer">
                    <span className="service-price">{service.price}</span>
                    <ChevronRight className="service-arrow" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="packages-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Special Packages</h2>
            <p className="section-subtitle">Complete beauty solutions at great value</p>
          </div>
          <div className="packages-grid">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`package-card ${pkg.popular ? 'popular' : ''}`}
              >
                {pkg.popular && (
                  <div className="package-badge">MOST POPULAR</div>
                )}
                <h3 className="package-name">{pkg.name}</h3>
                <p className="package-price">{pkg.price}</p>
                <ul className="package-features">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="package-feature">
                      <Star className="feature-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="package-btn">
                  Select Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="gallery-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Transformation Gallery</h2>
            <p className="section-subtitle">See the magic happen</p>
          </div>
          <div className="gallery-grid">
            {beforeAfter.map((item, idx) => (
              <div key={idx} className="gallery-item">
                <div className="comparison-container">
                  <div className="comparison-side">
                    <img src={item.before} alt="Before" className="comparison-image" />
                    <div className="comparison-label">Before</div>
                  </div>
                  <div className="comparison-side">
                    <img src={item.after} alt="After" className="comparison-image" />
                    <div className="comparison-label">After</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Client Reviews</h2>
            <div className="rating-display">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="star-icon" />
              ))}
              <span className="rating-number">5.0</span>
            </div>
            <p className="section-subtitle">Based on 200+ Google Reviews</p>
          </div>
          <div className="reviews-grid">
            {reviews.map((review, idx) => (
              <div key={idx} className="review-card">
                <div className="review-stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="review-star" />
                  ))}
                </div>
                <p className="review-text">"{review.text}"</p>
                <div className="review-footer">
                  <p className="review-author">{review.name}</p>
                  <p className="review-date">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="section-container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p className="contact-subtitle">
                Book your appointment today and let's create your perfect look!
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <span>2211 Sector 3, Near Tagore Academy, Faridabad 121004</span>
                </div>
                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <span>naina@example.com</span>
                </div>
                <div className="contact-item">
                  <Clock className="contact-icon" />
                  <span>Mon-Sun: 9:00 AM - 8:00 PM</span>
                </div>
                <div className="contact-item">
                  <Instagram className="contact-icon" />
                  <span>@nainaartistrymakeover (70.8K followers)</span>
                </div>
              </div>
            </div>
            <div className="contact-form-wrapper">
              <h3 className="form-title">Book Your Appointment</h3>
              <form className="booking-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={bookingData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="form-input"
                />
                <input
                  type="tel"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="form-input"
                />
                <input
                  type="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="form-input"
                />
                <select
                  name="service"
                  value={bookingData.service}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Select Service</option>
                  <option value="bridal">Bridal Makeup</option>
                  <option value="party">Party Makeup</option>
                  <option value="prewedding">Pre-Wedding Shoot</option>
                  <option value="hair">Hair Styling</option>
                </select>
                <input
                  type="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleInputChange}
                  className="form-input"
                />
                <textarea
                  name="details"
                  value={bookingData.details}
                  onChange={handleInputChange}
                  placeholder="Additional Details"
                  rows={3}
                  className="form-input"
                ></textarea>
                <button type="submit" className="submit-btn">
                  <Send className="btn-icon" />
                  <span>Submit Booking Request</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Sparkles className="footer-logo-icon" />
            <h3>NAINA ARORA</h3>
          </div>
          <p className="footer-subtitle">Professional Makeup Artist & Hair Stylist</p>
          <div className="footer-social">
            <Instagram className="social-icon" />
            <Phone className="social-icon" />
            <Mail className="social-icon" />
          </div>
          <p className="footer-copyright">© 2024 Naina Arora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}