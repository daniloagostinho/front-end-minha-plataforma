// src/pages/Dashboard.js
import React, { useContext, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { AuthContext } from '../context/AuthContext';
import { FaArrowRight } from 'react-icons/fa'; // Importar ícone de seta

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
    ],
  },
  {
    id: 2,
    title: 'Curso Avançado',
    sessions: [
      {
        title: 'Sessão 1: Avançado',
        lessons: [
          { title: 'Aula 1: Conceito Avançado A', url: 'https://www.youtube.com/watch?v=S7eQecVPt38' },
          { title: 'Aula 2: Conceito Avançado B', url: 'https://www.youtube.com/watch?v=S7eQecVPt38' },
        ],
      },
    ],
  },
];

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [userCourses, setUserCourses] = useState([]);

  useEffect(() => {
    const enrolledCourses = courses.filter(course => user.enrolledCourses.includes(course.id));
    setUserCourses(enrolledCourses);

    if (enrolledCourses.length > 0 && enrolledCourses[0].sessions.length > 0) {
      setSelectedVideo(enrolledCourses[0].sessions[0].lessons[0].url);
    }
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Cabeçalho com Fundo Preto */}
      <header className="bg-black shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold text-white">{user.name}</div>
          <span className="text-sm text-gray-400">Aluno</span>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
          Logout
        </button>
      </header>

      <div className="flex flex-1">
        {/* Barra Lateral */}
        <aside className="w-1/4 bg-white shadow-md p-4">
          <h2 className="text-xl font-bold mb-4">Sessões</h2>
          {userCourses.map((course, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-bold">{course.title}</h3>
              {course.sessions.map((session, sessionIndex) => (
                <details key={sessionIndex} className="mb-2">
                  <summary className="cursor-pointer font-semibold text-primary">{session.title}</summary>
                  <ul className="ml-4 mt-2 space-y-2">
                    {session.lessons.map((lesson, lessonIndex) => {
                      const isActive = lesson.url === selectedVideo; // Verificar se a aula é a ativa

                      return (
                        <li
                          key={lessonIndex}
                          className={`cursor-pointer text-neutral hover:text-primary flex items-center ${
                            isActive ? 'text-primary font-semibold' : ''
                          }`}
                          onClick={() => setSelectedVideo(lesson.url)}
                        >
                          {isActive && <FaArrowRight className="mr-2" />} {/* Ícone de seta para a aula ativa */}
                          {lesson.title}
                        </li>
                      );
                    })}
                  </ul>
                </details>
              ))}
            </div>
          ))}
        </aside>

        {/* Área Principal */}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Título do Curso</h1>
          <div className="w-full h-[500px] bg-black mb-4">
            <ReactPlayer url={selectedVideo} controls width="100%" height="100%" />
          </div>
          <p className="text-gray-700">Descrição da aula ou conteúdo adicional pode ser exibido aqui.</p>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
