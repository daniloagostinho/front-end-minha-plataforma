// src/pages/CourseDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

const courseData = {
  1: {
    title: 'Curso de React',
    videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
    description: 'Desenvolva interfaces dinâmicas e interativas com React.',
    fullDescription: `
      Bem-vindo ao curso de React! Aqui você terá a oportunidade de aprender
      e dominar as habilidades essenciais para criar interfaces dinâmicas
      e interativas. Você vai descobrir os conceitos principais, como componentes,
      estado, props, hooks, e muito mais, preparando-se para construir aplicações
      modernas de forma prática e eficiente.
      
      <strong>O que você irá aprender:</strong>
      <ul>
        <li>Fundamentos do React: JSX, componentes e props.</li>
        <li>Gerenciamento de estado com hooks e context API.</li>
        <li>Boas práticas de organização e estrutura de projetos.</li>
      </ul>
      
      <strong>Público-alvo:</strong> Este curso é ideal para desenvolvedores
      front-end que desejam dominar o React e construir projetos interativos.
      
      Prepare-se para transformar suas habilidades em desenvolvimento front-end!
    `,
    curriculum: [
      {
        section: 'Introdução ao React',
        lessons: ['O que é React?', 'Configurando o Ambiente', 'JSX e Componentes'],
      },
      {
        section: 'Avançando com React',
        lessons: ['Hooks e Estado', 'Gerenciamento de Props', 'Comunicação entre Componentes'],
      },
    ],
  },
  // Adicione mais cursos conforme necessário...
};

const CourseDetails = () => {
  const { courseId } = useParams();
  const course = courseData[courseId];

  if (!course) {
    return <div className="text-center mt-12">Curso não encontrado.</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Cabeçalho do Curso */}
      <header className="bg-gradient-to-r from-purple-600 to-primary text-white py-8 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
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
