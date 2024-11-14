// src/components/GoogleSignInButton.js
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleSignInButton = () => {
    return (
        <button
            onClick={() => window.location.href = 'https://back-end-minha-plataforma-app.vercel.app/auth/google'}
            className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-md px-4 py-2 shadow-sm hover:shadow-md transition duration-200"
        >
            <FcGoogle className="text-2xl mr-3" />
            <span className="text-gray-700 font-semibold">Continue com Google</span>
        </button>
    );
};

export default GoogleSignInButton;
