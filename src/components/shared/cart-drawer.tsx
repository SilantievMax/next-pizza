'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FC, PropsWithChildren, useEffect } from 'react';
import { PizzaSize, PizzaType } from '@/constants/pizza';
import { formatterPrice, getCartItemDetails } from '@/lib';
import { CartDrawerItem, Title } from '@/components/shared';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, Button, SheetClose } from '@/components/ui';

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
        {totalAmount > 0 ? (
          <>
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
                    disabled={item.disabled}
                    onClickRemove={() => removeCartItem(item.id)}
                    onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                    details={
                      item.pizzaSize && item.pizzaType ? getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize) : ''
                    }
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

                  <span className='font-bold text-lg'>{formatterPrice(totalAmount)}</span>
                </div>

                <Link href='/cart'>
                  <Button type='submit' className='w-full h-12 text-base'>
                    Оформить заказ
                    <ArrowRight width={20} className='ml-2' />
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className='flex flex-col items-center justify-center w-72 mx-auto h-full'>
            <Image src='/images/empty-box.png' alt='Empty cart' width={120} height={120} />

            <Title size='sm' text='Корзина пустая' className='text-center font-bold my-2' />

            <p className='text-center text-neutral-500 mb-5'>Добавьте хотя бы одну позицию, чтобы совершить заказ</p>

            <SheetClose>
              <Button className='w-56 h-12 text-base' size='lg'>
                <ArrowLeft className='mr-2' width={20} />
                Вернуться назад
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
