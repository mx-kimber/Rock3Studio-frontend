import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

export function RockAdd({ onRockAdded, onClose }) {
  const { currentUser } = useContext(UserContext);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    setLoading(true);

    const formData = new FormData(event.target);
    formData.append('user_id', currentUser.id); 

    axios
      .post("http://localhost:3000/rocks.json", formData)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        if (onRockAdded) onRockAdded();
        if (onClose) onClose();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response?.data?.errors);
        setErrors(error.response?.data?.errors || ['An error occurred']);
        setLoading(false);
      });
  };
  

  return (
    <div>
      <h2>Add a New Rock</h2>
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
            Rock Name:
            <input type="text" name="rock_name" required />
          </label>
        </div>
        <div>
          <label>
            Material:
            <input type="text" name="material" />
          </label>
        </div>
        <div>
          <label>
            Weight:
            <input type="number" name="weight" />
          </label>
        </div>
        <div>
          <label>
            Weight Unit:
            <input type="text" name="weight_unit" />
          </label>
        </div>
        <div>
          <label>
            Location:
            <input type="text" name="location" />
          </label>
        </div>
        <div>
          <label>
            Notes:
            <textarea name="notes"></textarea>
          </label>
        </div>
        <div>
          <label>
            Color:
            <input type="text" name="color" />
          </label>
        </div>
        <div>
          <label>
            Condition:
            <input type="text" name="condition" />
          </label>
        </div>
        <div>
          <label>
            Dimensions:
            <input type="text" name="dimensions" />
          </label>
        </div>
        <div>
          <label>
            Source:
            <input type="text" name="source" />
          </label>
        </div>
        <div>
          <label>
            Category:
            <input type="text" name="category" />
          </label>
        </div>
        <div>
          <label>
            Hardness:
            <input type="text" name="hardness" />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input type="number" name="price" />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Rock'}
        </button>
      </form>
    </div>
  );
}

export default RockAdd;

// {rock.photos.length > 0 && (
//   <div>
//     <h3>Photos:</h3>
//     <ul>
//       {rock.photos.map(photo => (
//         <li key={photo.id}>
//           <img src={photo.url} alt={`Photo of ${rock.rock_name}`} style={{ width: '100px' }} />
//         </li>
//       ))}
//     </ul>
//   </div>
// )}
