import { formatterPrice } from '@/lib';
import { Layout } from '@/email/components';
import { Heading, Link, Text } from '@react-email/components';

interface Props {
  orderId: number;
  paymentUrl: string;
  totalAmount: number;
}

// todo добавить список товаров
export function PayOrderTemplate({ orderId, paymentUrl, totalAmount }: Props) {
  return (
    <Layout>
      <Heading>Заказ #{orderId}</Heading>

      <Text>
        Оплатите заказ на сумму <b>{formatterPrice(totalAmount)}</b>. Перейдите{' '}
        <Link href={paymentUrl} target='_blank'>
          по этой ссылке
        </Link>{' '}
        для оплаты заказа.
      </Text>
    </Layout>
  );
}
