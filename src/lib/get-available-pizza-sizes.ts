import { ProductItem } from '@prisma/client';
import { pizzaSizes, PizzaType } from '@/constants/pizza';
import { Variant } from '@/components/shared/group-variants';

/**
 * Функция для получения доступных размеров пиццы
 *
 * @param type - тип теста выбранной пиццы
 * @param items - список вариаций
 *
 * @returns
 */
export const getAvailablePizzaSizes = (type: PizzaType, items: ProductItem[]): Variant[] => {
  const filteredPizzaByType = items.filter((item) => item.pizzaType === type);

  return pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzaByType.some((pizza) => Number(pizza.size) === Number(item.value)),
  }));
};
