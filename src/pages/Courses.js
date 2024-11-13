// src/pages/Courses.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
            description: 'Aprenda a construir aplicações robustas com Angular.',
        },
    ],
    "Back-end": [
        {
            id: 3,
            title: 'Curso de Node.js',
            description: 'Aprenda a construir aplicações backend com Node.js.',
        },
        {
            id: 4,
            title: 'Curso de Python',
            description: 'Crie APIs e automações com Python.',
        },
        {
            id: 5,
            title: 'Curso de Python',
            description: 'Crie APIs e automações com Python.',
        },
    ],
};

const additionalCourses = {
    "DevOps": [
        {
            id: 5,
            title: 'Curso de Docker',
            description: 'Aprenda a criar contêineres e gerenciar ambientes com Docker.',
        },
        {
            id: 6,
            title: 'Curso de Kubernetes',
            description: 'Orquestre contêineres com Kubernetes de forma eficiente.',
        },
        {
            id: 7,
            title: 'Curso de Kubernetes',
            description: 'Orquestre contêineres com Kubernetes de forma eficiente.',
        },
    ],
    "Data Science": [
        {
            id: 7,
            title: 'Curso de Machine Learning',
            description: 'Domine algoritmos de aprendizado de máquina com Python.',
        },
        {
            id: 8,
            title: 'Curso de Data Analysis',
            description: 'Aprenda a analisar dados e gerar insights.',
        },
        {
            id: 9,
            title: 'Curso de Data Analysis',
            description: 'Aprenda a analisar dados e gerar insights.',
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
