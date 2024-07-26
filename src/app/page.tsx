import { Container, Filters, ProductsGroupList, Title, TopBar } from '@/components/shared';

const productsPizza = [
  {
    id: 1,
    name: 'Чизбургер-пицца',
    imageUrl: 'https://mykaleidoscope.ru/x/uploads/posts/2023-12/1703240013_mykaleidoscope-ru-p-dieticheskaya-pitstsa-vkontakte-65.jpg',
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 2,
    name: 'Чизбургер-пицца',
    imageUrl: 'https://mykaleidoscope.ru/x/uploads/posts/2023-12/1703240013_mykaleidoscope-ru-p-dieticheskaya-pitstsa-vkontakte-65.jpg',
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 3,
    name: 'Чизбургер-пицца',
    imageUrl: 'https://mykaleidoscope.ru/x/uploads/posts/2023-12/1703240013_mykaleidoscope-ru-p-dieticheskaya-pitstsa-vkontakte-65.jpg',
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 4,
    name: 'Чизбургер-пицца',
    imageUrl: 'https://mykaleidoscope.ru/x/uploads/posts/2023-12/1703240013_mykaleidoscope-ru-p-dieticheskaya-pitstsa-vkontakte-65.jpg',
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 5,
    name: 'Чизбургер-пицца',
    imageUrl: 'https://mykaleidoscope.ru/x/uploads/posts/2023-12/1703240013_mykaleidoscope-ru-p-dieticheskaya-pitstsa-vkontakte-65.jpg',
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 6,
    name: 'Чизбургер-пицца',
    imageUrl: 'https://mykaleidoscope.ru/x/uploads/posts/2023-12/1703240013_mykaleidoscope-ru-p-dieticheskaya-pitstsa-vkontakte-65.jpg',
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 7,
    name: 'Чизбургер-пицца',
    imageUrl: 'https://mykaleidoscope.ru/x/uploads/posts/2023-12/1703240013_mykaleidoscope-ru-p-dieticheskaya-pitstsa-vkontakte-65.jpg',
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 8,
    name: 'Чизбургер-пицца',
    imageUrl: 'https://mykaleidoscope.ru/x/uploads/posts/2023-12/1703240013_mykaleidoscope-ru-p-dieticheskaya-pitstsa-vkontakte-65.jpg',
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 9,
    name: 'Чизбургер-пицца',
    imageUrl: 'https://mykaleidoscope.ru/x/uploads/posts/2023-12/1703240013_mykaleidoscope-ru-p-dieticheskaya-pitstsa-vkontakte-65.jpg',
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 432,
    name: 'Чизбургер-пицца',
    imageUrl: 'https://mykaleidoscope.ru/x/uploads/posts/2023-12/1703240013_mykaleidoscope-ru-p-dieticheskaya-pitstsa-vkontakte-65.jpg',
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 43435,
    name: 'Чизбургер-пицца',
    imageUrl: 'https://mykaleidoscope.ru/x/uploads/posts/2023-12/1703240013_mykaleidoscope-ru-p-dieticheskaya-pitstsa-vkontakte-65.jpg',
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 3421,
    name: 'Чизбургер-пицца',
    imageUrl: 'https://mykaleidoscope.ru/x/uploads/posts/2023-12/1703240013_mykaleidoscope-ru-p-dieticheskaya-pitstsa-vkontakte-65.jpg',
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 15634,
    name: 'Чизбургер-пицца',
    imageUrl: 'https://mykaleidoscope.ru/x/uploads/posts/2023-12/1703240013_mykaleidoscope-ru-p-dieticheskaya-pitstsa-vkontakte-65.jpg',
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 1756,
    name: 'Чизбургер-пицца',
    imageUrl: 'https://mykaleidoscope.ru/x/uploads/posts/2023-12/1703240013_mykaleidoscope-ru-p-dieticheskaya-pitstsa-vkontakte-65.jpg',
    price: 550,
    items: [{ price: 550 }],
  },
  {
    id: 1452,
    name: 'Чизбургер-пицца',
    imageUrl: 'https://mykaleidoscope.ru/x/uploads/posts/2023-12/1703240013_mykaleidoscope-ru-p-dieticheskaya-pitstsa-vkontakte-65.jpg',
    price: 550,
    items: [{ price: 550 }],
  },
];

export default function Home() {
  return (
    <>
      <Container className='mt-10'>
        <Title text='Все пиццы' size='lg' className='font-extrabold' />
      </Container>

      <TopBar />

      <Container className='pb-14 mt-10'>
        <div className='flex gap-[80px]'>
          <div className='w-[250px]'>
            <Filters />
          </div>

          <div className='flex-1'>
            <div className='flex flex-col gap-16'>
              <ProductsGroupList title='Пицца' products={productsPizza} categoryId={1} />

              <ProductsGroupList title='Комбо' products={productsPizza} categoryId={2} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
