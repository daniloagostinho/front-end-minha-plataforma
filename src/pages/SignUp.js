// src/pages/SignUp.js
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const SignUp = () => {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-md shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Faça Login com Google</h1>
        <p className="text-neutral text-center mb-8">
          Acesse nossa plataforma e comece sua jornada no mundo da programação!
        </p>

        <form className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Nome Completo</span>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-200"
              placeholder="Digite seu nome"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-200"
              placeholder="Digite seu email"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Senha</span>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-200"
              placeholder="Digite sua senha"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-secondary transition duration-200"
          >
            Inscrever-se
          </button>
        </form>

        <br />

        {/* Botão de Login com Google */}
        <button
          onClick={() => window.location.href = 'https://back-end-minha-plataforma-app.vercel.app/auth/google'}
          className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-md px-4 py-2 shadow-sm hover:shadow-md transition duration-200"
        >
          <FcGoogle className="text-2xl mr-3" />
          <span className="text-gray-700 font-semibold">Continue com Google</span>
        </button>
      </div>
    </div>
  );
};

export default SignUp;
