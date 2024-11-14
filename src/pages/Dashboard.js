// src/pages/Dashboard.js
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import CoursePlayer from './CoursePlayer';
import Header from './Header';
import axios from 'axios';

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
  const { user, setUser, loading } = useContext(AuthContext); // Adicione `setUser` do AuthContext
  const [userCourses, setUserCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Recupera os dados do usuário a partir do backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user', {
          withCredentials: true, // Inclua cookies na solicitação, se necessário
        });
        const userData = response.data;
        setUser(userData); // Atualize o estado do usuário no AuthContext

        // Filtra os cursos nos quais o usuário está inscrito
        if (userData.enrolledCourses) {
          const enrolledCourses = courses.filter(course =>
            userData.enrolledCourses.includes(course.id)
          );
          setUserCourses(enrolledCourses);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    // Chama a função para buscar os dados do usuário
    fetchUserData();
  }, [setUser]);

  if (loading) {
    return <div className="text-center text-2xl font-semibold mt-20">Carregando...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header /> {/* Use o componente de cabeçalho */}
      <main className="p-8 sm:p-12 flex-1 flex justify-center items-center">
        {user && (
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
            Bem-vindo, {user.nome}! {/* Exibe o nome do usuário */}
          </h1>
        )}
        {userCourses.length > 0 && (
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Meus Cursos</h2>
        )}
        {selectedCourse ? (
          <CoursePlayer course={selectedCourse} />
        ) : (
          userCourses.length === 0 ? (
            <div className="flex flex-col justify-center items-center text-center" style={{ minHeight: '60vh' }}>
              <FaTrashAlt className="text-6xl text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg mb-6">
                Você ainda não está inscrito em nenhum curso. Explore nossos cursos disponíveis para começar sua jornada de aprendizado!
              </p>
              <button
                className="bg-blue-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                onClick={() => navigate('/courses')}
              >
                Explorar Cursos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {userCourses.map(course => (
                <div key={course.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">{course.title}</h2>
                  <p className="text-gray-600 text-sm mb-4">Sessões: {course.sessions.length}</p>
                  <button
                    className="bg-green-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-green-700 transition duration-300"
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
