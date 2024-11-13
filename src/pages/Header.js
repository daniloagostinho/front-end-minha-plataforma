// src/components/Header.js
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="bg-black shadow-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
      <div className="text-xl font-bold text-white">
        <span>Bem-vindo, </span>{user?.name}!
      </div>
      <button className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-secondary transition duration-200">
        Logout
      </button>
    </header>
  );
};

export default Header;
