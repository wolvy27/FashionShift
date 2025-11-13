import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const Login = ({ onSwitchToSignup, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
    } else {
      onClose();
    }
    setLoading(false);
  };

  return (
    <div className="auth-form">
      <h2>Login to Fashion Shift</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
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
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <div className="auth-switch">
        <p>Don't have an account? 
          <button 
            type="button" 
            className="switch-button" 
            onClick={onSwitchToSignup}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
