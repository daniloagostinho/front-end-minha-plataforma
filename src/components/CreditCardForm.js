// import React, { useEffect } from 'react';
// import { initMercadoPago, Payment } from '@mercadopago/sdk-react';

// const CreditCardForm = ({ user, course, onConfirm }) => {
//     const PaymentForm = ({ user, course, onPaymentSuccess }) => {
//         useEffect(() => {
//             initMercadoPago('APP_USR-7ccdd71d-8235-436e-b44a-bfa6aa1c05ea', { locale: 'pt-BR' });
//         }, []);

//         return (
//             <div className="payment-form">
//                 <Payment
//                     initialization={{
//                         amount: course.price,
//                         payer: {
//                             email: user.email,
//                         },
//                     }}
//                     onSubmit={async ({ selectedPaymentMethod, formData }) => {
//                         try {
//                             const response = await fetch('https://seu-backend.com/api/process_payment', {
//                                 method: 'POST',
//                                 headers: {
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: JSON.stringify(formData),
//                             });

//                             const result = await response.json();

//                             if (result.status === 'approved') {
//                                 alert('Pagamento aprovado!');
//                                 onPaymentSuccess();
//                             } else {
//                                 alert(`Pagamento falhou: ${result.status_detail}`);
//                             }
//                         } catch (error) {
//                             console.error('Erro ao processar o pagamento:', error);
//                             alert('Erro ao processar o pagamento. Tente novamente mais tarde.');
//                         }
//                     }}
//                     onError={(error) => {
//                         console.error('Erro no Payment Brick:', error);
//                         alert('Erro no processamento do pagamento. Verifique os dados e tente novamente.');
//                     }}
//                 />
//             </div>
//         );

//     };

//     export default CreditCardForm;
