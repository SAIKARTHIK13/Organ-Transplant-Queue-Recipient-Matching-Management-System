import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Welcome, {user?.name} ({user?.role})</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="card text-center">
          <h3>Manage Recipients</h3>
          <p>Add and view waiting list patients.</p>
          <Link to="/recipients" className="btn mt-2" style={{ display: 'inline-block' }}>Go to Recipients</Link>
        </div>
        
        <div className="card text-center">
          <h3>Manage Donors</h3>
          <p>Register new organ donors.</p>
          <Link to="/donors" className="btn mt-2" style={{ display: 'inline-block' }}>Go to Donors</Link>
        </div>
        
        <div className="card text-center">
          <h3>Organ Matching</h3>
          <p>View available organs and match with recipients.</p>
          <Link to="/organs" className="btn mt-2" style={{ display: 'inline-block' }}>View Organs</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
