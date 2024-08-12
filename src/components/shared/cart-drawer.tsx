'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { PizzaSize, PizzaType } from '@/constants/pizza';
import { formatterPrice, getCartItemDetails } from '@/lib';
import { CartDrawerItem, Title } from '@/components/shared';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, Button, SheetClose } from '@/components/ui';

export const CartDrawer: FC<PropsWithChildren> = ({ children }) => {
  const [redirecting, setRedirecting] = useState(false);
  const { items, removeCartItem, totalAmount, updateItemQuantity } = useCart();

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className='flex flex-col justify-between bg-[#F4F1EE] pb-0'>
        {totalAmount > 0 ? (
          <>
            <SheetHeader>
              <SheetTitle>
                В корзине <span className='font-bold'>{items.length} товара</span>
              </SheetTitle>
            </SheetHeader>

            <div className='scrollbar -mx-6 mt-5 flex-1 overflow-auto'>
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
                    details={getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)}
                  />
                </div>
              ))}
            </div>

            <SheetFooter className='-mx-6 bg-white p-8'>
              <div className='w-full'>
                <div className='mb-4 flex'>
                  <span className='flex flex-1 text-lg text-neutral-500'>
                    Итого
                    <div className='relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200' />
                  </span>

                  <span className='text-lg font-bold'>{formatterPrice(totalAmount)}</span>
                </div>

                <Link href='/checkout'>
                  <Button loading={redirecting} onClick={() => setRedirecting(true)} type='submit' className='h-12 w-full text-base'>
                    Оформить заказ
                    <ArrowRight size={20} className='ml-2' />
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className='mx-auto flex h-full w-72 flex-col items-center justify-center'>
            <Image src='/images/empty-box.png' alt='Empty cart' width={120} height={120} />

            <Title size='sm' text='Корзина пустая' className='my-2 text-center font-bold' />

            <p className='mb-5 text-center text-neutral-500'>Добавьте хотя бы одну позицию, чтобы совершить заказ</p>

            <SheetClose>
              <Button className='h-12 w-56 text-base' size='lg'>
                <ArrowLeft className='mr-2' size={20} />
                Вернуться назад
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
