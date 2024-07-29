'use client';

import { FC } from 'react';
import { cn } from '@/lib/utils';
import { Category } from '@prisma/client';
import { useCategoryStore } from '@/store/category';

interface Props {
  items: Category[];
  className?: string;
}

export const Categories: FC<Props> = ({ className, items }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {items.map(({ id, name }, index) => (
        <a
          className={cn('flex items-center font-bold h-11 rounded-2xl px-5', {
            'bg-white shadow-md shadow-gray-200 text-primary': categoryActiveId === id,
          })}
          href={`/#${name}`}
          key={index}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
