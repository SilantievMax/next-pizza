import { FC } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui';
import { Title } from './title';
import { RangeSlider } from './range-slider';
import { FilterCheckbox } from './filter-checkbox';
import { CheckboxFiltersGroup } from './checkbox-filters-group';

interface Props {
  className?: string;
}

const ingredientsItems = [
  { text: 'Сырный соус', value: '1' },
  { text: 'Моццарелла', value: '2' },
  { text: 'Чеснок', value: '3' },
  { text: 'Солённые огурчики', value: '4' },
  { text: 'Красный лук', value: '5' },
  { text: 'Томат', value: '6' },
];

export const Filters: FC<Props> = ({ className }) => {
  return (
    <div className={cn('', className)}>
      <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

      <div className='flex flex-col gap-4'>
        <FilterCheckbox text='Можно собирать' value='1' />

        <FilterCheckbox text='Новинка' value='2' />
      </div>

      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
        <p className='font-bold mb-3'>Цена от и до:</p>

        <div className='flex gap-3 mb-5 '>
          <Input type='number' placeholder='0' min={0} max={1000} defaultValue={0} />

          <Input type='number' placeholder='1000' min={100} max={1000} />
        </div>

        <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />

        <CheckboxFiltersGroup className='mt-14' title='Ингредиенты' limit={6} defaultItems={ingredientsItems} items={ingredientsItems} />
      </div>
    </div>
  );
};
