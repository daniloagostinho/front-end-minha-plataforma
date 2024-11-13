// src/pages/Login.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { setUser } = useContext(AuthContext);

  const handleLogin = () => {
    // Simular login
    setUser({ name: 'Danilo' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button onClick={handleLogin} className="bg-primary text-white px-4 py-2 rounded">
        Entrar
      </button>
    </div>
  );
};

export default Login;
