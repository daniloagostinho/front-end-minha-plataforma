// src/components/PixPayment.js
import React, { useState, useEffect, useContext } from 'react';
import SpinnerLoading from './SpinnerLoading'; // Importando o Spinner
import { AuthContext } from '../context/AuthContext';

const PixPayment = ({ course, onPaymentStatusChange }) => {
  const [qrCodeBase64, setQrCodeBase64] = useState(null);
  const [pixCopyCode, setPixCopyCode] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [paymentId, setPaymentId] = useState(null);
  const [shouldCheckStatus, setShouldCheckStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);

  // Função para iniciar o pagamento Pix
  useEffect(() => {
    const initiatePixPayment = async () => {
      setIsLoading(true);
      const valor = parseFloat(course.price).toFixed(2);
      try {
        const paymentData = {
          valor,
          email: user?.email || 'email@padrao.com',
          nome: user?.nome || 'Nome Padrão',
          descricao: course.title,
          notification_url: 'https://back-end-minha-plataforma-app.vercel.app/webhook',
        };

        const response = await fetch(
          'https://back-end-minha-plataforma-app.vercel.app/api/pagamento/pix',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
          }
        );

        const data = await response.json();
        if (response.ok && data.response && data.response.point_of_interaction) {
          setQrCodeBase64(data.response.point_of_interaction.transaction_data.qr_code_base64);
          setPixCopyCode(data.response.point_of_interaction.transaction_data.qr_code);
          setPaymentId(data.response.id);

          // Inicia o polling apenas após a resposta bem-sucedida
          setShouldCheckStatus(true);
        } else {
          console.error('Dados de pagamento Pix não encontrados na resposta:', data);
          onPaymentStatusChange('Erro ao criar pagamento Pix. Tente novamente.');
        }
      } catch (error) {
        console.error('Erro ao gerar pagamento Pix:', error);
        onPaymentStatusChange('Erro ao gerar pagamento Pix.');
      } finally {
        setIsLoading(false);
      }
    };

    initiatePixPayment();
  }, [course, user, onPaymentStatusChange]);

  // Função para verificar o status do pagamento
  const checkPaymentStatus = async () => {
    if (!paymentId) return;
    try {
      const response = await fetch(
        `https://back-end-minha-plataforma-app.vercel.app/webhook/api/pagamento/status/${paymentId}`
      );
      const data = await response.json();

      if (response.ok) {
        onPaymentStatusChange(data.status);
        if (data.status === 'approved') {
          setShouldCheckStatus(false);
        }
      } else {
        console.error('Erro ao buscar status do pagamento:', data.error);
        onPaymentStatusChange('Erro ao verificar status do pagamento.');
      }
    } catch (error) {
      console.error('Erro ao buscar status do pagamento:', error);
      onPaymentStatusChange('Erro ao verificar status do pagamento.');
    }
  };

  // Polling para verificar o status
  useEffect(() => {
    if (shouldCheckStatus) {
      const interval = setInterval(() => {
        checkPaymentStatus();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [shouldCheckStatus]);

  // Função para copiar o código Pix
  const handleCopyPixCode = () => {
    if (pixCopyCode) {
      navigator.clipboard.writeText(pixCopyCode)
        .then(() => {
          setCopySuccess('Código copiado com sucesso!');
          setTimeout(() => setCopySuccess(''), 3000);
        })
        .catch(() => {
          setCopySuccess('Erro ao copiar o código. Tente novamente.');
        });
    }
  };

  return (
    <div className="mb-6">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-md flex items-center justify-center rounded-md">
          <SpinnerLoading className="text-primary" />
        </div>
      )}
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
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleCopyPixCode}
              className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-secondary transition duration-200"
            >
              Copiar
            </button>
          </div>
          {copySuccess && <p className="text-green-500 mt-2">{copySuccess}</p>}
        </div>
      )}
    </div>
  );
};

export default PixPayment;
