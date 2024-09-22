import { useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export function Logout() {
  const { setCurrentUser } = useContext(UserContext);

  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    sessionStorage.removeItem("jwt");
    setCurrentUser(null)
    window.location.href = "/login"; 
  };

  return (
    <button onClick={handleClick}>
      Logout
    </button>
  );
}