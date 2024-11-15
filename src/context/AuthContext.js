// src/context/AuthContext.js
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para realizar login
  const login = async (email, senha) => {
    try {
      const response = await axios.post('https://back-end-minha-plataforma-app.vercel.app/api/login', { email, senha });
      const { token, user } = response.data;

      // Armazenar o token no localStorage
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao realizar login.');
    }
  };

  // Função para sair
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return; // Se não houver token, não fazer a requisição
      }

      try {
        const response = await axios.get('https://back-end-minha-plataforma-app.vercel.app/api/user', {
          headers: { Authorization: `Bearer ${token}` }, // Enviar o token no header
        });
        setUser(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
