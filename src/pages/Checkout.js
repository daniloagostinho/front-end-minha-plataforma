import React, { useState, useContext, useEffect } from 'react';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';
import { SiPix } from 'react-icons/si';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCard');
  const [qrCodeBase64, setQrCodeBase64] = useState(null);
  const [pixCopyCode, setPixCopyCode] = useState(null); // Código Pix para copiar
  const [copySuccess, setCopySuccess] = useState(''); // Feedback de cópia
  const [paymentStatus, setPaymentStatus] = useState(''); // Status do pagamento
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const course = location.state?.course;
  const [paymentId, setPaymentId] = useState(null); // ID do pagamento para verificar status

  useEffect(() => {
    if (paymentId) {
      const interval = setInterval(async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/pagamento/status/${paymentId}`);
          const data = await response.json();
          if (data.status === 'approved') {
            setPaymentStatus('Pagamento realizado com sucesso!');
            clearInterval(interval); // Para o polling quando o pagamento for aprovado
          }
        } catch (error) {
          console.error('Erro ao verificar o status do pagamento:', error);
        }
      }, 5000); // Verifica o status a cada 5 segundos

      return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }
  }, [paymentId]);

  // Se `course` não estiver disponível, exiba uma mensagem de erro ou carregamento
  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-gray-600 text-lg">Curso não encontrado. Por favor, tente novamente.</p>
      </div>
    );
  }

  const handlePaymentMethodChange = async (method) => {
    setSelectedPaymentMethod(method);

    if (method === 'pix') {
      const valor = parseFloat(course.price).toFixed(2);
      try {
        const paymentData = {
          valor: valor,
          email: user?.email || 'email@padrao.com',
          nome: user?.name || 'Nome Padrão',
          descricao: course.title,
        };

        const response = await fetch('http://localhost:5000/api/pagamento/pix', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        });

        const data = await response.json();
        if (data.response && data.response.point_of_interaction) {
          setQrCodeBase64(data.response.point_of_interaction.transaction_data.qr_code_base64);
          setPixCopyCode(data.response.point_of_interaction.transaction_data.qr_code);
          setPaymentId(data.response.id); // Salva o ID do pagamento para verificar o status
        } else {
          console.error('Dados de pagamento Pix não encontrados na resposta:', data);
        }
      } catch (error) {
        console.error('Erro ao gerar pagamento Pix:', error);
      }
    } else {
      setQrCodeBase64(null);
      setPixCopyCode(null);
      setCopySuccess('');
      setPaymentStatus('');
    }
  };

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
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md mt-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h1>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Resumo do Pedido</h2>
          <p className="text-gray-600"><b>Curso:</b> {course.title}</p>
          <p className="text-gray-600"><b>Valor:</b> R$ {course.price}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Selecione o Método de Pagamento</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => handlePaymentMethodChange('creditCard')}
              className={`flex items-center p-4 border rounded-md ${
                selectedPaymentMethod === 'creditCard' ? 'border-primary bg-gray-100' : 'border-gray-300'
              }`}
            >
              <FaCreditCard className="text-2xl text-gray-700 mr-2" />
              <span className="text-gray-700 font-semibold">Cartão de Crédito</span>
            </button>
            <button
              onClick={() => handlePaymentMethodChange('paypal')}
              className={`flex items-center p-4 border rounded-md ${
                selectedPaymentMethod === 'paypal' ? 'border-primary bg-gray-100' : 'border-gray-300'
              }`}
            >
              <FaPaypal className="text-2xl text-gray-700 mr-2" />
              <span className="text-gray-700 font-semibold">PayPal</span>
            </button>
            <button
              onClick={() => handlePaymentMethodChange('pix')}
              className={`flex items-center p-4 border rounded-md ${
                selectedPaymentMethod === 'pix' ? 'border-primary bg-gray-100' : 'border-gray-300'
              }`}
            >
              <SiPix className="text-2xl text-gray-700 mr-2" />
              <span className="text-gray-700 font-semibold">Pix</span>
            </button>
          </div>
        </div>

        {selectedPaymentMethod === 'pix' && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Pix</h2>
            <p className="text-gray-600">Escaneie o QR Code ou copie o código Pix para efetuar o pagamento.</p>
            {qrCodeBase64 ? (
              <img
                src={`data:image/png;base64,${qrCodeBase64}`}
                alt="QR Code Pix"
                className="mx-auto"
                style={{ width: '200px', height: '200px' }}
              />
            ) : (
              <p className="text-gray-700 font-semibold">Carregando QR Code...</p>
            )}
            {pixCopyCode && (
              <div className="mt-4">
                <p className="text-gray-700">Código para copiar e colar:</p>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={pixCopyCode}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md"
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

        {paymentStatus && (
          <div className="mt-6">
            <p className="text-green-500 font-semibold text-lg">{paymentStatus}</p>
          </div>
        )}

        <button
          onClick={() => alert('Pagamento realizado com sucesso!')}
          className="w-full bg-primary text-white font-bold py-4 rounded-md hover:bg-secondary transition duration-200"
        >
          Confirmar Pagamento
        </button>
      </div>
    </div>
  );
};

export default Checkout;
