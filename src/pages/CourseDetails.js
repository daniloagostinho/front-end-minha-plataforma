// src/pages/CourseDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { FaCreditCard, FaPaypal } from 'react-icons/fa'; // Importando ícones de pagamento
import { SiPix } from 'react-icons/si'; // Ícone do Pix
import { initialCourses } from '../data/coursesData';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';


const CourseDetails = () => {
  const { id } = useParams();
  const courseId = parseInt(id, 10); // Converte o ID da URL para um número
  const navigate = useNavigate();


  // Procura o curso pelo ID
  const course = Object.values(initialCourses)
    .flat()
    .find(course => course.id === courseId);

  const handleBuyCourse = () => {
    // Navega para o Checkout e passa o curso como estado
    navigate('/checkout', { state: { course } });
  };

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(course.price);


  if (!course) {
    return <div className="text-center mt-12">Curso não encontrado.</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Cabeçalho do Curso */}
      <Navbar />

      <header className="bg-gradient-to-r from-gray-800 to-black text-white py-8 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
          <img
            src={course.image}
            alt={`Imagem do curso de ${course.title}`}
            className="mx-auto mb-4 rounded-md w-32 h-32 md:w-40 md:h-40 object-cover"
          />
          <p className="mt-2 text-lg">{course.description}</p>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="p-6 max-w-5xl mx-auto space-y-8">
        {/* Vídeo de Apresentação */}
        <div className="bg-white rounded-md shadow-md p-4">
          <h2 className="text-2xl font-bold mb-4">Apresentação do Curso</h2>
          <div className="aspect-w-16 aspect-h-9">
            <ReactPlayer url={course.videoUrl} width="100%" height="100%" controls />
          </div>
        </div>

        {/* Descrição Completa do Curso */}
        <div className="bg-white rounded-md shadow-md p-4">
          <h2 className="text-2xl font-bold mb-4">Descrição do Curso</h2>
          <p
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: course.fullDescription }}
          ></p>
        </div>

        {/* Cronograma do Curso - Acordeão Customizado */}
        <div className="bg-white rounded-md shadow-md p-4">
          <h2 className="text-2xl font-bold mb-4">Cronograma do Curso</h2>
          {course.curriculum.map((section, index) => (
            <details key={index} className="mb-4">
              <summary className="font-semibold cursor-pointer">{section.section}</summary>
              <ul className="list-disc list-inside pl-4 mt-2 space-y-2">
                {section.lessons.map((lesson, idx) => (
                  <li key={idx} className="text-gray-700">{lesson}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        {/* Seção de Valor do Curso */}
        <div className="bg-white rounded-md shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Valor do Curso</h2>
          <p className="text-gray-800 text-xl font-semibold mb-4">{formattedPrice}</p>
          <div className="flex justify-center space-x-4 mb-4">
            <FaCreditCard className="text-3xl text-gray-600" />
            <FaPaypal className="text-3xl text-gray-600" />
            <SiPix className="text-3xl text-gray-600" /> {/* Ícone do Pix */}
          </div>
          <button className="bg-green-600 text-white font-bold w-full md:w-1/2 px-6 py-4 rounded-lg hover:bg-green-700 transition duration-200"
            onClick={handleBuyCourse}
          >
            Comprar
          </button>
        </div>
      </main>
    </div>
  );
};

export default CourseDetails;
