import React from 'react';
import './Home.css';

const Home = () => {
  const handleUploadWardrobe = () => {
    // TODO: Navigate to wardrobe page or implement upload functionality
    alert('Upload Wardrobe functionality coming soon!');
  };

  const handleViewStyles = () => {
    // TODO: Navigate to styles page
    alert('Styles page coming soon!');
  };

  const handleViewWardrobe = () => {
    // TODO: Navigate to wardrobe page
    alert('Wardrobe page coming soon!');
  };

  const handleNavigation = (page) => {
    // TODO: Implement navigation logic
    alert(`Navigating to ${page} page coming soon!`);
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">Fashion Shift</span>
          </div>
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#" className="nav-link active" onClick={() => handleNavigation('home')}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={() => handleNavigation('wardrobe')}>
                Wardrobe
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={() => handleNavigation('styles')}>
                Styles
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link auth-link" onClick={() => handleNavigation('login')}>
                Login/Signup
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <header className="home-header">
        <h1 className="app-title">Fashion Shift</h1>
        <p className="app-subtitle">Transform Your Wardrobe with AI-Powered Style</p>
      </header>

      <main className="home-main">
        <div className="hero-section">
          <div className="hero-content">
            <h2>Welcome to Your Digital Closet</h2>
            <p>
              Discover new outfit combinations, organize your wardrobe, and get 
              personalized style recommendations powered by AI.
            </p>
          </div>
        </div>

        <div className="action-buttons">
          <button className="primary-btn upload-btn" onClick={handleUploadWardrobe}>
            <span className="btn-icon"></span>
            Upload Wardrobe
          </button>
          
          <button className="secondary-btn wardrobe-btn" onClick={handleViewWardrobe}>
            <span className="btn-icon"></span>
            View My Wardrobe
          </button>
          
          <button className="secondary-btn styles-btn" onClick={handleViewStyles}>
            <span className="btn-icon"></span>
            Discover Styles
          </button>
        </div>

        <div className="features-section">
          <h3>What You Can Do</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📸</div>
              <h4>Upload Clothes</h4>
              <p>Take photos of your clothes and build your digital wardrobe</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h4>Organize & Filter</h4>
              <p>Filter by clothing type, color, material, and size</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h4>AI Style Recommendations</h4>
              <p>Get personalized outfit suggestions based on your preferences</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="home-footer">
        <p>&copy; 2025 Fashion Shift. Style your way forward.</p>
      </footer>
    </div>
  );
};

export default Home;