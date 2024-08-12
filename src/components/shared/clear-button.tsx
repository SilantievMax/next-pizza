import { FC } from 'react';
import { cn } from '@/lib';
import { X } from 'lucide-react';

interface Props {
  className?: string;
  onClick?: VoidFunction;
}

export const ClearButton: FC<Props> = ({ className, onClick }) => {
  return (
    <button onClick={onClick} className={cn('absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-30 hover:opacity-100', className)}>
      <X className='h-5 w-5' />
    </button>
  );
};
