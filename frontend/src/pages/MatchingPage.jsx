import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiCall } from '../api';

function MatchingPage() {
  const { organId } = useParams();
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await apiCall(`/matching/${organId}`);
        setMatches(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [organId]);

  const handleAcceptOrgan = async (recipientId) => {
    if (window.confirm('Confirm organ allocation to this recipient?')) {
      const user = JSON.parse(localStorage.getItem('user'));
      try {
        await apiCall('/transplant/accept', {
          method: 'POST',
          body: {
            organId: parseInt(organId),
            recipientId: recipientId,
            performedBy: user.name
          }
        });
        alert('Transplant recorded successfully!');
        navigate('/organs');
      } catch (e) {
        alert(e.message);
      }
    }
  };

  const handleRejectOrgan = (recipientId) => {
    if (window.confirm('Are you sure you want to reject this patient for this organ?')) {
      setMatches(matches.filter(m => m.id !== recipientId));
    }
  };

  return (
    <div>
      <h2>Matching Results for Organ #{organId}</h2>
      <div className="card mt-2">
        {loading ? (
          <p>Finding matches based on blood group, organ type, and urgency...</p>
        ) : matches.length === 0 ? (
          <p>No suitable waitlist matches found for this organ.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Recipient ID</th>
                <th>Name</th>
                <th>Urgency Score</th>
                <th>Waiting Since</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {matches.map(m => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.name}</td>
                  <td><strong>{m.urgencyScore} / 10</strong></td>
                  <td>{m.waitingSince}</td>
                  <td>
                    <div className="flex gap-1">
                      <button className="btn btn-success" onClick={() => handleAcceptOrgan(m.id)}>
                        Allocate
                      </button>
                      <button className="btn btn-danger" onClick={() => handleRejectOrgan(m.id)}>
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MatchingPage;
