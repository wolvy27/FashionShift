import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './AccountSettings.css';

const AccountSettings = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const { error } = await signOut();
      if (error && error.message !== 'Auth session missing!') {
        throw error;
      }
      // Always navigate to home regardless of error, since user wants to sign out
      navigate('/');
    } catch (error) {
      // If it's not a session missing error, show it to user
      if (error.message !== 'Auth session missing!') {
        setError(error.message);
      } else {
        // For session missing, just navigate away
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    if (!window.confirm('This will permanently delete all your data. Are you absolutely sure?')) {
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Note: Supabase doesn't have a direct delete user method from client
      // For now, we'll sign out the user and show a message
      await signOut();
      setMessage('Please contact support to complete account deletion.');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setError('Failed to process account deletion. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="account-settings">
      <div className="settings-container">
        <div className="settings-header">
          <div className="header-top">
            <button className="back-btn" onClick={() => navigate('/')}>
              ← Back to Home
            </button>
          </div>
          <h2>Account Settings</h2>
          <p>Manage your account information</p>
        </div>

        <div className="settings-content">
          <div className="profile-section">
            <div className="profile-header">
              <div className="profile-avatar">
                <div className="avatar-circle">
                  {user?.user_metadata?.full_name 
                    ? user.user_metadata.full_name.charAt(0).toUpperCase()
                    : user?.email?.charAt(0).toUpperCase()
                  }
                </div>
              </div>
              <div className="profile-info">
                <h3>{user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}</h3>
                <p className="user-email">{user?.email}</p>
                <p className="member-since">
                  Member since {new Date(user?.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}

            <div className="account-actions">
              <button 
                onClick={handleSignOut} 
                disabled={loading}
                className="sign-out-btn"
              >
                {loading ? 'Signing Out...' : 'Sign Out'}
              </button>

              <div className="danger-zone">
                <h4>Danger Zone</h4>
                <div className="danger-actions">
                  <div>
                    <h5>Delete Account</h5>
                    <p>Permanently delete your account and all associated data.</p>
                  </div>
                  <button 
                    onClick={handleDeleteAccount} 
                    disabled={loading}
                    className="danger-btn"
                  >
                    {loading ? 'Processing...' : 'Delete Account'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


};

export default AccountSettings;
