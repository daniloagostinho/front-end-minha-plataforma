// src/pages/Courses.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialCourses, additionalCourses } from '../data/coursesData'; // Importando os dados

const Courses = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  const loadMoreCourses = () => {
    setCourses({ ...courses, ...additionalCourses });
    setShowMore(true);
  };

  return (
    <div className="bg-background min-h-screen">
      <header className="bg-gradient-to-r from-purple-600 to-primary text-white py-16 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Cursos Disponíveis
          </h1>
          <p className="mt-4 text-lg">
            Explore nossos cursos de tecnologia e comece a transformar sua carreira hoje.
          </p>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto space-y-12">
        {Object.keys(courses).map((category, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-left">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses[category].map(course => (
                <div
                  key={course.id}
                  className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition duration-200 text-center"
                >
                  <img
                    src={course.image}
                    alt={`Imagem do curso de ${course.title}`}
                    className="mx-auto mb-4 rounded-md w-32 h-32 md:w-40 md:h-40 object-cover"
                  />
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <button
                    className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-secondary transition duration-200"
                    onClick={() => navigate(`/course/${course.id}`)}
                  >
                    Ver detalhes do curso
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {!showMore && (
          <div className="text-center mt-8">
            <button
              className="bg-secondary text-white font-semibold px-6 py-3 rounded-md hover:bg-purple-700 transition duration-200"
              onClick={loadMoreCourses}
            >
              Carregar Mais Cursos
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Courses;
