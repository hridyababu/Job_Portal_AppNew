import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import './RecruiterDashboard.css';

const RecruiterDashboard = () => {
  const { isAuthenticated, user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [myJobs, setMyJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);

  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    category: '',
    level: '',
    description: '',
    requirements: '',
    salaryMin: '',
    salaryMax: '',
    currency: 'USD'
  });

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) {
      return;
    }
    
    // Check authentication and role
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    
    if (user?.role !== 'recruiter') {
      // Use setTimeout to avoid navigation during render
      setTimeout(() => {
        alert('Only recruiters can access this page');
        navigate('/');
      }, 0);
      return;
    }
    
    // Only fetch jobs if user is authenticated and is a recruiter
    if (isAuthenticated && user?.role === 'recruiter' && user?._id) {
      fetchMyJobs();
    }
  }, [isAuthenticated, user, navigate, authLoading]);

  const fetchMyJobs = async () => {
    // Only fetch if user is a recruiter
    if (!user || user.role !== 'recruiter') {
      return;
    }
    
    try {
      const response = await api.get('/jobs');
      // Filter jobs posted by current recruiter
      const myPostedJobs = response.data.jobs.filter(
        job => job.postedBy?._id === user?._id || job.postedBy === user?._id
      );
      setMyJobs(myPostedJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const requirementsArray = jobData.requirements
        .split(',')
        .map(req => req.trim())
        .filter(req => req.length > 0);

      const jobPayload = {
        title: jobData.title,
        company: jobData.company,
        location: jobData.location,
        category: jobData.category,
        level: jobData.level,
        description: jobData.description,
        requirements: requirementsArray,
        salary: {
          min: jobData.salaryMin ? parseInt(jobData.salaryMin) : undefined,
          max: jobData.salaryMax ? parseInt(jobData.salaryMax) : undefined,
          currency: jobData.currency
        }
      };

      if (editingJobId) {
        // Update existing job
        await api.put(`/jobs/${editingJobId}`, jobPayload);
        setMessage('Job updated successfully!');
      } else {
        // Create new job
        await api.post('/jobs', jobPayload);
        setMessage('Job posted successfully!');
      }
      
      // Reset form
      setJobData({
        title: '',
        company: '',
        location: '',
        category: '',
        level: '',
        description: '',
        requirements: '',
        salaryMin: '',
        salaryMax: '',
        currency: 'USD'
      });
      setShowForm(false);
      setEditingJobId(null);
      fetchMyJobs();
    } catch (error) {
      setMessage(error.response?.data?.message || `Failed to ${editingJobId ? 'update' : 'post'} job. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (job) => {
    // Populate form with job data
    setJobData({
      title: job.title || '',
      company: job.company || '',
      location: job.location || '',
      category: job.category || '',
      level: job.level || '',
      description: job.description || '',
      requirements: job.requirements ? job.requirements.join(', ') : '',
      salaryMin: job.salary?.min || '',
      salaryMax: job.salary?.max || '',
      currency: job.salary?.currency || 'USD'
    });
    setEditingJobId(job._id);
    setShowForm(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setJobData({
      title: '',
      company: '',
      location: '',
      category: '',
      level: '',
      description: '',
      requirements: '',
      salaryMin: '',
      salaryMax: '',
      currency: 'USD'
    });
    setEditingJobId(null);
    setShowForm(false);
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) {
      return;
    }

    try {
      await api.delete(`/jobs/${jobId}`);
      setMessage('Job deleted successfully!');
      fetchMyJobs();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to delete job.');
    }
  };

  // Show loading while auth is loading
  if (authLoading) {
    return (
      <div className="recruiter-dashboard">
        <div className="dashboard-container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated or not a recruiter
  if (!isAuthenticated || user?.role !== 'recruiter') {
    return null;
  }

  return (
    <div className="recruiter-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Recruiter Dashboard</h1>
          <p>Welcome, {user?.name}! Post and manage your job listings.</p>
          <button 
            className="post-job-btn"
            onClick={() => {
              if (showForm) {
                handleCancel();
              } else {
                setShowForm(true);
              }
            }}
          >
            {showForm ? 'Cancel' : '+ Post New Job'}
          </button>
        </div>

        {message && (
          <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        {showForm && (
          <div className="job-form-container">
            <h2>{editingJobId ? 'Edit Job' : 'Post a New Job'}</h2>
            <form onSubmit={handleSubmit} className="job-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={jobData.title}
                    onChange={handleChange}
                    placeholder="e.g., Software Engineer"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Company Name *</label>
                  <input
                    type="text"
                    name="company"
                    value={jobData.company}
                    onChange={handleChange}
                    placeholder="e.g., Google"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={jobData.location}
                    onChange={handleChange}
                    placeholder="e.g., Bangalore"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={jobData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Programming">Programming</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Designing">Designing</option>
                    <option value="Networking">Networking</option>
                    <option value="Management">Management</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Experience Level *</label>
                  <select
                    name="level"
                    value={jobData.level}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="Intermediate Level">Intermediate Level</option>
                    <option value="Senior Level">Senior Level</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Job Description *</label>
                <textarea
                  name="description"
                  value={jobData.description}
                  onChange={handleChange}
                  placeholder="Describe the job role, responsibilities, and what you're looking for..."
                  rows="5"
                  required
                />
              </div>

              <div className="form-group">
                <label>Requirements (comma-separated)</label>
                <input
                  type="text"
                  name="requirements"
                  value={jobData.requirements}
                  onChange={handleChange}
                  placeholder="e.g., 3+ years experience, Python knowledge, Team player"
                />
                <small>Separate multiple requirements with commas</small>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Salary Min</label>
                  <input
                    type="number"
                    name="salaryMin"
                    value={jobData.salaryMin}
                    onChange={handleChange}
                    placeholder="e.g., 50000"
                  />
                </div>

                <div className="form-group">
                  <label>Salary Max</label>
                  <input
                    type="number"
                    name="salaryMax"
                    value={jobData.salaryMax}
                    onChange={handleChange}
                    placeholder="e.g., 100000"
                  />
                </div>

                <div className="form-group">
                  <label>Currency</label>
                  <select
                    name="currency"
                    value={jobData.currency}
                    onChange={handleChange}
                  >
                    <option value="USD">USD</option>
                    <option value="INR">INR</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn" 
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading 
                    ? (editingJobId ? 'Updating...' : 'Posting...') 
                    : (editingJobId ? 'Update Job' : 'Post Job')
                  }
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="my-jobs-section">
          <h2>My Posted Jobs ({myJobs.length})</h2>
          {myJobs.length === 0 ? (
            <p className="no-jobs">You haven't posted any jobs yet. Click "Post New Job" to get started!</p>
          ) : (
            <div className="jobs-list">
              {myJobs.map((job) => (
                <div key={job._id} className="job-item">
                  <div className="job-item-header">
                    <h3>{job.title}</h3>
                    <div className="job-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(job)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(job._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="job-company">{job.company} • {job.location}</p>
                  <p className="job-category">{job.category} • {job.level}</p>
                  <p className="job-description">{job.description.substring(0, 150)}...</p>
                  <p className="job-date">Posted: {new Date(job.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;


