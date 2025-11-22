import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose, isSignUp, onSwitchToSignUp, onSwitchToLogin }) => {
  const { login, register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Clear form when modal opens or closes
  useEffect(() => {
    if (isOpen) {
      // Clear form when modal opens
      setFormData({
        name: '',
        email: '',
        password: ''
      });
      setError('');
    }
  }, [isOpen]);

  // Clear form when switching between sign in and sign up
  useEffect(() => {
    setFormData({
      name: '',
      email: '',
      password: ''
    });
    setError('');
  }, [isSignUp]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (isSignUp) {
        result = await register(formData.name, formData.email, formData.password);
      } else {
        result = await login(formData.email, formData.password);
      }

      if (result.success) {
        setFormData({ name: '', email: '', password: '' });
        setError('');
        onClose();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Check if Google OAuth is available
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/auth/google`, {
        method: 'GET',
        redirect: 'manual'
      });
      
      if (response.type === 'opaqueredirect' || response.status === 302) {
        // Redirect to Google OAuth
        window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/auth/google`;
      } else {
        // Google OAuth not configured
        const data = await response.json();
        setError(data.message || 'Google OAuth is not configured. Please use email/password login.');
      }
    } catch (error) {
      // Try redirect anyway (might work with CORS)
      window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/auth/google`;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close" 
          onClick={() => {
            setFormData({ name: '', email: '', password: '' });
            setError('');
            onClose();
          }}
        >
          ×
        </button>
        
        <h2>Sign {isSignUp ? 'up' : 'in'} to Job Portal</h2>
        <p className="modal-subtitle">Welcome {isSignUp ? '! Please sign up to continue' : 'back! Please sign in to continue'}</p>

        <button className="google-btn" onClick={handleGoogleLogin}>
          <span className="google-icon">G</span>
          Continue with Google
        </button>

        <div className="divider">
          <span>or</span>
        </div>

        <form 
          key={`${isSignUp ? 'signup' : 'signin'}-${isOpen}`}
          onSubmit={handleSubmit} 
          autoComplete="off"
        >
          {isSignUp && (
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                autoComplete="off"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              autoComplete="off"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="new-password"
              required
              minLength={6}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Loading...' : 'Continue ▸'}
          </button>
        </form>

        <div className="modal-footer">
          {isSignUp ? (
            <p>
              Already have an account?{' '}
              <button className="link-btn" onClick={onSwitchToLogin}>
                Sign in
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button className="link-btn" onClick={onSwitchToSignUp}>
                Sign up
              </button>
            </p>
          )}
        </div>

        <div className="modal-secured">
          <span>Secured by</span>
          <span className="secured-badge">JWT Auth</span>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

