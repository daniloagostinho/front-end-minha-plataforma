import React, { useState } from 'react';
import { FaCreditCard } from 'react-icons/fa';

const CreditCardForm = ({ onConfirm }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [installments, setInstallments] = useState(1);

  // Formatação de dados
  const formatCardNumber = (number) => {
    return number.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md transition-transform duration-500 hover:scale-105">
      {/* Cartão de Crédito Visível */}
      <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-5 shadow-lg mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">CARTÃO DE CRÉDITO</span>
          <FaCreditCard className="text-2xl" />
        </div>
        <div className="mt-4 mb-2 text-2xl font-mono tracking-widest">
          {cardNumber || '**** **** **** ****'}
        </div>
        <div className="flex justify-between text-sm">
          <div>
            <p className="uppercase">Titular</p>
            <p className="font-semibold">{cardName || 'NOME DO TITULAR'}</p>
          </div>
          <div>
            <p className="uppercase">Validade</p>
            <p className="font-semibold">{expiryDate || 'MM/AA'}</p>
          </div>
        </div>
      </div>

      {/* Formulário de Entrada */}
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Número do Cartão</label>
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength="19"
            placeholder="**** **** **** ****"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Nome do Titular</label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value.toUpperCase())}
            placeholder="Nome como no cartão"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div className="flex space-x-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Validade</label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              maxLength="5"
              placeholder="MM/AA"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              maxLength="3"
              placeholder="***"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Parcelas</label>
          <select
            value={installments}
            onChange={(e) => setInstallments(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((installment) => (
              <option key={installment} value={installment}>
                {installment}x
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={onConfirm}
          className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-indigo-600"
        >
          Confirmar Pagamento
        </button>
      </form>
    </div>
  );
};

export default CreditCardForm;
