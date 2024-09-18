import { Logout } from "./Logout";
import { UserContext } from "./UserContext";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  let authenticationLinks;

  if (!currentUser) {
    authenticationLinks = (
      <>
        <button onClick={() => navigate('/login')}>Login</button>  
        <button onClick={() => navigate('/signup')}>Signup</button>
      </>
    );
  } else {
  
    authenticationLinks = <Logout />;
  }

  return (
    <header>
      <nav>
        <div>
          <button onClick={() => navigate('/')}>Home</button>
        </div>
        <div>
          <button onClick={() => navigate('/collection')}>Collection</button>  
        </div>
        <div>
          <button onClick={() => navigate('/profile_settings')}>Settings</button>  
        </div>
        <div className="container-row outline2">
          {authenticationLinks}
        </div>
      </nav>
    </header>
  );
}
