import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import RockShow from './RockShow';
import Modal from './Modal'; 

export function RocksIndex({ reload }) {
  const { currentUser } = useContext(UserContext);
  const [rocks, setRocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const fetchRocks = async () => {
        try {
          const response = await axios.get('http://localhost:3000/rocks.json');
          const sortedRocks = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setRocks(sortedRocks);
        } catch (error) {
          setError(error.response?.data?.message || 'An error occurred');
        } finally {
          setLoading(false);
        }
      };

      fetchRocks();
    }
  }, [currentUser, reload]);

  const handleViewRock = (rockId) => {
    setModalContent(
      <RockShow rockId={rockId} onClose={() => setModalVisible(false)} />
    );
    setModalVisible(true);
  };

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
      <h1>Rocks collected</h1>
      <div>
        {rocks.map(rock => (
          <div key={rock.id}>
            <div>
              {rock.photos.length > 0 ? (
                <img src={rock.photos[0].url} alt={`Photo of ${rock.rock_name}`} style={{ width: '100px' }} />
              ) : (
                <div style={{ width: '50px', height: '50px', backgroundColor: 'black' }} />
              )}
            </div>
            <div>{rock.rock_name}</div>
            <p>Material: {rock.material}</p>
            <p>Category: {rock.category}</p>
            <button onClick={() => handleViewRock(rock.id)}>
              View Rock
            </button>
          </div>
        ))}
      </div>
      <Modal show={modalVisible} onClose={() => setModalVisible(false)}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default RocksIndex;
