import React, { useState } from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import './Hero.css';

const Hero = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ search: searchTerm, location });
  };

  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Over 10,000+ jobs to apply</h1>
        <p className="hero-subtitle">
          Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!
        </p>
        
        <form className="hero-search" onSubmit={handleSubmit}>
          <div className="search-input-wrapper">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for jobs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="search-input-wrapper">
            <FiMapPin className="search-icon" />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="search-input"
            />
          </div>
          
          <button type="submit" className="search-btn">Search</button>
        </form>
      </div>
      
      <div className="trusted-by">
        <p className="trusted-by-label">Trusted by</p>
        <div className="company-logos">
          <div className="company-logo">Microsoft</div>
          <div className="company-logo">Walmart</div>
          <div className="company-logo">Accenture</div>
          <div className="company-logo">Samsung</div>
          <div className="company-logo">Amazon</div>
          <div className="company-logo">Adobe</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

