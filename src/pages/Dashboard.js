// src/pages/Dashboard.js
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import CoursePlayer from './CoursePlayer.js';

const courses = [
  {
    id: 1,
    title: 'Curso de Node.js',
    sessions: [
      {
        title: 'Sessão 1: Conhecendo o Node.js',
        lessons: [
          { title: 'Aula 1: Bem-vindo ao Curso', url: 'https://youtu.be/dG12jGHc7jI' },
          { title: 'Aula 2: Visão Geral do Curso', url: 'https://www.youtube.com/watch?v=S7eQecVPt38' },
        ],
      },
      {
        title: 'Sessão 2: Instalando o Node.js',
        lessons: [
          { title: 'Aula 1: Sobre essa seção', url: 'https://youtu.be/--O53DKCQUo' },
          { title: 'Aula 2: Baixando e configurando o Node.js', url: 'https://youtu.be/aiN9g8FSBs8' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Curso de React',
    sessions: [
      {
        title: 'Sessão 1: Introdução ao React',
        lessons: [
          { title: 'Aula 1: O que é React?', url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' },
          { title: 'Aula 2: Configurando o Ambiente', url: 'https://www.youtube.com/watch?v=S7eQecVPt38' },
        ],
      },
    ],
  },
];

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const [userCourses, setUserCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    if (user && user.enrolledCourses) {
      const enrolledCourses = courses.filter(course => user.enrolledCourses.includes(course.id));
      setUserCourses(enrolledCourses);
    }
  }, [user]);

  // Se o usuário ainda não foi carregado, mostrar um carregamento ou mensagem padrão
  if (loading) {
    return <div>Carregando...</div>; // Mostra um indicador de carregamento enquanto a requisição é processada
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Cabeçalho com Fundo Preto */}
      <header className="bg-black shadow-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div className="text-xl font-bold text-white">
          <span>Bem-vindo, </span>{user.name}!
        </div>
        <button className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-secondary transition duration-200">
          Logout
        </button>
      </header>

      <main className="p-4 sm:p-6 flex-1">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">Meus Cursos</h1>
        {selectedCourse ? (
          <CoursePlayer course={selectedCourse} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userCourses.map(course => (
              <div key={course.id} className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition duration-200">
                <h2 className="text-lg font-bold mb-2">{course.title}</h2>
                <p className="text-gray-600 mb-4">Sessões: {course.sessions.length}</p>
                <button
                  className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-secondary transition duration-200"
                  onClick={() => setSelectedCourse(course)}
                >
                  Ver Curso
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
