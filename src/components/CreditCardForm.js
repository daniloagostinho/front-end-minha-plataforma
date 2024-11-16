import React, { useEffect, useState } from 'react';
import { FaCreditCard } from 'react-icons/fa';

import { loadMercadoPago } from "@mercadopago/sdk-js";



const CreditCardForm = ({ user, course, onConfirm }) => {
    // const [cardNumber, setCardNumber] = useState('');
    // const [cardName, setCardName] = useState('');
    // const [expiryDate, setExpiryDate] = useState('');
    // const [cvv, setCvv] = useState('');
    // const [installments, setInstallments] = useState(1);
    // const [paymentMethodId, setPaymentMethodId] = useState(null);

    // // Formatação de dados
    // const formatCardNumber = (number) => {
    //     return number.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
    // };

    // // Formatação da validade do cartão
    // const formatExpiryDate = (date) => {
    //     const cleanDate = date.replace(/\D/g, '');
    //     if (cleanDate.length >= 3) {
    //         return `${cleanDate.slice(0, 2)}/${cleanDate.slice(2, 4)}`;
    //     }
    //     return cleanDate;
    // };

    // // Lida com a mudança no número do cartão
    // const handleCardNumberChange = (e) => {
    //     const formattedNumber = formatCardNumber(e.target.value);
    //     setCardNumber(formattedNumber);

    //     // Captura os primeiros 6 dígitos do número do cartão sem espaços
    //     const bin = formattedNumber.replace(/\s/g, '').slice(0, 6);

    //     if (bin.length === 6) {
    //         // Faz uma requisição ao backend para obter o método de pagamento
    //         fetch('https://back-end-minha-plataforma-app.vercel.app/api/payment-method', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ bin }),
    //         })
    //             .then((response) => {
    //                 if (!response.ok) {
    //                     throw new Error('Erro na resposta do servidor');
    //                 }
    //                 return response.json();
    //             })
    //             .then((data) => {
    //                 if (data.paymentMethodId) {
    //                     console.log('Payment Method ID:', data.paymentMethodId);
    //                     let correctedPaymentMethodId = data.paymentMethodId;
    //                     if (data.paymentMethodId === "elo" && cardNumber.startsWith("5")) {
    //                         correctedPaymentMethodId = "master"; // Corrige para "master" se necessário
    //                     }
    //                     setPaymentMethodId(correctedPaymentMethodId);
    //                 } else {
    //                     console.error('Método de pagamento não encontrado');
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.error('Erro ao obter o método de pagamento:', error);
    //             });
    //     }
    // };

    // // Lida com a mudança no campo de validade
    // const handleExpiryDateChange = (e) => {
    //     const formattedDate = formatExpiryDate(e.target.value);
    //     setExpiryDate(formattedDate);
    // };

    // const handleConfirmPayment = () => {
    //     if (!cardNumber || !cardName || !expiryDate || !cvv) {
    //         alert('Preencha todos os campos corretamente.');
    //         return;
    //     }

    //     if (!course || !user) {
    //         alert('Informações do curso ou do usuário não disponíveis.');
    //         return;
    //     }

    //     // Dados do cartão
    //     const cardData = {
    //         cardNumber: cardNumber.replace(/\s/g, ''), // Remove espaços
    //         cardName,
    //         expiryDate,
    //         cvv,
    //     };

    //     // Faz a requisição ao backend para gerar o token do cartão
    //     fetch('https://back-end-minha-plataforma-app.vercel.app/api/gerar-token-cartao', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(cardData),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             if (data.token) {
    //                 const token = data.token;

    //                 // Dados do pagamento
    //                 const paymentData = {
    //                     transaction_amount: course.price,
    //                     token: token,
    //                     description: `Pagamento do curso: ${course.title}`,
    //                     installments: parseInt(installments),
    //                     payment_method_id: paymentMethodId,
    //                     email: user.email,
    //                 };

    //                 // Faz a requisição ao backend para processar o pagamento
    //                 fetch('https://back-end-minha-plataforma-app.vercel.app/api/pagamento/cartao', {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                     },
    //                     body: JSON.stringify(paymentData),
    //                 })
    //                     .then((response) => response.json())
    //                     .then((data) => {
    //                         if (data.message === 'Pagamento aprovado') {
    //                             alert('Pagamento realizado com sucesso!');
    //                             onConfirm();
    //                         } else {
    //                             const statusDetail = data.status_detail;
    //                             let errorMessage = 'Falha no pagamento.';

    //                             if (statusDetail === 'cc_rejected_high_risk') {
    //                                 errorMessage = 'Pagamento rejeitado por motivos de segurança. Por favor, tente outro cartão ou método de pagamento.';
    //                             } else if (statusDetail === 'cc_rejected_insufficient_amount') {
    //                                 errorMessage = 'Pagamento rejeitado por falta de saldo. Por favor, verifique seu saldo ou tente outro cartão.';
    //                             } else if (statusDetail === 'cc_rejected_other_reason') {
    //                                 errorMessage = 'Pagamento rejeitado. Tente outro cartão ou entre em contato com seu banco.';
    //                             }

    //                             alert(errorMessage);
    //                         }
    //                     })
    //                     .catch((error) => {
    //                         console.error('Erro ao processar o pagamento:', error);
    //                         alert('Erro ao processar o pagamento. Tente novamente mais tarde.');
    //                     });
    //             } else {
    //                 alert('Erro ao gerar o token do cartão: ' + (data.error || 'Erro desconhecido.'));
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Erro ao gerar o token do cartão:', error);
    //             alert('Erro ao gerar o token do cartão. Tente novamente mais tarde.');
    //         });
    // };


    useEffect(() => {
        const initializeCardForm = async () => {
            await loadMercadoPago();

            const mp = new window.MercadoPago("APP_USR-7ccdd71d-8235-436e-b44a-bfa6aa1c05ea");

            const cardForm = mp.cardForm({
                amount: "3",
                iframe: true,
                form: {
                    id: "form-checkout",
                    cardNumber: {
                        id: "form-checkout__cardNumber",
                        placeholder: "Número do cartão",
                    },
                    expirationDate: {
                        id: "form-checkout__expirationDate",
                        placeholder: "MM/YY",
                    },
                    securityCode: {
                        id: "form-checkout__securityCode",
                        placeholder: "Código de segurança",
                    },
                    cardholderName: {
                        id: "form-checkout__cardholderName",
                        placeholder: "Titular do cartão",
                    },
                    issuer: {
                        id: "form-checkout__issuer",
                        placeholder: "Banco emissor",
                    },
                    installments: {
                        id: "form-checkout__installments",
                        placeholder: "Parcelas",
                    },
                    identificationType: {
                        id: "form-checkout__identificationType",
                        placeholder: "Tipo de documento",
                    },
                    identificationNumber: {
                        id: "form-checkout__identificationNumber",
                        placeholder: "Número do documento",
                    },
                    cardholderEmail: {
                        id: "form-checkout__cardholderEmail",
                        placeholder: "E-mail",
                    },
                },
                callbacks: {
                    onFormMounted: error => {
                        if (error) return console.warn("Form Mounted handling error: ", error);
                        console.log("Form mounted");
                    },
                    onSubmit: event => {
                        event.preventDefault();

                        const {
                            paymentMethodId: payment_method_id,
                            issuerId: issuer_id,
                            cardholderEmail: email,
                            amount,
                            token,
                            installments,
                            identificationNumber,
                            identificationType,
                        } = cardForm.getCardFormData();

                        fetch("/process_payment", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                token,
                                issuer_id,
                                payment_method_id,
                                transaction_amount: Number(amount),
                                installments: Number(installments),
                                description: "Descrição do produto",
                                payer: {
                                    email,
                                    identification: {
                                        type: identificationType,
                                        number: identificationNumber,
                                    },
                                },
                            }),
                        });
                    },
                    onFetching: (resource) => {
                        console.log("Fetching resource: ", resource);

                        // Animate progress bar
                        const progressBar = document.querySelector(".progress-bar");
                        progressBar.removeAttribute("value");

                        return () => {
                            progressBar.setAttribute("value", "0");
                        };
                    }
                },
            });

        }

        initializeCardForm();
    })



    return (
        // <div classNameName="w-full p-4">
        //     {/* Cartão de Crédito Visível */}
        //     <div
        //         classNameName="w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 text-white rounded-lg p-5 shadow-lg mb-6"
        //         style={{ background: 'linear-gradient(135deg, #333, #444)' }}
        //     >
        //         <div className="flex justify-between items-center">
        //             <span className="text-lg font-semibold">CARTÃO DE CRÉDITO</span>
        //             <FaCreditCard className="text-2xl" />
        //         </div>
        //         <div className="mt-4 mb-2 text-2xl font-mono tracking-widest">
        //             {cardNumber || '**** **** **** ****'}
        //         </div>
        //         <div className="flex justify-between text-sm">
        //             <div>
        //                 <p className="uppercase">Titular</p>
        //                 <p className="font-semibold">{cardName || 'NOME DO TITULAR'}</p>
        //             </div>
        //             <div>
        //                 <p className="uppercase">Validade</p>
        //                 <p className="font-semibold">{expiryDate || 'MM/AA'}</p>
        //             </div>
        //         </div>
        //     </div>

        //     {/* Formulário de Entrada */}
        //     <form className="space-y-4">
        //         <div>
        //             <label className="block text-gray-700 font-semibold mb-1">Número do Cartão</label>
        //             <input
        //                 type="text"
        //                 value={cardNumber}
        //                 onChange={handleCardNumberChange}
        //                 maxLength="19"
        //                 placeholder="**** **** **** ****"
        //                 className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        //             />
        //         </div>
        //         <div>
        //             <label className="block text-gray-700 font-semibold mb-1">Nome do Titular</label>
        //             <input
        //                 type="text"
        //                 value={cardName}
        //                 onChange={(e) => setCardName(e.target.value.toUpperCase())}
        //                 placeholder="Nome como no cartão"
        //                 className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        //             />
        //         </div>
        //         <div className="flex space-x-4">
        //             <div className="flex-1">
        //                 <label className="block text-gray-700 font-semibold mb-1">Validade</label>
        //                 <input
        //                     type="text"
        //                     value={expiryDate}
        //                     onChange={handleExpiryDateChange}
        //                     maxLength="5"
        //                     placeholder="MM/AA"
        //                     className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        //                 />
        //             </div>
        //             <div className="flex-1">
        //                 <label className="block text-gray-700 font-semibold mb-1">CVV</label>
        //                 <input
        //                     type="text"
        //                     value={cvv}
        //                     onChange={(e) => setCvv(e.target.value)}
        //                     maxLength="3"
        //                     placeholder="***"
        //                     className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        //                 />
        //             </div>
        //         </div>
        //         <div>
        //             <label className="block text-gray-700 font-semibold mb-1">Parcelas</label>
        //             <select
        //                 value={installments}
        //                 onChange={(e) => setInstallments(e.target.value)}
        //                 className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        //             >
        //                 {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((installment) => (
        //                     <option key={installment} value={installment}>
        //                         {installment}x
        //                     </option>
        //                 ))}
        //             </select>
        //         </div>
        //         <button
        //             type="button"
        //             onClick={handleConfirmPayment}
        //             className="w-full bg-indigo-500 text-white font-bold py-2 rounded-lg transition-colors duration-300 hover:bg-indigo-600"
        //         >
        //             Confirmar Pagamento
        //         </button>
        //     </form>
        // </div>


        <>
            <style>
                #form-checkout {`
                    display: flex;
                flex-direction: column;
                max-width: 600px;
  }

                .container {
                    height: 18px;
                display: inline-block;
                border: 1px solid rgb(118, 118, 118);
                border-radius: 2px;
                padding: 1px 2px;
  `}
            </style>
            <form id="form-checkout">
                <div id="form-checkout__cardNumber" className="container"></div>
                <div id="form-checkout__expirationDate" className="container"></div>
                <div id="form-checkout__securityCode" className="container"></div>
                <input type="text" id="form-checkout__cardholderName" />
                <select id="form-checkout__issuer"></select>
                <select id="form-checkout__installments"></select>
                <select id="form-checkout__identificationType"></select>
                <input type="text" id="form-checkout__identificationNumber" />
                <input type="email" id="form-checkout__cardholderEmail" />

                <button type="submit" id="form-checkout__submit">Pagar</button>
                <progress value="0" className="progress-bar">Carregando...</progress>
            </form>
        </>

    );
};

export default CreditCardForm;
