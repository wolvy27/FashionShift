import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const Signup = ({ onSwitchToLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const { data, error } = await signUp(email, password, {
      full_name: fullName,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email for the confirmation link!');
      // Don't close immediately, let user see the message
      setTimeout(() => {
        onClose();
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <div className="auth-form">
      <h2>Join Fashion Shift</h2>
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password (min 6 characters)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm your password"
          />
        </div>
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>
      <div className="auth-switch">
        <p>Already have an account? 
          <button 
            type="button" 
            className="switch-button" 
            onClick={onSwitchToLogin}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
