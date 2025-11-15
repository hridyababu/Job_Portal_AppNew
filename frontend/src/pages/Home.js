import React, { useState } from 'react';
import Hero from '../components/Hero';
import JobListings from '../components/JobListings';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    category: '',
    level: ''
  });

  const handleSearch = (searchData) => {
    setFilters({
      ...filters,
      search: searchData.search || '',
      location: searchData.location || ''
    });
  };

  return (
    <div className="home">
      <Hero onSearch={handleSearch} />
      <div className="home-content">
        <JobListings filters={filters} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;

