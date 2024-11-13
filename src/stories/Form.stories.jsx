// src/stories/Form.stories.jsx
import React from 'react';

const Form = () => (
  <div className="space-y-4">
    <label className="block">
      <span className="text-gray-700">Nome Completo</span>
      <input
        type="text"
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-200"
        placeholder="Digite seu nome"
      />
    </label>

    <label className="block">
      <span className="text-gray-700">Email</span>
      <input
        type="email"
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-200"
        placeholder="Digite seu email"
      />
    </label>

    <button className="bg-primary text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200">
      Enviar
    </button>
  </div>
);

export default {
  title: 'Design System/Forms',
  component: Form,
};

export const DefaultForm = () => <Form />;
