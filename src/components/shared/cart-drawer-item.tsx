import { FC } from 'react';
import { cn } from '@/lib';
import { Trash2Icon } from 'lucide-react';
import * as CartItem from './cart-item-details';
import { CountButton } from '@/components/shared';
import { CartItemProps } from './cart-item-details/cart-item-details.types';

interface Props extends CartItemProps {
  className?: string;
  onClickRemove?: () => void;
  onClickCountButton?: (type: 'plus' | 'minus') => void;
}

export const CartDrawerItem: FC<Props> = ({ className, details, imageUrl, name, price, quantity, onClickCountButton, onClickRemove, disabled }) => {
  console.log(disabled);
  return (
    <div className={cn('flex bg-white p-5 gap-6', { 'opacity-50 pointer-events-none': disabled }, className)}>
      <CartItem.Image src={imageUrl} />

      <div className='flex-1'>
        <CartItem.Info details={details} name={name} />

        <hr className='my-3' />

        <div className='flex items-center justify-between'>
          <CountButton onClick={onClickCountButton} value={quantity} />

          <div className='flex items-center gap-3'>
            <CartItem.Price value={price} />

            <Trash2Icon className='text-gray-400 cursor-pointer hover:text-gray-600' size={16} onClick={onClickRemove} />
          </div>
        </div>
      </div>
    </div>
  );
};
