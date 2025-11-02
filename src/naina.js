import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
      image: "https://i.postimg.cc/zf4pR7FV/Screenshot-521.png",
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
      image: "https://plus.unsplash.com/premium_photo-1669675935372-d76b0b8808df?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=688",
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
    const message = `Booking Request:
Name: ${bookingData.name}
Phone: ${bookingData.phone}
Email: ${bookingData.email}
Service: ${bookingData.service}
Date: ${bookingData.date}
Details: ${bookingData.details}`;

    window.open(`https://wa.me/919315719114?text=${encodeURIComponent(message)}`, "_blank");
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="salon-website">
      {/* Navigation */}
      <motion.nav 
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="nav-container">
          <div className="nav-content">
            <motion.div 
              className="logo-section"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles className="logo-icon" />
              <div className="logo-text">
                <h1>NAINA ARORA</h1>
                <p>Makeup Artist & Hair Stylist</p>
              </div>
            </motion.div>
            <div className="nav-links">
              {['Home', 'Services', 'Gallery', 'Reviews', 'Contact'].map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`nav-button ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
            <motion.button 
              className="book-now-btn" 
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-container">
          <div className="hero-grid">
            <motion.div 
              className="hero-content"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div 
                className="verified-badge"
                variants={fadeIn}
                transition={{ duration: 0.5 }}
              >
                <Award className="badge-icon" />
                <span>Verified Artist • JAI GURU JI</span>
              </motion.div>
              <motion.h1 
                className="hero-title"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Transform Your
                <span className="gradient-text"> Special Moments</span>
              </motion.h1>
              <motion.p 
                className="hero-description"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Expert bridal & party makeup with 1,867+ stunning transformations. Located in Sector 3, Faridabad.
              </motion.p>
              <motion.div 
                className="hero-buttons"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.button 
                  className="primary-btn" 
                  onClick={() => scrollToSection('contact')}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calendar className="btn-icon" />
                  <span>Book Appointment</span>
                </motion.button>
                <motion.a
                  href="https://www.instagram.com/nainaartistrymakeover/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondary-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram className="btn-icon" />
                  <span>View Portfolio</span>
                </motion.a>
              </motion.div>
              <motion.div 
                className="hero-stats"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {[
                  { number: "70.8K+", label: "Instagram Followers" },
                  { number: "1,867", label: "Happy Clients" },
                  { number: "5.0", label: "Star Rating" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="stat-item"
                    variants={scaleIn}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <p className="stat-number">{stat.number}</p>
                    <p className="stat-label">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div 
              className="hero-image-wrapper"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="hero-image-bg"></div>
              <motion.img
                src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=1000&fit=crop"
                alt="Bridal Makeup"
                className="hero-image"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">Professional makeup & styling for every occasion</p>
          </motion.div>
          <motion.div 
            className="services-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="service-card"
                onClick={() => setSelectedService(service)}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              >
                <div className="service-image-wrapper">
                  <motion.img 
                    src={service.image} 
                    alt={service.name} 
                    className="service-image"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="service-overlay">
                    <h3 className="service-name">{service.name}</h3>
                    <p className="service-duration">{service.duration}</p>
                  </div>
                </div>
                <div className="service-info">
                  <p className="service-description">{service.description}</p>
                  <div className="service-footer">
                    <span className="service-price">{service.price}</span>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="service-arrow" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="packages-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Special Packages</h2>
            <p className="section-subtitle">Complete beauty solutions at great value</p>
          </motion.div>
          <motion.div 
            className="packages-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {packages.map((pkg, idx) => (
              <motion.div
                key={idx}
                className={`package-card ${pkg.popular ? 'popular' : ''}`}
                variants={scaleIn}
                transition={{ duration: 0.5 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)" 
                }}
              >
                {pkg.popular && (
                  <motion.div 
                    className="package-badge"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    MOST POPULAR
                  </motion.div>
                )}
                <h3 className="package-name">{pkg.name}</h3>
                <p className="package-price">{pkg.price}</p>
                <ul className="package-features">
                  {pkg.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      className="package-feature"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <Star className="feature-icon" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.button 
                  className="package-btn" 
                  onClick={() => scrollToSection('contact')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Select Package
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Transformation Gallery</h2>
            <p className="section-subtitle">See the magic happen</p>
          </motion.div>
          <motion.div 
            className="gallery-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {beforeAfter.map((item, idx) => (
              <motion.div 
                key={idx} 
                className="gallery-item"
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="comparison-container">
                  <motion.div 
                    className="comparison-side"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <img src={item.before} alt="Before" className="comparison-image" />
                    <div className="comparison-label">Before</div>
                  </motion.div>
                  <motion.div 
                    className="comparison-side"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <img src={item.after} alt="After" className="comparison-image" />
                    <div className="comparison-label">After</div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="reviews-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Client Reviews</h2>
            <motion.div 
              className="rating-display"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ rotate: -180, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                >
                  <Star className="star-icon" />
                </motion.div>
              ))}
              <span className="rating-number">5.0</span>
            </motion.div>
            <p className="section-subtitle">Based on 200+ Google Reviews</p>
          </motion.div>
          <motion.div 
            className="reviews-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {reviews.map((review, idx) => (
              <motion.div 
                key={idx} 
                className="review-card"
                variants={scaleIn}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              >
                <div className="review-stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                    >
                      <Star className="review-star" />
                    </motion.div>
                  ))}
                </div>
                <p className="review-text">"{review.text}"</p>
                <div className="review-footer">
                  <p className="review-author">{review.name}</p>
                  <p className="review-date">{review.date}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="section-container">
          <div className="contact-grid">
            <motion.div 
              className="contact-info"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInLeft}
              transition={{ duration: 0.6 }}
            >
              <h2>Get In Touch</h2>
              <p className="contact-subtitle">
                Book your appointment today and let's create your perfect look!
              </p>
              <motion.div 
                className="contact-details"
                variants={staggerContainer}
              >
                {[
                  { icon: MapPin, text: "2211 Sector 3, Near Tagore Academy, Faridabad 121004" },
                  { icon: Phone, text: "+91 87507 86726" },
                  { icon: Mail, text: "neweee.arora1@gmail.com" },
                  { icon: Clock, text: "Mon-Sun: 10:00 AM - 8:00 PM" },
                  { icon: Instagram, text: "@nainaartistrymakeover (70.8K followers)" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="contact-item"
                    variants={fadeInUp}
                    transition={{ duration: 0.4 }}
                    whileHover={{ x: 10 }}
                  >
                    <item.icon className="contact-icon" />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div 
              className="contact-form-wrapper"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInRight}
              transition={{ duration: 0.6 }}
            >
              <h3 className="form-title">Book Your Appointment</h3>
              <form className="booking-form" onSubmit={handleSubmit}>
                {[
                  { type: "text", name: "name", placeholder: "Your Name" },
                  { type: "tel", name: "phone", placeholder: "Phone Number" },
                  { type: "email", name: "email", placeholder: "Email Address" }
                ].map((field, index) => (
                  <motion.input
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    value={bookingData[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    className="form-input"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileFocus={{ scale: 1.02 }}
                  />
                ))}
                <motion.select
                  name="service"
                  value={bookingData.service}
                  onChange={handleInputChange}
                  className="form-input"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  whileFocus={{ scale: 1.02 }}
                >
                  <option value="">Select Service</option>
                  <option value="bridal">Bridal Makeup</option>
                  <option value="party">Party Makeup</option>
                  <option value="prewedding">Pre-Wedding Shoot</option>
                  <option value="hair">Hair Styling</option>
                </motion.select>
                <motion.input
                  type="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleInputChange}
                  className="form-input"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.textarea
                  name="details"
                  value={bookingData.details}
                  onChange={handleInputChange}
                  placeholder="Additional Details"
                  rows={3}
                  className="form-input"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  whileFocus={{ scale: 1.02 }}
                ></motion.textarea>
                <motion.button 
                  type="submit" 
                  className="submit-btn"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="btn-icon" />
                  <span>Submit Booking Request</span>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="footer-content">
          <motion.div 
            className="footer-logo"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="footer-logo-icon" />
            <h3>NAINA ARORA</h3>
          </motion.div>
          <p className="footer-subtitle">Professional Makeup Artist & Hair Stylist</p>
          <motion.div 
            className="footer-social"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { href: "https://www.instagram.com/nainaartistrymakeover/", icon: Instagram },
              { href: "tel:8750786726", icon: Phone },
              { href: "mailto:neweee.arora1@gmail.com", icon: Mail },
              { href: "https://share.google/kv06UsyC2i6HjrenT", icon: MapPin }
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target={item.href.startsWith('http') ? "_blank" : undefined}
                rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                className="contact-item"
                variants={scaleIn}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <item.icon className="social-icon" />
              </motion.a>
            ))}
          </motion.div>
          <p className="footer-copyright">© 2024 Naina Arora. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
}
