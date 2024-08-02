import { Ingredient } from '@prisma/client';
import { mapPizzaType, PizzaSize, PizzaType } from '@/constants/pizza';

/**
 * Функция для получения списка дитальной информации
 *
 * @param pizzaType
 * @param pizzaSize
 * @param ingredients
 *
 * @returns
 */
export const getCartItemDetails = (pizzaType: PizzaType, pizzaSize: PizzaSize, ingredients: Ingredient[]): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(', ');
};
