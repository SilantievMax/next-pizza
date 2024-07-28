'use client';

import { FC, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui';
import { Title } from './title';
import { RangeSlider } from './range-slider';
import { FilterCheckbox } from './filter-checkbox';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import { useSet } from 'react-use';

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

const sizesItems = [
  { text: '20 см', value: '20' },
  { text: '30 см', value: '30' },
  { text: '40 см', value: '40' },
];

const sizesTypesItems = [
  { text: 'Тонкое', value: '1' },
  { text: 'Традиционное', value: '2' },
];

export const Filters: FC<Props> = ({ className }) => {
  const [prices, setPrice] = useState<PriceProps>({ priceFrom: 0, priceTo: 1000 });
  const [sizes, { toggle: toogleSizes }] = useSet(new Set<string>([]));
  const [pizzaTypes, { toggle: tooglePizzaTypes }] = useSet(new Set<string>([]));
  const { ingredients, loading, onAddId, selectedIngredients } = useFilterIngredients();

  const ingredientsItems = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({
      ...prices,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log({ prices, pizzaTypes, sizes, selectedIngredients });
  }, [prices, pizzaTypes, sizes, selectedIngredients]);

  return (
    <div className={cn('', className)}>
      <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

      <CheckboxFiltersGroup
        className='mb-5'
        name='sizesTypes'
        title='Тип теста'
        selected={pizzaTypes}
        items={sizesTypesItems}
        onClickCheckbox={tooglePizzaTypes}
      />

      <CheckboxFiltersGroup name='sizes' title='Размер' className='mb-5' onClickCheckbox={toogleSizes} items={sizesItems} selected={sizes} />

      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
        <p className='font-bold mb-3'>Цена от и до:</p>

        <div className='flex gap-3 mb-5 '>
          <Input
            min={0}
            max={1000}
            type='number'
            placeholder='0'
            value={String(prices.priceFrom)}
            onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
          />

          <Input
            min={100}
            max={1000}
            type='number'
            placeholder='1000'
            value={String(prices.priceTo)}
            onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          step={10}
          max={1000}
          value={[prices.priceFrom, prices.priceTo]}
          onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
        />

        <CheckboxFiltersGroup
          limit={6}
          className='mt-14'
          loading={loading}
          name='ingredients'
          title='Ингредиенты'
          selected={selectedIngredients}
          items={ingredientsItems}
          onClickCheckbox={onAddId}
          defaultItems={ingredientsItems.slice(0, 6)}
        />
      </div>
    </div>
  );
};
