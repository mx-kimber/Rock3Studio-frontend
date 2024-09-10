import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function UsersIndex() {
  const [users, setUsers] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3000/users.json")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div>
      <h1>Users Index</h1>
 
        {users.map((user) => (
          <div key={user.id}>
            <p>Full Name: {user.full_name}</p>
            <p>User Name: {user.user_name}</p>
            <p>Email: {user.email}</p>
          </div>
        ))}
   
    </div>
  );
}

export default UsersIndex;
