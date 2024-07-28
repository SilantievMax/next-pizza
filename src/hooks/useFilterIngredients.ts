import { useEffect, useState } from 'react';
import { useSet } from 'react-use';
import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';

interface ReturnProps {
  loading: boolean;
  selectedIngredients: Set<string>;
  ingredients: Ingredient[];
  onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIds, { toggle }] = useSet(new Set<string>([]));

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const response = await Api.ingredients.getAll();
        setIngredients(response);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  return { ingredients, loading, onAddId: toggle, selectedIngredients: selectedIds };
};
