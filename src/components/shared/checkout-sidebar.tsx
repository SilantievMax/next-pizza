import { FC } from 'react';
import { Button, Skeleton } from '@/components/ui';
import { cn, formatterPrice } from '@/lib';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { CheckoutItemDetail, WhiteBlock } from '@/components/shared';

interface Props {
  totalAmount: number;
  loading?: boolean;
  className?: string;
}

const VAT = 15;
const DELIVERY_PRICE = 250;

export const CheckoutSidebar: FC<Props> = ({ totalAmount, className, loading }) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;

  return (
    <WhiteBlock className={cn('p-6 sticky top-4', className)}>
      <div className='flex flex-col gap-1'>
        <span className='text-xl'>Итог:</span>

        {loading ? <Skeleton className='w-48 h-11 rounded-[6px]' /> : <span className='h-11 text-[34px] font-extrabold'>{formatterPrice(totalPrice)}</span>}
      </div>

      <CheckoutItemDetail
        title={
          <div className='flex items-center'>
            <Package className='mr-2 text-gray-400' size={18} /> Стоимость корзины:
          </div>
        }
        value={loading ? <Skeleton className='w-24 h-6 rounded-[6px]' /> : formatterPrice(totalAmount)}
      />

      <CheckoutItemDetail
        title={
          <div className='flex items-center'>
            <Percent className='mr-2 text-gray-400' size={18} /> Налоги:
          </div>
        }
        value={loading ? <Skeleton className='w-24 h-6 rounded-[6px]' /> : formatterPrice(vatPrice)}
      />

      <CheckoutItemDetail
        title={
          <div className='flex items-center'>
            <Truck className='mr-2 text-gray-400' size={18} /> Доставка
          </div>
        }
        value={loading ? <Skeleton className='w-24 h-6 rounded-[6px]' /> : formatterPrice(DELIVERY_PRICE)}
      />

      <Button className='w-full h-14 rounded-2xl mt-6 text-base font-bold' type='submit'>
        Перейти к оплате
        <ArrowRight className='ml-2' size={20} />
      </Button>
    </WhiteBlock>
  );
};
