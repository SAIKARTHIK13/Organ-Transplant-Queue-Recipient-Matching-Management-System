import React, { useState, useEffect } from 'react';
import { apiCall } from '../api';

function DonorPage() {
  const [donors, setDonors] = useState([]);
  const [formData, setFormData] = useState({
    name: '', donorType: 'DECEASED', bloodGroup: 'A+', age: '', hospital: '', tissueType: 'No', causeOfDeath: ''
  });
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchDonors = async () => {
    try {
      const data = await apiCall('/donors');
      setDonors(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (formData.donorType === 'LIVING' && formData.age < 18) {
      alert('Living donor must be at least 18 years old.');
      return;
    }
    await apiCall('/donors', { method: 'POST', body: formData });
    fetchDonors();
  };

  return (
    <div>
      <h2>Manage Donors</h2>
      {(user?.role === 'ADMIN' || user?.role === 'COORDINATOR') && (
        <div className="card mb-2">
          <h3>Add New Donor</h3>
          <form onSubmit={handleAdd} className="flex gap-1" style={{ flexWrap: 'wrap', marginTop: '1rem' }}>
            <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={{width: '200px'}} />
            <select value={formData.donorType} onChange={e => setFormData({...formData, donorType: e.target.value})} style={{width: '150px'}}>
              <option value="LIVING">Living</option>
              <option value="DECEASED">Deceased</option>
            </select>
            <select value={formData.bloodGroup} onChange={e => setFormData({...formData, bloodGroup: e.target.value})} style={{width: '100px'}}>
              {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
            </select>
            <select value={formData.tissueType} onChange={e => setFormData({...formData, tissueType: e.target.value})} style={{width: '120px'}}>
              <option value="Yes">HLA: Yes</option>
              <option value="No">HLA: No</option>
            </select>
            <input type="number" placeholder="Age" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} required style={{width: '100px'}} />
            <input type="text" placeholder="Hospital" value={formData.hospital} onChange={e => setFormData({...formData, hospital: e.target.value})} required style={{width: '200px'}} />
            {formData.donorType === 'DECEASED' && (
              <input type="text" placeholder="Cause of Death" value={formData.causeOfDeath} onChange={e => setFormData({...formData, causeOfDeath: e.target.value})} required style={{width: '200px'}} />
            )}
            <button type="submit" className="btn">Add Donor</button>
          </form>
        </div>
      )}

      <div className="card">
        <h3>Registered Donors</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Blood Grp</th>
              <th>Hospital</th>
            </tr>
          </thead>
          <tbody>
            {donors.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.donorType}</td>
                <td>{d.bloodGroup}</td>
                <td>{d.hospital}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DonorPage;
