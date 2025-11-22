// import React, { useState, useEffect, useCallback } from 'react';
// import api from '../utils/api';
// import './JobListings.css';

// const JobListings = ({ filters }) => {
//   const [jobs, setJobs] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedLocations, setSelectedLocations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchCategories();
//     fetchLocations();
//   }, []);

//   const fetchJobs = useCallback(async () => {
//     setLoading(true);
//     try {
//       const category = selectedCategories.length > 0 ? selectedCategories[0] : filters.category;
//       const location = selectedLocations.length > 0 ? selectedLocations[0] : filters.location;
      
//       const params = {
//         page: currentPage,
//         limit: 6,
//         ...(filters.search && { search: filters.search }),
//         ...(category && { category }),
//         ...(location && { location }),
//         ...(filters.level && { level: filters.level })
//       };

//       const response = await api.get('/jobs', { params });
//       setJobs(response.data.jobs);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       console.error('Error fetching jobs:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, [filters, selectedCategories, selectedLocations, currentPage]);

//   useEffect(() => {
//     fetchJobs();
//   }, [fetchJobs]);

//   const fetchCategories = async () => {
//     try {
//       const response = await api.get('/categories');
//       setCategories(response.data);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const fetchLocations = async () => {
//     try {
//       const response = await api.get('/categories/locations');
//       setLocations(response.data);
//     } catch (error) {
//       console.error('Error fetching locations:', error);
//     }
//   };


//   const handleCategoryToggle = (category) => {
//     setSelectedCategories(
//       selectedCategories.includes(category)
//         ? selectedCategories.filter(c => c !== category)
//         : [category]
//     );
//     setCurrentPage(1);
//   };

//   const handleLocationToggle = (location) => {
//     setSelectedLocations(
//       selectedLocations.includes(location)
//         ? selectedLocations.filter(l => l !== location)
//         : [location]
//     );
//     setCurrentPage(1);
//   };

//   return (
//     <div className="job-listings-container">
//       <div className="job-listings-layout">
//         <div className="filters-sidebar">
//           <div className="filter-section">
//             <h3>Search by Categories</h3>
//             <div className="filter-list">
//               {categories.map((category) => (
//                 <label key={category} className="filter-item">
//                   <input
//                     type="checkbox"
//                     checked={selectedCategories.includes(category)}
//                     onChange={() => handleCategoryToggle(category)}
//                   />
//                   <span>{category}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div className="filter-section">
//             <h3>Search by Location</h3>
//             <div className="filter-list">
//               {locations.map((location) => (
//                 <label key={location} className="filter-item">
//                   <input
//                     type="checkbox"
//                     checked={selectedLocations.includes(location)}
//                     onChange={() => handleLocationToggle(location)}
//                   />
//                   <span>{location}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="jobs-main">
//           <div className="jobs-header">
//             <h2>Latest jobs</h2>
//             <p>Get your desired job from top companies</p>
//           </div>

//           {loading ? (
//             <div className="loading">Loading jobs...</div>
//           ) : jobs.length === 0 ? (
//             <div className="no-jobs">No jobs found. Try adjusting your filters.</div>
//           ) : (
//             <>
//               <div className="jobs-grid">
//                 {jobs.map((job) => (
//                   <div key={job._id} className="job-card">
//                     <div className="job-card-header">
//                       <div className="company-logo-placeholder">
//                         {job.company.charAt(0).toUpperCase()}
//                       </div>
//                       <div className="job-info">
//                         <h3 className="job-title">{job.title}</h3>
//                         <div className="job-meta">
//                           <span className="job-location">{job.location}</span>
//                           <span className="job-level">{job.level}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <p className="job-description">
//                       {job.description.length > 100
//                         ? `${job.description.substring(0, 100)}...`
//                         : job.description}
//                     </p>
//                     <div className="job-actions">
//                       <button className="apply-btn">Apply now</button>
//                       <button className="learn-more-btn">Learn more</button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {totalPages > 1 && (
//                 <div className="pagination">
//                   <button
//                     onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                     disabled={currentPage === 1}
//                     className="pagination-btn"
//                   >
//                     ‹
//                   </button>
//                   {[...Array(totalPages)].map((_, i) => (
//                     <button
//                       key={i + 1}
//                       onClick={() => setCurrentPage(i + 1)}
//                       className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}
//                   <button
//                     onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                     disabled={currentPage === totalPages}
//                     className="pagination-btn"
//                   >
//                     ›
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobListings;






// JobListing.js (UPDATED)
import React, { useState, useEffect, useCallback, useContext } from 'react'; // 👈 UPDATED IMPORT
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext'; // 👈 NEW IMPORT
import JobDetailModal from './JobDetailModal'; // 👈 NEW IMPORT
import './JobListings.css';

const JobListings = ({ filters }) => {
  const { isAuthenticated, user } = useContext(AuthContext); // 👈 USE CONTEXT
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchLocations();
  }, []);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const category = selectedCategories.length > 0 ? selectedCategories[0] : filters.category;
      const location = selectedLocations.length > 0 ? selectedLocations[0] : filters.location;
      
      const params = {
        page: currentPage,
        limit: 6,
        ...(filters.search && { search: filters.search }),
        ...(category && { category }),
        ...(location && { location }),
        ...(filters.level && { level: filters.level })
      };

      const response = await api.get('/jobs', { params });
      setJobs(response.data.jobs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, selectedCategories, selectedLocations, currentPage]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await api.get('/categories/locations');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleApply = async (jobId) => { // 👈 NEW FUNCTION TO CALL THE NEW API
    if (!isAuthenticated) {
      alert('You must be logged in to apply for a job.');
      return;
    }
    
    // Check if the user is a recruiter (since recruiters can also log in)
    if (user?.role !== 'user') {
        alert('Recruiters cannot apply for jobs.');
        return;
    }

    try {
      await api.post(`/jobs/${jobId}/apply`);
      alert('Application submitted successfully!');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to submit application.';
      alert(`Application Error: ${errorMessage}`);
      console.error('Application submission error:', error);
    }
  };

  const handleLearnMore = async (jobId) => {
    try {
      // Fetch full job details
      const response = await api.get(`/jobs/${jobId}`);
      setSelectedJob(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching job details:', error);
      alert('Failed to load job details. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };


  const handleCategoryToggle = (category) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [category]
    );
    setCurrentPage(1);
  };

  const handleLocationToggle = (location) => {
    setSelectedLocations(
      selectedLocations.includes(location)
        ? selectedLocations.filter(l => l !== location)
        : [location]
    );
    setCurrentPage(1);
  };

  const isRecruiter = user?.role === 'recruiter';
  const isJobSeeker = isAuthenticated && user?.role === 'user';
  
  return (
    <div className="job-listings-container">
      <div className="job-listings-layout">
        <div className="filters-sidebar">
          <div className="filter-section">
            <h3>Search by Categories</h3>
            <div className="filter-list">
              {categories.map((category) => (
                <label key={category} className="filter-item">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Search by Location</h3>
            <div className="filter-list">
              {locations.map((location) => (
                <label key={location} className="filter-item">
                  <input
                    type="checkbox"
                    checked={selectedLocations.includes(location)}
                    onChange={() => handleLocationToggle(location)}
                  />
                  <span>{location}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="jobs-main">
          <div className="jobs-header">
            <h2>Latest jobs</h2>
            <p>Get your desired job from top companies</p>
          </div>

          {loading ? (
            <div className="loading">Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="no-jobs">No jobs found. Try adjusting your filters.</div>
          ) : (
            <>
              <div className="jobs-grid">
                {jobs.map((job) => (
                  <div key={job._id} className="job-card">
                    <div className="job-card-header">
                      <div className="company-logo-placeholder">
                        {job.company.charAt(0).toUpperCase()}
                      </div>
                      <div className="job-info">
                        <h3 className="job-title">{job.title}</h3>
                        <div className="job-meta">
                          <span className="job-location">{job.location}</span>
                          <span className="job-level">{job.level}</span>
                        </div>
                      </div>
                    </div>
                    <p className="job-description">
                      {job.description.length > 100
                        ? `${job.description.substring(0, 100)}...`
                        : job.description}
                    </p>
                    <div className="job-actions">
                      <button 
                        className="apply-btn"
                        onClick={() => handleApply(job._id)} // 👈 ADD onClick HANDLER
                        disabled={!isJobSeeker} // Disable if not a logged-in job seeker
                        title={!isAuthenticated ? "Log in to apply" : isRecruiter ? "Recruiters cannot apply" : "Apply Now"}
                      >
                        Apply now
                      </button>
                      <button 
                        className="learn-more-btn"
                        onClick={() => handleLearnMore(job._id)}
                      >
                        Learn more
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    ‹
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                  >
                    ›
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <JobDetailModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default JobListings;