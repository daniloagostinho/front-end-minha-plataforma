// src/pages/SignUp.js
import React from 'react';

const SignUp = () => {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-md shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Crie sua Conta</h1>
        <p className="text-neutral text-center mb-8">
          Inscreva-se e comece a sua jornada no mundo da programação!
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

        <p className="text-center text-sm text-gray-500 mt-6">
          Já tem uma conta? <a href="/login" className="text-primary hover:underline">Faça login</a>
        </p>

        <button onClick={() => window.location.href = 'http://localhost:5000/auth/google'} className="w-full bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-secondary transition duration-200">
          Login com Google
        </button>

      </div>
    </div>
  );
};

export default SignUp;
