import { cn } from '@/lib';
import { CountIconButton } from '@/components/shared';

interface Props {
  value?: number;
  size?: 'sm' | 'lg';
  className?: string;
  onClick?: (type: 'plus' | 'minus') => void;
}

export type CountButtonProps = Props;

export const CountButton: React.FC<Props> = ({ onClick, className, value = 1, size = 'sm' }) => {
  return (
    <div className={cn('inline-flex items-center justify-between gap-3', className)}>
      <CountIconButton onClick={() => onClick?.('minus')} disabled={value === 1} size={size} type='minus' />

      <b className={size === 'sm' ? 'text-sm' : 'text-md'}>{value}</b>

      <CountIconButton onClick={() => onClick?.('plus')} size={size} type='plus' />
    </div>
  );
};
