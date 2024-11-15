// src/pages/Home.js
import heroImage from '../assets/images/hero.jpg'; // Adicione uma imagem atrativa para o lado direito
import { useNavigate } from 'react-router-dom';

import { FaDollarSign, FaBookOpen, FaUsers, FaBars, FaTimes } from 'react-icons/fa';

import React, { useState } from 'react';

import { initialCourses } from '../data/coursesData';
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const latestCourses = Object.values(initialCourses)
    .flat()
    .slice(-2);


  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <header
        className="relative text-white py-16 bg-black"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1000 1000' fill='none' stroke='%23ffffff' stroke-width='0.5'%3E%3Cpath d='M0,500 Q250,0 500,500 T1000,500'/%3E%3Cpath d='M0,700 Q250,200 500,700 T1000,700'/%3E%3Cpath d='M0,900 Q250,400 500,900 T1000,900'/%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          {/* Texto do Título Alinhado à Esquerda */}
          <div className="md:w-1/2 text-left space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight break-words bg-clip-text">
              Aprenda Programação e <br className="hidden md:block" /> Transforme Sua Carreira
            </h1>
            <p className="mt-2 text-lg">
              Cursos de tecnologia acessíveis para pessoas de baixa renda. Venha aprender e melhorar sua qualidade de vida com nossos cursos.
            </p>
            {/* Botão de Inscreva-se Grátis */}
            <button
              className="mt-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-4 px-10 rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
              onClick={() => navigate('/signup')}
            >
              Inscreva-se Grátis
            </button>
          </div>
          {/* Imagem do Lado Direito */}
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <img
              src={heroImage}
              alt="Imagem de Programação"
              className="w-full h-auto rounded-md shadow-lg"
            />
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="py-16 text-center container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Por Que Escolher Nossos Cursos?</h2>
        <p className="text-neutral max-w-2xl mx-auto mb-12">
          Nós acreditamos que educação de qualidade deve ser acessível a todos. Oferecemos cursos práticos e com um preço justo para ajudar você a entrar no mercado de tecnologia.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition duration-200 text-center">
            <FaDollarSign className="text-primary text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">Acessível</h3>
            <p className="text-neutral">
              Preços justos e acessíveis para que todos possam aprender e crescer profissionalmente.
            </p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition duration-200 text-center">
            <FaBookOpen className="text-primary text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">Prático e Objetivo</h3>
            <p className="text-neutral">
              Conteúdo direto ao ponto, ensinando as habilidades mais requisitadas no mercado de trabalho.
            </p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition duration-200 text-center">
            <FaUsers className="text-primary text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">Comunidade de Apoio</h3>
            <p className="text-neutral">
              Junte-se a uma comunidade de estudantes e mentores dispostos a ajudar você na sua jornada.
            </p>
          </div>
        </div>
        {/* Botão de Inscreva-se Grátis com espaçamento ajustado */}
        <button
          className="mt-12 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-4 px-10 rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
          onClick={() => navigate('/signup')}
        >
          Inscreva-se Grátis
        </button>
      </section>

      {/* Courses Section */}
      <section className="py-16 bg-gray-100 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Últimos Cursos Lançados</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {latestCourses.map(course => (
              <div
                key={course.id}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-200 text-center w-full max-w-xs sm:max-w-sm md:max-w-md"
              >
                <img
                  src={course.image}
                  alt={`Imagem do curso de ${course.title}`}
                  className="mx-auto mb-4 rounded-md w-32 h-32 md:w-40 md:h-40 object-cover"
                />
                <h3 className="text-2xl font-bold mb-4">{course.title}</h3>
                <p className="text-neutral mb-6">{course.description}</p>
                <button
                  className="bg-primary text-white font-semibold px-6 py-3 rounded-md hover:bg-secondary transition duration-200"
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  Ver Curso
                </button>
              </div>
            ))}
          </div>
          <button
            className="mt-12 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-4 px-10 rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
            onClick={() => navigate('/courses')}
          >
            Ver todos os cursos
          </button>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="py-16 text-center bg-black"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1000 1000' fill='none' stroke='%23ffffff' stroke-width='0.5'%3E%3Cpath d='M0,500 Q250,0 500,500 T1000,500'/%3E%3Cpath d='M0,700 Q250,200 500,700 T1000,700'/%3E%3Cpath d='M0,900 Q250,400 500,900 T1000,900'/%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
        }}
      >
        <h2 className="text-5xl md:text-6xl font-bold leading-tight break-words bg-clip-text text-white">
          Pronto para Começar?
        </h2>
        <p className="text-white mb-8 mt-2 text-lg">
          Inscreva-se hoje mesmo e comece sua jornada no mundo da programação.
        </p>

        {/* Botão de Inscreva-se Grátis com espaçamento ajustado */}
        <button
          className="mt-12 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-4 px-10 rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
          onClick={() => navigate('/signup')}
        >
          Inscreva-se Grátis
        </button>
      </section>

    </div>
  );
};

export default Home;
