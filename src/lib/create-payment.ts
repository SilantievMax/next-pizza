import axios from 'axios';
import { PaymentData } from '@/types/yookassa';

interface CreatePaymentOptions {
  amount: number;
  orderId: number;
  description: string;
}

export const createPayment = async (details: CreatePaymentOptions) => {
  const callbackUrl = process.env.YOOKASSA_CALLBACK_URL;
  const apiKey = process.env.YOOKASSA_API_KEY as string;
  const storeId = process.env.YOOKASSA_STORE_ID as string;

  const { data } = await axios.post<PaymentData>(
    'https://api.yookassa.ru/v3/payments',
    {
      amount: {
        value: details.amount,
        currency: 'RUB',
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: 'redirect',
        return_url: callbackUrl,
      },
    },
    {
      auth: {
        username: storeId,
        password: apiKey,
      },
      headers: {
        'Idempotence-Key': Math.random().toString(36).substring(7),
      },
    },
  );

  return data;
};
