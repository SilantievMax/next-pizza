import { FC } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { formatterPrice } from '@/lib';
import { Button } from '@/components/ui';
import { Title } from '@/components/shared';
import { Ingredient } from '@prisma/client';

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  ingredients: Ingredient[];
  className?: string;
}

export const ProductCard: FC<Props> = ({ id, imageUrl, name, price, className, ingredients }) => {
  return (
    <div className={className}>
      <Link href={`product/${id}`}>
        <div className='flex h-[260px] justify-center rounded-lg bg-secondary p-6'>
          <img className='h-[215px] w-[215px]' src={imageUrl} alt={name} />
        </div>

        <Title className='mb-1 mt-3 font-bold' text={name} size='sm' />

        <p className='text-sm text-gray-400'>{ingredients.map((ingredient) => ingredient.name).join(', ')}</p>

        <div className='mt-4 flex items-center justify-between'>
          <span className='text-[20px]'>
            от <b>{formatterPrice(price)}</b>
          </span>

          <Button variant='secondary' className='text-base font-bold'>
            <Plus size={20} className='mr-1' />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
