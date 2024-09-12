import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddRock from './AddRock';
import RockShow from './RockShow';
import { Modal } from "./Modal";

export function RocksIndex() {
  const [rocks, setRocks] = useState([]);
  const [showAddRock, setShowAddRock] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    fetchRocks();
  }, []);

  const fetchRocks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/rocks.json');
      setRocks(response.data);
    } catch (error) {
      console.error('An error occurred while fetching rocks.');
    }
  };

  const handleRockAdded = () => {
    fetchRocks();
    setShowAddRock(false);
  };

  const handleAddRockClick = () => {
    setShowAddRock(true);
  };

  const handleCloseAddRock = () => {
    setShowAddRock(false);
  };

  const handleRockClick = (rockId) => {
    setModalContent(
      <RockShow
        rockId={rockId}
        onClose={handleCloseModal}
        reload={fetchRocks}
      />
    );
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  return (
    <div>
      <h1>Rock Collection</h1>
      <div className='container-row outline'>
        <button onClick={handleAddRockClick}>Add New Rock</button>
        <button onClick={""}>Sort</button>
        <button onClick={""}>Search</button>
      </div>
      <div className='container-col'>
        {rocks.map(rock => (
          <div key={rock.id} className='container-row'>
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
            <div>
              <div>{rock.rock_name}</div>
              <div>
                <button onClick={() => handleRockClick(rock.id)}>Show Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddRock && (
        <Modal show={showAddRock} onClose={handleCloseAddRock}>
          <AddRock
            onRockAdded={handleRockAdded}
            onClose={handleCloseAddRock}
          />
        </Modal>
      )}

      <Modal show={modalVisible} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default RocksIndex;
