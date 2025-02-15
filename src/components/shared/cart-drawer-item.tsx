import { FC } from 'react';
import { cn } from '@/lib';
import { Trash2Icon } from 'lucide-react';
import * as CartItem from './cart-item-details';
import { CountButton } from '@/components/shared';
import { CartItemProps } from './cart-item-details/cart-item-details.types';

interface Props extends CartItemProps {
  className?: string;
  onClickRemove?: VoidFunction;
  onClickCountButton?: (type: 'plus' | 'minus') => void;
}

export const CartDrawerItem: FC<Props> = ({ className, details, imageUrl, name, price, quantity, onClickCountButton, onClickRemove, disabled }) => {
  return (
    <div className={cn('flex gap-6 bg-white p-5', { 'pointer-events-none opacity-50': disabled }, className)}>
      <CartItem.Image src={imageUrl} />

      <div className='flex-1'>
        <CartItem.Info details={details} name={name} />

        <hr className='my-3' />

        <div className='flex items-center justify-between'>
          <CountButton onClick={onClickCountButton} value={quantity} />

          <div className='flex items-center gap-3'>
            <CartItem.Price value={price} />

            <Trash2Icon className='cursor-pointer text-gray-400 hover:text-gray-600' size={16} onClick={onClickRemove} />
          </div>
        </div>
      </div>
    </div>
  );
};
