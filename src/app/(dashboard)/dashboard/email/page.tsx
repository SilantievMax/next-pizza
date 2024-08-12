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
    })
  );

  return (
    <div className='relative'>
      <div className='pt-6 pl-6 absolute'>
        <Title text='Список email рассылок' className='mb-2 font-extrabold' />

        <Button onClick={() => setEmailTemplate('payOrderTemplate')}>Оплата заказа</Button>
      </div>

      <div className='p-5 pt-4 max-w-[600px] ml-auto mr-auto'>
        <div className='mb-3'>{emailTemplate === 'payOrderTemplate' && <div dangerouslySetInnerHTML={{ __html: emailHtmlPayOrderTemplate }} />}</div>
      </div>
    </div>
  );
}
