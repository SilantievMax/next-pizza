import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import { useState, useEffect } from 'react';

export const useIngredientststs = () => {
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

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

  return {
    loading,
    ingredients,
  };
};
