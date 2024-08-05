import { updateCartTotalAmount } from '@/lib';
import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
  params: {
    id: string;
  };
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const id = Number(params.id);
    const body = (await req.json()) as { quantity: number };
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Нет токена' });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ message: 'Товар ненайден' });
    }

    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity: body.quantity,
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (err) {
    console.log('[CART_PATCH]', err);

    return NextResponse.json(
      {
        message: 'Не удалось обновить карзину',
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const id = Number(params.id);
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Нет токена' });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ message: 'Товар ненайден' });
    }

    await prisma.cartItem.delete({
      where: {
        id,
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (err) {
    console.log('[CART_DELETE]', err);

    return NextResponse.json(
      {
        message: 'Не удалось удалить карзину',
      },
      {
        status: 500,
      }
    );
  }
}
