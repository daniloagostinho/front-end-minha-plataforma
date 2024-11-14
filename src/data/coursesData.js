// src/data/coursesData.js

import nodeImage from '../assets/images/node.png';
import reactImage from '../assets/images/react.png';
import angularImage from '../assets/images/angular.png';
import vueImage from '../assets/images/vue.png';
import devopsImage from '../assets/images/devops.png';


export const initialCourses = {
    "Front-end": [
      {
        id: 1,
        title: 'Curso de React',
        description: 'Desenvolva interfaces dinâmicas e interativas com React.',
        videoUrl: 'https://www.example.com/video-react', // Adicione a URL do vídeo
        fullDescription: 'Aqui está a descrição completa do curso de React.',
        curriculum: [
          {
            section: 'Introdução',
            lessons: ['O que é React?', 'Configuração do ambiente']
          },
          {
            section: 'Componentes',
            lessons: ['Criando componentes', 'Props e estado']
          }
        ],
        image: reactImage,
        price: 16.90
      },
      {
        id: 2,
        title: 'Curso de Angular',
        description: 'Aprenda a construir aplicações robustas com Angular.',
        videoUrl: 'https://www.example.com/video-angular',
        fullDescription: 'Aqui está a descrição completa do curso de Angular.',
        curriculum: [
          {
            section: 'Fundamentos do Angular',
            lessons: ['Instalação', 'Primeiros passos']
          },
          {
            section: 'Diretivas e Serviços',
            lessons: ['Usando diretivas', 'Criando serviços']
          }
        ],
        image: angularImage,
        price: 16.90
      },
      {
        id: 2,
        title: 'Curso de Vue',
        description: 'Aprenda a construir aplicações robustas com Vue.',
        videoUrl: 'https://www.example.com/video-angular',
        fullDescription: 'Aqui está a descrição completa do curso de Vue.',
        curriculum: [
          {
            section: 'Fundamentos do Vue',
            lessons: ['Instalação', 'Primeiros passos']
          },
          {
            section: 'Diretivas e Serviços',
            lessons: ['Usando diretivas', 'Criando serviços']
          }
        ],
        image: vueImage,
        price: 16.90
      }
    ],
    "Back-end": [
      {
        id: 3,
        title: 'Curso de Node.js',
        description: 'Aprenda a construir aplicações backend com Node.js.',
        videoUrl: 'https://www.example.com/video-node',
        fullDescription: 'Aqui está a descrição completa do curso de Node.js.',
        curriculum: [
          {
            section: 'Configuração Inicial',
            lessons: ['Instalando o Node.js', 'Criando o primeiro servidor']
          },
          {
            section: 'APIs RESTful',
            lessons: ['Criando rotas', 'Trabalhando com bancos de dados']
          }
        ],
        image: nodeImage,
        price: 16.90
      },
      // Adicione os outros cursos da mesma forma...
    ]
  };
  
  export const additionalCourses = {
    "DevOps": [
      {
        id: 4,
        title: 'Curso de Docker',
        description: 'Aprenda a criar contêineres e gerenciar ambientes com Docker.',
        videoUrl: 'https://www.example.com/video-docker',
        fullDescription: 'Aqui está a descrição completa do curso de Docker.',
        curriculum: [
          {
            section: 'Fundamentos do Docker',
            lessons: ['O que é Docker?', 'Instalação do Docker']
          },
          {
            section: 'Trabalhando com Imagens',
            lessons: ['Criando imagens', 'Gerenciando contêineres']
          }
        ],
        image: devopsImage,
        price: 16.90
      },
      // Adicione os outros cursos da mesma forma...
    ]
  };
  