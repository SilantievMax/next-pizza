import { FC } from 'react';
import { Button } from '@/components/ui';
import { formatterPrice, cn } from '@/lib';
import { Title } from '@/components/shared';

interface Props {
  name: string;
  price: number;
  imageUrl: string;
  loading?: boolean;
  className?: string;
  onSubmit?: VoidFunction;
}

export const ChooseProductForm: FC<Props> = ({ imageUrl, name, className, onSubmit, price, loading }) => {
  return (
    <div className={cn('flex flex-1', className)}>
      <div className='relative flex w-full flex-1 items-center justify-center'>
        <img src={imageUrl} alt={name} className='relative left-2 top-2 z-10 h-[350px] w-[350px] transition-all duration-300' />
      </div>

      <div className='w-[490px] bg-[#F7F6F5] p-7'>
        <Title text={name} size='md' className='mb-1 font-extrabold' />

        <Button className='mt-10 h-[50px] w-full rounded-[18px] px-10 text-base' onClick={onSubmit} loading={loading}>
          Добавить в корзину {formatterPrice(price)}
        </Button>
      </div>
    </div>
  );
};
