import React, { useState } from 'react';
import { RocksIndex } from "./RocksIndex";
import { AddRock } from "./AddRock";
import { Modal } from './Modal';

export function Collection() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [reload, setReload] = useState(false);

  const handleNewRockModal = () => {
    setModalVisible(true);
    setModalContent(
      <AddRock 
        onRockAdded={handleRockAdded}
        onClose={handleCloseModal}
      />
    );
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  const handleRockAdded = () => {
    setReload(prev => !prev);
  };

  return (
    <div className="outline">
      Collection
      <div>
        <button onClick={handleNewRockModal}>
          New Rock
        </button>
      </div>

      <div>
        <RocksIndex reload={reload} />
      </div>

      <Modal show={modalVisible} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default Collection;
