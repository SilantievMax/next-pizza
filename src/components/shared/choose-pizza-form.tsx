'use client';

import { FC } from 'react';
import { cn } from '@/lib/utils';
import { getPizzaDetails } from '@/lib';
import { Button } from '@/components/ui';
import { usePizzaOptions } from '@/hooks';
import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType, pizzaTypes } from '@/constants/pizza';
import { Title, PizzaImage, GroupVariants, IngredientItem } from '@/components/shared';

interface Props {
  name: string;
  imageUrl: string;
  items: ProductItem[];
  ingredients: Ingredient[];
  className?: string;
  onClickAddCart?: VoidFunction;
}

export const ChoosePizzatForm: FC<Props> = ({ imageUrl, ingredients, name, className, items, onClickAddCart }) => {
  const { availableSizes, selectedIngredients, setSize, setType, size, type, addIngredient } = usePizzaOptions(items);

  const { textDetails, totalPrice } = getPizzaDetails(type, size, items, ingredients, selectedIngredients);

  const handleClickAdd = () => {
    onClickAddCart?.();

    console.log({
      size,
      type,
      ingredients: selectedIngredients,
    });
  };

  return (
    <div className={cn('flex flex-1', className)}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className='w-[490px] bg-[#F7F6F5] p-7'>
        <Title text={name} size='md' className='font-extrabold mb-1' />

        <p className='text-gray-400'>{textDetails}</p>

        <div className='flex flex-col gap-4 mt-5'>
          <GroupVariants items={availableSizes} value={String(size)} onClick={(value) => setSize(Number(value) as PizzaSize)} />

          <GroupVariants items={pizzaTypes} value={String(type)} onClick={(value) => setType(Number(value) as PizzaType)} />
        </div>

        <div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5'>
          <div className='grid grid-cols-3 gap-3'>
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button className='h-[50px] px-10 text-base rounded-[18px] w-full mt-10' onClick={handleClickAdd}>
          Добавить в корзину {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
