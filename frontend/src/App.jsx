import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RecipientPage from './pages/RecipientPage';
import DonorPage from './pages/DonorPage';
import OrganPage from './pages/OrganPage';
import MatchingPage from './pages/MatchingPage';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = React.useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return (
      <>
        <Navbar onLogout={handleLogout} />
        <div className="container">
          {children}</div>
      </>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/recipients" element={<ProtectedRoute><RecipientPage /></ProtectedRoute>} />
        <Route path="/donors" element={<ProtectedRoute><DonorPage /></ProtectedRoute>} />
        <Route path="/organs" element={<ProtectedRoute><OrganPage /></ProtectedRoute>} />
        <Route path="/matching/:organId" element={<ProtectedRoute><MatchingPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
