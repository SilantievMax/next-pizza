'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { CartDrawerItem } from '@/components/shared';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, Button } from '@/components/ui';

interface Props {}

export const CartDrawer: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
        <SheetHeader>
          <SheetTitle>
            В корзине <span className='font-bold'>3 товара</span>
          </SheetTitle>
        </SheetHeader>

        <div className='-mx-6 mt-5 overflow-auto scrollbar flex-1'>
          <div className='mb-1'>
            <CartDrawerItem id={0} name={''} price={0} details={''} quantity={0} imageUrl={''} />
          </div>

          <div className='mb-1'>
            <CartDrawerItem id={0} name={''} price={0} details={''} quantity={0} imageUrl={''} />
          </div>
        </div>

        <SheetFooter className='-mx-6 bg-white p-8'>
          <div className='w-full'>
            <div className='flex mb-4'>
              <span className='flex flex-1 text-lg text-neutral-500'>
                Итого
                <div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
              </span>

              <span className='font-bold text-lg'>500 ₽</span>
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
