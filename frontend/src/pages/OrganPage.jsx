import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../api';

function OrganPage() {
  const [organs, setOrgans] = useState([]);
  const [formData, setFormData] = useState({
    donorId: '', organType: 'KIDNEY', bloodGroup: 'A+', tissueType: 'No'
  });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchOrgans = async () => {
    try {
      const data = await apiCall('/organs');
      setOrgans(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchOrgans();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await apiCall('/organs', { method: 'POST', body: formData });
    fetchOrgans();
  };

  return (
    <div>
      <h2>Manage Organs</h2>
      {(user?.role === 'ADMIN' || user?.role === 'COORDINATOR') && (
        <div className="card mb-2">
          <h3>Add New Available Organ</h3>
          <form onSubmit={handleAdd} className="flex gap-1" style={{ flexWrap: 'wrap', marginTop: '1rem' }}>
            <input type="number" placeholder="Donor ID" value={formData.donorId} onChange={e => setFormData({ ...formData, donorId: e.target.value })} required style={{ width: '150px' }} />
            <select value={formData.organType} onChange={e => setFormData({ ...formData, organType: e.target.value })} style={{ width: '200px' }}>
              <option value="KIDNEY">Kidney</option>
              <option value="LIVER">Liver</option>
              <option value="HEART">Heart</option>
              <option value="LUNG">Lung</option>
              <option value="PANCREAS">Pancreas</option>
              <option value="CORNEA">Cornea</option>
            </select>
            <select value={formData.bloodGroup} onChange={e => setFormData({ ...formData, bloodGroup: e.target.value })} style={{ width: '150px' }}>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
            </select>
            <select value={formData.tissueType} onChange={e => setFormData({ ...formData, tissueType: e.target.value })} style={{ width: '120px' }}>
              <option value="Yes">HLA: Yes</option>
              <option value="No">HLA: No</option>
            </select>
            <button type="submit" className="btn">Add Organ</button>
          </form>
        </div>
      )}

      <div className="card">
        <h3>Available Organs</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Donor ID</th>
              <th>Organ Type</th>
              <th>Blood Grp</th>
              <th>Status</th>
              {(user?.role === 'ADMIN' || user?.role === 'SURGEON') && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {organs.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.donorId}</td>
                <td>{o.organType}</td>
                <td>{o.bloodGroup}</td>
                <td>{o.status}</td>
                {(user?.role === 'ADMIN' || user?.role === 'SURGEON') && (
                  <td>
                    <button className="btn btn-success" onClick={() => navigate(`/matching/${o.id}`)}>
                      Find Match
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrganPage;
