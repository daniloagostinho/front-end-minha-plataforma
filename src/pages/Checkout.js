// src/pages/Checkout.js
import React, { useState } from 'react';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';
import { SiPix } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Checkout = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCard');
  const navigate = useNavigate();

  const handlePayment = () => {
    // Lógica para processar o pagamento
    alert('Pagamento realizado com sucesso!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md mt-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h1>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Resumo do Pedido</h2>
          <p className="text-gray-600"><b>Curso:</b> Curso de Programação Completo</p>
          <p className="text-gray-600"><b>Valor:</b> R$ 16,90</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Selecione o Método de Pagamento</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedPaymentMethod('creditCard')}
              className={`flex items-center p-4 border rounded-md ${
                selectedPaymentMethod === 'creditCard' ? 'border-primary bg-gray-100' : 'border-gray-300'
              }`}
            >
              <FaCreditCard className="text-2xl text-gray-700 mr-2" />
              <span className="text-gray-700 font-semibold">Cartão de Crédito</span>
            </button>
            <button
              onClick={() => setSelectedPaymentMethod('paypal')}
              className={`flex items-center p-4 border rounded-md ${
                selectedPaymentMethod === 'paypal' ? 'border-primary bg-gray-100' : 'border-gray-300'
              }`}
            >
              <FaPaypal className="text-2xl text-gray-700 mr-2" />
              <span className="text-gray-700 font-semibold">PayPal</span>
            </button>
            <button
              onClick={() => setSelectedPaymentMethod('pix')}
              className={`flex items-center p-4 border rounded-md ${
                selectedPaymentMethod === 'pix' ? 'border-primary bg-gray-100' : 'border-gray-300'
              }`}
            >
              <SiPix className="text-2xl text-gray-700 mr-2" />
              <span className="text-gray-700 font-semibold">Pix</span>
            </button>
          </div>
        </div>

        {selectedPaymentMethod === 'creditCard' && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Detalhes do Cartão</h2>
            <input
              type="text"
              placeholder="Nome no Cartão"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <input
              type="text"
              placeholder="Número do Cartão"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Validade (MM/AA)"
                className="w-1/2 p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-1/2 p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        )}

        {selectedPaymentMethod === 'paypal' && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">PayPal</h2>
            <p className="text-gray-600">Você será redirecionado para o PayPal para concluir o pagamento.</p>
          </div>
        )}

        {selectedPaymentMethod === 'pix' && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Pix</h2>
            <p className="text-gray-600">Escaneie o QR Code ou copie o código Pix para efetuar o pagamento.</p>
            <div className="bg-gray-100 p-4 rounded-md text-center">
              <p className="text-gray-700 font-semibold">QR Code Pix Aqui</p>
            </div>
          </div>
        )}

        <button
          onClick={handlePayment}
          className="w-full bg-primary text-white font-bold py-4 rounded-md hover:bg-secondary transition duration-200"
        >
          Confirmar Pagamento
        </button>
      </div>
    </div>
  );
};

export default Checkout;
