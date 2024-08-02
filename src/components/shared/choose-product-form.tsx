import { FC } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { Title } from '@/components/shared';

interface Props {
  name: string;
  imageUrl: string;
  className?: string;
  onClickAdd?: VoidFunction;
}

const textDetails = 'Lorem dedfojsh osrij';
const totalPrice = 300;

export const ChooseProductForm: FC<Props> = ({ imageUrl, name, className, onClickAdd }) => {
  return (
    <div className={cn('flex flex-1', className)}>
      <div className='flex items-center justify-center flex-1 relative w-full'>
        <img src={imageUrl} alt={name} className='relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]' />
      </div>

      <div className='w-[490px] bg-[#F7F6F5] p-7'>
        <Title text={name} size='md' className='font-extrabold mb-1' />

        <p className='text-gray-400'>{textDetails}</p>

        <Button className='h-[50px] px-10 text-base rounded-[18px] w-full mt-10'>Добавить в корзину {totalPrice} ₽</Button>
      </div>
    </div>
  );
};
