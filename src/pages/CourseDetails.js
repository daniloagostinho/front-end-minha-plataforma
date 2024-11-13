// src/pages/CourseDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { initialCourses } from '../data/coursesData';
import Navbar from '../components/Navbar';



const CourseDetails = () => {
  const { id } = useParams();
  const courseId = parseInt(id, 10); // Converte o ID da URL para um número

  // Procura o curso pelo ID
  const course = Object.values(initialCourses)
    .flat()
    .find(course => course.id === courseId);

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

        {/* Botão de Inscrição */}
        <div className="text-center">
          <button className="bg-primary text-white font-semibold px-6 py-3 rounded-md hover:bg-secondary transition duration-200">
            Inscrever-se no Curso
          </button>
        </div>
      </main>
    </div>
  );
};

export default CourseDetails;
