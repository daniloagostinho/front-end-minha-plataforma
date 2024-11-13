// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

// Criar o contexto de autenticação
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Simular um usuário logado com cursos específicos
  const [user, setUser] = useState({
    id: 1,
    name: 'Aluno Teste',
    enrolledCourses: [1], // IDs dos cursos que o aluno está matriculado
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
