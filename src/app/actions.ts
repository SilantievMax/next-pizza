'use server';

import { hashSync } from 'bcrypt';
import { cookies } from 'next/headers';
import { prisma } from '@/prisma/prisma-client';
import { createPayment, sendMail } from '@/lib';
import { render } from '@react-email/components';
import { PayOrderTemplate } from '@/email/templies';
import { OrderStatus, Prisma } from '@prisma/client';
import { getUserSession } from '@/lib/get-user-session';
import { CheckoutFormValues } from '@/constants/checkout-form-schemas';

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    // Находим корзину по токену
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    // Если корзина не найдена возвращаем ошибку
    if (!userCart) {
      throw new Error('Cart not found');
    }

    // Если корзина пустая возвращаем ошибку
    if (userCart.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    // Создаем заказ
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        status: OrderStatus.PENDING,
        totalAmount: userCart.totalAmount,
        items: JSON.stringify(userCart.items),
        fullName: `${data.firstName} ${data.lastName}`,
      },
    });

    // Очищаем корзину
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    // Создание платижа
    const paymentData = await createPayment({
      orderId: order.id,
      amount: order.totalAmount,
      description: `Оплата заказа #${order.id}`,
    });

    if (!paymentData) {
      throw new Error('Payment data not found');
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;

    // Оправка письма на почту
    const emailHtml = render(
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: paymentUrl,
      }),
    );

    await sendMail({
      fromEmail: 'Next Pizza',
      subject: `Next Pizza / Оплатите заказ #${order.id}`,
      toEmail: data.email,
      html: emailHtml,
    });

    return paymentUrl;
  } catch (err) {
    console.log('[ACTIONS]', err);

    throw new Error('Order not found');
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(String(body.password), 10) : findUser?.password,
      },
    });
  } catch (error) {
    console.log('Error [UPDATE_USER]', error);
    throw error;
  }
}
