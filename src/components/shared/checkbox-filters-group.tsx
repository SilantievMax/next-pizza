'use client';

import { ChangeEvent, FC, useState } from 'react';
import { Input, Skeleton } from '../ui';
import { FilterCheckbox, FilterCheckboxType } from './filter-checkbox';
import { cn } from '@/lib/utils';

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
        <p className='font-bold mb-3'>{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => <Skeleton className='h-6 mb-4 rounded-[8px]' key={index} />)}

        <Skeleton className='w-28 h-6 mb-4 rounded-[8px]' />
      </div>
    );
  }

  return (
    <div className={className}>
      <p className='font-bold mb-3'>{title}</p>

      {showAll && (
        <div className='mb-5'>
          <Input onChange={onChangeSearchInput} placeholder={searchInputPlaceholder} className='bg-gray-50 border-none' />
        </div>
      )}

      <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
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
        <div className={cn({ 'border-t border-t-neutral-100 mt-4': showAll })}>
          <button className='text-primary mt-3' onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  );
};
