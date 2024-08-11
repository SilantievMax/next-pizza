'use server';

import { sendMail } from '@/lib';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { OrderStatus } from '@prisma/client';
import { prisma } from '@/prisma/prisma-client';
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

    // todo Сделать оплату

    // todo Сделать отправку письма <PayOrderTemplate />
    await sendMail({
      fromEmail: 'Next Pizza',
      subject: `Next Pizza / Оплатите заказ #${order.id}`,
      toEmail: data.email,
      html: '<PayOrderTemplate />', // todo нужно будет использовать react-email
    });

    // todo добавить ссылку на оплату
    return 'https://www.youtube.com/watch?v=GUwizGbY4cc&t=203s';
  } catch (err) {
    console.log('[ACTIONS]', err);

    // todo
    return null;

    // return NextResponse.json(
    //   {
    //     message: 'Не удалось оформить заказ',
    //   },
    //   {
    //     status: 500,
    //   }
    // );
  }
}
