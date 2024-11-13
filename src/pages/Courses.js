// src/pages/Courses.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const initialCourses = {
  "Front-end": [
    {
      id: 1,
      title: 'Curso de React',
      description: 'Desenvolva interfaces dinâmicas e interativas com React.',
    },
    {
      id: 2,
      title: 'Curso de Angular',
      description: 'Aprenda a construir aplicações robustas com Angular.',
    },
    {
      id: 3,
      title: 'Curso de Vue',
      description: 'Aprenda a construir aplicações com Vue.js.',
    },
  ],
  "Back-end": [
    {
      id: 4,
      title: 'Curso de Node.js',
      description: 'Aprenda a construir aplicações backend com Node.js.',
    },
    {
      id: 5,
      title: 'Curso de Python',
      description: 'Crie APIs e automações com Python.',
    },
    {
      id: 6,
      title: 'Curso de Ruby on Rails',
      description: 'Desenvolva aplicações com Ruby on Rails.',
    },
  ],
};

const additionalCourses = {
  "DevOps": [
    {
      id: 7,
      title: 'Curso de Docker',
      description: 'Aprenda a criar contêineres e gerenciar ambientes com Docker.',
    },
    {
      id: 8,
      title: 'Curso de Kubernetes',
      description: 'Orquestre contêineres com Kubernetes de forma eficiente.',
    },
    {
      id: 9,
      title: 'Curso de Jenkins',
      description: 'Automatize processos de CI/CD com Jenkins.',
    },
  ],
  "Data Science": [
    {
      id: 10,
      title: 'Curso de Machine Learning',
      description: 'Domine algoritmos de aprendizado de máquina com Python.',
    },
    {
      id: 11,
      title: 'Curso de Data Analysis',
      description: 'Aprenda a analisar dados e gerar insights.',
    },
    {
      id: 12,
      title: 'Curso de Big Data',
      description: 'Trabalhe com grandes volumes de dados com ferramentas de Big Data.',
    },
  ],
};

const Courses = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  const loadMoreCourses = () => {
    setCourses({ ...courses, ...additionalCourses });
    setShowMore(true);
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
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
            <Slider {...sliderSettings}>
              {courses[category].map(course => (
                <div
                  key={course.id}
                  className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-200 text-center"
                  style={{
                    width: '200px', // Diminuindo a largura dos cards para torná-los mais quadrados
                    height: '250px', // Ajustando a altura para um formato mais quadrado
                    margin: '0 20px', // Aumentando o espaçamento entre os cards
                  }}
                >
                  <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <button
                    className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-secondary transition duration-200"
                    onClick={() => navigate('/signup')}
                  >
                    Inscrever-se
                  </button>
                </div>
              ))}
            </Slider>
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
