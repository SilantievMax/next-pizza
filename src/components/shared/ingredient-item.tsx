import { FC } from 'react';
import { formatterPrice, cn } from '@/lib';
import { CircleCheck } from 'lucide-react';

interface Props {
  name: string;
  price: number;
  imageUrl: string;
  active?: boolean;
  className?: string;
  onClick?: VoidFunction;
}

export const IngredientItem: FC<Props> = ({ imageUrl, name, price, active, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative flex w-32 cursor-pointer flex-col items-center rounded-md bg-white p-1 text-center shadow-md',
        { 'border border-primary': active },
        className,
      )}
    >
      {active && <CircleCheck className='absolute right-2 top-2 text-primary' />}

      <img width={110} height={110} src={imageUrl} />

      <span className='mb-1 text-xs'>{name}</span>

      <span className='font-bold'>{formatterPrice(price)}</span>
    </div>
  );
};
