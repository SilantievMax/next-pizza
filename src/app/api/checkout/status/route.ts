import { sendMail } from '@/lib';
import { OrderStatus } from '@prisma/client';
import { prisma } from '@/prisma/prisma-client';
import { render } from '@react-email/components';
import { CartItemDTO } from '@/services/dto/cart.dto';
import { PaymentCallbackData } from '@/types/yookassa';
import { NextRequest, NextResponse } from 'next/server';
import { OrderSuccessTemplate } from '@/email/templies';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ message: 'Заказ не найден' });
    }

    const isSucceeded = body.object.status === 'succeeded';

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    if (isSucceeded) {
      const items = JSON.parse(order.items as string) as CartItemDTO[];

      const emailHtml = render(
        OrderSuccessTemplate({
          orderId: order.id,
          items: items,
        }),
      );

      await sendMail({
        fromEmail: 'Next Pizza',
        subject: `Next Pizza / Ваш заказ оформлен`,
        toEmail: order.email,
        html: emailHtml,
      });
    } else {
      // todo Письмо об неуспешной оплате
    }
  } catch (err) {
    console.log('[STATUS_POST]', err);

    return NextResponse.json(
      {
        message: 'Ошибка сервера',
      },
      {
        status: 500,
      },
    );
  }
}
