import { cn } from '@/lib';
import { FC, ReactNode } from 'react';

interface Props {
  value?: ReactNode;
  title?: ReactNode;
  className?: string;
}

export const CheckoutItemDetail: FC<Props> = ({ className, title, value }) => {
  return (
    <div className={cn('my-4 flex', className)}>
      <span className='flex flex-1 text-lg text-neutral-500'>
        {title}

        <div className='relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200' />
      </span>

      <span className='text-lg font-bold'>{value}</span>
    </div>
  );
};
