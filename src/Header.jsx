import { Logout } from "./Logout";
import { UserContext } from "./UserContext";
import React, { useContext, useEffect, useState } from "react";

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const tokenTimestamp = localStorage.getItem('tokenTimestamp');

    if (token && tokenTimestamp) {
      const currentTime = Date.now();
      const tokenAge = currentTime - parseInt(tokenTimestamp, 10);

      const tokenExpired = tokenAge > 24 * 60 * 60 * 1000;

      if (!tokenExpired) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('jwt');
        localStorage.removeItem('tokenTimestamp');
      }
    }
  }, []);

  let authenticationLinks;

  if (!isAuthenticated) {
    authenticationLinks = (
      <>
        <button onClick={() => window.location.href = '/login'}>Login</button>  
        <button onClick={() => window.location.href = '/signup'}>Signup</button>
      </>
    );
  } else {
    authenticationLinks = <Logout />;
  }

  return (
    <header>
      <nav>
        <div>
          <button onClick={() => window.location.href = '#'}>Home</button>
        </div>
        <div>
          <button onClick={() => window.location.href = '/collection'}>Collection</button>
        </div>
        <div>
          <button onClick={() => window.location.href = '/profile_settings'}>Settings</button>
        </div>
        <div className="container-row outline2">
          {authenticationLinks}
          {/* {currentUser ? `${currentUser.user_name}` : null} */}
        </div>
      </nav>
    </header>
  );
}
