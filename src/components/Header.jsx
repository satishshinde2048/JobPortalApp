import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">Job Application Portal</div>
      <div>
        <span className="mr-4">{user.name}</span>
        <span>{user.email}</span>
        <Link to="/profile" className="ml-4 underline">Profile</Link>
      </div>
    </header>
  );
};

export default Header;
