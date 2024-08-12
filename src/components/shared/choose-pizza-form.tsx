'use client';

import { FC } from 'react';
import { Button } from '@/components/ui';
import { usePizzaOptions } from '@/hooks';
import { Ingredient, ProductItem } from '@prisma/client';
import { formatterPrice, getPizzaDetails, cn } from '@/lib';
import { PizzaSize, PizzaType, pizzaTypes } from '@/constants/pizza';
import { Title, PizzaImage, GroupVariants, IngredientItem } from '@/components/shared';

interface Props {
  name: string;
  imageUrl: string;
  items: ProductItem[];
  ingredients: Ingredient[];
  onSubmit: (itemId: number, ingredients: number[]) => void;
  loading?: boolean;
  className?: string;
  onClickAddCart?: VoidFunction;
}

export const ChoosePizzatForm: FC<Props> = ({ imageUrl, ingredients, name, className, items, loading, onSubmit }) => {
  const { availableSizes, selectedIngredients, setSize, setType, size, type, addIngredient, currentItemId } = usePizzaOptions(items);

  const { textDetails, totalPrice } = getPizzaDetails(type, size, items, ingredients, selectedIngredients);

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn('flex flex-1', className)}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className='w-[490px] bg-[#F7F6F5] p-7'>
        <Title text={name} size='md' className='mb-1 font-extrabold' />

        <p className='text-gray-400'>{textDetails}</p>

        <div className='mt-5 flex flex-col gap-4'>
          <GroupVariants items={availableSizes} value={String(size)} onClick={(value) => setSize(Number(value) as PizzaSize)} />

          <GroupVariants items={pizzaTypes} value={String(type)} onClick={(value) => setType(Number(value) as PizzaType)} />
        </div>

        <div className='scrollbar mt-5 h-[420px] overflow-auto rounded-md bg-gray-50 p-5'>
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

        <Button className='mt-10 h-[50px] w-full rounded-[18px] px-10 text-base' onClick={handleClickAdd} loading={loading}>
          Добавить в корзину {formatterPrice(totalPrice)}
        </Button>
      </div>
    </div>
  );
};
