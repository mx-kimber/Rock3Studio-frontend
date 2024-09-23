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
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Edit Rock</h2>

        <label>
          Name:
          <input
            type="text"
            name="rock_name"
            value={formData.rock_name}
            onChange={handleChange}
          />
        </label>

        <label>
          Material:
          <input
            type="text"
            name="material"
            value={formData.material}
            onChange={handleChange}
          />
        </label>

        <label>
          Weight:
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        </label>

        <label>
          Weight Unit:
          <input
            type="text"
            name="weight_unit"
            value={formData.weight_unit}
            onChange={handleChange}
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>

        <label>
          Notes:
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </label>

        <label>
          Color:
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
        </label>

        <label>
          Condition:
          <input
            type="text"
          name="condition"
          value={formData.condition}
          onChange={handleChange}
        />
        </label>

        <label>
          Dimensions:
          <input
            type="text"
            name="dimensions"
            value={formData.dimensions}
            onChange={handleChange}
          />
        </label>

        <label>
          Source:
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
          />
        </label>

        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </label>

        <label>
          Hardness:
          <input
            type="text"
            name="hardness"
            value={formData.hardness}
            onChange={handleChange}
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default RockEdit;
