import React, { useState, useContext, useEffect } from 'react';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';
import { SiPix } from 'react-icons/si';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SpinnerLoading from '../components/SpinnerLoading'; // Importando o Spinner
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCard');
  const [qrCodeBase64, setQrCodeBase64] = useState(null);
  const [pixCopyCode, setPixCopyCode] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [paymentId, setPaymentId] = useState(null);
  const [shouldCheckStatus, setShouldCheckStatus] = useState(false); // Variável para controlar o polling
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const course = location.state?.course;

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(course.price);

  useEffect(() => {
    setQrCodeBase64(null);
    setPixCopyCode(null);
    setCopySuccess('');
    setPaymentStatus('pending');
    setPaymentId(null);
    setShouldCheckStatus(false);
  }, [course.price]);

  const handlePaymentMethodChange = async (method) => {
    setSelectedPaymentMethod(method);

    if (method === 'pix') {
      const valor = parseFloat(course.price).toFixed(2);
      try {
        const paymentData = {
          valor,
          email: user?.email || 'email@padrao.com',
          nome: user?.nome || 'Nome Padrão',
          descricao: course.title,
          notification_url: "https://back-end-minha-plataforma-app.vercel.app/webhook"
        };

        const response = await fetch('https://back-end-minha-plataforma-app.vercel.app/api/pagamento/pix', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        });

        const data = await response.json();
        if (response.ok && data.response && data.response.point_of_interaction) {
          setQrCodeBase64(data.response.point_of_interaction.transaction_data.qr_code_base64);
          setPixCopyCode(data.response.point_of_interaction.transaction_data.qr_code);
          setPaymentId(data.response.id);
          setShouldCheckStatus(true);
        } else {
          console.error('Dados de pagamento Pix não encontrados na resposta:', data);
          setPaymentStatus('Erro ao criar pagamento Pix. Tente novamente.');
        }
      } catch (error) {
        console.error('Erro ao gerar pagamento Pix:', error);
        setPaymentStatus('Erro ao gerar pagamento Pix.');
      }
    } else {
      setQrCodeBase64(null);
      setPixCopyCode(null);
      setCopySuccess('');
      setPaymentStatus('pending');
      setPaymentId(null);
      setShouldCheckStatus(false);
    }
  };

  const checkPaymentStatus = async () => {
    if (!paymentId) return;

    try {
      const response = await fetch(`https://back-end-minha-plataforma-app.vercel.app/webhook/api/pagamento/status/${paymentId}`);
      const data = await response.json();

      if (response.ok) {
        setPaymentStatus(data.status);
        if (data.status === 'approved') {
          setShouldCheckStatus(false);
        }
      } else {
        console.error('Erro ao buscar status do pagamento:', data.error);
        setPaymentStatus('Erro ao verificar status do pagamento.');
      }
    } catch (error) {
      console.error('Erro ao buscar status do pagamento:', error);
      setPaymentStatus('Erro ao verificar status do pagamento.');
    }
  };

  useEffect(() => {
    if (shouldCheckStatus) {
      const interval = setInterval(() => {
        checkPaymentStatus();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [shouldCheckStatus]);

  const handleCopyPixCode = () => {
    if (pixCopyCode) {
      navigator.clipboard.writeText(pixCopyCode).then(() => {
        setCopySuccess('Código copiado com sucesso!');
        setTimeout(() => setCopySuccess(''), 3000);
      }).catch(() => {
        setCopySuccess('Erro ao copiar o código. Tente novamente.');
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-md shadow-md mt-4 sm:mt-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 text-left">Checkout</h1>

        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Resumo do Pedido</h2>
          <p className="text-gray-600"><b>Curso:</b> {course.title}</p>
          <p className="text-gray-600"><b>Valor:</b> {formattedPrice}</p>
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
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Pix</h2>
            <p className="text-gray-600">Escaneie o QR Code ou copie o código Pix para efetuar o pagamento.</p>
            {qrCodeBase64 ? (
              <img
                src={`data:image/png;base64,${qrCodeBase64}`}
                alt="QR Code Pix"
                className="mx-auto"
                style={{ width: '150px', height: '150px' }}
              />
            ) : (
              <p className="text-gray-700 font-semibold">Carregando QR Code...</p>
            )}
            {pixCopyCode && (
              <div className="mt-4">
                <p className="text-gray-700">Código para copiar e colar:</p>
                <div className="flex flex-col sm:flex-row items-center sm:space-x-2">
                  <input
                    type="text"
                    value={pixCopyCode}
                    readOnly
                    className="w-full p-2 mb-2 sm:mb-0 border border-gray-300 rounded-md"
                  />
                  <button
                    onClick={handleCopyPixCode}
                    className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-secondary transition duration-200"
                  >
                    Copiar
                  </button>
                </div>
                {copySuccess && (
                  <p className="text-green-500 mt-2">{copySuccess}</p>
                )}
              </div>
            )}
          </div>
        )}

        {shouldCheckStatus && (
          <div className="mt-6">
            <SpinnerLoading /> {/* Exibindo o spinner enquanto espera o status */}
          </div>
        )}

        {paymentStatus !== 'pending' && (
          <div className="mt-6">
            <p className={`text-lg font-semibold ${paymentStatus === 'approved' ? 'text-green-500' : 'text-red-500'}`}>
              {paymentStatus === 'approved' ? 'Pagamento aprovado com sucesso!' : 'Pagamento não aprovado!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
