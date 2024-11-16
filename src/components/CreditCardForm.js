import React, { useEffect, useState } from 'react';
import { FaCreditCard } from 'react-icons/fa';
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';

const CreditCardForm = ({ user, course, onConfirm }) => {
    const [installmentsOptions, setInstallmentsOptions] = useState([]);
    const [selectedInstallments, setSelectedInstallments] = useState(1);

    useEffect(() => {
        // Inicializa o Mercado Pago com sua chave pública
        initMercadoPago('APP_USR-7ccdd71d-8235-436e-b44a-bfa6aa1c05ea', { locale: 'pt-BR' });
    }, []);

    const handlePayment = async (paymentData) => {
        try {
            const response = await fetch('https://back-end-minha-plataforma-app.vercel.app/api/pagamento/cartao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            const data = await response.json();

            if (data.message === 'Pagamento aprovado') {
                alert('Pagamento realizado com sucesso!');
                onConfirm(); // Callback para atualizar o estado do componente pai
            } else {
                const statusDetail = data.status_detail;
                let errorMessage = 'Falha no pagamento.';

                if (statusDetail === 'cc_rejected_high_risk') {
                    errorMessage = 'Pagamento rejeitado por motivos de segurança. Por favor, tente outro cartão ou método de pagamento.';
                } else if (statusDetail === 'cc_rejected_insufficient_amount') {
                    errorMessage = 'Pagamento rejeitado por falta de saldo. Por favor, verifique seu saldo ou tente outro cartão.';
                } else if (statusDetail === 'cc_rejected_other_reason') {
                    errorMessage = 'Pagamento rejeitado. Tente outro cartão ou entre em contato com seu banco.';
                }

                alert(errorMessage);
            }
        } catch (error) {
            console.error('Erro ao processar o pagamento:', error);
            alert('Erro ao processar o pagamento. Tente novamente mais tarde.');
        }
    };

    const fetchInstallments = async (paymentMethodId) => {
        try {
            const response = await fetch(
                `https://api.mercadopago.com/v1/payment_methods/installments?payment_method_id=${paymentMethodId}&amount=${course.price}&locale=pt-BR`,
                {
                    headers: {
                        Authorization: `Bearer APP_USR-6757817723632797-111321-7e971b9cf61cbf26622fc63aaf2aac3d-380986595`, // Substitua pelo seu token de acesso
                    },
                }
            );

            const data = await response.json();
            if (data && data.length > 0) {
                setInstallmentsOptions(data[0].payer_costs);
            }
        } catch (error) {
            console.error('Erro ao buscar opções de parcelas:', error);
        }
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
                    **** **** **** ****
                </div>
                <div className="flex justify-between text-sm">
                    <div>
                        <p className="uppercase">Titular</p>
                        <p className="font-semibold">NOME DO TITULAR</p>
                    </div>
                    <div>
                        <p className="uppercase">Validade</p>
                        <p className="font-semibold">MM/AA</p>
                    </div>
                </div>
            </div>

            {/* Formulário de Pagamento */}
            <CardPayment
                initialization={{
                    amount: course.price,
                    payer: {
                        email: user.email,
                    },
                }}
                onSubmit={async (param) => {
                    const {
                        paymentMethodId,
                        issuerId,
                        cardholderEmail,
                        token,
                        installments,
                        identificationNumber,
                        identificationType,
                    } = param;

                    // Atualiza opções de parcelas
                    if (installmentsOptions.length === 0) {
                        await fetchInstallments(paymentMethodId);
                    }

                    const paymentData = {
                        token,
                        issuer_id: issuerId,
                        payment_method_id: paymentMethodId,
                        transaction_amount: Number(course.price),
                        installments: selectedInstallments,
                        description: `Pagamento do curso: ${course.title}`,
                        payer: {
                            email: cardholderEmail,
                            identification: {
                                type: identificationType,
                                number: identificationNumber,
                            },
                        },
                    };

                    await handlePayment(paymentData);
                }}
                customization={{
                    visual: {
                        style: {
                            theme: 'bootstrap',
                        },
                    },
                }}
            />

            {/* Select de Parcelas */}
            <div className="mt-4">
                <label className="block text-gray-700 font-semibold mb-1">Parcelas</label>
                <select
                    value={selectedInstallments}
                    onChange={(e) => setSelectedInstallments(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                    {installmentsOptions.map((option) => (
                        <option key={option.installments} value={option.installments}>
                            {option.installments}x de R$ {option.total_amount.toFixed(2)} (Juros: {option.installment_rate}%)
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default CreditCardForm;
