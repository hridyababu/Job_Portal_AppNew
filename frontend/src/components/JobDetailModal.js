import React from 'react';
import './JobDetailModal.css';

const JobDetailModal = ({ job, isOpen, onClose }) => {
  if (!isOpen || !job) return null;

  return (
    <div className="job-modal-overlay" onClick={onClose}>
      <div className="job-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="job-modal-close" onClick={onClose}>×</button>
        
        <div className="job-modal-header">
          <div className="job-modal-logo">
            {job.company.charAt(0).toUpperCase()}
          </div>
          <div className="job-modal-title-section">
            <h2>{job.title}</h2>
            <p className="job-modal-company">{job.company}</p>
            <div className="job-modal-meta">
              <span className="job-modal-location">📍 {job.location}</span>
              <span className="job-modal-level">📊 {job.level}</span>
              <span className="job-modal-category">🏷️ {job.category}</span>
            </div>
          </div>
        </div>

        <div className="job-modal-body">
          <div className="job-modal-section">
            <h3>Job Description</h3>
            <p className="job-modal-description">{job.description}</p>
          </div>

          {job.requirements && job.requirements.length > 0 && (
            <div className="job-modal-section">
              <h3>Requirements</h3>
              <ul className="job-modal-requirements">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {job.salary && (job.salary.min || job.salary.max) && (
            <div className="job-modal-section">
              <h3>Salary</h3>
              <p className="job-modal-salary">
                {job.salary.min && job.salary.max
                  ? `${job.salary.currency || 'USD'} ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}`
                  : job.salary.min
                  ? `${job.salary.currency || 'USD'} ${job.salary.min.toLocaleString()}+`
                  : job.salary.max
                  ? `Up to ${job.salary.currency || 'USD'} ${job.salary.max.toLocaleString()}`
                  : 'Negotiable'}
              </p>
            </div>
          )}

          <div className="job-modal-section">
            <h3>Job Details</h3>
            <div className="job-modal-details">
              <div className="job-detail-item">
                <strong>Posted:</strong> {new Date(job.createdAt).toLocaleDateString()}
              </div>
              {job.updatedAt && job.updatedAt !== job.createdAt && (
                <div className="job-detail-item">
                  <strong>Updated:</strong> {new Date(job.updatedAt).toLocaleDateString()}
                </div>
              )}
              {job.postedBy && (
                <div className="job-detail-item">
                  <strong>Posted by:</strong> {job.postedBy.name || 'Recruiter'}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="job-modal-footer">
          <button className="job-modal-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;

