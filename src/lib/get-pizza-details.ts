import { Ingredient, ProductItem } from '@prisma/client';
import { calkTotalPizzaPrices } from './calk-total-pizza-prices';
import { mapPizzaType, PizzaSize, PizzaType } from '@/constants/pizza';

/**
 * Функция для получения информации о пиццы
 *
 * @param type - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param items - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 *
 * @returns
 */
export const getPizzaDetails = (type: PizzaType, size: PizzaSize, items: ProductItem[], ingredients: Ingredient[], selectedIngredients: Set<number>) => {
  const totalPrice = calkTotalPizzaPrices(type, size, items, ingredients, selectedIngredients);
  const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;

  return {
    totalPrice,
    textDetails,
  };
};
