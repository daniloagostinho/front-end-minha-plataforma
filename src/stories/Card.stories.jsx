// src/stories/Card.stories.jsx
import React from 'react';

const Card = () => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
    <img className="w-full" src="https://via.placeholder.com/300" alt="Imagem de exemplo" />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">Título do Card</div>
      <p className="text-gray-700 text-base">
        Descrição breve do conteúdo do card, para atrair a atenção do usuário.
      </p>
    </div>
    <div className="px-6 pt-4 pb-2">
      <button className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
        Saiba Mais
      </button>
    </div>
  </div>
);

export default {
  title: 'Design System/Card',
  component: Card,
};

export const DefaultCard = () => <Card />;
