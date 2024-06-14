import { CartData } from '@riders/types';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { Items } from 'mercadopago/dist/clients/commonTypes';
import { PreferenceRequest } from 'mercadopago/dist/clients/preference/commonTypes';

export async function getMercadoPago(cart: CartData) {
  try {
    const client = new MercadoPagoConfig({
      accessToken: process.env.TOKEN || 'TEST-3916351604865856-051622-d1be6d2ede24d16314857fb2b53b9c2b-296805130'
    });

    const items: Items[] = [];

    cart.entries.forEach((_i) => {
      items.push({
        id: _i.id ?? '',
        title: _i.product?.name ?? '',
        description: _i.product?.description ?? '',
        quantity: _i.quantity,
        unit_price: _i.product?.value.centsAmount ?? 0
      })
    })

    const body: PreferenceRequest = {
      items: items,
      shipments: {
        cost: cart.shippingMethod?.price.value.centsAmount,
        mode: cart.shippingMethod?.name,
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
