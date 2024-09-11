import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

export function Collection() {
  const { currentUser } = useContext(UserContext);
  const [rocks, setRocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const fetchRocks = async () => {
        try {
          const response = await axios.get('http://localhost:3000/rocks.json');
          setRocks(response.data);
        } catch (error) {
          setError(error.response?.data.message || 'An error occurred');
        } finally {
          setLoading(false);
        }
      };

      fetchRocks();
    }
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!rocks.length) {
    return <div>No rocks found in your collection.</div>;
  }

  return (
    <div>
      <h1>Your Rock Collection</h1>
      <ul>
        {rocks.map(rock => (
          <li key={rock.id}>
            <h2>{rock.rock_name}</h2>
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
            {rock.photos.length > 0 && (
              <div>
                <h3>Photos:</h3>
                <ul>
                  {rock.photos.map(photo => (
                    <li key={photo.id}>
                      <img src={photo.url} alt={`Photo of ${rock.rock_name}`} style={{ width: '100px' }} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Collection;
