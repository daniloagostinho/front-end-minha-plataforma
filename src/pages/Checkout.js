import React, { useState, useContext, useEffect } from 'react';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';
import { SiPix } from 'react-icons/si';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SpinnerLoading from '../components/SpinnerLoading';
import CreditCardForm from '../components/CreditCardForm';
import PixPayment from '../components/PixPayment';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);

  const course = location.state?.course;

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    if (method === 'creditCard') {
      setShowCreditCardForm(true);
    } else {
      setShowCreditCardForm(false);
    }
  };

  const handlePaymentStatusChange = (status) => {
    setPaymentStatus(status);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="relative max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-md shadow-md mt-4 sm:mt-8">
        {paymentStatus === 'approved' ? (
          <div className="flex flex-col items-center justify-center space-y-4 mt-20">
            <AiOutlineCheckCircle className="text-green-500 text-6xl" />
            <h3 className="text-3xl font-bold text-green-500">Pagamento aprovado com sucesso!</h3>
            <p className="text-gray-700">Você será redirecionado para o dashboard em breve.</p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 text-left">Checkout</h1>
            <div className="mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Resumo do Pedido</h2>
              <p className="text-gray-600"><b>Curso:</b> {course.title}</p>
              <p className="text-gray-600"><b>Valor:</b> {course.price}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Selecione o Método de Pagamento</h2>
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <button
                  onClick={() => handlePaymentMethodChange('creditCard')}
                  className={`flex items-center justify-center p-3 sm:p-4 border rounded-md ${selectedPaymentMethod === 'creditCard' ? 'border-primary bg-gray-100' : 'border-gray-300'}`}
                >
                  <FaCreditCard className="text-xl sm:text-2xl text-gray-700 mr-2" />
                  <span className="text-gray-700 font-semibold">Cartão de Crédito</span>
                </button>
                <button
                  onClick={() => handlePaymentMethodChange('paypal')}
                  className={`flex items-center justify-center p-3 sm:p-4 border rounded-md ${selectedPaymentMethod === 'paypal' ? 'border-primary bg-gray-100' : 'border-gray-300'}`}
                >
                  <FaPaypal className="text-xl sm:text-2xl text-gray-700 mr-2" />
                  <span className="text-gray-700 font-semibold">PayPal</span>
                </button>
                <button
                  onClick={() => handlePaymentMethodChange('pix')}
                  className={`flex items-center justify-center p-3 sm:p-4 border rounded-md ${selectedPaymentMethod === 'pix' ? 'border-primary bg-gray-100' : 'border-gray-300'}`}
                >
                  <SiPix className="text-xl sm:text-2xl text-gray-700 mr-2" />
                  <span className="text-gray-700 font-semibold">Pix</span>
                </button>
              </div>
            </div>
            {selectedPaymentMethod === 'pix' && (
              <PixPayment course={course} onPaymentStatusChange={handlePaymentStatusChange} />
            )}
            {showCreditCardForm && <CreditCardForm user={user} course={course} />}
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
