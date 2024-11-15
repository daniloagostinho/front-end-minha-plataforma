// src/components/Navbar.js
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Logo</h1>
        {/* Menu Items for Large Screens */}
        <div className="hidden md:flex space-x-8">
          <button
            onClick={() => navigate('/home')}
            className="text-gray-800 font-bold hover:text-primary"
          >
            Início
          </button>
          <button
            onClick={() => navigate('/sobre')}
            className="text-gray-800 font-bold hover:text-primary"
          >
            Sobre
          </button>
          <button
            onClick={() => navigate('/courses')}
            className="text-gray-800 font-bold hover:text-primary"
          >
            Cursos
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-800 font-bold hover:text-primary"
          >
            Painel
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="text-gray-800 font-bold hover:text-primary"
          >
            Cadastrar grátis
          </button>
        </div>
        {/* Hamburger Menu for Small Screens */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <FaTimes className="text-2xl text-gray-800" />
            ) : (
              <FaBars className="text-2xl text-gray-800" />
            )}
          </button>
        </div>
      </div>
      {/* Dropdown Menu for Small Screens */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col items-center space-y-4 py-4">
            <button
              onClick={() => navigate('/home')}
              className="text-gray-800 font-bold hover:text-primary"
            >
              Início
            </button>
            <button
              onClick={() => navigate('/sobre')}
              className="text-gray-800 font-bold hover:text-primary"
            >
              Sobre
            </button>
            <button
              onClick={() => navigate('/courses')}
              className="text-gray-800 font-bold hover:text-primary"
            >
              Cursos
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-800 font-bold hover:text-primary"
            >
              Painel
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="text-gray-800 font-bold hover:text-primary"
            >
              Cadastro
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
