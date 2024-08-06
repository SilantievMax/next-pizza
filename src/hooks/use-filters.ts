import { useSet } from 'react-use';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface PriceProps {
  priceTo?: number;
  priceFrom?: number;
}

interface QueryFilters extends PriceProps {
  sizes: string;
  pizzaTypes: string;
  ingredients: string;
}

export interface Filters {
  prices: PriceProps;
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
}

interface ReturnProps extends Filters {
  setSizes: (value: string) => void;
  setPizzaTypes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
  setPrices: (name: keyof PriceProps, value: number) => void;
}

export const useFilter = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

  const [sizes, { toggle: toogleSizes }] = useSet(new Set<string>(searchParams.get('sizes')?.split(',')));
  const [pizzaTypes, { toggle: tooglePizzaTypes }] = useSet(new Set<string>(searchParams.get('ingredients')?.split(',')));
  const [selectedIngredients, { toggle: toogleIngredients }] = useSet(new Set<string>(searchParams.get('ingredients')?.split(',')));

  const [prices, setPrices] = useState<PriceProps>({
    priceTo: Number(searchParams.get('priceTo')) || undefined,
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  return useMemo(
    () => ({
      sizes,
      prices,
      pizzaTypes,
      selectedIngredients,
      setSizes: toogleSizes,
      setPrices: updatePrice,
      setPizzaTypes: tooglePizzaTypes,
      setSelectedIngredients: toogleIngredients,
    }),
    [sizes, pizzaTypes, selectedIngredients, prices]
  );
};
