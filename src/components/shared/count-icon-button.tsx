import { FC } from 'react';
import { cn } from '@/lib';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CountButtonProps } from './count-button';

interface Props {
  disabled?: boolean;
  onClick?: () => void;
  type?: 'plus' | 'minus';
  size?: CountButtonProps['size'];
}

export const CountIconButton: FC<Props> = ({ size = 'sm', disabled, type, onClick }) => {
  return (
    <Button
      variant='outline'
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400',
        size === 'sm' ? 'w-[30px] h-[30px] rounded-[10px]' : 'w-[38px] h-[38px] rounded-md'
      )}
    >
      {type === 'plus' ? <Plus className={size === 'sm' ? 'h-4' : 'h-5'} /> : <Minus className={size === 'sm' ? 'h-4' : 'h-5'} />}
    </Button>
  );
};
