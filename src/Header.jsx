import { Logout } from "./Logout";
import { UserContext } from "./UserContext";
import React, { useContext } from "react";

export function Header() {
  let authenticationLinks;
  if (localStorage.jwt === undefined) {

    authenticationLinks = (
      <>
        <button onClick={() => window.location.href = '/login'}>Login</button>  
        <button onClick={() => window.location.href = '/signup'}>Signup</button>
      </>
    );
  } else {

    authenticationLinks = <Logout />;
  }
  const { currentUser } = useContext(UserContext);
  return (
    <header>
      <nav>
        
        
        <div>
          <button onClick={() => window.location.href = '#'}>Home</button>  </div>
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
