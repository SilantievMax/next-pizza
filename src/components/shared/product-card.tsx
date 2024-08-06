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
        <div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
          <img className='w-[215px] h-[215px]' src={imageUrl} alt={name} />
        </div>

        <Title className='mb-1 mt-3 font-bold' text={name} size='sm' />

        <p className='text-sm text-gray-400'>{ingredients.map((ingredient) => ingredient.name).join(', ')}</p>

        <div className='flex justify-between items-center mt-4'>
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
