// src/components/CoursePlayer.js
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { FaArrowRight } from 'react-icons/fa';

const CoursePlayer = ({ course }) => {
  const [selectedVideo, setSelectedVideo] = useState(
    course.sessions[0]?.lessons[0]?.url || ''
  );

  return (
    <div className="flex flex-1">
      {/* Barra Lateral */}
      <aside className="w-1/4 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Sessões</h2>
        {course.sessions.map((session, sessionIndex) => (
          <div key={sessionIndex} className="mb-4">
            <details className="mb-2">
              <summary className="cursor-pointer font-semibold text-primary">
                {session.title}
              </summary>
              <ul className="ml-4 mt-2 space-y-2">
                {session.lessons.map((lesson, lessonIndex) => {
                  // Verifica se o URL da lição corresponde ao vídeo selecionado
                  const isActive = lesson.url === selectedVideo;

                  return (
                    <li
                      key={lessonIndex}
                      className={`cursor-pointer text-neutral hover:text-primary flex items-center ${
                        isActive ? 'text-primary font-semibold' : ''
                      }`}
                      onClick={() => setSelectedVideo(lesson.url)}
                    >
                      {isActive && <FaArrowRight className="mr-2" />} {/* Mostra a seta apenas se for ativo */}
                      {lesson.title}
                    </li>
                  );
                })}
              </ul>
            </details>
          </div>
        ))}
      </aside>

      {/* Área Principal */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
        <div className="w-full h-[500px] bg-black mb-4">
          <ReactPlayer url={selectedVideo} controls width="100%" height="100%" />
        </div>
        <p className="text-gray-700">
          Descrição da aula ou conteúdo adicional pode ser exibido aqui.
        </p>
      </main>
    </div>
  );
};

export default CoursePlayer;
