import React, { useState, useEffect } from 'react';
import { apiCall } from '../api';

function RecipientPage() {
  const [recipients, setRecipients] = useState([]);
  const [formData, setFormData] = useState({
    name: '', age: '', bloodGroup: 'A+', organNeeded: 'KIDNEY', urgencyScore: 5
  });
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchRecipients = async () => {
    try {
      const data = await apiCall('/recipients');
      setRecipients(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRecipients();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await apiCall('/recipients', { method: 'POST', body: formData });
    fetchRecipients();
  };

  const handleUpdateUrgency = async (id, currentUrgency) => {
    const newUrgency = prompt('Enter new urgency score (1-10):', currentUrgency);
    if (newUrgency && !isNaN(newUrgency)) {
      await apiCall(`/recipients/${id}/urgency`, {
        method: 'PUT',
        body: { urgencyScore: parseInt(newUrgency) }
      });
      fetchRecipients();
    }
  };

  const handleRemove = async (id) => {
    if (window.confirm('Are you sure you want to remove this recipient?')) {
      await apiCall(`/recipients/${id}`, { method: 'DELETE' });
      fetchRecipients();
    }
  };

  return (
    <div>
      <h2>Manage Recipients</h2>
      {(user?.role === 'ADMIN' || user?.role === 'COORDINATOR') && (
        <div className="card mb-2">
          <h3>Add New Recipient</h3>
          <form onSubmit={handleAdd} className="flex gap-1" style={{ flexWrap: 'wrap', marginTop: '1rem' }}>
            <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required style={{ width: '200px' }} />
            <input type="number" placeholder="Age" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} required style={{ width: '100px' }} />
            <select value={formData.bloodGroup} onChange={e => setFormData({ ...formData, bloodGroup: e.target.value })} style={{ width: '100px' }}>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
            </select>
            <select value={formData.organNeeded} onChange={e => setFormData({ ...formData, organNeeded: e.target.value })} style={{ width: '150px' }}>
              <option value="KIDNEY">Kidney</option>
              <option value="LIVER">Liver</option>
              <option value="HEART">Heart</option>
              <option value="LUNG">Lung</option>
              <option value="PANCREAS">Pancreas</option>
              <option value="CORNEA">Cornea</option>
            </select>
            <input type="number" min="1" max="10" placeholder="Urgency (1-10)" value={formData.urgencyScore} onChange={e => setFormData({ ...formData, urgencyScore: e.target.value })} required style={{ width: '120px' }} />
            <button type="submit" className="btn">Add Recipient</button>
          </form>
        </div>
      )}

      <div className="card">
        <h3>Waiting List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Organ Needed</th>
              <th>Blood Grp</th>
              <th>Urgency</th>
              <th>Status</th>
              {(user?.role === 'ADMIN' || user?.role === 'COORDINATOR') && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {recipients.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.name}</td>
                <td>{r.organNeeded}</td>
                <td>{r.bloodGroup}</td>
                <td>{r.urgencyScore}</td>
                <td>{r.status}</td>
                {(user?.role === 'ADMIN' || user?.role === 'COORDINATOR') && (
                  <td className="flex gap-1">
                    <button className="btn" onClick={() => handleUpdateUrgency(r.id, r.urgencyScore)}>Update</button>
                    <button className="btn btn-danger" onClick={() => handleRemove(r.id)}>Remove</button>
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

export default RecipientPage;
