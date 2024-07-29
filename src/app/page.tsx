import { prisma } from '@/prisma/prisma-client';
import { Container, Filters, ProductsGroupList, Title, TopBar } from '@/components/shared';

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          items: true,
        },
      },
    },
  });

  return (
    <>
      <Container className='mt-10'>
        <Title text='Все пиццы' size='lg' className='font-extrabold' />
      </Container>

      <TopBar categories={categories.filter((categorie) => categorie.products.length > 0)} />

      <Container className='pb-14 mt-10'>
        <div className='flex gap-[80px]'>
          <div className='w-[250px]'>
            <Filters />
          </div>

          <div className='flex-1'>
            <div className='flex flex-col gap-16'>
              {categories.map(
                (categorie) =>
                  categorie.products.length > 0 && (
                    <ProductsGroupList key={categorie.id} title={categorie.name} categoryId={categorie.id} products={categorie.products} />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
