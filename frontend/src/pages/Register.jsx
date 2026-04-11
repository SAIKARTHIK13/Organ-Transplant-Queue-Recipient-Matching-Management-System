import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiCall } from '../api';

function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'COORDINATOR', hospital: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiCall('/auth/register', {
        method: 'POST',
        body: formData
      });
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px', marginTop: '5vh' }}>
      <div className="card">
        <h2 className="text-center">Register New User</h2>
        {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
              <option value="ADMIN">Admin</option>
              <option value="COORDINATOR">Coordinator</option>
              <option value="SURGEON">Surgeon</option>
            </select>
          </div>
          <div className="form-group">
            <label>Hospital</label>
            <input type="text" value={formData.hospital} onChange={e => setFormData({...formData, hospital: e.target.value})} required />
          </div>
          <button type="submit" className="btn" style={{ width: '100%' }}>Register</button>
        </form>
        <p className="text-center mt-2">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
