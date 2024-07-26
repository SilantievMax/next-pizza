import { FC, ReactNode } from 'react';
import { Checkbox } from '../ui';

interface Props {
  text: string;
  value: string;
  endAdornment?: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  name?: string;
}

export type FilterCheckboxType = Props;

export const FilterCheckbox: FC<Props> = ({ text, value, checked, endAdornment, name, onCheckedChange }) => {
  return (
    <div className='flex items-center space-x-2'>
      <Checkbox onCheckedChange={onCheckedChange} checked={checked} value={value} className='rounded-[8px] w-6 h-6' id={`checkbox-${name}-${String(value)}`} />

      <label htmlFor={`checkbox-${name}-${String(value)}`} className='leading-none cursor-pointer flex-1'>
        {text}
      </label>

      {endAdornment}
    </div>
  );
};
