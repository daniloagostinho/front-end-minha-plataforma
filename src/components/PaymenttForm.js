import React, { useEffect } from 'react';
import { initMercadoPago } from '@mercadopago/sdk-react';

const PaymentForm = ({ user, course, onPaymentSuccess }) => {
    useEffect(() => {
        // Inicializa o Mercado Pago com sua chave pública
        initMercadoPago('APP_USR-7ccdd71d-8235-436e-b44a-bfa6aa1c05ea', { locale: 'pt-BR' });
        
        const renderPaymentBrick = async () => {

            const settings = {
                initialization: {
                    amount: course.price, // Quantia total a pagar
                    payer: {
                        firstName: user.firstName || '',
                        lastName: user.lastName || '',
                        email: user.email,
                    },
                },
                customization: {
                    visual: {
                        style: {
                            theme: 'default',
                        },
                    },
                    paymentMethods: {
                        creditCard: 'all',
                        debitCard: 'all',
                        ticket: 'all',
                        bankTransfer: 'all',
                        atm: 'all',
                        onboarding_credits: 'all',
                        wallet_purchase: 'all',
                        maxInstallments: 1,
                    },
                },
                callbacks: {
                    onReady: () => {
                        // Callback chamado quando o Brick está pronto
                        console.log('Payment Brick está pronto');
                    },
                    onSubmit: ({ selectedPaymentMethod, formData }) => {
                        return new Promise((resolve, reject) => {
                            fetch('https://back-end-minha-plataforma-app.vercel.app/api/process_payment', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(formData),
                            })
                                .then((response) => response.json())
                                .then((result) => {
                                    if (result.status === 'approved') {
                                        alert('Pagamento aprovado!');
                                        onPaymentSuccess();
                                        resolve();
                                    } else {
                                        alert(`Pagamento falhou: ${result.status_detail}`);
                                        reject();
                                    }
                                })
                                .catch((error) => {
                                    console.error('Erro ao criar o pagamento:', error);
                                    alert('Erro ao processar o pagamento. Tente novamente mais tarde.');
                                    reject();
                                });
                        });
                    },
                    onError: (error) => {
                        console.error('Erro no Payment Brick:', error);
                        alert('Erro no processamento do pagamento. Verifique os dados e tente novamente.');
                    },
                },
            };
            await bricksBuilder.create('payment', 'paymentBrick_container', settings);
        };

        renderPaymentBrick();
    }, [course.price, user.email, user.firstName, user.lastName, onPaymentSuccess]);

    return <div id="paymentBrick_container" className="payment-form"></div>;
};

export default PaymentForm;
