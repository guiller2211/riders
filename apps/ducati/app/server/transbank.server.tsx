// transbank.service.tsx
import { WebpayPlus } from 'transbank-sdk'; 
import { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk'; 

export const tx = new WebpayPlus.Transaction(new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration));


export const handlePays = async () => {
    try {
      const buyOrder = 'ridersRealm123'; // Genera tu buyOrder
      const sessionId = '123'; // Genera tu sessionId
      const amount = 1000; // El monto de la transacción
      const returnUrl = '/'; // La URL de retorno
  
      const tx = new WebpayPlus.Transaction(new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration));
      const paymentResponse = await tx.create(buyOrder, sessionId, amount, returnUrl);
      console.log('Payment Response:', paymentResponse.data);
      // Maneja la respuesta de pago según sea necesario
    } catch (error) {
      console.error('Error during payment:', error);
    } 
  };
  