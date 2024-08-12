'use client';

import { FC } from 'react';
import { useCartStore } from '@/store';
import { Button } from '@/components/ui';
import { formatterPrice, cn } from '@/lib';
import { CartDrawer } from '@/components/shared';
import { ArrowRight, ShoppingCart } from 'lucide-react';

interface Props {
  className?: string;
}

export const CartButton: FC<Props> = ({ className }) => {
  const [loading, items, totalAmount] = useCartStore((state) => [state.loading, state.items, state.totalAmount]);

  return (
    <CartDrawer>
      <Button className={cn('group relative', className)}>
        <b>{formatterPrice(totalAmount)}</b>
        <span className='mx-3 h-full w-[1px] bg-white/30' />

        <div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
          <ShoppingCart size={16} className='relative' strokeWidth={2} />
          <b>{items.length}</b>
        </div>

        <ArrowRight size={20} className='absolute right-5 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100' />
      </Button>
    </CartDrawer>
  );
};
