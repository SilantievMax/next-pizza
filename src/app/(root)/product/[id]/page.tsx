import { notFound } from 'next/navigation';
import { prisma } from '@/prisma/prisma-client';
import { Container, ProductForm } from '@/components/shared';

type Params = { params: { id: string } };

export default async function ProductPage({ params: { id } }: Params) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className='my-10 flex flex-col'>
      <ProductForm product={product} />
    </Container>
  );
}
