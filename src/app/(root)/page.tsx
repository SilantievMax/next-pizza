import { Suspense } from 'react';
import { findPizzas } from '@/lib';
import { GetSearchParams } from '@/lib/find-pizzas';
import { Container, Filters, ProductsGroupList, Stories, Title, TopBar } from '@/components/shared';

export default async function HomePage({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await findPizzas(searchParams);

  return (
    <>
      <Container className='mt-10'>
        <Title text='Все пиццы' size='lg' className='font-extrabold' />
      </Container>

      <TopBar categories={categories.filter((categorie) => categorie.products.length > 0)} />

      <Stories />

      <Container className='mt-10 pb-14'>
        <div className='flex gap-[80px]'>
          <div className='w-[250px]'>
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          <div className='flex-1'>
            <div className='flex flex-col gap-16'>
              {categories.map(
                (categorie) =>
                  categorie.products.length > 0 && (
                    <ProductsGroupList key={categorie.id} title={categorie.name} categoryId={categorie.id} products={categorie.products} />
                  ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
