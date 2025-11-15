import React, { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { fetchUser } = useContext(AuthContext);

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      // Handle error
      console.error('OAuth error:', error);
      navigate('/?error=authentication_failed');
      return;
    }

    if (token) {
      // Store token
      localStorage.setItem('token', token);
      
      // Fetch user info and redirect
      fetchUser().then(() => {
        navigate('/');
      }).catch(() => {
        navigate('/?error=authentication_failed');
      });
    } else {
      navigate('/');
    }
  }, [searchParams, navigate, fetchUser]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <div>Completing authentication...</div>
      <div style={{ fontSize: '0.9rem', color: '#666' }}>Please wait...</div>
    </div>
  );
};

export default AuthCallback;

