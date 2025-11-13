import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import './Home.css';


const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();


  const handleUploadWardrobe = () => {
    // TODO: Navigate to wardrobe page or implement upload functionality
    alert('Upload Wardrobe functionality coming soon!');
  };

  const handleViewStyles = () => {
    // TODO: Navigate to styles page
    alert('Styles page coming soon!');
  };

   const handleViewWardrobe = () => {
    navigate("/wardrobe");
  };

//   const handleNavigation = (page) => {
//   switch (page) {
//     case 'home': navigate('/'); break;
//     case 'wardrobe': navigate('/wardrobe'); break;
//     case 'styles': navigate('/styles'); break;
//     case 'login': navigate('/login'); break;
//     default: break;
//   }
// };


  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="app-title">Fashion Shift</h1>
        <p className="app-subtitle">
          {user 
            ? `Welcome back, ${getUserDisplayName()}! Transform Your Wardrobe with AI-Powered Style` 
            : 'Transform Your Wardrobe with AI-Powered Style'
          }
        </p>
      </header>

      <main className="home-main">
        <div className="hero-section">
          <div className="hero-content">
            <h2>Welcome to Your Digital Closet</h2>
            <p>
              Discover new outfit combinations, organize your wardrobe, and get 
              personalized style recommendations powered by AI.
            </p>
            {!user && (
              <div className="auth-prompt">
                <p><strong>Sign up today to get started with your personalized wardrobe!</strong></p>
              </div>
            )}
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