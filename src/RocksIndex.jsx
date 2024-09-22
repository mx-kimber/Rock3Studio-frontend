import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RockAdd from './RockAdd';
import RockShow from './RockShow';

export function RocksIndex() {
  const [rocks, setRocks] = useState([]);
  const [showRockAdd, setShowRockAdd] = useState(false);
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
    setShowRockAdd(false); 
  };

  const handleRockAddClick = () => {
    setShowRockAdd(true);
  };

  const handleCloseRockAdd = () => {
    setShowRockAdd(false);
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
      <button onClick={handleRockAddClick}>Add New Rock</button>
      <div>
        {rocks.map(rock => (
          <div key={rock.id}>
            <div>
              {rock.photos.length > 0 ? (
                <div key={rock.photos[0].id}>
                  <img src={rock.photos[0].url} alt={`Photo of ${rock.rock_name}`} style={{ width: '200px' }} />
                </div>
              ) : (
                <div style={{ width: '50px', height: '50px', backgroundColor: 'blue' }} />
              )}
            </div>
            {rock.rock_name}
            <button onClick={() => handleRockClick(rock.id)}>Show Details</button>
          </div>
        ))}
      </div>

      {showRockAdd && (
        <div className="modal">
          <RockAdd
            onRockAdded={handleRockAdded}
            onClose={handleCloseRockAdd}
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