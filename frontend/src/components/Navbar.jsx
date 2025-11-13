import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';
import './Auth.css';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = ({ currentPage = 'home', onNavigate }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Determine current page based on route
  const getCurrentPage = () => {
    if (location.pathname === '/account') return 'account';
    if (location.pathname === '/wardrobe') return 'wardrobe';
    if (location.pathname === '/styles') return 'styles';
    if (location.pathname === '/') return 'home';
    return currentPage;
  };

  const handleNavigation = (page) => {
    if (page === 'login') {
      if (onNavigate) onNavigate(page);
    } else {
      // Use React Router for page navigation
      switch (page) {
        case 'home':
          navigate('/');
          break;
        case 'wardrobe':
          navigate('/wardrobe');
          break;
        case 'styles':
          navigate('/styles');
          break;
        case 'account':
          navigate('/account');
          break;
        default:
          alert(`${page} page coming soon!`);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      // Ignore session missing errors, user wants to sign out anyway
      console.log('Sign out completed');
    } finally {
      setShowUserMenu(false);
    }
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    } 
    return user?.email?.split('@')[0] || 'User';
  };

  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-text">Fashion Shift</span>
        </div>
        <button
          className="theme-toggle"
          onClick={() => toggleTheme()}
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
        <ul className="nav-menu">
          <li className="nav-item">
            <a 
              href="#" 
              className={`nav-link ${getCurrentPage() === 'home' ? 'active' : ''}`} 
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#" 
              className={`nav-link ${getCurrentPage() === 'wardrobe' ? 'active' : ''}`} 
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('wardrobe');
              }}
            >
              Wardrobe
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#" 
              className={`nav-link ${getCurrentPage() === 'styles' ? 'active' : ''}`} 
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('styles');
              }}
            >
              Styles
            </a>
          </li>
          <li className="nav-item">
            {user ? (
              <div className="user-menu">
                <button 
                  className={`user-button ${getCurrentPage() === 'account' ? 'active' : ''}`}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  {getUserDisplayName()}
                </button>
                {showUserMenu && (
                  <div className="user-dropdown">
                    <button onClick={() => {
                      setShowUserMenu(false);
                      navigate('/account');
                    }}>
                      Account Settings
                    </button>
                    <button onClick={() => {
                      setShowUserMenu(false);
                      handleNavigation('wardrobe');
                    }}>
                      My Wardrobe
                    </button>
                    <button onClick={handleSignOut}>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a 
                href="#" 
                className="nav-link auth-link" 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('login');
                }}
              >
                Login/Signup
              </a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;