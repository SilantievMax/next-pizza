import qs from 'qs';
import { useEffect, useRef } from 'react';
import { Filters } from './use-filters';
import { useRouter } from 'next/navigation';

export const useQueryFilters = (filters: Filters) => {
  const isMounted = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...filters.prices,
        sizes: Array.from(filters.sizes),
        pizzaTypes: Array.from(filters.pizzaTypes),
        ingredients: Array.from(filters.selectedIngredients),
      };

      const query = qs.stringify(params, { arrayFormat: 'comma' });

      router.push(`?${query}`, { scroll: false });
    }

    isMounted.current = true;
  }, [filters]);
};
