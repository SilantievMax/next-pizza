import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from '@/lib/get-user-session';

export async function GET() {
  try {
    const user = await getUserSession();

    if (!user) {
      return NextResponse.json(
        {
          message: 'Вы не авторизованы',
        },
        {
          status: 401,
        },
      );
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(user.id),
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    });

    return NextResponse.json(data);
  } catch (err) {
    console.log('[CART_GET]', err);

    return NextResponse.json(
      {
        message: 'Не удалось получить информацию о пользователе',
      },
      {
        status: 500,
      },
    );
  }
}
