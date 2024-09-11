import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserEdit } from './UserEdit';
import { Modal } from "./Modal";

export function UsersIndex() {

  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {

    axios.get("http://localhost:3000/users.json")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  const handleUserEditModal = () => {
    setModalVisible(true);
    setModalContent(<UserEdit />);
  };

  return (
    <div>
      <h1>Users Index</h1>
 
        {users.map((user) => (
          <div key={user.id}>
            <p>Full Name: {user.full_name}</p>
            <p>User Name: {user.user_name}</p>
            <p>Email: {user.email}</p>
            <button onClick={handleUserEditModal}>Update Information</button>
          </div>
        ))}
    <Modal show={modalVisible} onClose={handleCloseModal}>
          {modalContent}
        </Modal>
    </div>
    
  );
}

export default UsersIndex;
