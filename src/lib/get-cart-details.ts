import { calcCartItemTotalPrice } from '@/lib';
import { CartDTO } from '@/services/dto/cart.dto';

export type CartStateItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  pizzaType?: number | null;
  pizzaSize?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  totalAmount: number;
  items: CartStateItem[];
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    pizzaSize: item.productItem.size,
    price: calcCartItemTotalPrice(item),
    name: item.productItem.product.name,
    pizzaType: item.productItem.pizzaType,
    imageUrl: item.productItem.product.imageUrl,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  }));

  return {
    items,
    totalAmount: data.totalAmount,
  };
};
