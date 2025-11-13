import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './pages/Home';
import AccountSettings from './pages/AccountSettings';
import WardrobePage from './pages/Wardrobe';
import StylesPage from './pages/Styles';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import './App.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

// Main App Content
const AppContent = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigation = (page) => {
    if (page === 'login') {
      setAuthModalOpen(true);
    } else {
      setCurrentPage(page);
      // You can add routing logic here for other pages
      if (page !== 'home' && page !== 'account' && page !== 'wardrobe' && page !== 'styles') {
        alert(`${page} page coming soon!`);
      }
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar 
          currentPage={currentPage} 
          onNavigate={handleNavigation}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/wardrobe" element={<WardrobePage />} />
          
          <Route path="/styles" element={<StylesPage />} />
          
          <Route path="/account" element={
            <ProtectedRoute>
              <AccountSettings />
            </ProtectedRoute>
          } />
          {/* Add more routes as needed */}
        </Routes>
        <AuthModal 
          isOpen={authModalOpen} 
          onClose={() => setAuthModalOpen(false)}
        />
      </div>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
