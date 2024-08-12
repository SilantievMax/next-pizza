'use client';

import { cn } from '@/lib';
import { useCategoryStore } from '@/store';
import { useIntersection } from 'react-use';
import { FC, useEffect, useRef } from 'react';
import { Title, ProductCard } from '@/components/shared';
import { PoductWithRelationsType } from '@/types/prisma';

interface Props {
  title: string;
  categoryId: number;
  products: PoductWithRelationsType[];
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
      <Title text={title} size='lg' className='mb-5 font-extrabold' />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {products.map((product, index) => (
          <ProductCard
            id={product.id}
            key={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
