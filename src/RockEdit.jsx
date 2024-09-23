import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function RockEdit({ rock, onClose, reload }) {
  const [formData, setFormData] = useState({ ...rock });

  useEffect(() => {
    setFormData({ ...rock });
  }, [rock]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/rocks/${rock.id}.json`, formData);
      alert('Rock updated successfully.');
      reload();
      onClose(); 
    } catch (error) {
      alert('An error occurred while updating the rock.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Rock</h2>
      <label>
        Name:
        <input type="text" name="rock_name" value={formData.rock_name} onChange={handleChange} />
      </label>
      
      <button type="submit">Save Changes</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
}

export default RockEdit;
