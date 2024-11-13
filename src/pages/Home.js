// src/pages/Home.js
import React from 'react';
import { FaDollarSign, FaBookOpen, FaUsers } from 'react-icons/fa';
import nodeImage from '../assets/images/node.png';
import reactImage from '../assets/images/react.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-600 to-primary text-white py-16 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Aprenda Programação e Transforme Sua Carreira
          </h1>
          <p className="mt-4 text-lg">
            Cursos de tecnologia acessíveis para pessoas de baixa renda. Venha aprender e melhorar sua qualidade de vida com nossos cursos.
          </p>
          <button
            className="mt-8 bg-secondary text-white font-semibold px-6 py-3 rounded-md hover:bg-purple-700 transition duration-200"
            onClick={() => navigate('/courses')}
          >
            Ver Cursos
          </button>

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
            <FaDollarSign className="text-primary text-5xl mx-auto mb-4" /> {/* Ícone de acessibilidade financeira */}
            <h3 className="text-xl font-bold mb-4">Acessível</h3>
            <p className="text-neutral">
              Preços justos e acessíveis para que todos possam aprender e crescer profissionalmente.
            </p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition duration-200 text-center">
            <FaBookOpen className="text-primary text-5xl mx-auto mb-4" /> {/* Ícone de aprendizado prático */}
            <h3 className="text-xl font-bold mb-4">Prático e Objetivo</h3>
            <p className="text-neutral">
              Conteúdo direto ao ponto, ensinando as habilidades mais requisitadas no mercado de trabalho.
            </p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition duration-200 text-center">
            <FaUsers className="text-primary text-5xl mx-auto mb-4" /> {/* Ícone de comunidade de apoio */}
            <h3 className="text-xl font-bold mb-4">Comunidade de Apoio</h3>
            <p className="text-neutral">
              Junte-se a uma comunidade de estudantes e mentores dispostos a ajudar você na sua jornada.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 bg-gray-100 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Cursos Disponíveis</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {/* Exemplo de Card de Curso */}
            <div className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition duration-200 text-center">
              <img
                src={nodeImage}
                alt="Curso de Node.js"
                className="mx-auto mb-4 rounded-md w-32 h-32 md:w-40 md:h-40 object-cover"
              />
              <h3 className="text-xl font-bold mb-2">Curso de Node.js</h3>
              <p className="text-neutral mb-4">Aprenda a construir aplicações backend robustas com Node.js.</p>
              <button className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200">
                Ver Curso
              </button>
            </div>
            <div className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition duration-200 text-center">
              <img
                src={reactImage}
                alt="Curso de React"
                className="mx-auto mb-4 rounded-md w-32 h-32 md:w-40 md:h-40 object-cover"
              />
              <h3 className="text-xl font-bold mb-2">Curso de React</h3>
              <p className="text-neutral mb-4">Desenvolva interfaces dinâmicas e interativas com React.</p>
              <button className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200">
                Ver Curso
              </button>
            </div>
            {/* Adicione mais cursos conforme necessário */}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Pronto para Começar?</h2>
        <p className="text-neutral mb-8">
          Inscreva-se hoje mesmo e comece sua jornada no mundo da programação.
        </p>
        <button className="bg-secondary text-white font-semibold px-6 py-3 rounded-md hover:bg-purple-700 transition duration-200"
          onClick={() => navigate('/signup')}>
          Inscrever-se
        </button>
      </section>
    </div>
  );
};

export default Home;
