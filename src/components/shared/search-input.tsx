'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
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
    [searchQuery]
  );

  const onClickItem = () => {
    setProducts([]);
    setFocused(false);
    setSearchQuery('');
  };

  return (
    <>
      {focused && <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30' />}

      <div className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)} ref={ref}>
        <Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />

        <input
          type='text'
          value={searchQuery}
          placeholder='Найти пиццу...'
          onFocus={() => setFocused(true)}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='rounded-2xl outline-none w-full bg-gray-100 pl-11'
        />

        <div
          className={cn('absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30', {
            'visible opacity-100 top-12': focused,
          })}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                key={product.id}
                onClick={onClickItem}
                href={`/product/${product.id}`}
                className='flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10'
              >
                <img className='rounded-md h-8 w-8' src={product.imageUrl} alt={product.name} />
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
