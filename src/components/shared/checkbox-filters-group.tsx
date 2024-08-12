'use client';

import { cn } from '@/lib';
import { ChangeEvent, FC, useState } from 'react';
import { Input, Skeleton } from '@/components/ui';
import { FilterCheckbox } from '@/components/shared';
import { FilterCheckboxType } from './filter-checkbox';

type Item = FilterCheckboxType;

interface Props {
  title: string;
  items: Item[];
  name?: string;
  limit?: number;
  loading?: boolean;
  className?: string;
  defaultItems?: Item[];
  defaultValue?: string[];
  selected?: Set<string>;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
}

export const CheckboxFiltersGroup: FC<Props> = ({
  name,
  title,
  items,
  loading,
  className,
  limit = 5,
  selected,
  defaultItems,
  defaultValue,
  onClickCheckbox,
  searchInputPlaceholder = 'Поиск...',
}) => {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const list = showAll ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase())) : (defaultItems || items).slice(0, limit);

  const onChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className='mb-3 font-bold'>{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => <Skeleton className='mb-4 h-6 rounded-[8px]' key={index} />)}

        <Skeleton className='mb-4 h-6 w-28 rounded-[8px]' />
      </div>
    );
  }

  return (
    <div className={className}>
      <p className='mb-3 font-bold'>{title}</p>

      {showAll && (
        <div className='mb-5'>
          <Input onChange={onChangeSearchInput} placeholder={searchInputPlaceholder} className='border-none bg-gray-50' />
        </div>
      )}

      <div className='scrollbar flex max-h-96 flex-col gap-4 overflow-auto pr-2'>
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            name={name}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selected?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={cn({ 'mt-4 border-t border-t-neutral-100': showAll })}>
          <button className='mt-3 text-primary' onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  );
};
