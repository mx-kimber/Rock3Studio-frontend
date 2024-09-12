import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function RockShow({ rockId, onClose, reload }) {
  const [rock, setRock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRock = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/rocks/${rockId}.json`);
        setRock(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRock();
  }, [rockId]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this rock?')) {
      try {
        await axios.delete(`http://localhost:3000/rocks/${rockId}.json`);
        alert('Rock deleted successfully.');
        if (onClose) onClose(); 
        if (reload) reload(); 
      } catch (error) {
        alert('An error occurred while deleting the rock.');
      }
    }
  };

  const handleEdit = () => {
    
    alert('Edit functionality is not implemented.');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      
      <h2>{rock.rock_name}</h2>
      <div>
          {rock.photos.length > 0 ? (
            rock.photos.map(photo => (
              <div key={photo.id}>
                <img src={photo.url} alt={`Photo of ${rock.rock_name}`} style={{ width: '200px' }} />
              </div>
            ))
          ) : (
            <div>
              <div style={{ width: '50px', height: '50px', backgroundColor: 'blue' }} />
            </div>
          )}
        </div>
      <p>Material: {rock.material}</p>
      <p>Weight: {rock.weight} {rock.weight_unit}</p>
      <p>Location: {rock.location}</p>
      <p>Notes: {rock.notes}</p>
      <p>Color: {rock.color}</p>
      <p>Condition: {rock.condition}</p>
      <p>Dimensions: {rock.dimensions}</p>
      <p>Source: {rock.source}</p>
      <p>Category: {rock.category}</p>
      <p>Hardness: {rock.hardness}</p>
      <p>Price: ${rock.price}</p>

      <div>
        <h3>Photos:</h3>
        
      </div>

      <div>
        <button onClick={handleEdit}>Edit Rock</button>
        <button onClick={handleDelete}>Delete Rock</button>
      </div>
    </div>
  );
}

export default RockShow;
