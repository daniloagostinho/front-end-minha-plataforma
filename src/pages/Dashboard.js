// src/pages/Dashboard.js
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CoursePlayer from './CoursePlayer';
import Header from './Header';

const courses = [
  // Seus cursos...
];

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const [userCourses, setUserCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.enrolledCourses) {
      // Filtra os cursos nos quais o usuário está inscrito
      const enrolledCourses = courses.filter(course =>
        user.enrolledCourses.includes(course.id)
      );
      setUserCourses(enrolledCourses);
    }
  }, [user]);

  if (loading) {
    return <div className="text-center text-2xl font-semibold mt-20">Carregando...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="p-8 sm:p-12 items-center">
        {user && (
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
            Bem-vindo, {user.nome}!
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
