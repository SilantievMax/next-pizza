'use client';

import { FC } from 'react';
import { cn } from '@/lib';
import { Input } from '@/components/ui';
import { useFilter, useIngredientststs, useQueryFilters } from '@/hooks';
import { Title, RangeSlider, CheckboxFiltersGroup } from '@/components/shared';

interface Props {
  className?: string;
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
  const filters = useFilter();
  const { ingredients, loading } = useIngredientststs();

  useQueryFilters(filters);

  const ingredientsItems = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  };

  return (
    <div className={cn('', className)}>
      <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

      <CheckboxFiltersGroup
        className='mb-5'
        name='sizesTypes'
        title='Тип теста'
        selected={filters.pizzaTypes}
        items={sizesTypesItems}
        onClickCheckbox={filters.setPizzaTypes}
      />

      <CheckboxFiltersGroup name='sizes' title='Размер' className='mb-5' onClickCheckbox={filters.setSizes} items={sizesItems} selected={filters.sizes} />

      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
        <p className='font-bold mb-3'>Цена от и до:</p>

        <div className='flex gap-3 mb-5 '>
          <Input
            min={0}
            max={1000}
            type='number'
            placeholder='0'
            value={String(filters.prices.priceFrom)}
            onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
          />

          <Input
            min={100}
            max={1000}
            type='number'
            placeholder='1000'
            value={String(filters.prices.priceTo)}
            onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider min={0} step={10} max={1000} value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]} onValueChange={updatePrices} />

        <CheckboxFiltersGroup
          limit={6}
          className='mt-14'
          loading={loading}
          name='ingredients'
          title='Ингредиенты'
          items={ingredientsItems}
          selected={filters.selectedIngredients}
          defaultItems={ingredientsItems.slice(0, 6)}
          onClickCheckbox={filters.setSelectedIngredients}
        />
      </div>
    </div>
  );
};
