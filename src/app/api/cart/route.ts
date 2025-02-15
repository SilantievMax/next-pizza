import crypto from 'crypto';
import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { findOrCreateCart, updateCartTotalAmount } from '@/lib';
import { CreateCartItemValuesDTO } from '@/services/dto/cart.dto';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (err) {
    console.log('[CART_GET]', err);

    return NextResponse.json(
      {
        message: 'Не удалось получить карзину',
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValuesDTO;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: {
          every: {
            id: {
              in: data.ingredients,
            },
          },
        },
      },
    });

    // Если товар был найден, делаем + 1
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });

      const updatedUserCart = await updateCartTotalAmount(token);

      const resp = NextResponse.json(updatedUserCart);

      resp.cookies.set('cartToken', token);

      return resp;
    }

    // Если товар не найден
    await prisma.cartItem.create({
      data: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        quantity: 1,
        ingredients: {
          connect: data.ingredients?.map((id) => ({ id })),
        },
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedUserCart);

    resp.cookies.set('cartToken', token);

    return resp;
  } catch (err) {
    console.log('[CART_POST]', err);

    return NextResponse.json(
      {
        message: 'Не удалось создать карзину',
      },
      {
        status: 500,
      }
    );
  }
}
