import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './UserContext'; 
import Signup from './Signup';
import Login from './Login';
import UserShow from './UserShow';
import RocksIndex from './RocksIndex';

export function Content() {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <h1>{currentUser ? `Welcome, ${currentUser.user_name}!` : 'Welcome, Guest!'}</h1>
      <div>
        <Routes>
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          
          <Route 
            path="/profile_settings" 
            element={currentUser ? <UserShow /> : <Navigate to="/Login" />} 
          />
          <Route 
            path="/collection" 
            element={currentUser ? <RocksIndex /> : <Navigate to="/Login" />} 
          />
        </Routes>
      </div>
    </div>
  );
}

export default Content;