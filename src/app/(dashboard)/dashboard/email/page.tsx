'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { Title } from '@/components/shared';
import { render } from '@react-email/components';
import { OrderSuccessTemplate, PayOrderTemplate } from '@/email/templies';

type EmailTemplate = 'payOrderTemplate' | 'orderSuccessTemplate';

export default function DashboardPage() {
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate>('payOrderTemplate');

  const emailHtmlPayOrderTemplate = render(
    PayOrderTemplate({
      orderId: 23432,
      totalAmount: 4543,
      paymentUrl: 'https://www.youtube.com/watch?v=GUwizGbY4cc&t=203s',
    }),
  );

  const emailHtmlOrderSuccessTemplate = render(
    OrderSuccessTemplate({
      orderId: 23432,
      items: [
        { productItem: { price: 300, product: { name: 'Чоризо фреш' } }, quantity: 3 },
        { productItem: { price: 278, product: { name: 'Сырная' } }, quantity: 2 },
      ],
    }),
  );

  return (
    <div className='relative'>
      <div className='absolute flex flex-col gap-1 pl-6 pt-6'>
        <Title text='Список email рассылок' className='mb-2 font-extrabold' />

        <Button variant={emailTemplate === 'payOrderTemplate' ? 'default' : 'outline'} onClick={() => setEmailTemplate('payOrderTemplate')}>
          Оплата заказа
        </Button>

        <Button variant={emailTemplate === 'orderSuccessTemplate' ? 'default' : 'outline'} onClick={() => setEmailTemplate('orderSuccessTemplate')}>
          Успешная оплата
        </Button>
      </div>

      <div className='ml-auto mr-auto max-w-[600px] p-5 pt-4'>
        <div className='mb-3'>
          {emailTemplate === 'payOrderTemplate' && <div dangerouslySetInnerHTML={{ __html: emailHtmlPayOrderTemplate }} />}

          {emailTemplate === 'orderSuccessTemplate' && <div dangerouslySetInnerHTML={{ __html: emailHtmlOrderSuccessTemplate }} />}
        </div>
      </div>
    </div>
  );
}
