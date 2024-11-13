// src/stories/Typography.stories.jsx
import React from 'react';

export default {
  title: 'Design System/Typography',
};

export const Headings = () => (
  <div className="font-sans text-gray-800">
    <h1 className="text-4xl font-bold mb-4">Título Principal</h1>
    <h2 className="text-2xl font-semibold mb-2">Subtítulo</h2>
    <p className="text-base leading-relaxed">
      Este é um texto padrão, com espaçamento relaxado para melhor legibilidade.
    </p>
  </div>
);
