// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

// Criar o contexto de autenticação
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Simular um usuário logado com cursos específicos
  const [user, setUser] = useState({
    id: 1,
    name: 'Danilo',
    enrolledCourses: [1, 3], // IDs dos cursos que o aluno está matriculado (agora incluindo o novo curso)
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
