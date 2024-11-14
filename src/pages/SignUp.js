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
