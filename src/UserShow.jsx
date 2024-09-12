import { UserContext } from "./UserContext";
import React, { useContext, useState } from "react";
import { Modal } from "./Modal";
import { UserEdit } from "./UserEdit";
import { ChangePassword } from "./ChangePassword";

export function UserShow() {
  const { currentUser, loading } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <div>No user data available</div>;
  }

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  const handleUserEditModal = () => {
    setModalVisible(true);
    setModalContent(<UserEdit onClose={handleCloseModal} />);
  };

  const handleChangePassword = () => {
    setModalVisible(true);
    setModalContent(<ChangePassword />);
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>Full Name:</strong> {currentUser.full_name}</p>
      <p><strong>Email:</strong> {currentUser.email}</p>
      <p><strong>Username:</strong> {currentUser.user_name}</p>
      
      <button onClick={handleUserEditModal}>Edit Profile</button>
      
      <Modal show={modalVisible} onClose={handleCloseModal} >
        {modalContent}
      </Modal>
      <div>
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
    </div>
  );
}

export default UserShow;
