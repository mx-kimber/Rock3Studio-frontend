import { Logout } from "./Logout";

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

  return (
    <header>
      <nav>
        <button onClick={() => window.location.href = '/'}>Home</button>  
        <button onClick={() => window.location.href = '/'}>Collection</button>  
        {authenticationLinks}  
      </nav>
    </header>
  );
}
