import { Login } from "./Login";
import { Signup } from "./Signup";
import { UserShow } from "./UserShow";
// import { UserContext } from "./UserContext";
// import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
// import { Collection } from "./Collection";
import RocksIndex from "./RocksIndex";

export function Content() {

  // const { currentUser } = useContext(UserContext);


  return (
    <div>
      {/* <div>
        <h1> {currentUser ? `Welcome, ${currentUser.user_name}!` : 'Welcome, Guest!'} </h1>
      </div> */}
      <div>
      <Routes>
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/Login" element={<Login />} />
        <Route path="/profile_settings" element={<UserShow />} />
        <Route path="/collection" element={<RocksIndex />} />
      </Routes>
    </div>
    </div>
  )
}