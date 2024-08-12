'use client';

import { FC } from 'react';
import { cn } from '@/lib';
import { Category } from '@prisma/client';
import { useCategoryStore } from '@/store';

interface Props {
  items: Category[];
  className?: string;
}

export const Categories: FC<Props> = ({ className, items }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div className={cn('inline-flex gap-1 rounded-2xl bg-gray-50 p-1', className)}>
      {items.map(({ id, name }, index) => (
        <a
          className={cn('flex h-11 items-center rounded-2xl px-5 font-bold', {
            'bg-white text-primary shadow-md shadow-gray-200': categoryActiveId === id,
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
