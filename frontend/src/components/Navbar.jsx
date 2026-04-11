import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Organ Transplant System</Link>
      <div className="nav-links">
        <Link to="/recipients" className="nav-link">Recipients</Link>
        <Link to="/donors" className="nav-link">Donors</Link>
        <Link to="/organs" className="nav-link">Organs</Link>
        <button onClick={onLogout} className="btn" style={{ padding: '0.5rem 1rem', background: '#357ABD' }}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
