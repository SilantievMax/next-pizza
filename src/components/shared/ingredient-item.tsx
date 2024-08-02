import { FC } from 'react';
import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';

interface Props {
  name: string;
  price: number;
  imageUrl: string;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

export const IngredientItem: FC<Props> = ({ imageUrl, name, price, active, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white',
        { 'border border-primary': active },
        className
      )}
    >
      {active && <CircleCheck className='absolute top-2 right-2 text-primary' />}

      <img width={110} height={110} src={imageUrl} />

      <span className='text-xs mb-1'>{name}</span>

      <span className='font-bold'>{price} ₽</span>
    </div>
  );
};
