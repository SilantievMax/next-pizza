'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { Title } from '@/components/shared';
import { render } from '@react-email/components';
import { PayOrderTemplate } from '@/email/templies';

type EmailTemplate = 'payOrderTemplate';

export default function DashboardPage() {
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate>('payOrderTemplate');

  const emailHtmlPayOrderTemplate = render(
    PayOrderTemplate({
      orderId: 23432,
      totalAmount: 4543,
      paymentUrl: 'https://www.youtube.com/watch?v=GUwizGbY4cc&t=203s',
    }),
  );

  return (
    <div className='relative'>
      <div className='absolute flex flex-col gap-1 pl-6 pt-6'>
        <Title text='Список email рассылок' className='mb-2 font-extrabold' />

        <Button onClick={() => setEmailTemplate('payOrderTemplate')}>Оплата заказа</Button>
      </div>

      <div className='ml-auto mr-auto max-w-[600px] p-5 pt-4'>
        <div className='mb-3'>{emailTemplate === 'payOrderTemplate' && <div dangerouslySetInnerHTML={{ __html: emailHtmlPayOrderTemplate }} />}</div>
      </div>
    </div>
  );
}
