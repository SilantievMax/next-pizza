'use client';

import { FC } from 'react';
import { cn } from '@/lib';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store';
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

  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const [loading, addCartItem] = useCartStore((state) => [state.loading, state.addCartItem]);

  const onAddPizza = async (productItemId: number, ingredients: number[]) => {
    await addCartItem({
      ingredients,
      productItemId,
    });
  };

  const onAddProduct = () => {
    addCartItem({
      productItemId: firstItem.id,
    });
  };

  const handleSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      if (isPizzaForm) {
        await onAddPizza(productItemId!, ingredients!);
      } else {
        await onAddProduct();
      }

      toast.success(`${product.name} добавлена в корзину`);
      router.back();
    } catch (err) {
      console.log(err);
      toast.error('Не удалось добавить товар в корзину');
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden', className)}>
        {isPizzaForm ? (
          <ChoosePizzatForm
            loading={loading}
            name={product.name}
            items={product.items}
            onSubmit={handleSubmit}
            imageUrl={product.imageUrl}
            ingredients={product.ingredients}
          />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} onSubmit={handleSubmit} price={firstItem.price} loading={loading} />
        )}
      </DialogContent>
    </Dialog>
  );
};
