import { notFound } from 'next/navigation';
import { prisma } from '@/prisma/prisma-client';
import { Container, GroupVariants, ProductImage, Title } from '@/components/shared';

type Params = { params: { id: string } };

const groupVariantsItems = [
  { name: 'Маленькая', value: '1' },
  { name: 'Средняя', value: '2' },
  { name: 'Большая', value: '3' },
];

export default async function ProductPage({ params: { id } }: Params) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) {
    return notFound();
  }

  return (
    <Container className='flex flex-col my-10'>
      <div className='flex flex-1'>
        <ProductImage className='' imageUrl={product.imageUrl} size={20} />

        <div className='w-[490px] bg-[#F7F6F5] p-7'>
          <Title text={product.name} size='md' className='font-extrabold mb-1' />

          <p className='text-gray-400'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. A consequuntur asperiores repellat doloribus velit, vel voluptas doloremque aut voluptatum
            iste eaque voluptates aspernatur laborum ab corrupti modi alias sequi quam?
          </p>

          <GroupVariants items={groupVariantsItems} selectedValue='1' />
        </div>
      </div>
    </Container>
  );
}
