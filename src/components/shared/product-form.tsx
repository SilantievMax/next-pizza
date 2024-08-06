'use client';

import { FC } from 'react';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store';
import { ChoosePizzatForm } from './choose-pizza-form';
import { PoductWithRelationsType } from '@/types/prisma';
import { ChooseProductForm } from './choose-product-form';

interface Props {
  product: PoductWithRelationsType;
  className?: string;
  onSubmit?: VoidFunction;
}

export const ProductForm: FC<Props> = ({ product, className, onSubmit: _onSubmit }) => {
  const [loading, addCartItem] = useCartStore((state) => [state.loading, state.addCartItem]);

  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

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
      _onSubmit?.();
    } catch (err) {
      console.log(err);
      toast.error('Не удалось добавить товар в корзину');
    }
  };
  if (isPizzaForm) {
    return (
      <ChoosePizzatForm
        loading={loading}
        name={product.name}
        className={className}
        items={product.items}
        onSubmit={handleSubmit}
        imageUrl={product.imageUrl}
        ingredients={product.ingredients}
      />
    );
  }

  return (
    <ChooseProductForm
      loading={loading}
      name={product.name}
      className={className}
      onSubmit={handleSubmit}
      price={firstItem.price}
      imageUrl={product.imageUrl}
    />
  );
};
