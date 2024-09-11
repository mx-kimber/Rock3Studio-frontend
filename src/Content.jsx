import { Login } from "./Login";
import { Logout } from "./Logout";
import { Signup } from "./Signup";
import { UsersIndex } from "./UsersIndex";
import { UserContext } from "./UserContext";
import React, { useContext } from "react";

export function Content() {

  const { currentUser } = useContext(UserContext);


  return (
    <div>
      
      <div>
        <h1> {currentUser ? `Welcome, ${currentUser.user_name}!` : 'Welcome, Guest!'} </h1>
      </div>
      
      <Signup />
      <Login />
      <Logout />
      <UsersIndex />
      
    </div>
  )
}