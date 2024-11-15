import React, { useState } from 'react';
import { FaCreditCard } from 'react-icons/fa';

const CreditCardForm = ({ onConfirm }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [installments, setInstallments] = useState(1);
    const [paymentMethodId, setPaymentMethodId] = useState(null);

    // Formatação de dados
    const formatCardNumber = (number) => {
        return number.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
    };

    // Lida com a mudança no número do cartão
    const handleCardNumberChange = (e) => {
        const formattedNumber = formatCardNumber(e.target.value);
        setCardNumber(formattedNumber);

        // Captura os primeiros 6 dígitos do número do cartão
        const bin = formattedNumber.replace(/\s/g, '').slice(0, 6);
        if (bin.length === 6) {
            // Faz uma requisição ao backend para obter o método de pagamento
            fetch('/api/payment-method', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bin }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Erro na resposta do servidor');
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.paymentMethodId) {
                        console.log('Payment Method ID:', data.paymentMethodId);
                        setPaymentMethodId(data.paymentMethodId);
                    } else {
                        console.error('Método de pagamento não encontrado');
                    }
                })
                .catch((error) => {
                    console.error('Erro ao obter o método de pagamento:', error);
                });
        }
    };

    // Função para confirmar o pagamento
    const handleConfirmPayment = () => {
        if (!cardNumber || !cardName || !expiryDate || !cvv || !paymentMethodId) {
            alert('Preencha todos os campos corretamente.');
            return;
        }

        // Dados do pagamento
        const paymentData = {
            cardNumber: cardNumber.replace(/\s/g, ''), // Remove espaços
            cardName,
            expiryDate,
            cvv,
            installments,
            paymentMethodId,
        };

        // Faz uma requisição ao backend para processar o pagamento
        fetch('/api/pagamento/cartao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert('Pagamento realizado com sucesso!');
                    onConfirm(); // Callback para atualizar o estado do componente pai
                } else {
                    alert('Falha no pagamento: ' + (data.error || 'Erro desconhecido.'));
                }
            })
            .catch((error) => {
                console.error('Erro ao processar o pagamento:', error);
                alert('Erro ao processar o pagamento. Tente novamente mais tarde.');
            });
    };

    return (
        <div className="w-full p-4">
            {/* Cartão de Crédito Visível */}
            <div
                className="w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 text-white rounded-lg p-5 shadow-lg mb-6"
                style={{ background: 'linear-gradient(135deg, #333, #444)' }}
            >
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
                    <div className="flex-1">
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
                    <div className="flex-1">
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
                    onClick={handleConfirmPayment}
                    className="w-full bg-indigo-500 text-white font-bold py-2 rounded-lg transition-colors duration-300 hover:bg-indigo-600"
                >
                    Confirmar Pagamento
                </button>
            </form>
        </div>
    );
};

export default CreditCardForm;
