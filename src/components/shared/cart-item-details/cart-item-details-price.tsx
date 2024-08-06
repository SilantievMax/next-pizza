import { formatterPrice, cn } from '@/lib';

interface Props {
  value: number;
  className?: string;
}

export const CartItemDetailsPrice: React.FC<Props> = ({ value, className }) => {
  return <h2 className={cn('font-bold', className)}>{formatterPrice(value)}</h2>;
};
