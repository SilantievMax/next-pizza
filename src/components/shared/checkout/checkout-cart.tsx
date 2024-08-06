import { FC } from 'react';
import { getCartItemDetails } from '@/lib';
import { CartStateItem } from '@/lib/get-cart-details';
import { PizzaType, PizzaSize } from '@/constants/pizza';
import { CheckoutItem, CheckoutItemSkeleton, WhiteBlock } from '@/components/shared';

interface Props {
  items: CartStateItem[];
  removeCartItem: (id: number) => void;
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  loading?: boolean;
  className?: string;
}

export const CheckoutCart: FC<Props> = ({ className, items, onClickCountButton, removeCartItem, loading }) => {
  return (
    <WhiteBlock title='1. Корзина' className={className}>
      <div className='flex flex-col gap-5'>
        {loading
          ? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                disabled={item.disabled}
                quantity={item.quantity}
                imageUrl={item.imageUrl}
                onClickRemove={() => removeCartItem(item.id)}
                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                details={getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)}
              />
            ))}
      </div>
    </WhiteBlock>
  );
};
