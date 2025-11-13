import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import './Auth.css';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);

  if (!isOpen) return null;

  const handleSwitchToSignup = () => {
    setMode('signup');
  };

  const handleSwitchToLogin = () => {
    setMode('login');
  };

  const handleClose = () => {
    setMode('login'); // Reset to login mode when closing
    onClose();
  };

  return (
    <div className="auth-modal" onClick={handleClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={handleClose}>
          ×
        </button>
        {mode === 'login' ? (
          <Login 
            onSwitchToSignup={handleSwitchToSignup} 
            onClose={handleClose}
          />
        ) : (
          <Signup 
            onSwitchToLogin={handleSwitchToLogin} 
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
