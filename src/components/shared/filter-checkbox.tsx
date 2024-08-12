import { FC, ReactNode } from 'react';
import { Checkbox } from '@/components/ui';

interface Props {
  text: string;
  value: string;
  name?: string;
  checked?: boolean;
  endAdornment?: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
}

export type FilterCheckboxType = Props;

export const FilterCheckbox: FC<Props> = ({ text, value, checked, endAdornment, name, onCheckedChange }) => {
  return (
    <div className='flex items-center space-x-2'>
      <Checkbox onCheckedChange={onCheckedChange} checked={checked} value={value} className='h-6 w-6 rounded-[8px]' id={`checkbox-${name}-${String(value)}`} />

      <label htmlFor={`checkbox-${name}-${String(value)}`} className='flex-1 cursor-pointer leading-none'>
        {text}
      </label>

      {endAdornment}
    </div>
  );
};
