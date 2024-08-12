'use client';

import { FC } from 'react';
import { cn } from '@/lib';

export type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface Props {
  items: readonly Variant[];
  className?: string;
  value?: Variant['value'];
  onClick?: (value: Variant['value']) => void;
}

export const GroupVariants: FC<Props> = ({ items, className, onClick, value }) => {
  return (
    <div className={cn('flex select-none justify-between rounded-3xl bg-[#F3F3F7] p-1', className)}>
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => onClick?.(item.value)}
          className={cn('flex h-[30px] flex-1 items-center justify-center rounded-3xl px-5 text-sm transition-all duration-300', {
            'bg-white shadow': item.value === value,
            'pointer-events-none text-gray-500 opacity-50': item.disabled,
          })}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};
