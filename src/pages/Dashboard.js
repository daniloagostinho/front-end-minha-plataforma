// src/pages/Dashboard.js
import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const Dashboard = () => {
    const [selectedVideo, setSelectedVideo] = useState('https://www.youtube.com/watch?v=S7eQecVPt38');

    // Dados simulados para sessões e aulas
    const sessions = [
        {
            title: 'Sessão 1: Introdução',
            lessons: [
                { title: 'Aula 1: Bem-vindo ao Curso', url: 'https://www.youtube.com/watch?v=S7eQecVPt38' },
                { title: 'Aula 2: Visão Geral do Curso', url: 'https://www.youtube.com/watch?v=S7eQecVPt38' },
            ],
        },
        {
            title: 'Sessão 2: Conceitos Básicos',
            lessons: [
                { title: 'Aula 1: Conceito A', url: 'https://www.youtube.com/watch?v=S7eQecVPt38' },
                { title: 'Aula 2: Conceito B', url: 'https://www.youtube.com/watch?v=S7eQecVPt38' },
            ],
        },
    ];

    return (
        <div className="flex min-h-screen bg-background">
            {/* Barra Lateral */}
            <aside className="w-1/4 bg-white shadow-md p-4">
                <h2 className="text-xl font-bold mb-4">Sessões</h2>
                {sessions.map((session, index) => (
                    <div key={index} className="mb-4">
                        <details className="mb-2">
                            <summary className="cursor-pointer font-semibold text-primary">{session.title}</summary>
                            <ul className="ml-4 mt-2 space-y-2">
                                {session.lessons.map((lesson, lessonIndex) => (
                                    <li
                                        key={lessonIndex}
                                        className="cursor-pointer text-neutral hover:text-primary"
                                        onClick={() => setSelectedVideo(lesson.url)}
                                    >
                                        {lesson.title}
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </div>
                ))}
            </aside>

            {/* Área Principal */}
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">Título do Curso</h1>
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

export default Dashboard;
