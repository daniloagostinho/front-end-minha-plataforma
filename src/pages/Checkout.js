import React, { useState, useContext, useEffect } from 'react';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';
import { SiPix } from 'react-icons/si';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCard');
  const [qrCodeBase64, setQrCodeBase64] = useState(null);
  const [pixCopyCode, setPixCopyCode] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a Modal
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const course = location.state?.course;

  // Formatar o preço
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(course.price);

  // Resetar QR code, código Pix e estado de pagamento ao mudar o valor do curso
  useEffect(() => {
    setQrCodeBase64(null);
    setPixCopyCode(null);
    setCopySuccess('');
    setPaymentStatus('');
  }, [course.price]);

  // Função para lidar com a troca de método de pagamento
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
        if (data.response && data.response.point_of_interaction) {
          setQrCodeBase64(data.response.point_of_interaction.transaction_data.qr_code_base64);
          setPixCopyCode(data.response.point_of_interaction.transaction_data.qr_code);
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

  // Função para copiar o código Pix
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
          <p className="text-gray-600"><b>Valor:</b> {formattedPrice}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Selecione o Método de Pagamento</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => handlePaymentMethodChange('creditCard')}
              className={`flex items-center p-4 border rounded-md ${selectedPaymentMethod === 'creditCard' ? 'border-primary bg-gray-100' : 'border-gray-300'}`}
            >
              <FaCreditCard className="text-2xl text-gray-700 mr-2" />
              <span className="text-gray-700 font-semibold">Cartão de Crédito</span>
            </button>
            <button
              onClick={() => handlePaymentMethodChange('paypal')}
              className={`flex items-center p-4 border rounded-md ${selectedPaymentMethod === 'paypal' ? 'border-primary bg-gray-100' : 'border-gray-300'}`}
            >
              <FaPaypal className="text-2xl text-gray-700 mr-2" />
              <span className="text-gray-700 font-semibold">PayPal</span>
            </button>
            <button
              onClick={() => handlePaymentMethodChange('pix')}
              className={`flex items-center p-4 border rounded-md ${selectedPaymentMethod === 'pix' ? 'border-primary bg-gray-100' : 'border-gray-300'}`}
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

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-bold mb-4">Status do Pagamento</h2>
              <p className="text-gray-700">{paymentStatus}</p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition duration-200"
              >
                Fechar
              </button>
            </div>
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
