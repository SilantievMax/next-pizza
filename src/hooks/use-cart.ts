import { useEffect } from 'react';
import { useCartStore } from '@/store';
import { CartStateItem } from '@/lib/get-cart-details';
import { CreateCartItemValuesDTO } from '@/services/dto/cart.dto';

interface ReturnProps {
  loading: boolean;
  totalAmount: number;
  items: CartStateItem[];
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValuesDTO) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
}

export const useCart = (): ReturnProps => {
  const [items, loading, totalAmount, addCartItem, fetchCartItems, removeCartItem, updateItemQuantity] = useCartStore((state) => [
    state.items,
    state.loading,
    state.totalAmount,
    state.addCartItem,
    state.fetchCartItems,
    state.removeCartItem,
    state.updateItemQuantity,
  ]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  return {
    items,
    loading,
    totalAmount,
    addCartItem,
    removeCartItem,
    updateItemQuantity,
  };
};
