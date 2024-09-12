import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddRock from './AddRock';
import RockShow from './RockShow';

export function RocksIndex() {
  const [rocks, setRocks] = useState([]);
  const [showAddRock, setShowAddRock] = useState(false);
  const [selectedRockId, setSelectedRockId] = useState(null);
  const [showRockShow, setShowRockShow] = useState(false);

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
    setSelectedRockId(rockId);
    setShowRockShow(true);
  };

  const handleCloseRockShow = () => {
    setShowRockShow(false);
    setSelectedRockId(null);
  };

  return (
    <div>
      <h1>Rocks List</h1>
      <button onClick={handleAddRockClick}>Add New Rock</button>
      <ul>
        {rocks.map(rock => (
          <li key={rock.id}>
            {rock.rock_name}
            <button onClick={() => handleRockClick(rock.id)}>Show Details</button>
          </li>
        ))}
      </ul>

      {showAddRock && (
        <div className="modal">
          <AddRock
            onRockAdded={handleRockAdded}
            onClose={handleCloseAddRock}
          />
        </div>
      )}

      {showRockShow && (
        <div className="modal">
          <RockShow
            rockId={selectedRockId}
            onClose={handleCloseRockShow}
            reload={fetchRocks}
          />
        </div>
      )}
    </div>
  );
}

export default RocksIndex;
