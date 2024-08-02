'use client';

import { cn } from '@/lib/utils';
import { useIntersection } from 'react-use';
import { FC, useEffect, useRef } from 'react';
import { useCategoryStore } from '@/store/category';
import { Title, ProductCard } from '@/components/shared';

interface Props {
  title: string;
  products: any[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: FC<Props> = ({ categoryId, products, title, className, listClassName }) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.37,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size='lg' className='font-extrabold mb-5' />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {products.map((product, index) => (
          <ProductCard key={product.id} id={product.id} name={product.name} imageUrl={product.imageUrl} price={product.items[0].price} />
        ))}
      </div>
    </div>
  );
};
