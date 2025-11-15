import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoginModal from './LoginModal';
import './Header.css';

const Header = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLoginClick = () => {
    setIsSignUp(false);
    setShowLoginModal(true);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            <div className="logo-icon">i</div>
            <span className="logo-text">Insiderjobs</span>
          </Link>
          
          <div className="header-actions">
            <Link to="/recruiter" className="recruiter-login">Recruiter Login</Link>
            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-name">Hi, {user?.name}</span>
                <button onClick={logout} className="logout-btn">Logout</button>
              </div>
            ) : (
              <button onClick={handleLoginClick} className="login-btn">Login</button>
            )}
          </div>
        </div>
      </header>
      
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          isSignUp={isSignUp}
          onSwitchToSignUp={() => setIsSignUp(true)}
          onSwitchToLogin={() => setIsSignUp(false)}
        />
      )}
    </>
  );
};

export default Header;

