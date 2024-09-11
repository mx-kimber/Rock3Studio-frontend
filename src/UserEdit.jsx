import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';

export function UserEdit({ onClose }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    full_name: '',
    user_name: '',
    email: ''
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        full_name: currentUser.full_name || '',
        user_name: currentUser.user_name || '',
        email: currentUser.email || ''
      });
      setLoading(false);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put('http://localhost:3000/users/current_user.json', formData);
      setCurrentUser(response.data);
      setLoading(false);
      if (onClose) onClose(); // Close the modal on success
    } catch (error) {
      setErrors(error.response?.data.errors || ['An error occurred while updating your information.']);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Your Information</h2>
      {errors.length > 0 && (
        <div className="errors">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Full Name:
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            User Name:
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UserEdit;
