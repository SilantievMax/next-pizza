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
    <WhiteBlock className={cn('sticky top-4 p-6', className)}>
      <div className='flex flex-col gap-1'>
        <span className='text-xl'>Итог:</span>

        {loading ? <Skeleton className='h-11 w-48 rounded-[6px]' /> : <span className='h-11 text-[34px] font-extrabold'>{formatterPrice(totalPrice)}</span>}
      </div>

      <CheckoutItemDetail
        title={
          <div className='flex items-center'>
            <Package className='mr-2 text-gray-400' size={18} /> Стоимость корзины:
          </div>
        }
        value={loading ? <Skeleton className='h-6 w-24 rounded-[6px]' /> : formatterPrice(totalAmount)}
      />

      <CheckoutItemDetail
        title={
          <div className='flex items-center'>
            <Percent className='mr-2 text-gray-400' size={18} /> Налоги:
          </div>
        }
        value={loading ? <Skeleton className='h-6 w-24 rounded-[6px]' /> : formatterPrice(vatPrice)}
      />

      <CheckoutItemDetail
        title={
          <div className='flex items-center'>
            <Truck className='mr-2 text-gray-400' size={18} /> Доставка
          </div>
        }
        value={loading ? <Skeleton className='h-6 w-24 rounded-[6px]' /> : formatterPrice(DELIVERY_PRICE)}
      />

      <Button className='mt-6 h-14 w-full rounded-2xl text-base font-bold' type='submit' loading={loading}>
        Перейти к оплате
        <ArrowRight className='ml-2' size={20} />
      </Button>
    </WhiteBlock>
  );
};
