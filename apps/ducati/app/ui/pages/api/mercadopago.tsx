// src/routes/mercadopago.ts

import { MercadoPagoConfig, Preference } from 'mercadopago';
import { PreferenceRequest } from 'mercadopago/dist/clients/preference/commonTypes';

export async function getMercadoPago() {
  try {
    const client = new MercadoPagoConfig({
      accessToken: 'TEST-3916351604865856-051622-d1be6d2ede24d16314857fb2b53b9c2b-296805130',
    });

    const body: PreferenceRequest = {
      items: [
        {
          id: "item-ID-1234",
          title: "Mi producto",
          currency_id: "CLP",
          picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
          description: "Descripción del Item",
          category_id: "art",
          quantity: 1,
          unit_price: 7576
        }
      ],
      back_urls: {
        success: 'https://github.com/mercadopago/sdk-react',
        failure: 'https://github.com/mercadopago/sdk-react',
        pending: 'https://github.com/mercadopago/sdk-react',
      },
      payer: {
        name: "Juan",
        surname: "Lopez",
        email: "user@email.com",
        phone: {
          area_code: "11",
          number: "4444-4444"
        },
        identification: {
          type: "DNI",
          number: "12345678"
        },
        address: {
          street_name: "Street",
          street_number: 123,
          zip_code: "5700"
        }
      },
      shipments: {
        cost: 1000,
        mode: "not_specified",
      },
      auto_return: 'approved',
    };

    const preference = new Preference(client);
    const response = await preference.create({ body });

    // Devuelve el ID de la preferencia
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
