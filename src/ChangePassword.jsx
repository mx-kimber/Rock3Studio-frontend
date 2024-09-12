import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "./UserContext";

export function ChangePassword() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    setSuccess("");
    const params = new FormData(event.target);

    axios
      .patch(`http://localhost:3000/users/${currentUser.id}.json`, params)
      .then((response) => {
        console.log(response.data);
        setCurrentUser(response.data);
        setSuccess("Your profile has been updated successfully.");
        event.target.reset();
        window.location.href = "/profile_settings"; 
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="change-password">
      <h1>Change Password and Email</h1>
      {errors.length > 0 && (
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      {success && <p>{success}</p>}
      <form onSubmit={handleSubmit} autoComplete="off">
        
          <div>
            <label>Email:</label>
            <input name="email" type="email" autoComplete="off" defaultValue={currentUser.email} />
          </div>
          <div>
            <label>Current Password:</label>
            <input name="current_password" type="password" autoComplete="current-password" />
          </div>
          <div>
            <label>New Password:</label>
            <input name="password" type="password" autoComplete="new-password" />
          </div>
          <div>
            <label>New Password Confirmation:</label>
            <input name="password_confirmation" type="password" autoComplete="new-password" />
          </div>
          <button className="button" type="submit">Update</button>
     
      </form>
   </div>
  );
}

export default ChangePassword;
