'use client';

import { cn } from '@/lib';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Product } from '@prisma/client';
import { Api } from '@/services/api-client';
import { FC, useRef, useState } from 'react';
import { useClickAway, useDebounce } from 'react-use';

interface Props {
  className?: string;
}

export const SearchInput: FC<Props> = ({ className }) => {
  const [focused, setFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  const ref = useRef(null);
  useClickAway(ref, () => setFocused(false));
  useDebounce(
    async () => {
      try {
        const response = await Api.products.search(searchQuery);
        setProducts(response);
      } catch (err) {
        console.error(err);
      }
    },
    300,
    [searchQuery],
  );

  const onClickItem = () => {
    setProducts([]);
    setFocused(false);
    setSearchQuery('');
  };

  return (
    <>
      {focused && <div className='fixed bottom-0 left-0 right-0 top-0 z-30 bg-black/50' />}

      <div className={cn('relative z-30 flex h-11 flex-1 justify-between rounded-2xl', className)} ref={ref}>
        <Search className='absolute left-3 top-1/2 h-5 translate-y-[-50%] text-gray-400' />

        <input
          type='text'
          value={searchQuery}
          placeholder='Найти пиццу...'
          onFocus={() => setFocused(true)}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full rounded-2xl bg-gray-100 pl-11 outline-none'
        />

        <div
          className={cn('invisible absolute top-14 z-30 w-full rounded-xl bg-white py-2 opacity-0 shadow-md transition-all duration-200', {
            'visible top-12 opacity-100': focused,
          })}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                key={product.id}
                onClick={onClickItem}
                href={`/product/${product.id}`}
                className='flex w-full items-center gap-3 px-3 py-2 hover:bg-primary/10'
              >
                <img className='h-8 w-8 rounded-md' src={product.imageUrl} alt={product.name} />
                <span>{product.name}</span>
              </Link>
            ))
          ) : (
            <div className='text-center'>Ничего не найдено </div>
          )}
        </div>
      </div>
    </>
  );
};
