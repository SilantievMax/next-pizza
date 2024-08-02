'use client';

import { FC } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ChooseProductForm, ChoosePizzatForm } from '@/components/shared';
import { PoductWithRelationsType } from '@/types/prisma';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface Props {
  product: PoductWithRelationsType;
  className?: string;
}

export const ChooseProductModal: FC<Props> = ({ className, product }) => {
  const router = useRouter();

  const isPizzaForm = Boolean(product.items[0].pizzaType);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden', className)}>
        {isPizzaForm ? (
          <ChoosePizzatForm imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} items={product.items} />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  );
};
