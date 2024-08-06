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
      <div className='flex items-center justify-center flex-1 relative w-full'>
        <img src={imageUrl} alt={name} className='relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]' />
      </div>

      <div className='w-[490px] bg-[#F7F6F5] p-7'>
        <Title text={name} size='md' className='font-extrabold mb-1' />

        <Button className='h-[50px] px-10 text-base rounded-[18px] w-full mt-10' onClick={onSubmit} loading={loading}>
          Добавить в корзину {formatterPrice(price)}
        </Button>
      </div>
    </div>
  );
};
