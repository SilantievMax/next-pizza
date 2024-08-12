import { Layout } from '@/email/components';
import { formatterPrice } from '@/lib';
import { CartItemDTO } from '@/services/dto/cart.dto';
import { Column, Heading, Row, Section, Text } from '@react-email/components';

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

export function OrderSuccessTemplate({ orderId, items }: Props) {
  return (
    <Layout>
      <Heading>Спасибо за покупку!</Heading>

      <Text>Ваш заказ #{orderId} оплачен. Список товаров</Text>

      <Section>
        {items.map((item, index) => (
          <Row key={item.id}>
            <Column>
              <b>{index + 1})</b> {item.productItem.product.name} | {formatterPrice(item.productItem.price)} x {item.quantity} шт. ={' '}
              {formatterPrice(item.productItem.price * item.quantity)}
            </Column>
          </Row>
        ))}
      </Section>
    </Layout>
  );
}
