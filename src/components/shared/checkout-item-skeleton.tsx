import { FC } from 'react';
import { cn } from '@/lib';
import { Skeleton } from '@/components/ui';

interface Props {
  className?: string;
}

export const CheckoutItemSkeleton: FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className='flex items-center gap-5'>
        <Skeleton className='h-[50px] w-[50px] rounded-full' />

        <Skeleton className='h-5 w-40 rounded' />
      </div>

      <Skeleton className='h-5 w-10 rounded' />

      <Skeleton className='h-8 w-[133px] rounded' />
    </div>
  );
};
