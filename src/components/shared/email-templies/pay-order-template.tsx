import { FC } from 'react';
import { formatterPrice } from '@/lib';

interface Props {
  orderId: number;
  paymentUrl: string;
  totalAmount: number;
}

// todo добавить список товаров
export const PayOrderTemplate: FC<Props> = ({ orderId, paymentUrl, totalAmount }) => {
  return (
    <div>
      <h1>Заказ №{orderId}</h1>

      <p>
        Оплатите заказ на сумму <b>{formatterPrice(totalAmount)}</b>. Перейдите <a href={paymentUrl}>по этой ссылке</a> для оплаты заказа.
      </p>
    </div>
  );
};
