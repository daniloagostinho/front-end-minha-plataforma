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

import PaymentForm from '../components/PaymenttForm';

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

  const handlePaymentSuccess = () => {
      console.log('Pagamento concluído com sucesso!');
      // Adicione lógica adicional, como redirecionamento ou exibição de mensagem
  };

  return (
      <div>
          <h1>Checkout</h1>
          <PaymentForm user={user} course={course} onPaymentSuccess={handlePaymentSuccess} />
      </div>
  );
};

export default Checkout;
