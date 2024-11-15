// src/pages/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GoogleSignInButton from '../components/GoogleSignInButton';

const SignUp = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMensagem('');

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        nome,
        email,
        senha,
      });

      // Corrija a extração do token da resposta
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token); // Armazene o token no localStorage
      } else {
        throw new Error('Token não fornecido pelo servidor.');
      }

      setMensagem('Usuário cadastrado com sucesso!');
      setTimeout(() => {
        navigate('/login'); // Redirecione para a página de login
      }, 3000);
    } catch (error) {
      setMensagem(error.response?.data?.error || 'Erro ao realizar o cadastro. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <div className="loader"></div>
        </div>
      )}
      <div className="bg-white rounded-md shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Crie seu cadastro</h1>
        <p className="text-neutral text-center mb-8">
          Acesse nossa plataforma e comece sua jornada no mundo da programação!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Nome Completo</span>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-200"
              placeholder="Digite seu nome"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-200"
              placeholder="Digite seu email"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Senha</span>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
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
        <GoogleSignInButton />
      </div>
    </div>
  );
};

export default SignUp;
