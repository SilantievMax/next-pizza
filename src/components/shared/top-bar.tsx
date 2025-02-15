import { FC } from 'react';
import { cn } from '@/lib';
import { Category } from '@prisma/client';
import { Categories, SortPopup, Container } from '@/components/shared';

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: FC<Props> = ({ className, categories }) => {
  return (
    <div className={cn('sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/5', className)}>
      <Container className='flex items-center justify-between'>
        <Categories items={categories} />

        <SortPopup />
      </Container>
    </div>
  );
};
