// src/pages/Dashboard.js
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CoursePlayer from './CoursePlayer.js';
import Header from './Header.js'; // Importe o componente de cabeçalho

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
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.enrolledCourses) {
      const enrolledCourses = courses.filter(course => user.enrolledCourses.includes(course.id));
      setUserCourses(enrolledCourses);
    }
  }, [user]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header /> {/* Use o componente de cabeçalho */}
      <main className="p-4 sm:p-6 flex-1">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">Meus Cursos</h1>
        {selectedCourse ? (
          <CoursePlayer course={selectedCourse} />
        ) : (
          userCourses.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Você ainda não está inscrito em nenhum curso. Explore nossos cursos disponíveis para começar sua jornada de aprendizado!
              </p>
              <button
                className="bg-secondary text-white font-semibold px-6 py-3 rounded-md hover:bg-purple-700 transition duration-200"
                onClick={() => navigate('/courses')}
              >
                Explorar Cursos
              </button>
            </div>
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
          )
        )}
      </main>
    </div>
  );
};

export default Dashboard;
