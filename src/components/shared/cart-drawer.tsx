'use client';

import Link from 'next/link';
import { useCartStore } from '@/store';
import { ArrowRight } from 'lucide-react';
import { getCartItemDetails } from '@/lib';
import { CartDrawerItem } from '@/components/shared';
import { FC, PropsWithChildren, useEffect } from 'react';
import { PizzaSize, PizzaType } from '@/constants/pizza';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, Button } from '@/components/ui';

interface Props {}

export const CartDrawer: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [items, totalAmount, fetchCartItems, removeCartItem, updateItemQuantity] = useCartStore((state) => [
    state.items,
    state.totalAmount,
    state.fetchCartItems,
    state.removeCartItem,
    state.updateItemQuantity,
  ]);

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
        <SheetHeader>
          <SheetTitle>
            В корзине <span className='font-bold'>{items.length} товара</span>
          </SheetTitle>
        </SheetHeader>

        <div className='-mx-6 mt-5 overflow-auto scrollbar flex-1'>
          {items.map((item) => (
            <div className='mb-1' key={item.id}>
              <CartDrawerItem
                id={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                imageUrl={item.imageUrl}
                onClickRemove={() => removeCartItem(item.id)}
                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                details={item.pizzaSize && item.pizzaType ? getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize) : ''}
              />
            </div>
          ))}
        </div>

        <SheetFooter className='-mx-6 bg-white p-8'>
          <div className='w-full'>
            <div className='flex mb-4'>
              <span className='flex flex-1 text-lg text-neutral-500'>
                Итого
                <div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
              </span>

              <span className='font-bold text-lg'>{totalAmount} ₽</span>
            </div>

            <Link href='/cart'>
              <Button type='submit' className='w-full h-12 text-base'>
                Оформить заказ
                <ArrowRight width={20} className='ml-2' />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
