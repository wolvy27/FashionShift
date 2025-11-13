import React from 'react';
import './Navbar.css';

const Navbar = ({ currentPage = 'home', onNavigate }) => {
  const handleNavigation = (page) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      // Default behavior - can be replaced with routing logic
      alert(`Navigating to ${page} page coming soon!`);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-text">Fashion Shift</span>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <a 
              href="#" 
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} 
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('home');
              }}
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#" 
              className={`nav-link ${currentPage === 'wardrobe' ? 'active' : ''}`} 
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
              className={`nav-link ${currentPage === 'styles' ? 'active' : ''}`} 
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('styles');
              }}
            >
              Styles
            </a>
          </li>
          <li className="nav-item">
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
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;