'use client';

import { FC } from 'react';
import { cn } from '@/lib';
import { X } from 'lucide-react';
import * as CartItemDetails from '@/components/shared/cart-item-details';
import { CartItemProps } from './cart-item-details/cart-item-details.types';

interface Props extends CartItemProps {
  onClickRemove?: VoidFunction;
  onClickCountButton?: (type: 'plus' | 'minus') => void;
}

export const CheckoutItem: FC<Props> = ({ name, price, imageUrl, quantity, className, onClickCountButton, onClickRemove, details, disabled }) => {
  return (
    <div className={cn('flex items-center justify-between', { 'pointer-events-none opacity-50': disabled }, className)}>
      <div className='flex flex-1 items-center gap-5'>
        <CartItemDetails.Image src={imageUrl} />

        <CartItemDetails.Info name={name} details={details} />
      </div>

      <CartItemDetails.Price value={price} />

      <div className='ml-20 flex items-center gap-5'>
        <CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} />

        <button type='button' onClick={onClickRemove}>
          <X className='cursor-pointer text-gray-400 hover:text-gray-600' size={20} />
        </button>
      </div>
    </div>
  );
};
